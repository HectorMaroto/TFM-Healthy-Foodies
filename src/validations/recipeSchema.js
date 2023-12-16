// Importamos la libreria zod para validar los datos de entrada del usuario en los formularios
const z = require('zod');

// Aqui crearemos el esquema de validaciones para los parametros de las recetas:
const recipeSchema = z.object({
    nombre: z.string().max(45),
    ingredientes: z.string().max(255),
    descripcion: z.string().max(8192),
    minutos_preparacion: z.number().positive(),
    idUsuario: z.number()
})

// Ahora creamos una funcion validadora para cuando el usuario introduzca una nueva receta

function validateRecipe(obj) {
    return recipeSchema.safeParse(obj);
    // Con safeParse hacemos la validacion
}

// Ahora creamos una funcion validadora para cuando el usuario edite una receta

function validatePartialRecipe(obj) {
    return  recipeSchema.partial().safeParse(obj);
    //Con partial los atributos se vuelven opcionales, para solo validar los valores actualizados
}

module.exports = {
    validateRecipe,
    validatePartialRecipe
}