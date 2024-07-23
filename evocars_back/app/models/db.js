const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost', // esto dejalo asi
  user: 'root', // este es el usuario que van a utilizar para entrar, debe tener todos los permisos
  password: 'marietamartinez23022018@', // esta es la contrasena de ese usuario, no es la misma de todos
  database: 'evocars',
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
