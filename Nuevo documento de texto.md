Módulo 1: Gestión de Usuarios y Autenticación
RF1.1: Registro de Usuarios: El sistema DEBE permitir a un usuario administrador registrarse para crear una cuenta inicial del negocio.
RF1.2: Inicio de Sesión (Login): El sistema DEBE permitir a los usuarios autenticarse utilizando credenciales (ej. email/nombre de usuario y contraseña).
RF1.3: Gestión de Sesiones: El sistema DEBE mantener la sesión del usuario activa mientras este interactúa con la aplicación.
RF1.4: Cierre de Sesión (Logout): El sistema DEBE permitir a los usuarios cerrar su sesión de forma segura.
RF1.5: Recuperación de Contraseña (Opcional, pero recomendado): El sistema PODRÍA permitir a los usuarios restablecer su contraseña en caso de olvido (ej. vía email).

Módulo 2: Gestión de Productos
RF2.1: Registro de Productos: El sistema DEBE permitir al administrador registrar nuevos productos con la siguiente información:
Nombre del producto (obligatorio)
Descripción (opcional)
Precio de venta (obligatorio)
Stock actual (obligatorio)
RF2.2: Visualización de Productos: El sistema DEBE permitir al administrador ver un listado de todos los productos registrados, con opción a paginación y ordenamiento.
RF2.3: Edición de Productos: El sistema DEBE permitir al administrador modificar la información de un producto existente.
RF2.4: Eliminación de Productos: El sistema DEBE permitir al administrador eliminar un producto
RF2.5: Búsqueda de Productos: El sistema DEBE permitir al administrador buscar productos por nombre 
RF2.6: Actualización de Stock: El sistema DEBE actualizar automáticamente el stock del producto al registrar una venta o una devolución.
Módulo 3: Gestión de Clientes
RF3.1: Registro de Clientes: El sistema DEBE permitir al administrador registrar nuevos clientes con la siguiente información:
Nombre completo (obligatorio)
Número de identificación (ej. DNI, C.C., NIT) (opcional)
Dirección (opcional)
Teléfono (obligatorio)
Correo electrónico (opcional)
RF3.2: Visualización de Clientes: El sistema DEBE permitir al administrador ver un listado de todos los clientes registrados, con opción a paginación y ordenamiento.
RF3.3: Edición de Clientes: El sistema DEBE permitir al administrador modificar la información de un cliente existente.
RF3.4: Eliminación de Clientes: El sistema DEBE permitir al administrador eliminar un cliente (considerar validación si el cliente está asociado a ventas existentes).
RF3.5: Búsqueda de Clientes: El sistema DEBE permitir al administrador buscar clientes por nombre o número de identificación.

Módulo 4: Gestión de Ventas
RF4.1: Registro de Ventas: El sistema DEBE permitir al administrador registrar una nueva venta, asociándola a un cliente (existente o nuevo) y a uno o varios productos. La venta debe incluir:
Fecha de la venta (automática)
Cliente (obligatorio, puede ser "cliente general" si no se quiere registrar)
Lista de productos vendidos (obligatorio, con cantidad por producto)
Precio total de la venta (calculado automáticamente)
Notas adicionales (opcional)
RF4.2: Visualización de Ventas: El sistema DEBE permitir al administrador ver un listado de todas las ventas realizadas, con opción a paginación y ordenamiento por fecha.
RF4.3: Detalles de la Venta: El sistema DEBE permitir al administrador ver los detalles completos de una venta específica, incluyendo los productos y cantidades.
RF4.4: Búsqueda y Filtrado de Ventas: El sistema DEBE permitir buscar ventas por cliente, fecha, o rango de fechas.
RF4.5: Cancelación/Devolución de Ventas (Opcional): El sistema PODRÍA permitir la cancelación de una venta o el registro de una devolución de productos, lo que DEBE ajustar el stock correspondiente.

Módulo 5: Informes Básicos (Opcional, pero muy útil para el negocio)
RF5.1: Informe de Ventas por Período: El sistema PODRÍA generar un informe de ventas totales dentro de un rango de fechas.
RF5.2: Productos más Vendidos: El sistema PODRÍA mostrar un listado de los productos más vendidos en un período determinado.
RF5.3: Clientes con más Compras: El sistema PODRÍA identificar a los clientes con el mayor volumen de compras.