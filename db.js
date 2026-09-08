const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

let dbInstance = null;

async function getDB() {
  if (!dbInstance) {
    dbInstance = await open({
      filename: path.join(__dirname, 'diario.sqlite'),
      driver: sqlite3.Database
    });

    // Crea la tabla automáticamente si no existe
    await dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS registros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        estado_animo TEXT NOT NULL,
        puntuacion INTEGER NOT NULL,
        comentario TEXT
      );
    `);
  }
  return dbInstance;
}

module.exports = getDB;