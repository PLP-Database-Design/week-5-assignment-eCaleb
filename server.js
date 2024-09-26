// declare variables/ dependencies
const express = require('express');
// express is a javascript framework for handling requests and responses
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');


app.use(express.json());
app.use(cors());
dotenv.config();



//connect to database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_password,
    database: process.env.DB_NAME
});


//CHECK IF DB CONNECTION WORKS
db.connect((e) => {
    if (e) return console.log("error connecting to the database");
    //else
    console.log("connected success fully as id: ", db.threadId)


    //GET METHOD EXAMPLE
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

//QUESTION 1
    app.get('/data', (req, res) => {
        db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (e, results) => {
            if (e) {
                console.error(e);
                res.status(500).send('Error retrieving data');
            }
            else {
                res.render('data', { results: results });
            }
        });
    });

    //QUESTION 2
    app.get('/data', (req, res) => {
        db.query('SELECT first_name, last_name, provider_specialty FROM providers', (e, results) => {
            if (e) {
                console.error(e);
                res.status(500).send('Error retrieving data');
            }
            else {
                res.render('data', { results: results });
            }
        });
    });

    //QUESTION 3
    app.get('/data', (req, res) => {
        db.query('SELECT first_name FROM patients', (e, results) => {
            if (e) {
                console.error(e);
                res.status(500).send('Error retrieving data');
            }
            else {
                res.render('data', { results: results });
            }
        });
    });

    //QUESTION 4
    app.get('/data', (req, res) => {
        db.query('SELECT provider_specialty FROM providers', (e, results) => {
            if (e) {
                console.error(e);
                res.status(500).send('Error retrieving data');
            }
            else {
                res.render('data', { results: results });
            }
        });
    });


    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);

        //SEND A MESSAGE TO THE BROWSER
        console.log('sending message to browser...')
        app.get('/', (req, res) => {
            res.send('Server started successfully!')
        });

    });
});