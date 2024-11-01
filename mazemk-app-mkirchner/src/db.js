// db.js
import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config(); // .env-Datei laden

const getDatabaseConnection = async () => {
    let connection;
    
    try {
        // Verbindung zur Datenbank herstellen
        connection = await mariadb.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'Root',
            database: process.env.DB_DATABASE || 'project_db',
        });
        console.log("Verbindung zur Datenbank erfolgreich!");
        return connection; // Rückgabe der Verbindung
    } catch (error) {
        console.error("Fehler bei der Verbindung zur Datenbank:", error);
        throw error; // Fehler weitergeben
    } finally {
        if (connection) await connection.end(); // Verbindung schließen, falls sie geöffnet ist
    }
};

export default getDatabaseConnection; // Standardexport hinzufügen