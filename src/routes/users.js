const express = require("express");
const router = express.Router();
const { storeUser, loginUser, logout } = require("../controllers-login/login.js");

// Vista de registro de usuario
router.get("/signUp", (req, res) => {
    req.session.loggedin = false // Inicializamos siempre en false para que no esté iniciada la sesion
    res.setHeader("Content-Type", "text/html"); // Le decimos al navegador que tipo de lenguaje contiene el documento mediante una cabecera
    res.sendFile("/TFM/src/views/users/signUpPage.hbs"); // Enviamos al usuario la vista de inicio de sesión
});

// Vista de inicio de sesión
router.get("/login", (req, res) => {
    req.session.loggedin = false // Inicializamos siempre en false para que no esté iniciada la sesion
    res.setHeader("Content-Type", "text/html"); // Le decimos al navegador que tipo de lenguaje contiene el documento mediante una cabecera
    res.sendFile("/TFM/src/views/users/loginPage.hbs"); // Enviamos al usuario la vista de inicio de sesión
});

// Registramos usuario
router.post("/signUp/storeUser", storeUser);

//Inicio de sesion
router.post("/login/loginUser", loginUser);

// Cerrar sesión
router.get('/logout', logout)

module.exports = router;
