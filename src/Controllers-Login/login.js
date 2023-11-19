//Importamos el paquete bcrypt para hashear las contraseñas al guardarlas en base de datos
const bcrypt = require("bcrypt");
const { validateSign, validateLogin } = require("../validations/userSchema.js");
const pool = require("../DB-conn.js");

function storeUser(req, res) {
  let { password } = req.body;
  const { nombre, apellidos, email } = req.body;
  pool.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, userData) => {
      if (userData.length > 0) {
        // Si hay alguna coincidencia de email, nos devuelve a la error Page
        res.redirect("/errorPageSign");
      } else {
        bcrypt.hash(password, 12).then((hash) => {
          // Hasheamos la contraseña para proteger los datos
          const newUser = {
            nombre,
            apellidos,
            email,
            password,
          };
          const result = validateSign(newUser);
          if (result.error) {
            res.redirect("/errorPageSign");
          } else {
            result.data.password = hash; // Guardamos la password hasheada previamente validada
            pool.query("INSERT INTO usuarios SET ?", [result.data]);
            res.redirect("/login");
          }
        });
      }
    }
  );
}

function loginUser(req, res) {
  let { password } = req.body;
  const { email } = req.body;
  const userLogged = {
    password,
    email,
  };
  const result = validateLogin(userLogged);
  if (result.error) {
    res.redirect("/errorPageSign");
  } else {
    pool.query("SELECT * FROM usuarios WHERE email = ?", [result.data.email], (err, userData) => {
      if (userData.length > 0) {
        // Si hay alguna coincidencia de email y pass, iniciamos sesion en la app
        userData.forEach((el) => {
          bcrypt.compare(result.data.password, el.password, (err, isMatch) => {
              if (!isMatch) {
                res.redirect("/errorPageSign");
              } else {
                req.session.loggedin = true; // Creamos una sesion al estar loggeados
              }
              if (req.session.loggedin) {
                res.redirect("/recipes");
              }
            }
          );
        });
      } else {
        res.redirect("/errorPageSign");
      }
    });
  }
}

function logout(req, res) {
  if (req.session.loggedin) {
    req.session.destroy(); // Cerramos la sesion
  }
    res.redirect('/login')
}

module.exports = {
  storeUser,
  loginUser,
  logout
}
