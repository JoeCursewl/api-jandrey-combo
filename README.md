## API RESTful para gestión de productos con Express

Introducción
Esta API RESTful, construida con el framework Express.js de Node.js, permite gestionar productos en un sistema de inventario. Implementa las operaciones básicas CRUD (Crear, Leer, Actualizar y Eliminar) para productos.

Tecnologías utilizadas
Express.js: Un framework web popular para Node.js que facilita la creación de APIs RESTful.
MongoDB: Una base de datos NoSQL flexible y escalable que almacena los datos de productos.
Estructura de la API
La API se organiza en rutas, cada una representando un recurso específico (por ejemplo, productos). Las rutas se mapean a métodos HTTP estándar (GET, POST, PUT, DELETE) para realizar las operaciones CRUD.

Recursos
Productos:
/productos/: Obtiene una lista de todos los productos.
/productos/:id: Obtiene un producto específico por su ID.
/productos/: Crea un nuevo producto.
/productos/:id: Actualiza un producto existente.
/productos/:id: Elimina un producto.
