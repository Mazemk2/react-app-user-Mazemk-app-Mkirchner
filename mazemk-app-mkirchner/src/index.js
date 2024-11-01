
import express from 'express';
import getDatabaseConnection from './db.js'; // Der Import ist jetzt korrekt

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    return res.status(200).json({ hello: 'world' });
});

// Route zum Überprüfen der Datenbankverbindung
app.get('/check-db', async (req, res) => {
    try {
        await getDatabaseConnection();
        res.status(200).send('Datenbankverbindung erfolgreich!');
    } catch (error) {
        console.error("Fehler bei der Verbindung zur Datenbank:", error);
        res.status(500).send('Datenbankverbindung fehlgeschlagen.');
    }
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
