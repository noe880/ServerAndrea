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
        console.log('Data inserted successfully.');
        resolve(results);
      }
    });
  });
}

async function ejemploInsertarDatos() {
  try {
    await conectarDB(); // Conectarse a la base de datos
    
    // Insertar un usuario de ejemplo
    const nombre = 'Noe';
    const apellido = 'Rios';
    const email = 'ejemplo@correo.com';
    
    await insertarDatos(nombre, apellido, email);
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
    ejemploInsertarDatos
  };