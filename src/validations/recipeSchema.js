const z = require('zod');

// Aqui crearemos el esquema de validaciones para los parametros de las recetas:
const recipeSchema = z.object({
    nombre: z.string().length(45),
    ingredientes: z.string().length(255),
    descripcion: z.string(),
    minutos_preparacion: z.number().min(1)
})

// Ahora creamos una funcion validadora para cuando el usuario introduzca una nueva receta

function validateRecipe(obj) {
    return recipeSchema.safeParse(obj);
    // Con safeParse hacemos la validacion
}

// Ahora creamos una funcion validadora para cuando el usuario edite una nueva receta

function validatePartialRecipe(obj) {
    return recipeSchema.partial().safeParse(obj);
    //Con partial los atributos se vuelven opcionales, para solo validar los valores actualizados
}

module.exports = {
    validateRecipe,
    validatePartialRecipe
}