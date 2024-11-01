const mariadb = require('mariadb');
require('dotenv').config();
const secrets = require('./secrets.js'); // Pfad zum secrets.js Modul oder zur Datei
import secrets from './secrets.js';
// Funktion zur Herstellung einer Datenbankverbindung und zum Prüfen der Erreichbarkeit
async function checkDatabaseConnection() {
  let connection;

  try {
    // Verbindung zur Datenbank herstellen
    connection = await mariadb.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    console.log("Verbindung zur Datenbank erfolgreich!"); // Erfolgreiche Verbindung anzeigen

  } catch (error) {
    console.error("Fehler bei der Verbindung zur Datenbank:", error); // Fehler anzeigen, wenn keine Verbindung möglich ist

  } finally {
    if (connection) await connection.end(); // Verbindung schließen, falls sie geöffnet ist
  }
}

checkDatabaseConnection(); // Funktion aufrufen, um die Verbindung zu prüfen

module.exports = checkDatabaseConnection;
