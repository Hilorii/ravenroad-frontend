 const express = require('express');
    const mysql = require('mysql');
    const bodyParser = require('body-parser');
    const app = express();
    const port = 3001;


    app.use(bodyParser.json());

// Połączenie z bazą danych MySQL
    const db = mysql.createConnection({
        host: '23132.m.tld.pl',
        user: 'admin23132_ravenroadwebpage',
        password: 'k9W(g6V-v7',
        database: 'baza23132_ravenroadwebpage'
    });

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the MySQL database.');
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

