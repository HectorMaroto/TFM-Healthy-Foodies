// Importamos el modulo de mysql de express, el objeto database y el metodo promisify
const mysql = require('mysql');
const database = require('./database.js');
const { promisify } = require('node:util');

// Vamos a crear una 'pool' de conexiones para evitar cerrar y abrir la conexion a la base de datos
// De esta manera solo liberamos los recursos usados cuando no usemos la BBDD y la usamos de nuevo sin
// tener que abrir otra vez la conexion
const pool = mysql.createPool(database);

//Creamos la conexion de la pool con la base de datos y manejamos los 3 errores de conexion mas comunes
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

// Si la conexion es exitosa liberamos los recursos, pero la pool sigue funcionando para poteriores peticiones a la base
    if (connection) connection.release(); 
    console.log('DB is connected');
    return; // Retornamos la conexion
})

//PROMISIFY con POOL QUERIES
pool.query = promisify(pool.query) // Para poder usar promesas con las sentencias sql de la pool de conexiones
// Exportamos la pool
module.exports = pool