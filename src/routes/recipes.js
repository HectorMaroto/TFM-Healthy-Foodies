const express = require('express');
// Creamos un router para manejar las rutas al servidor
const router = express.Router();
const pool = require('../DB-conn.js'); // Para las peticiones a la base de datos necesitaremos la pool creada

//Obtener listado de recetas
router.get('/', async (req, res) => {
    
    const recetas = await pool.query('SELECT * FROM recetas');
    res.render('recipes/listRecipes', { recetas }); // Renderizamos la lista de de recetas y pasamos recetas a handlebars
})

//Obtener formulario de creacion de recetas
router.get('/addRecipe', (req, res) => { // Obtenemos la vista del formulario para añadir la pagina
    res.render('recipes/addRecipe') // Renderizamos la vista para el cliente
})

//Añadir receta
router.post('/addRecipe', async (req, res) => { //Usamos funcion asincrona porque no queremos que esto se ejecute al iniciar la app
    const { nombre, ingredientes, descripcion, minutos_preparacion } = req.body; // Extraemos el cuerpo de la peticion mandada por el formulario al añadir una nueva receta
    const newRecipe = { // Guardamos en un objeto los datos obtenidos del usuario
        nombre,
        ingredientes,
        descripcion,
        minutos_preparacion
    }
    await pool.query('INSERT INTO recetas SET ?', [newRecipe]); // Insertamos los datos en la base de datos
    res.redirect('/recipes') // Redirigmos automaticamente al usuario a nuestras recetas guardadas
})

//Obtener formulario para editar receta
router.get('/editRecipe/:id', async (req, res) => {
    const { id } = req.params; // Extraemos del query param de la url
    const recetas = await pool.query('SELECT * FROM recetas WHERE id = ?', [id]);// Obtenemos la receta que vamos a editar
    res.render('recipes/editRecipe', { receta: recetas[0] });// El cliente obtiene una vista con la receta a modificar, solo nos interesa el primer valor del array devuelto, por lo que solo le pasamos un objeto (receta)
})

//Editar receta
router.post('/editRecipe/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, ingredientes, descripcion, minutos_preparacion } = req.body;
    const updatedRecipe = {
        nombre,
        ingredientes,
        descripcion,
        minutos_preparacion
    }
    await pool.query('UPDATE recetas SET ?', [updatedRecipe, id]) // Actualizamos la receta en la BBDD
    res.redirect('/recipes');
})

//Eliminar receta
router.get('/deleteRecipe/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM recetas WHERE id = ?', [id]);
    res.redirect('/recipes')
})


module.exports = router;