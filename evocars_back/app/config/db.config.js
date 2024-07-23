const mysql = require('mysql2');

// Configurar la conexión a MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'marietamartinez23022018@',
  database: 'evocars',
};

const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
connection.connect(error => {
  if (error) {
    throw error;
  }
  console.log('Conectado a la base de datos MySQL.');
});

module.exports = connection;