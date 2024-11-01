const express = require('express');
const getDatabaseConnection = require('./db.js'); // Import der Datenbankverbindung

const app = express();
const PORT = process.env.PORT || 3000; // Standard-Port auf 3000 setzen, falls kein Prozess-Port vorhanden ist

// Startseite-Route
app.get('/', (req, res) => {
    res.status(200).json({ greeting: 'Hallo, Herbert!' }); // Begrüßungsnachricht
});

// Nutzerroute für Datenabruf
app.get('/users', async (req, res) => {
    let connection;

    try {
        // Verbindung zur Datenbank herstellen
        connection = await getDatabaseConnection();

        // Anfrage an die Tabelle 'fancy_user' senden
        const users = await connection.query('SELECT * FROM fancy_user');
        
        // JSON-Antwort mit den abgefragten Daten senden
        res.status(200).json(users);

    } catch (error) {
        console.error("Datenabruf fehlgeschlagen:", error);
        
        // Fehlerantwort senden
        res.status(500).json({ error: 'Es gab einen Fehler beim Abrufen der Daten.' });

    } finally {
        if (connection) {
            await connection.release(); // Verbindung immer freigeben
        }
    }
});

// Server-Start und Portüberwachung
app.listen(PORT, () => {
    console.log(`Server läuft und hört auf: http://localhost:${PORT}`);
});