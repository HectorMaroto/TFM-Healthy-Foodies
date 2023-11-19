const express = require('express');
const router = express.Router();

//Con esta ruta obtendremos una vista para cuando el usuario introduzca algun valor erroneo en un formulario
router.get('/errorPage', (req, res) => {
    res.render('errorPage');
})

router.get('/errorPageSign', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.sendFile('/TFM/src/views/errorPageLogin.hbs');
})

module.exports = router;