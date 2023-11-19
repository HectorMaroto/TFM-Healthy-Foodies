// Aqui definiremos las rutas para la obtencion, creacion y eliminacion de productos
// de la lista de la compra personalizada de cada usuario

const express = require('express');
const pool = require('../DB-conn.js'); // Para las peticiones a la base de datos necesitaremos la pool creada
const router = express.Router();

// Obtenemos el listado de recetas
router.get('/', async (req, res) => {
    const listaAlimentos = await pool.query('SELECT * FROM alimentos');
    res.render('foods/foodList', { listaAlimentos });
})


module.exports = router;