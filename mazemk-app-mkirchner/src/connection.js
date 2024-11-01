const express = require('express');
const bcrypt = require('bcrypt'); // Für Passwortüberprüfung
const getDatabaseConnection = require('./db.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware zum Parsen von JSON-Anfragen

// Begrüßungsroute
app.get('/', (req, res) => {
    res.status(200).json({ greeting: 'Oh hallo Mark!' });
});

// Anmelderoute
app.post('/login', async (req, res) => {
    const { email, password } = req.body; // E-Mail und Passwort aus der Anfrage extrahieren
    let connection;

    try {
        connection = await getDatabaseConnection();

        // Benutzer anhand der E-Mail in der Datenbank suchen
        const [user] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

        if (!user) {
            return res.status(404).json({ error: 'Benutzer nicht gefunden' });
        }

        // Passwort überprüfen
        const isPasswordValid = await bcrypt.compare(password, user.password); // Vergleicht das gehashte Passwort
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Ungültiges Passwort' });
        }

        // Anmeldung erfolgreich
        res.status(200).json({ message: 'Erfolgreich angemeldet', userId: user.id });
        
    } catch (error) {
        console.error("Fehler bei der Anmeldung:", error);
        res.status(500).json({ error: 'Fehler bei der Anmeldung' });

    } finally {
        if (connection) {
            await connection.release(); // Verbindung immer freigeben
        }
    }
});

// Route zum Abrufen von Benutzerdaten
app.get('/users', async (req, res) => {
    let connection;

    try {
        connection = await getDatabaseConnection();
        const users = await connection.query('SELECT * FROM fancy_user');
        res.status(200).json(users);

    } catch (error) {
        console.error("Datenabruf fehlgeschlagen:", error);
        res.status(500).json({ error: 'Es gab einen Fehler beim Abrufen der Daten.' });

    } finally {
        if (connection) {
            await connection.release();
        }
    }
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft und hört auf http://localhost:${PORT}`);
});
