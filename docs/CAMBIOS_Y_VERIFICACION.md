# Correcciones de la entrega

Se mantiene la tienda, su diseño y sus secciones. Los cambios completan el ERS y corrigen los fallos detectados durante la revisión.

- Usuarios: creación, edición y eliminación desde administración; correo único, validación y persistencia. La cuenta activa no puede eliminarse ni cambiar su propio perfil desde ese formulario.
- Pedidos: Administrador y Vendedor pueden actualizar y conservar el estado de cada orden.
- Productos y carrito: validación de códigos duplicados, cantidades enteras y límites de stock; compra deshabilitada cuando no hay existencias.
- Checkout: comprobante visible después de vaciar el carrito; reintento conserva entrega y carrito; el número de tarjeta no se almacena en el pedido.
- Rutas: los recursos compilados se cargan desde la raíz para que recargar una ruta anidada no deje la página en blanco.
- Diseño: corrección del espacio lateral en detalle de producto móvil y contraste del texto de ayuda. No se rediseñó la web.
- Testing: se conservan los diez casos base y se incorporan 49 de regresión. El caso de clic usa ProductCard y CartPage reales.
- Cobertura: 20 archivos de aplicación; se excluyen tests, dependencias y arranque. El reporte identifica los casos no cubiertos.
- Documentación: ERS, informe, instrucciones de ejecución, guion individual y anexo de casos actualizados. npm y pnpm tienen archivos de bloqueo para reproducibilidad.

## Verificación realizada

- 59 pruebas aprobadas con Jasmine 7.0.2, Karma 6.4.4 y Edge Headless 154, el 6 de octubre de 2026.
- Compilación final con Vite 8.3.3: correcta, 46 módulos, el 8 de octubre de 2026.
- Navegador sobre la versión compilada: creación, edición, recarga y eliminación de usuario; cambio de estado de orden y persistencia; compra simulada aprobada y comprobante.
- Portada, catálogo, detalle de producto, usuarios y órdenes revisados a 390, 768 y 1366 px. El detalle móvil se corrigió y volvió a comprobar; checkout también revisado a 390 px.
- Documentos revisados en vista previa local de DOCX. No hay Word o LibreOffice disponibles para certificar su paginación nativa; comprobar el salto de páginas al abrirlos en Word antes de entregarlos.

## Pendientes externos a los archivos

La pauta también requiere el enlace público de GitHub y la presentación individual. No se ha publicado un repositorio ni realizado la exposición. El ZIP no sustituye estos requisitos y los porcentajes de cobertura no garantizan una nota.

## Ejecución

Extraer el ZIP, abrir PowerShell dentro de checkpoint-games-react y ejecutar por separado:

```powershell
npm.cmd ci
npm.cmd run dev
```

Abrir la dirección que muestra la terminal. Para evaluar:

```powershell
npm.cmd run build
npm.cmd test
```
