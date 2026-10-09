# Casos de prueba y resultados

Ejecución verificada: 6 de octubre de 2026. Jasmine y Karma, Microsoft Edge Headless 154.
Resultado: **59 aprobados, 0 fallidos, 0 omitidos**. Cada descripción indica el comportamiento esperado; las aserciones ejecutables están en los archivos `.spec.jsx`.

| ID | Grupo | Caso y resultado esperado | Resultado |
|---|---|---|---|
| AUTO-01 | Acceso y roles | el vendedor consulta productos sin acciones de modificaciÃ³n | Aprobado |
| AUTO-02 | Acceso y roles | impide al cliente acceder al panel | Aprobado |
| AUTO-03 | Acceso y roles | impide al vendedor acceder a usuarios o crear productos | Aprobado |
| AUTO-04 | Acceso y roles | rechaza credenciales incorrectas y permite iniciar y cerrar sesiÃ³n | Aprobado |
| AUTO-05 | Acceso y roles | redirige a login cuando no existe sesiÃ³n | Aprobado |
| AUTO-06 | Acceso y roles | redirige login cuando Administrador ya tiene sesiÃ³n | Aprobado |
| AUTO-07 | Acceso y roles | redirige login cuando Cliente ya tiene sesiÃ³n | Aprobado |
| AUTO-08 | Acceso y roles | registra al cliente, evita duplicados y valida campos | Aprobado |
| AUTO-09 | AdministraciÃ³n de productos | crea, edita y elimina un producto y respeta la cancelaciÃ³n | Aprobado |
| AUTO-10 | AdministraciÃ³n de productos | deshabilita la compra y el incremento cuando el producto no tiene stock | Aprobado |
| AUTO-11 | AdministraciÃ³n de productos | muestra el detalle administrativo para Administrador | Aprobado |
| AUTO-12 | AdministraciÃ³n de productos | muestra el detalle administrativo para Vendedor | Aprobado |
| AUTO-13 | AdministraciÃ³n de productos | muestra producto administrativo no encontrado | Aprobado |
| AUTO-14 | AdministraciÃ³n de productos | muestra resumen sin alertas cuando no hay stock crÃ­tico | Aprobado |
| AUTO-15 | AdministraciÃ³n de productos | no guarda productos sin cÃ³digo o con stock negativo | Aprobado |
| AUTO-16 | AdministraciÃ³n de productos | permite cancelar la ediciÃ³n sin guardar cambios | Aprobado |
| AUTO-17 | AdministraciÃ³n de productos | rechaza cÃ³digos de producto duplicados sin distinguir mayÃºsculas | Aprobado |
| AUTO-18 | AdministraciÃ³n de usuarios y Ã³rdenes | Administrador actualiza una orden y mantiene el cambio al recargar | Aprobado |
| AUTO-19 | AdministraciÃ³n de usuarios y Ã³rdenes | Vendedor actualiza una orden y mantiene el cambio al recargar | Aprobado |
| AUTO-20 | AdministraciÃ³n de usuarios y Ã³rdenes | crea, edita, persiste y elimina un usuario con confirmaciÃ³n | Aprobado |
| AUTO-21 | AdministraciÃ³n de usuarios y Ã³rdenes | protege la cuenta activa y sincroniza su nombre con la sesiÃ³n | Aprobado |
| AUTO-22 | AdministraciÃ³n de usuarios y Ã³rdenes | valida usuario vacÃ­o y correo duplicado y permite cancelar | Aprobado |
| AUTO-23 | Checkout y persistencia | limpia comuna al cambiar regiÃ³n | Aprobado |
| AUTO-24 | Checkout y persistencia | rechaza pago de prueba y conserva el carrito para reintentar | Aprobado |
| AUTO-25 | Checkout y persistencia | recupera los datos semilla cuando localStorage contiene JSON invÃ¡lido | Aprobado |
| AUTO-26 | Checkout y persistencia | redirige al carrito cuando checkout estÃ¡ vacÃ­o | Aprobado |
| AUTO-27 | Checkout y persistencia | valida checkout y crea un pedido aprobado vaciando el carrito | Aprobado |
| AUTO-28 | Checkpoint Games - cobertura unitaria de componentes y lÃ³gica | 1. renderiza un ProductCard con las props recibidas | Aprobado |
| AUTO-29 | Checkpoint Games - cobertura unitaria de componentes y lÃ³gica | 10. reacciona a un evento y actualiza el estado del componente | Aprobado |
| AUTO-30 | Checkpoint Games - cobertura unitaria de componentes y lÃ³gica | 2. realiza renderizado condicional de la etiqueta de descuento | Aprobado |
| AUTO-31 | Checkpoint Games - cobertura unitaria de componentes y lÃ³gica | 3. formatea productos gratuitos de forma comprensible | Aprobado |
| AUTO-32 | Checkpoint Games - cobertura unitaria de componentes y lÃ³gica | 4. filtra productos por texto y categorÃ­a | Aprobado |
| AUTO-33 | Checkpoint Games - cobertura unitaria de componentes y lÃ³gica | 5. calcula subtotal, despacho y total del carrito | Aprobado |
| AUTO-34 | Checkpoint Games - cobertura unitaria de componentes y lÃ³gica | 6. informa errores en un checkout incompleto | Aprobado |
| AUTO-35 | Checkpoint Games - cobertura unitaria de componentes y lÃ³gica | 7. acepta un checkout con datos vÃ¡lidos | Aprobado |
| AUTO-36 | Checkpoint Games - cobertura unitaria de componentes y lÃ³gica | 8. actualiza el estado al aÃ±adir un producto al carrito | Aprobado |
| AUTO-37 | Checkpoint Games - cobertura unitaria de componentes y lÃ³gica | 9. elimina un producto mediante la operaciÃ³n CRUD del reducer | Aprobado |
| AUTO-38 | PÃ¡ginas y navegaciÃ³n de la tienda | aÃ±ade desde detalle y permite cambiar y eliminar cantidades | Aprobado |
| AUTO-39 | PÃ¡ginas y navegaciÃ³n de la tienda | envÃ­a el formulario de contacto simulado y limpia el mensaje | Aprobado |
| AUTO-40 | PÃ¡ginas y navegaciÃ³n de la tienda | filtra el catÃ¡logo, muestra estado vacÃ­o y permite limpiar | Aprobado |
| AUTO-41 | PÃ¡ginas y navegaciÃ³n de la tienda | mantiene la categorÃ­a al navegar desde categorÃ­as | Aprobado |
| AUTO-42 | PÃ¡ginas y navegaciÃ³n de la tienda | muestra Ãºnicamente productos rebajados en ofertas | Aprobado |
| AUTO-43 | PÃ¡ginas y navegaciÃ³n de la tienda | renderiza / con su encabezado | Aprobado |
| AUTO-44 | PÃ¡ginas y navegaciÃ³n de la tienda | renderiza /carrito con su encabezado | Aprobado |
| AUTO-45 | PÃ¡ginas y navegaciÃ³n de la tienda | renderiza /catalogo con su encabezado | Aprobado |
| AUTO-46 | PÃ¡ginas y navegaciÃ³n de la tienda | renderiza /categorias con su encabezado | Aprobado |
| AUTO-47 | PÃ¡ginas y navegaciÃ³n de la tienda | renderiza /contacto con su encabezado | Aprobado |
| AUTO-48 | PÃ¡ginas y navegaciÃ³n de la tienda | renderiza /desconocida con su encabezado | Aprobado |
| AUTO-49 | PÃ¡ginas y navegaciÃ³n de la tienda | renderiza /nosotros con su encabezado | Aprobado |
| AUTO-50 | PÃ¡ginas y navegaciÃ³n de la tienda | renderiza /ofertas con su encabezado | Aprobado |
| AUTO-51 | PÃ¡ginas y navegaciÃ³n de la tienda | renderiza /pago/error con su encabezado | Aprobado |
| AUTO-52 | PÃ¡ginas y navegaciÃ³n de la tienda | renderiza /producto/1 con su encabezado | Aprobado |
| AUTO-53 | PÃ¡ginas y navegaciÃ³n de la tienda | renderiza /producto/9999 con su encabezado | Aprobado |
| AUTO-54 | Reglas de negocio y lÃ­mites del estado | acumula carrito sin superar stock ni aceptar productos inexistentes | Aprobado |
| AUTO-55 | Reglas de negocio y lÃ­mites del estado | calcula envÃ­o gratis en carrito vacÃ­o o subtotal de al menos 50000 | Aprobado |
| AUTO-56 | Reglas de negocio y lÃ­mites del estado | cierra la sesiÃ³n si se elimina el usuario activo | Aprobado |
| AUTO-57 | Reglas de negocio y lÃ­mites del estado | elimina cantidades cero, vacÃ­a carrito y conserva acciones desconocidas | Aprobado |
| AUTO-58 | Reglas de negocio y lÃ­mites del estado | filtra texto sin distinguir mayÃºsculas y filtra ofertas | Aprobado |
| AUTO-59 | Reglas de negocio y lÃ­mites del estado | rechaza cantidades invÃ¡lidas y superiores al stock al modificar el carrito | Aprobado |

## Alcance de la cobertura

Incluye los 20 archivos de lógica de aplicación: App, páginas, componentes, datos, contexto y utilidades. Excluye los archivos de pruebas, node_modules y main.jsx (arranque e importaciones de CSS, verificados con compilación y navegador).

| Métrica | Cubierto / total | Porcentaje |
|---|---:|---:|
| Sentencias | 383 / 385 | 99.48 % |
| Ramas | 283 / 290 | 97.58 % |
| Funciones | 148 / 148 | 100 % |
| Líneas | 234 / 234 | 100 % |

Umbrales de regresión del proyecto: 95 % de sentencias, funciones y líneas; 90 % de ramas. Son controles del proyecto, no porcentajes mínimos establecidos por la pauta.

## Diez casos para la demostración

Los diez casos numerados de `src/checkpoint.spec.jsx` se conservan como base de exposición. El caso 10 pulsa Añadir en ProductCard y comprueba CartPage y localStorage. Los mocks de confirmación y reloj se demuestran con los casos complementarios de `src/application.spec.jsx`.
