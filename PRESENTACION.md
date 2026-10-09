# Guion técnico para la presentación (15 minutos sugeridos)

## 1. Problema y solución (2 min)

Checkpoint Games migró desde páginas HTML independientes a una SPA React. Mostrar la portada y explicar que React permite mantener la interfaz sincronizada con los datos sin recargar cada página.

## 2. Arquitectura React (3 min)

- `App.jsx`: rutas públicas, rutas protegidas y panel administrativo.
- `ProductCard.jsx`: recibe `product` y `compact` mediante props.
- `StoreContext.jsx`: mantiene productos, usuarios, órdenes, carrito y sesión mediante `useReducer`.
- Estados locales: filtros del catálogo, cantidad en detalle, formularios y checkout.
- Persistencia: cada cambio relevante se sincroniza con `localStorage`.

Demostración: filtrar catálogo, abrir un producto, añadirlo y comprobar el contador del carrito.

## 3. Bootstrap y responsividad (2 min)

Mostrar la aplicación en escritorio y móvil. Explicar el grid de Bootstrap (`row`, `col-*`), navegación colapsable, formularios y tablas responsivas. El CSS propio define identidad visual, pero Bootstrap resuelve la base adaptable.

## 4. Checkout y panel (3 min)

- Checkout precargado cuando existe una sesión de Cliente.
- Validación antes de comprar.
- Tarjeta terminada en `0000`: flujo de error; otra tarjeta de prueba: éxito y creación de orden.
- Administrador: CRUD de productos y usuarios; consulta y cambio de estado de órdenes.
- Vendedor: consulta productos y actualiza órdenes; no puede modificar productos ni usuarios.

## 5. Jasmine, Karma y cobertura (3 min)

Ejecutar `npm test`. Explicar:

- Jasmine define `describe`, `it` y expectativas.
- Karma prepara y ejecuta las pruebas.
- Chrome o Edge Headless ejecuta las pruebas con un DOM real. MemoryRouter aísla la navegación; cleanup y localStorage.clear aíslan los casos.
- Hay 59 pruebas aprobadas. Mostrar las 10 numeradas de checkpoint.spec.jsx; la décima pulsa Añadir en una tarjeta real y verifica el carrito. Las otras 49 amplían navegación, permisos, CRUD, pagos y persistencia.
- Mostrar spyOn(window, confirm) en la prueba de borrado y spyOn(Date, now) en la compra. Explicar qué dependencia se controla y qué resultado se espera.
- Abrir coverage/html/index.html: 99,48 % de sentencias y 97,58 % de ramas. Explicar que se excluyen tests, dependencias y el archivo de arranque; un 100 % de líneas no garantiza ausencia de errores.

## 6. Cierre (1 min)

La solución cumple React, componentes, props, estados, Bootstrap, persistencia, flujos adicionales, Jasmine/Karma y documentación. Como siguiente evolución se puede sustituir `localStorage` por una API real sin rediseñar los componentes.

## Preparación individual

Cada integrante debe poder explicar la arquitectura, props, estado, Bootstrap y las pruebas, aunque haya trabajado principalmente en otro módulo. La rúbrica asigna 15 % al diseño, 20 % a componentes y responsividad, 15 % a la demostración de pruebas y 10 % al proceso de testeo.

Antes de exponer: ejecutar npm ci, npm run build y npm test; abrir la tienda con npm run dev. Tener a mano el repositorio público, ERS e informe. Mostrar en móvil y escritorio la navegación, formularios y tablas con desplazamiento horizontal propio.

Preguntas para ensayar: ¿por qué se usa useReducer?, ¿qué recibe ProductCard por props?, ¿qué cambia al pulsar Añadir?, ¿qué diferencia hay entre state y localStorage?, ¿qué controla cada spy?, ¿qué no prueba la cobertura?, ¿por qué la autenticación de esta maqueta no sustituye un backend seguro?
