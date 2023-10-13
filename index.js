// Imports
// Importamos express para usarlo en nuestro proyecto
const express = require('express');
const morgan = require('morgan');
const recipes = require('./src/routes/recipes'); // Guardamos el router de las recetas
const users = require('./src/routes/recipes'); // Guardamos el router de los usuarios

// Conifguramos el puerto donde se ubicará nuestro servidor
// En caso de tener un valor 'nully' la variable de entorno del puerto, usaremos el puerto 1234 por defecto para nuestro servidor
const PORT = process.env.PORT ?? 1234;

// Cargamos el contenido del archivo .env que contiene las variables de entorno
require('dotenv').config() 
// Lo inicializamos
const app = express();

// Middlewares a usar durante el desarrollo:
app.use(express.json()); // Para parsear el body de las peticiones
app.use(morgan('dev')); // Obtenemos registros de las peticiones al servidor
app.use(express.urlencoded({ extended: false })); // Para aceptar los datos que me envien los usuarios desde un formulario
// Con extended: false solo aceptamos strings, numbers...

// Rutas
// Para la seccion de recetas
app.use('/recetas', recipes)
// Para la seccion de usuarios
app.use(users)

// Iniciamos la app con 'npm run start' (configurado como script de npm en package.json)
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})