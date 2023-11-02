const express = require('express');
const router = express.Router();

//Con esta ruta obtendremos una vista para cuando el usuario introduzca algun valor erroneo en un formulario
router.get('/errorPage', (req, res) => {
    res.render('errorPage');
})

module.exports = router;