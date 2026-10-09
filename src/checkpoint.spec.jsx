import React from 'react';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import CartPage from './pages/CartPage';
import { PRODUCTOS_INICIALES } from './data/seed';
import { StoreProvider, storeReducer } from './store/StoreContext';
import { cartTotals, discountPercent, filterProducts, money, validateCheckout } from './utils/appUtils';

describe('Checkpoint Games - cobertura unitaria de componentes y lógica', () => {
  afterEach(() => { cleanup(); localStorage.clear(); });

  it('1. renderiza un ProductCard con las props recibidas', () => {
    render(<MemoryRouter><StoreProvider><ProductCard product={PRODUCTOS_INICIALES[0]} /></StoreProvider></MemoryRouter>);
    expect(screen.getByText('Nebula Raiders')).toBeTruthy();
    expect(screen.getByText('Acción')).toBeTruthy();
  });

  it('2. realiza renderizado condicional de la etiqueta de descuento', () => {
    render(<MemoryRouter><StoreProvider><ProductCard product={PRODUCTOS_INICIALES[0]} /></StoreProvider></MemoryRouter>);
    expect(screen.getByText(`-${discountPercent(PRODUCTOS_INICIALES[0])}%`)).toBeTruthy();
  });

  it('3. formatea productos gratuitos de forma comprensible', () => {
    expect(money(0)).toBe('GRATIS');
  });

  it('4. filtra productos por texto y categoría', () => {
    const result = filterProducts(PRODUCTOS_INICIALES, 'kingdom', 'RPG');
    expect(result.length).toBe(1);
    expect(result[0].codigo).toBe('KINGDOM');
  });

  it('5. calcula subtotal, despacho y total del carrito', () => {
    const result = cartTotals([{ id: 2, quantity: 2 }], PRODUCTOS_INICIALES);
    expect(result.subtotal).toBe(31980);
    expect(result.shipping).toBe(3990);
    expect(result.total).toBe(35970);
  });

  it('6. informa errores en un checkout incompleto', () => {
    const errors = validateCheckout({ nombre: '', correo: 'malo', direccion: '', region: '', comuna: '', tarjeta: '123' });
    expect(Object.keys(errors).length).toBe(6);
  });

  it('7. acepta un checkout con datos válidos', () => {
    const errors = validateCheckout({ nombre: 'Maximiliano', correo: 'max@gmail.com', direccion: 'Calle 123', region: 'RM', comuna: 'Santiago', tarjeta: '4242424242424242' });
    expect(Object.keys(errors).length).toBe(0);
  });

  it('8. actualiza el estado al añadir un producto al carrito', () => {
    const state = { products: PRODUCTOS_INICIALES, cart: [], users: [], orders: [], session: null };
    const next = storeReducer(state, { type: 'ADD_CART', payload: { id: 1, quantity: 2 } });
    expect(next.cart).toEqual([{ id: 1, quantity: 2 }]);
  });

  it('9. elimina un producto mediante la operación CRUD del reducer', () => {
    const state = { products: PRODUCTOS_INICIALES, cart: [], users: [], orders: [], session: null };
    const next = storeReducer(state, { type: 'DELETE_PRODUCT', payload: 1 });
    expect(next.products.some((product) => product.id === 1)).toBeFalse();
  });

  it('10. reacciona a un evento y actualiza el estado del componente', () => {
    render(<MemoryRouter><StoreProvider><ProductCard product={PRODUCTOS_INICIALES[0]} /><CartPage /></StoreProvider></MemoryRouter>);
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Añadir', exact: true }));
    expect(screen.getByText('Productos (1)')).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('cg2_cart'))).toEqual([{ id: 1, quantity: 1 }]);
  });
});
