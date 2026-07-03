[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/TtvV9QYs)
# Ejercitación: CRUD en MongoDB con Mongoose

En esta ejercitación, aprenderás a interactuar con MongoDB utilizando la librería **Mongoose**, un ODM (Object Data Modeling) popular en el ecosistema Node.js. Implementarás un servidor Express con las operaciones CRUD completas para administrar una colección de equipos.

## Requisitos previos

- Una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) con tu IP habilitada para conectarse.
- Opcionalmente, haber completado la importación del archivo `world-cup.json` en la base de datos `MundialDB`, colección `equipos`, o dejar que la base de datos se vaya llenando conforme pruebes el endpoint POST.

## Instalación y Configuración

1. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

2. Configura tus variables de entorno:
   - Duplica el archivo `.env.example` y renómbralo a `.env`.
   - Reemplaza `<usuario>`, `<password>`, `<cluster>`, y `<NombreApp>` por los datos reales de tu conexión a MongoDB Atlas. **Asegúrate de agregar `/MundialDB` al final de la URL si no está presente.**

3. Levanta el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## Tareas a realizar

1. **Configurar Mongoose en `src/mongoose.js`**:
   - Completa la función `connectDB` utilizando `mongoose.connect()`.
   - Define el `equipoSchema` con las validaciones correctas (tipos `String` y `Number`, marcándolos como `required: true`).
   - Compila y exporta el modelo `Equipo`.

2. Abre el archivo `server.js`. Allí encontrarás nuevos comentarios `TODO` que indican dónde debes codificar para implementar el CRUD utilizando Mongoose:

   - **Endpoint `GET /equipos`**:
     - Utiliza `Equipo.find()` para obtener todos los documentos.

   - **Endpoint `GET /equipos/buscar`**:
     - Utiliza `Equipo.find()` pasando una expresión regular en el filtro para buscar equipos por técnico de forma case-insensitive.

   - **Endpoint `GET /equipos/:id`**:
     - Valida el ID recibido y utiliza `Equipo.findById()`.

   - **Endpoint `POST /equipos`**:
     - Instancia un nuevo `Equipo` y utiliza `.save()`, o utiliza directamente `Equipo.create()`. Mongoose validará automáticamente los tipos. Atrapa cualquier error y retorna status 400 en caso de fallo.

   - **Endpoint `PUT /equipos/:id`**:
     - Utiliza `Equipo.findByIdAndUpdate()` para modificar el documento. Recuerda usar `{ new: true, runValidators: true }` para obtener el documento actualizado y aplicar validaciones.

   - **Endpoint `DELETE /equipos/:id`**:
     - Utiliza `Equipo.findByIdAndDelete()` para eliminar el documento.

## Pruebas

Se incluyen pruebas automatizadas con Jest. Puedes ejecutar todas las pruebas con el siguiente comando:

```bash
npm test
```

Asegúrate de que todas las pruebas pasen (aparezcan en verde) antes de realizar tu entrega. También puedes probar manualmente los endpoints utilizando el archivo `api.http` con la extensión REST Client.
