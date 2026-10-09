# Checkpoint Games - Evaluación Parcial 2

Migración profesional de la tienda a **React**, con componentes reutilizables, React Router, estado global persistente, Bootstrap 5 y pruebas unitarias con Jasmine + Karma.

## Requisitos cubiertos

- React con arquitectura por componentes y responsabilidad única.
- Props en tarjetas, encabezados y tablas; estado en filtros, formularios, checkout y contexto global.
- Bootstrap 5 más diseño responsivo propio para móvil, tablet y escritorio.
- Fuente de datos simulada y CRUD persistente en `localStorage`.
- Rutas públicas: inicio, catálogo, categorías, ofertas, detalle, carrito, checkout, pago exitoso/fallido, acceso, registro, nosotros y contacto.
- Panel por roles: Administrador y Vendedor; CRUD de productos y usuarios restringido al Administrador; ambos roles actualizan estados de pedidos.
- 59 pruebas Jasmine/Karma: 10 casos base y 49 adicionales de componentes, navegación, permisos, formularios, CRUD, pagos y persistencia.
- Reporte HTML y resumen de cobertura en `coverage/` después de ejecutar pruebas.

## Instalación y ejecución

Instalar Node.js LTS (22.12 o posterior; verificado con 24.19). Extraer el ZIP y abrir la terminal dentro de `checkpoint-games-react`, donde está `package.json`. En PowerShell, si `npm` está bloqueado, usar `npm.cmd` en los comandos.

```bash
npm ci
npm run dev
```

Abrir la URL indicada por Vite, normalmente `http://localhost:4173`. Mantener la terminal abierta. No abrir `index.html` con doble clic.

Para comprobar la versión compilada:

```bash
npm run build
npm run preview
```

La aplicación usa BrowserRouter y se sirve desde la raíz del sitio (`base: /`). Un hosting debe redirigir las rutas de la aplicación a `index.html`. El servidor preview de Vite ya lo hace.

## Pruebas y cobertura

```bash
npm test
```

Karma ejecuta las pruebas Jasmine en Chrome o Edge Headless y genera. En Windows detecta el ejecutable; en otras ubicaciones definir `CHROME_BIN`:

- resumen de cobertura en consola;
- `coverage/coverage-summary.json` y `coverage/coverage-final.json`;
- `coverage/test-results.json` con cada caso;
- reporte navegable en `coverage/html/index.html`.

Resultado verificado: **59/59 pruebas aprobadas**, 99,48 % de sentencias, 97,58 % de ramas y 100 % de funciones y líneas instrumentadas.

La medición incluye 20 archivos de aplicación y excluye los tests, las dependencias y `main.jsx` (arranque y CSS). Ver `docs/CASOS_PRUEBA.md`. Los umbrales del proyecto son 95 % de sentencias, funciones y líneas, y 90 % de ramas; la pauta no fija un mínimo porcentual.

## Documentación de entrega

- `docs/ERS_Checkpoint_Games_V2.docx`
- `docs/Informe_Pruebas_Cobertura_Checkpoint_Games.docx`

## Usuarios de demostración

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@duoc.cl` | `admin1` |
| Vendedor | `vendedor@duoc.cl` | `venta1` |
| Cliente | `cliente@gmail.com` | `user1` |

## Pago de demostración

- Cualquier número de 16 dígitos produce una compra exitosa.
- Un número terminado en `0000` simula un pago rechazado.
- Nunca utilizar datos bancarios reales. El número de tarjeta no se guarda en el pedido.
- Al rechazar un pago se conservan carrito y datos de entrega para reintentar.
- Autenticación, pedidos y contacto son simulaciones frontend; no hay backend ni cobro o envío de correo real.

## Estructura principal

```text
src/
  components/    Componentes reutilizables y rutas protegidas
  data/          Datos simulados de productos, usuarios y órdenes
  pages/         Vistas públicas y administrativas
  store/         Estado global, persistencia y operaciones CRUD
  utils/         Filtros, totales, validación y creación de órdenes
  checkpoint.spec.jsx   10 casos base
  application.spec.jsx  49 casos adicionales
```

## Equipo

- Maximiliano Cifuentes: coordinación, catálogo, carrito y documentación.
- Maximiliano Díaz: formularios, validaciones y gestión de usuarios.
- Martín Troncoso: panel administrativo, diseño responsivo y pruebas.

## Entrega y repositorio

La pauta exige: enlace público de GitHub, proyecto comprimido, ERS e informe de cobertura. El ZIP incluye código, dist, pruebas, cobertura y documentos; no incluye node_modules. La publicación del repositorio debe realizarse en la cuenta del equipo. No confundir un archivo ZIP local con un repositorio público.

No se requiere GitHub Pages en esta pauta. La presentación individual representa el 60 % de la evaluación; el encargo representa el 40 %. Consultar PRESENTACION.md para la demostración.
