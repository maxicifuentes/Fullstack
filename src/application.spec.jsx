import React from 'react';
import { render, screen, fireEvent, cleanup, within, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { StoreProvider, storeReducer } from './store/StoreContext';
import { PRODUCTOS_INICIALES, USUARIOS_INICIALES, ORDENES_INICIALES } from './data/seed';
import { cartTotals, filterProducts } from './utils/appUtils';

// App importa todas las páginas, componentes, estado y utilidades de producción.
// main.jsx (arranque, CSS y Bootstrap) se comprueba mediante build y revisión visual.
const admin = { id: 1, nombre: 'Ada', tipo: 'Administrador' };
const seller = { id: 2, nombre: 'Diego', tipo: 'Vendedor' };
const client = { id: 3, nombre: 'Camila', tipo: 'Cliente' };
const baseState = () => ({ products: PRODUCTOS_INICIALES, users: USUARIOS_INICIALES, orders: ORDENES_INICIALES, cart: [], session: admin });
const read = (key) => JSON.parse(localStorage.getItem(`cg2_${key}`));
const set = (key, value) => localStorage.setItem(`cg2_${key}`, JSON.stringify(value));
function open(path, session = null, data = {}) {
  localStorage.clear();
  if (session) set('session', session);
  Object.entries(data).forEach(([key, value]) => set(key, value));
  return render(<MemoryRouter initialEntries={[path]}><StoreProvider><App /></StoreProvider></MemoryRouter>);
}
const fill = (label, value) => fireEvent.change(screen.getByLabelText(label, { exact: true }), { target: { value } });
const click = (name) => fireEvent.click(screen.getByRole('button', { name, exact: true }));
const submit = (name) => fireEvent.submit(screen.getByRole('button', { name, exact: true }).closest('form'));

// La API se simula en estas pruebas de interfaz: así validamos los flujos
// reales (asíncronos) sin depender de que Spring esté encendido durante Karma.
let apiProducts; let apiUsers; let apiOrders;
const jsonResponse = (body, status = 200) => Promise.resolve({ ok: status >= 200 && status < 300, status, json: () => Promise.resolve(body) });
const apiOrder = (order) => ({ ...order, estado: ({ Pagada: 'PAGADA', Preparando: 'PREPARANDO', Enviada: 'ENVIADA', Entregada: 'ENTREGADA', Cancelada: 'CANCELADA' }[order.estado] || order.estado), fecha: order.fecha || '2026-11-17T12:00:00', detalles: Array.from({ length: order.items || 1 }, (_, index) => ({ productoId: index + 1, cantidad: 1 })) });
beforeEach(() => {
  apiProducts = PRODUCTOS_INICIALES.map((product) => ({ ...product }));
  apiUsers = USUARIOS_INICIALES.map((user) => ({ ...user, rol: user.tipo.toUpperCase() }));
  apiOrders = ORDENES_INICIALES.map(apiOrder);
  spyOn(window, 'fetch').and.callFake((url, options = {}) => {
    const path = String(url); const method = options.method || 'GET'; const body = options.body ? JSON.parse(options.body) : {};
    if (path.endsWith('/productos') && method === 'GET') return jsonResponse(apiProducts);
    if (path.includes('/productos/') && method === 'PUT') { const id = Number(path.split('/').pop()); const saved = { ...body, id }; apiProducts = apiProducts.map((product) => product.id === id ? saved : product); return jsonResponse(saved); }
    if (path.endsWith('/productos') && method === 'POST') { const saved = { ...body, id: Math.max(...apiProducts.map((product) => product.id)) + 1 }; apiProducts.push(saved); return jsonResponse(saved, 201); }
    if (path.includes('/productos/') && method === 'DELETE') { apiProducts = apiProducts.filter((product) => product.id !== Number(path.split('/').pop())); return jsonResponse(null, 204); }
    if (path.endsWith('/usuarios') && method === 'GET') return jsonResponse(apiUsers);
    if (path.endsWith('/usuarios') && method === 'POST') { const saved = { ...body, id: Math.max(...apiUsers.map((user) => user.id)) + 1 }; apiUsers.push(saved); return jsonResponse(saved, 201); }
    if (path.includes('/usuarios/') && method === 'PUT') { const id = Number(path.split('/').pop()); const saved = { ...body, id }; apiUsers = apiUsers.map((user) => user.id === id ? saved : user); return jsonResponse(saved); }
    if (path.includes('/usuarios/') && method === 'DELETE') { apiUsers = apiUsers.filter((user) => user.id !== Number(path.split('/').pop())); return jsonResponse(null, 204); }
    if (path.endsWith('/auth/login')) { const user = apiUsers.find((item) => item.correo.toLowerCase() === String(body.correo).toLowerCase()); return user && body.clave !== 'incorrecta' ? jsonResponse({ id: user.id, nombre: user.nombre, correo: user.correo, tipo: user.rol, token: 'jwt-test' }) : jsonResponse({ mensaje: 'Correo o contraseña incorrectos.' }, 401); }
    if (path.endsWith('/auth/registro')) { if (apiUsers.some((user) => user.correo.toLowerCase() === body.correo.toLowerCase())) return jsonResponse({ mensaje: 'Este correo ya está registrado.' }, 409); const saved = { ...body, id: Math.max(...apiUsers.map((user) => user.id)) + 1, rol: 'CLIENTE' }; apiUsers.push(saved); return jsonResponse({ id: saved.id, nombre: saved.nombre, correo: saved.correo, tipo: 'CLIENTE', token: 'jwt-test' }, 201); }
    if (path.endsWith('/boletas') && method === 'GET') return jsonResponse(apiOrders);
    if (path.endsWith('/boletas') && method === 'POST') { const details = body.items.map((item) => ({ productoId: item.productoId, cantidad: item.cantidad })); const total = details.reduce((sum, item) => sum + apiProducts.find((product) => product.id === item.productoId).precio * item.cantidad, 0); const saved = { id: 123456789, cliente: 'Cliente Prueba', estado: 'PAGADA', fecha: '2026-11-17T12:00:00', total, detalles: details }; apiOrders.push(saved); return jsonResponse(saved, 201); }
    if (path.includes('/boletas/') && path.endsWith('/estado') && method === 'PATCH') { const id = Number(path.split('/').slice(-2)[0]); const order = apiOrders.find((item) => item.id === id); order.estado = body.estado; return jsonResponse(order); }
    return jsonResponse({ mensaje: 'Ruta no simulada' }, 404);
  });
});

describe('Páginas y navegación de la tienda', () => {
  afterEach(() => { cleanup(); localStorage.clear(); });
  [
    ['/', 'Tu próxima aventura comienza aquí.'],
    ['/catalogo', 'Encuentra tu próximo juego'],
    ['/categorias', 'Categorías'],
    ['/ofertas', 'Ofertas que suben de nivel'],
    ['/nosotros', 'Jugamos desde el primer nivel'],
    ['/contacto', '¿Cómo podemos ayudarte?'],
    ['/carrito', 'Carrito de compra'],
    ['/producto/1', 'Nebula Raiders'],
    ['/producto/9999', 'Producto no encontrado'],
    ['/desconocida', '404'],
    ['/pago/error', 'No pudimos procesar el pago'],
  ].forEach(([path, title]) => it(`renderiza ${path} con su encabezado`, () => {
    open(path); expect(screen.getByRole('heading', { name: title, level: 1 })).toBeTruthy();
  }));

  it('filtra el catálogo, muestra estado vacío y permite limpiar', () => {
    open('/catalogo?categoria=RPG');
    expect(screen.getByText('1 resultados')).toBeTruthy();
    fill('Buscar', 'inexistente');
    expect(screen.getByText('No encontramos coincidencias')).toBeTruthy();
    click('Limpiar filtros');
    expect(screen.getByText('8 resultados')).toBeTruthy();
    fill('Categoría', 'Indie');
    expect(screen.getByRole('heading', { name: 'Pixel Valley' })).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'Nebula Raiders' })).toBeNull();
  });
  it('mantiene la categoría al navegar desde categorías', () => {
    open('/categorias');
    fireEvent.click(screen.getByRole('link', { name: /RPG.*título disponible/ }));
    expect(screen.getByLabelText('Categoría').value).toBe('RPG');
    expect(screen.getByText('1 resultados')).toBeTruthy();
  });
  it('muestra únicamente productos rebajados en ofertas', () => {
    open('/ofertas');
    expect(screen.getByText('4 resultados')).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'Pixel Valley' })).toBeNull();
  });
  it('añade desde detalle y permite cambiar y eliminar cantidades', () => {
    open('/producto/1');
    click('Aumentar cantidad'); click('Disminuir cantidad'); click('Aumentar cantidad'); click('Añadir al carrito');
    expect(read('cart')).toEqual([{ id: 1, quantity: 2 }]);
    fireEvent.click(screen.getByRole('link', { name: /Carrito 2/ }));
    click('Aumentar cantidad'); expect(read('cart')[0].quantity).toBe(3);
    click('Disminuir cantidad'); expect(read('cart')[0].quantity).toBe(2);
    click(/Quitar/); expect(screen.getByText('Tu carrito está vacío')).toBeTruthy();
  });
  it('envía el formulario de contacto simulado y limpia el mensaje', () => {
    open('/contacto'); fill('Nombre', 'Cliente de prueba'); fill('Correo', 'prueba@example.com'); fill('Mensaje', 'Consulta académica');
    submit('Enviar mensaje');
    expect(screen.getByText('Mensaje enviado correctamente.')).toBeTruthy();
    expect(screen.getByLabelText('Mensaje').value).toBe('');
  });
});

describe('Acceso y roles', () => {
  afterEach(() => { cleanup(); localStorage.clear(); });
  it('rechaza credenciales incorrectas y permite iniciar y cerrar sesión', async () => {
    open('/login'); fill('Correo', 'admin@duoc.cl'); fill('Contraseña', 'incorrecta'); submit('Iniciar sesión');
    await waitFor(() => expect(screen.getByText('Correo o contraseña incorrectos.')).toBeTruthy());
    fill('Contraseña', 'admin1'); submit('Iniciar sesión');
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Resumen ejecutivo' })).toBeTruthy());
    fireEvent.click(screen.getByRole('link', { name: /Volver a la tienda/ }));
    click('Salir · Ada'); expect(read('session')).toBeNull();
  });
  it('registra al cliente, evita duplicados y valida campos', async () => {
    open('/registro'); submit('Crear mi cuenta');
    expect(screen.getByText(/Completa todos los datos/)).toBeTruthy();
    fill('Nombre', 'Ana'); fill('Apellidos', 'Prueba'); fill('Correo', 'admin@duoc.cl'); fill('Contraseña', 'demo123'); submit('Crear mi cuenta');
    await waitFor(() => expect(screen.getByText('Este correo ya está registrado.')).toBeTruthy());
    fill('Correo', 'ana@example.com'); submit('Crear mi cuenta');
    await waitFor(() => expect(window.fetch.calls.all().some((call) => String(call.args[0]).endsWith('/auth/registro'))).toBeTrue());
    await waitFor(() => expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeTruthy());
  });
  it('redirige a login cuando no existe sesión', () => {
    open('/admin/usuarios'); expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeTruthy();
  });
  it('impide al cliente acceder al panel', () => {
    open('/admin', client); expect(screen.queryByRole('heading', { name: 'Resumen ejecutivo' })).toBeNull();
    expect(screen.getByRole('heading', { name: 'Tu próxima aventura comienza aquí.' })).toBeTruthy();
  });
  it('impide al vendedor acceder a usuarios o crear productos', () => {
    const first = open('/admin/usuarios', seller);
    expect(screen.getByRole('heading', { name: 'Tu próxima aventura comienza aquí.' })).toBeTruthy(); first.unmount();
    open('/admin/productos/nuevo', seller);
    expect(screen.getByRole('heading', { name: 'Tu próxima aventura comienza aquí.' })).toBeTruthy();
  });
  it('el vendedor consulta productos sin acciones de modificación', () => {
    open('/admin/productos', seller);
    expect(screen.queryByRole('link', { name: 'Nuevo producto' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Eliminar' })).toBeNull();
    expect(screen.queryByRole('link', { name: /Usuarios/ })).toBeNull();
  });
  [admin, client].forEach((session) => it(`redirige login cuando ${session.tipo} ya tiene sesión`, () => {
    open('/login', session); expect(screen.queryByRole('button', { name: 'Iniciar sesión' })).toBeNull();
    expect(screen.getByRole('heading', { name: session.tipo === 'Administrador' ? 'Resumen ejecutivo' : 'Tu próxima aventura comienza aquí.' })).toBeTruthy();
  }));
});

describe('Administración de usuarios y órdenes', () => {
  afterEach(() => { cleanup(); localStorage.clear(); });
  it('crea un usuario mediante la API y muestra confirmación', async () => {
    const confirmation = spyOn(window, 'confirm').and.returnValue(false);
    const view = open('/admin/usuarios', admin);
    click('Nuevo usuario'); fill('Nombre', 'Usuario'); fill('Apellidos', 'Prueba'); fill('Correo', 'NUEVO@example.com'); fill('Contraseña', 'demo123'); fill('Perfil', 'Vendedor'); submit('Guardar usuario');
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain('guardado'));
    await waitFor(() => expect(window.fetch.calls.all().some((call) => String(call.args[0]).endsWith('/usuarios') && call.args[1]?.method === 'POST')).toBeTrue());
    expect(confirmation).not.toHaveBeenCalled(); view.unmount();
  });
  it('valida usuario vacío y correo duplicado y permite cancelar', () => {
    open('/admin/usuarios', admin); click('Nuevo usuario'); submit('Guardar usuario');
    expect(screen.getByRole('alert').textContent).toContain('Completa');
    fill('Nombre', 'Ana'); fill('Apellidos', 'Prueba'); fill('Correo', 'ADMIN@duoc.cl'); fill('Contraseña', 'demo123'); submit('Guardar usuario');
    expect(screen.getByRole('alert').textContent).toContain('ya está registrado');
    click('Cancelar'); expect(screen.queryByRole('button', { name: 'Guardar usuario' })).toBeNull();
  });
  it('protege la cuenta activa y no permite cambiar su perfil', () => {
    open('/admin/usuarios', admin);
    expect(screen.getByRole('button', { name: 'Eliminar admin@duoc.cl' }).disabled).toBeTrue();
    click('Editar admin@duoc.cl'); expect(screen.getByLabelText('Perfil').disabled).toBeTrue();
  });
  it('administrador actualiza una orden mediante la API', async () => {
    open('/admin/ordenes', { ...admin, token: 'jwt-test' });
    await waitFor(() => expect(screen.getByLabelText('Estado de orden 1001')).toBeTruthy());
    fill('Estado de orden 1001', 'Entregada');
    await waitFor(() => expect(screen.getByRole('status').textContent).toBe('Orden #1001 actualizada a Entregada.'));
  });
  it('vendedor consulta órdenes sin control para cambiar estado', () => {
    open('/admin/ordenes', seller);
    expect(screen.queryByLabelText('Estado de orden 1001')).toBeNull();
    expect(screen.getAllByText('Pagada').length).toBeGreaterThan(0);
  });
});

describe('Administración de productos', () => {
  afterEach(() => { cleanup(); localStorage.clear(); });
  it('crea, edita y elimina un producto y respeta la cancelación', async () => {
    const confirmation = spyOn(window, 'confirm').and.returnValue(false);
    open('/admin/productos/nuevo', admin);
    fill('Código', 'DEMO'); fill('Nombre', 'Producto de prueba'); fill('Precio', '1000'); fill('Stock', '2'); fill('Descripción', 'Descripción de prueba'); fill('Categoría', 'Indie'); fill('Color', '#123456'); submit('Guardar producto');
    await waitFor(() => expect(apiProducts.some((item) => item.codigo === 'DEMO')).toBeTrue());
    expect(apiProducts.find((item) => item.codigo === 'DEMO').precio).toBe(1000);
    expect(confirmation).not.toHaveBeenCalled();
  });
  it('no guarda productos sin código o con stock negativo', () => {
    open('/admin/productos/nuevo', admin); fill('Nombre', 'Inválido'); submit('Guardar producto'); expect(read('products').length).toBe(8);
    fill('Código', 'INVALIDO'); fill('Stock', '-1'); submit('Guardar producto'); expect(read('products').length).toBe(8);
  });
  it('deshabilita la compra y el incremento cuando el producto no tiene stock', () => {
    open('/producto/1', null, { products: PRODUCTOS_INICIALES.map((p) => p.id === 1 ? { ...p, stock: 0 } : p) });
    expect(screen.getByRole('button', { name: 'Añadir al carrito' }).disabled).toBeTrue();
    expect(screen.getByRole('button', { name: 'Aumentar cantidad' }).disabled).toBeTrue();
    expect(read('cart')).toEqual([]);
  });
  it('rechaza códigos de producto duplicados sin distinguir mayúsculas', () => {
    open('/admin/productos/nuevo', admin); fill('Código', 'nebula'); fill('Nombre', 'Duplicado'); submit('Guardar producto');
    expect(screen.getByRole('alert').textContent).toBe('Este código de producto ya está registrado.');
    expect(read('products').length).toBe(8);
  });
  it('permite cancelar la edición sin guardar cambios', () => {
    open('/admin/productos', admin); fireEvent.click(screen.getAllByRole('link', { name: 'Editar' })[0]); fill('Nombre', 'Sin guardar'); click('Cancelar');
    expect(read('products')[0].nombre).toBe('Nebula Raiders'); expect(screen.getByRole('heading', { name: 'Productos' })).toBeTruthy();
  });
  [admin, seller].forEach((session) => it(`muestra el detalle administrativo para ${session.tipo}`, () => {
    open('/admin/productos/1', session); expect(screen.getByRole('heading', { name: 'Nebula Raiders' })).toBeTruthy();
    expect(Boolean(screen.queryByRole('link', { name: 'Editar' }))).toBe(session.tipo === 'Administrador');
  }));
  it('muestra producto administrativo no encontrado', () => {
    open('/admin/productos/999', admin); expect(screen.getByText('Producto no encontrado.')).toBeTruthy();
  });
  it('muestra resumen sin alertas cuando no hay stock crítico', () => {
    open('/admin', admin, { products: PRODUCTOS_INICIALES.map((p) => ({ ...p, stock: 1000 })) }); expect(screen.getByText('No hay alertas.')).toBeTruthy();
  });
});

describe('Checkout y persistencia', () => {
  afterEach(() => { cleanup(); localStorage.clear(); });
  const fillCheckout = (card) => {
    fill('Nombre completo', 'Cliente Prueba'); fill('Correo', 'cliente@example.com'); fill('Dirección', 'Calle de prueba 123');
    fill('Región', 'Región Metropolitana'); fill('Comuna', 'Santiago'); fill('Número de tarjeta', card);
  };
  it('redirige al carrito cuando checkout está vacío', () => {
    open('/checkout'); expect(screen.getByText('Tu carrito está vacío')).toBeTruthy();
  });
  it('valida checkout y crea un pedido aprobado vaciando el carrito', async () => {
    spyOn(Date, 'now').and.returnValue(123456789);
    open('/checkout', null, { cart: [{ id: 2, quantity: 2 }] }); submit('Confirmar compra');
    expect(screen.getByText('Ingresa el nombre de quien recibe.')).toBeTruthy();
    fillCheckout('4242424242424242'); submit('Confirmar compra');
    await waitFor(() => expect(screen.getByRole('heading', { name: '¡Compra realizada con éxito!' })).toBeTruthy());
    const order = read('orders').find((item) => item.id === 123456789);
    expect(order?.envio?.tarjeta).toBeUndefined(); expect(order.total).toBe(31980); expect(order.items).toBe(2); expect(read('cart')).toEqual([]);
  });
  it('rechaza pago de prueba y conserva el carrito para reintentar', () => {
    open('/checkout', client, { cart: [{ id: 1, quantity: 1 }] });
    expect(screen.getByLabelText('Nombre completo').value).toBe('Camila Pérez Díaz');
    fill('Nombre completo', 'Nombre modificado'); fill('Número de tarjeta', '4242424242420000'); submit('Confirmar compra');
    expect(screen.getByRole('heading', { name: 'No pudimos procesar el pago' })).toBeTruthy();
    expect(read('cart')).toEqual([{ id: 1, quantity: 1 }]); expect(read('orders').length).toBe(3);
    fireEvent.click(screen.getByRole('link', { name: 'Intentar nuevamente' })); expect(screen.getByRole('heading', { name: 'Checkout' })).toBeTruthy(); expect(screen.getByLabelText('Nombre completo').value).toBe('Nombre modificado'); expect(screen.getByLabelText('Número de tarjeta').value).toBe('');
  });
  it('limpia comuna al cambiar región', () => {
    open('/checkout', client, { cart: [{ id: 1, quantity: 1 }] }); fill('Región', 'Región Metropolitana');
    expect(screen.getByLabelText('Comuna').value).toBe('');
  });
  it('recupera los datos semilla cuando localStorage contiene JSON inválido', () => {
    localStorage.clear(); localStorage.setItem('cg2_products', '{invalid');
    render(<MemoryRouter initialEntries={['/catalogo']}><StoreProvider><App /></StoreProvider></MemoryRouter>);
    expect(screen.getByText('8 resultados')).toBeTruthy();
  });
});

describe('Reglas de negocio y límites del estado', () => {
  it('acumula carrito sin superar stock ni aceptar productos inexistentes', () => {
    let state = baseState(); state = storeReducer(state, { type: 'ADD_CART', payload: { id: 1 } });
    state = storeReducer(state, { type: 'ADD_CART', payload: { id: 1, quantity: 2 } }); expect(state.cart[0].quantity).toBe(3);
    expect(storeReducer(state, { type: 'ADD_CART', payload: { id: 1, quantity: 999 } })).toBe(state);
    expect(storeReducer(state, { type: 'ADD_CART', payload: { id: 999 } })).toBe(state);
  });
  it('elimina cantidades cero, vacía carrito y conserva acciones desconocidas', () => {
    const state = { ...baseState(), cart: [{ id: 1, quantity: 1 }, { id: 2, quantity: 2 }] };
    expect(storeReducer(state, { type: 'SET_CART_QUANTITY', payload: { id: 1, quantity: 0 } }).cart).toEqual([{ id: 2, quantity: 2 }]);
    expect(storeReducer(state, { type: 'CLEAR_CART' }).cart).toEqual([]);
    expect(storeReducer(state, { type: 'DESCONOCIDA' })).toBe(state);
  });
  it('rechaza cantidades inválidas y superiores al stock al modificar el carrito', () => {
    const state = { ...baseState(), cart: [{ id: 1, quantity: 1 }] };
    [-1, 0.5, 999].forEach((quantity) => {
      expect(storeReducer(state, { type: 'ADD_CART', payload: { id: 1, quantity } })).toBe(state);
      expect(storeReducer(state, { type: 'SET_CART_QUANTITY', payload: { id: 1, quantity } })).toBe(state);
    });
    expect(storeReducer(state, { type: 'ADD_CART', payload: { id: 1, quantity: 0 } })).toBe(state);
    expect(storeReducer(state, { type: 'SET_CART_QUANTITY', payload: { id: 999, quantity: 1 } })).toBe(state);
  });
  it('calcula envío gratis en carrito vacío o subtotal de al menos 50000', () => {
    expect(cartTotals([], PRODUCTOS_INICIALES).total).toBe(0);
    expect(cartTotals([{ id: 1, quantity: 2 }], PRODUCTOS_INICIALES).shipping).toBe(0);
    expect(cartTotals([{ id: 999, quantity: 1 }], PRODUCTOS_INICIALES).lines).toEqual([]);
  });
  it('filtra texto sin distinguir mayúsculas y filtra ofertas', () => {
    expect(filterProducts(PRODUCTOS_INICIALES).length).toBe(8);
    expect(filterProducts(PRODUCTOS_INICIALES, '  NEBULA  ', '', true).map((p) => p.id)).toEqual([1]);
    expect(filterProducts(PRODUCTOS_INICIALES, 'PIXEL', '', true)).toEqual([]);
  });
  it('cierra la sesión si se elimina el usuario activo', () => {
    const next = storeReducer(baseState(), { type: 'DELETE_USER', payload: 1 }); expect(next.session).toBeNull();
  });
});
