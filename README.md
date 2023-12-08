# BackendMCGA
*El backend de MCGA es una aplicación Node.js basada en un comercio de repuestos que utiliza TypeScript para proporcionar una API RESTful. Aquí está una descripción detallada de los archivos y directorios más importantes:*

- ``backendMCGA/package.json``: Este archivo contiene la configuración del proyecto, incluyendo las dependencias y scripts necesarios para ejecutar y desarrollar la aplicación.

- ``backendMCGA/src/app.ts``: Este es el archivo principal de la aplicación que configura y lanza el servidor.

- ``backendMCGA/src/config.ts``: Este archivo contiene la configuración de la aplicación, como la cadena de conexión a la base de datos y las claves secretas.

- ``backendMCGA/src/controllers/auth.controller.ts``: Este archivo contiene el controlador para las operaciones de autenticación, como iniciar sesión y registrarse.

- ``backendMCGA/src/controllers/products.controller.ts``: Este archivo contiene el controlador para las operaciones de los productos, como obtener, crear, actualizar y eliminar productos.

- ``backendMCGA/src/db.ts``: Este archivo se encarga de la conexión con la base de datos.

- ``backendMCGA/src/libs/jwt.ts``: Este archivo contiene funciones para trabajar con tokens JWT (JSON Web Tokens), que se utilizan para la autenticación.

- ``backendMCGA/src/middleware/validator.middleware.ts``: Este middleware se utiliza para validar las solicitudes entrantes.

- ``backendMCGA/src/middleware/validateToken.ts``: Este middleware se utiliza para validar los tokens JWT de las solicitudes entrantes.

- ``backendMCGA/src/models/product.model.ts``: Este archivo define el modelo de datos para los productos.

- ``backendMCGA/src/models/user.model.ts``: Este archivo define el modelo de datos para los usuarios.

- ``backendMCGA/src/routes/products.routes.ts``: Este archivo define las rutas para las operaciones de los productos.

- ``backendMCGA/src/routes/auth.routes.ts``: Este archivo define las rutas para las operaciones de autenticación.

- ``backendMCGA/src/schemas/auth.schema.ts``: Este archivo define los esquemas de validación para las solicitudes de autenticación.

- ``backendMCGA/src/schemas/product.schema.ts``: Este archivo define los esquemas de validación para las solicitudes de productos.

## Dependencias
``` 
"bcryptjs": "^2.4.3",
"cookie-parser": "^1.4.6",
"cors": "^2.8.5",
"express": "^4.18.2",
"jsonwebtoken": "^9.0.2",
"mongodb": "^6.3.0",
"mongoose": "^8.0.1",
"morgan": "^1.10.0",
"zod": "^3.22.4"
```

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raíz del proyecto:
```npm install```

## Ejecución
Para iniciar el servidor en modo de desarrollo, ejecuta el siguiente comando:
```npm run dev```. 

## Características
- Autenticación: El proyecto utiliza un sistema de autenticación basado en JWT. Los tokens de autenticación se generan en el servidor y se envían al cliente.
- Gestión de productos: Los usuarios autenticados pueden crear, leer, actualizar y eliminar productos en la base de datos.
- Validación de esquemas: Los esquemas de los productos se validan utilizando [zod](https://zod.dev/).

## Tecnologias recomendadas para desarrollo
- Se recomienda usar la extension [ThunderClient](https://www.thunderclient.com/) en visualStudioCode para hacer peticiones a la API

- Se recomienda usar la extension [MongoDB](https://code.visualstudio.com/docs/azure/mongodb) en visualStudioCode para administrar y visualizar la base de datos

- Se recomienda usar [https://jwt.io/](https://jwt.io/) para comparar los id guardados en la base de datos mediante el token de JWT


# DOCUMENTACION DE LA API

## Documentación de la API

### REGISTRO

- **Endpoint:** ``/register``

- **Método:** ``POST``

- **Descripción:** Registra un nuevo usuario en el sistema.

**Cuerpo de la solicitud:**
```
{
  "username": "string",
  "password": "string"
}
```

- **Respuesta:** Un objeto JSON con los detalles del usuario registrado.

- **Controlador:** register

- **Validación:** Se utiliza el esquema registerSchema para validar el cuerpo de la solicitud.

### INICIO DE SESIÓN
- **Endpoint:** /login

- **Método:** POST

- **Descripción:** Inicia sesión con un usuario existente y devuelve un token de autenticación.

- **Cuerpo de la solicitud:**
```
{
  "username": "string",
  "password": "string"
}
```

- **Respuesta:** Un objeto JSON con los detalles del usuario y el token de autenticación.

- **Controlador:** login

- **Validación:** Se utiliza el esquema loginSchema para validar el cuerpo de la solicitud.

### CRUD
- **Endpoint:** /crud

- **Método:** GET

- **Descripción:** Obtiene los datos CRUD. Requiere autenticación.

- **Respuesta:** Un objeto JSON con los datos CRUD.

- **Controlador:** crud

- **Autenticación:** Se utiliza el middleware authRequired para verificar el token de autenticación.

### VERIFICACIÓN DE TOKEN
- **Endpoint**: /verify

- **Método:** GET

- **Descripción:** Verifica el token de autenticación y devuelve si es válido o no.

- **Respuesta:** Un objeto JSON que indica si el token es válido o no.

- **Controlador:** verifyToken

## RUTAS DE PRODUCTOS
- **Las rutas de productos se definen en products.routes.ts. Aquí se manejan todas las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) relacionadas con los productos.**

### Obtener todos los productos
- **Endpoint:** ``/products``

- **Método:** ``GET``

- **Descripción:** Obtiene una lista de todos los productos.

- **Controlador:** ``getProducts``

### Obtener un producto específico
- **Endpoint:** ``/products/:id``

- **Método:** ``GET``

- **Descripción:** Obtiene los detalles de un producto específico. Requiere autenticación.

- **Controlador:** ``getProduct``

- **Autenticación:** Se utiliza el middleware authRequired para verificar el token de autenticación.

### Crear un nuevo producto
- **Endpoint:** ``/products``

- **Método:** ``POST``

- **Descripción:** Crea un nuevo producto. Requiere autenticación.

- **Controlador:** ``createProduct``

- **Autenticación:** Se utiliza el middleware authRequired para verificar el token de autenticación.

- **Validación:** Se utiliza el middleware validateSchema con el esquema createProductSchema para validar el cuerpo de la solicitud.

### Eliminar un producto
- **Endpoint:** ``/products/:id``

- **Método:** ``DELETE``

- **Descripción:** Elimina un producto específico. Requiere autenticación.

- **Controlador:** ``deleteProduct``

- **Autenticación:** Se utiliza el middleware authRequired para verificar el token de autenticación.

### Actualizar un producto
- **Endpoint:** ``/products/:id``

- **Método:** ``PUT``

- **Descripción:** Actualiza los detalles de un producto específico. Requiere autenticación.

- **Controlador:** ``updateProduct``

- **Autenticación:** Se utiliza el middleware authRequired para verificar el token de autenticación.