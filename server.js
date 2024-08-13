const express = require('express');
const mysql = require('mysql2');
const fastcsv = require('fast-csv');
const fs = require('fs');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'moko2024',
    database: 'expenses_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
});

app.use(express.json());

app.post('/addExpense', (req, res) => {
    const expense = req.body;
    const sql = 'INSERT INTO expenses SET ?';
    db.query(sql, expense, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        console.log('Expense added:', result);
        res.send('Expense added successfully!');
    });
});


app.get('/downloadCsv', (req, res) => {
    const sql = 'SELECT * FROM expenses';
    db.query(sql, (err, results) => {
        if (err) throw err;

        const ws = fs.createWriteStream('expenses.csv');
        fastcsv
            .write(results, { headers: true })
            .pipe(ws)
            .on('finish', () => {
                res.download('expenses.csv', 'expenses.csv', err => {
                    if (err) {
                        console.log(err);
                    } else {
                        fs.unlinkSync('expenses.csv'); // delete the file after download
                    }
                });
            });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
