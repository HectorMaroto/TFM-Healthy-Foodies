// Imports
// Importamos express para usarlo en nuestro proyecto
const express = require('express');
const app = express(); // Inicializamos express
const morgan = require('morgan');
const recipes = require('./routes/recipes.js'); // Guardamos el router de las recetas
const users = require('./routes/users.js'); // Guardamos el router de los usuarios
const path = require('node:path'); // Para trabajar con las rutas de las carpetas de la aplicacion
const { engine } = require('express-handlebars'); // Importamos el motor de handlebars
const home = require('./routes/home');
const errorRouter = require('./routes/error.js');
const foods = require('./routes/foods.js');
const imc = require('./routes/imc.js');
const session = require('express-session');

// Desactivamos esta cabecera de Express por temas de seguridad
// Porque proporciona información acerca de la versión que estás utilizando de Express
// Y podrían realizar ataques dedicados a Express
app.disable('x-powered-by')

//Configuramos handlebars como motor de vistas para la aplicacion
app.set('views', path.join(__dirname, 'views')) //Ubicacion de la carpeta views
app.engine('.hbs', engine({
    defaultLayout: 'main', // Nombre de la vista principal
    layoutsDir: path.join(app.get('views'), 'layouts'), //Ubicacion de la vista principal
    partialsDir: path.join(app.get('views'), 'partials'), //Ubicacion de los elementos de la vista comunes (nav, footer)
    extname: '.hbs' // Extension de las vistas
}))
app.set('view engine', '.hbs'); // Establecemos como motor de vistas a handlebars

// Con express-session determinamos cuando un usuario ha iniciado sesion y tiene acceso a rutas
app.use(session({ 
    secret: 'aplicacionHealthyFoods',
    resave: false,
    saveUninitialized: false,
}))


// Cargamos el contenido del archivo .env que contiene las variables de entorno
require('dotenv').config() 


// Conifguramos el puerto donde se ubicará nuestro servidor
// En caso de tener un valor 'nully' la variable de entorno del puerto, usaremos el puerto 1234 por defecto para nuestro servidor
const PORT = process.env.PORT ?? 1234;


// Middlewares a usar durante el desarrollo:
app.use(express.json()); // Para parsear el body de las peticiones
app.use(morgan('dev')); // Obtenemos logs de las peticiones al servidor
app.use(express.urlencoded({ extended: false })); // Para aceptar los datos que me envien los usuarios desde un formulario
// Con extended: false solo aceptamos strings, numbers...


// Rutas
// Para la seccion de recetas
app.use('/recipes', recipes)
// Para las rutas de usuarios
app.use('/', users)
// Pagina de inicio
app.use('/home', home);
// Pagina de error
app.use('/', errorRouter);
// Pagina lista de la compra
app.use('/foods', foods);
// Pagina calculadora IMC
app.use('/imc-calculator', imc);
// Página de contacta con nosotros
// app.use('/contact-us');

//Carpeta Public para archivos estaticos como estilos, imagenes, scripts... Dejamos definida sus ubicacion con path.join
app.use(express.static(path.join(__dirname, 'public')))

// Iniciamos el servidor de la app con 'npm run start' (configurado como script de npm en package.json)
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/signUp`);
})