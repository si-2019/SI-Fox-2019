const express = require('express');
// init express
const app = express();
const port = /*process.env.port ||*/ 31906;

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
            {naziv: 'Usmeni ispit', bodovi: '20'},
        ],
        ukupno: 70,
        ocjena: 7
    }
];


app.get('/api/fox/tabelaStudenti', (req, res) => {
    res.json(studenti);
});



//Listen on port
app.listen(port, () => console.log(`Example app listening on port ${port}!`))