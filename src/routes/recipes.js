const express = require('express');
// Creamos un router para manejar las rutas al servidor
const router = express.Router();
const pool = require('../DB-conn.js'); // Para las peticiones a la base de datos necesitaremos la pool creada
const { validatePartialRecipe, validateRecipe } = require('../validations/recipeSchema.js');

//Obtener listado de recetas
router.get('/', async (req, res) => {
    if (req.session.loggedin) { // Tenemos que estar autenticados
        //Obtenemos las recetas segun cada usuario
        const recetas = await pool.query('SELECT * FROM recetas WHERE idUsuario = ?', [req.session.user.id]);
        res.render('recipes/listRecipes', { recetas }); // Renderizamos la lista de de recetas y pasamos recetas a handlebars
    } else {
        res.redirect('/errorPageSign');
    }
})

//Obtener formulario de creacion de recetas
router.get('/addRecipe', (req, res) => { // Obtenemos la vista del formulario para añadir la pagina
    if (req.session.loggedin) { // Tenemos que estar autenticados
        res.render('recipes/addRecipe') // Renderizamos la vista para el cliente
    } else {
        res.redirect('/errorPageSign');
    }
})

//Añadir receta
router.post('/addRecipe', async (req, res) => {
    const { nombre, ingredientes, descripcion } = req.body; // Extraemos el cuerpo de la peticion mandada por el formulario al añadir una nueva receta
    let { minutos_preparacion } = req.body
    minutos_preparacion = Number.parseInt(minutos_preparacion);
    const newRecipe = {
        // Guardamos en un objeto los datos obtenidos del usuario
        nombre,
        ingredientes,
        descripcion,
        minutos_preparacion,
        idUsuario: req.session.user.id
    };
    //Validamos que los datos introducidos son correctos
    const result = validateRecipe(newRecipe);
    if (result.error) { // Caso de validacion erronea -> redirigimos a la pagina de error
        res.redirect('/errorPage')
    } else {
        await pool.query("INSERT INTO recetas SET ?", [result.data]); // Insertamos los datos en la base de datos el objeto data validado correctamente
        res.redirect("/recipes"); // Redirigmos automaticamente al usuario a nuestras recetas guardadas
    }
})

//Obtener formulario para editar receta
router.get('/editRecipe/:id', async (req, res) => {
    if (req.session.loggedin) { // Tenemos que estar autenticados
        const { id } = req.params; // Extraemos del query param de la url
        const recetas = await pool.query('SELECT * FROM recetas WHERE id = ?', [id]);// Obtenemos la receta que vamos a editar
        res.render('recipes/editRecipe', { receta: recetas[0] });// El cliente obtiene una vista con la receta a modificar, solo nos interesa el primer valor del array devuelto, por lo que solo le pasamos un objeto (receta)
    }
})

//Editar receta
router.post('/editRecipe/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, ingredientes, descripcion } = req.body;
    let { minutos_preparacion } = req.body;
    minutos_preparacion = Number.parseInt(minutos_preparacion);
    const updatedRecipe = {
        nombre,
        ingredientes,
        descripcion,
        minutos_preparacion,
    };
    //Validamos que los datos introducidos son correctos
    const result = validatePartialRecipe(updatedRecipe);
    if (result.error) {
        res.redirect("/errorPage");
    } else {
        await pool.query("UPDATE recetas SET ? WHERE id = ?", [result.data, id]); // Actualizamos la receta en la BBDD
        res.redirect("/recipes");
    }
})

//Eliminar receta
router.get('/deleteRecipe/:id', async (req, res) => {
    if (req.session.loggedin) { // Tenemos que estar autenticados
        const { id } = req.params;
        await pool.query('DELETE FROM recetas WHERE id = ?', [id]);
        res.redirect('/recipes')
    } else {
        res.redirect('/errorPageSign')
    }
    
})


module.exports = router;