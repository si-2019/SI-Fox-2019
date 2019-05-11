const express = require('express');
// init express
const app = express();
const port = /*process.env.port ||*/ 31906;
const cors = require('cors');

//database connection
const db = require('./databaseConfig.js');  
db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    
//npm run dev
app.get('/', (req, res) => res.send('Hello World from FOX!'));

//Return info for table Studenti
const studenti = [
    {
        index: 12345,
        imePrezime: 'Neko Nekić',
        prisustvo: 10,
        zadace: 10,
        ispiti : [
            {naziv: 'I parcijalni ispit', bodovi: '15'},
            {naziv: 'II parcijalni ispit', bodovi: '15'},
            {naziv: 'Usmeni ispit', bodovi: '20'}
        ],
        ukupno: 70,
        ocjena: 7
    }
];

const ispiti = [
    {naziv: 'I parcijalni ispit'},
    {naziv: 'II parcijalni ispit'},
    {naziv: 'Usmeni ispit'}
]

app.get('/api/fox/tabelaStudenti', cors(), (req, res) => {
    //'/api/fox/tabelaStudenti?_limit=100'
    res.json(studenti);
});

app.get('/api/fox/tabelaStudenti/ispiti', cors(), (req, res) => {
    //'/api/fox/tabelaStudenti?_limit=100'
    res.json(ispiti);
});




//Listen on port
app.listen(port, () => console.log(`Example app listening on port ${port}!`))