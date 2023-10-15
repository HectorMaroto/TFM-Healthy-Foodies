const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => {
//     res.redirect('/home')
// })

router.get('/', (req, res) => {
    res.send('Pagina HOME')
})

module.exports = router;