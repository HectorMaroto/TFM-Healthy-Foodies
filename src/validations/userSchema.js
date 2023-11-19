// Importamos la libreria zod para validar los datos de entrada del usuario en los formularios
const z = require('zod');

// Aqui crearemos el esquema de validaciones para los parametros de los usuarios:
const userSchema = z.object({
    nombre: z.string().max(45),
    apellidos: z.string().max(80),
    email: z.string().max(45),
    password: z.string().min(8).max(60)
})

// Ahora creamos una funcion validadora para cuando el usuario se registre

function validateSign(obj) {
    return userSchema.safeParse(obj);
    // Con safeParse hacemos la validacion
}

// Ahora creamos una funcion validadora para cuando el usuario inicie sesión

function validateLogin(obj) {
    return  userSchema.partial().safeParse(obj);
    //Con partial los atributos se vuelven opcionales, para solo validar los valores necesarios
}

module.exports = {
    validateSign,
    validateLogin
}