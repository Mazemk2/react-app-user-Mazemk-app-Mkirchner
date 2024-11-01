// secrets.js

const secrets = {
    db_server: 'localhost:3306',         // DB-Host
    db_username: 'root',                 // DB-Benutzername
    db_password: 'Root',                 // DB-Passwort
    db_database: 'project_db',           // DB-Datenbankname
    jwt_secret_key: 'mein-total-geheimer-schluessel' // JWT-Geheimschlüssel
};

module.exports = secrets; // Korrekte Syntax für CommonJS