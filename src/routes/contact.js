const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('contact/contact')
    } else {
        res.redirect('/errorPageSign')
    }
})

module.exports = router