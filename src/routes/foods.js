// Aqui definiremos las rutas para la obtencion, creacion y eliminacion de productos
// de la lista de la compra personalizada de cada usuario

const express = require('express');
const pool = require('../DB-conn.js'); // Para las peticiones a la base de datos necesitaremos la pool creada
const router = express.Router();

// Obtenemos el listado de recetas
router.get('/', async (req, res) => {
    if (req.session.loggedin) {
        const list = await pool.query('SELECT * FROM alimentos WHERE idUsuario = ?', [req.session.user.id]);
        res.render('foods/foodList', { list });
    } else {
        res.redirect('/errorPageSign')
    }
})

router.post('/', async (req, res) => {
    if (req.session.loggedin) {
        const { nombre } = req.body;
        const newFood = {
            nombre,
            idUsuario: req.session.user.id
        }
        await pool.query('INSERT INTO alimentos SET ?', [newFood])
        res.redirect('/foods');
    } else {
        res.redirect('/errorPageSign')
    }
})

router.get('/delete/:id', async (req, res) => {
    if (req.session.loggedin) {
        const { id } = req.params;
        await pool.query('DELETE FROM alimentos WHERE id = ?', [id])
        res.redirect('/foods')
    } else {
        res.redirect('/errorPageSign')
    }
})

module.exports = router;