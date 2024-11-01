import express from 'express';
import bcrypt from 'bcrypt';
import getDatabaseConnection from './db.js'; // Stelle sicher, dass dieser Pfad korrekt ist

const app = express();
app.use(express.json()); // Middleware für JSON-Parsing

const PORT = process.env.PORT || 3000;

// Benutzerregistrierung
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Benutzername und Passwort sind erforderlich.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Passwort verschlüsseln

    try {
        const connection = await getDatabaseConnection();
        const result = await connection.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        connection.end();

        return res.status(201).json({ message: 'Benutzer erfolgreich registriert.', userId: result.insertId });
    } catch (error) {
        console.error("Fehler bei der Registrierung:", error);
        return res.status(500).json({ message: 'Fehler bei der Benutzerregistrierung.' });
    }
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
