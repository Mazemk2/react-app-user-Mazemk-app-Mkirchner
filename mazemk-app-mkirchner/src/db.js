const mariadb = require('mariadb');
require('dotenv').config();
const secrets = require('./secrets.js'); // secrets.js wird korrekt per require geladen

// Funktion zur Herstellung einer Datenbankverbindung und zum Prüfen der Erreichbarkeit
async function checkDatabaseConnection() {
  let connection;

  try {
    // Verbindung zur Datenbank herstellen
    connection = await mariadb.createConnection({
      host: secrets.db_server,          // Werte aus secrets.js verwenden
      port: process.env.DB_PORT || 3306, // Fallback auf Port 3306, falls DB_PORT nicht gesetzt
      user: secrets.db_username,
      password: secrets.db_password,
      database: secrets.db_database
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