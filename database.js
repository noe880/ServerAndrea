const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'roundhouse.proxy.rlwy.net',
    user: 'root',
    password: 'wFKHMUutXkSvlOzBWEciFSyrSPrOnWys',
    database: 'railway',
    port: 59069
  });

// Intentar conectarse a la base de datos
function conectarDB() {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Función para insertar datos en la tabla de la base de datos
function insertarDatos(nombre, apellido, email) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO usuarios (nombre, apellido, gmail) VALUES (?, ?, ?)';
    const values = [nombre, apellido, email];
    
    connection.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  insertarDatos
  };