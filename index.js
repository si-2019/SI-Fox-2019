const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');  // definisanje env varijabli
dotenv.config();                   // postavljanje configa 

// init express
const app = express();
const port = process.env.port || 31906;
const cors = require('cors');

//Body parser
app.use(bodyParser.json());

//Swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//database connection
/*const db = require('./databaseConfig.js');  
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});*/

//database connection sa sequelize
const db = require ('./models/db.js');
db.sequelize.sync()
    .then(() => console.log("Connected!"))
    .catch((err)=> console.log("Neuspjesno povezivanje"))
    

//npm run dev
app.get('/', (req, res) => res.send('Hello World from FOX!'));

//---------------Mikroservisi--------------------------------------------------------------------
const TemeZavrsnihRouter = require('./services/TemeZavrsnihRoute');
//Definisanje rute za Teme Zavrsnih
app.use('/fox/teme', TemeZavrsnihRouter);
const ZahtjeviZavrsniRouter = require('./services/ZahtjeviZavrsniRoute');
app.use('/fox/teme', ZahtjeviZavrsniRouter);


//Definisanje rute za prisustvo studenta na predmetu
const PrisustvoRouter = require('./services/PrisustvoRoute');
app.use('/fox/prisustvo',PrisustvoRouter);


//---------------APIs--------------------------------------------------------------------

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

//APIji za početnu stranicu

const predmeti = [
    {naziv: "Tehnike programiranja"},
    {naziv: "Numerički algoritmi"},
    {naziv: "Diskretna matematika"}
]

const grupe = [
    {naziv: "Grupa 1"},
    {naziv: "Grupa 2"},
    {naziv: "Grupa 3"}
]

app.get('/api/fox/predmeti/:idKorisnika', cors(), (req, res) => {
    //'/api/fox/tabelaStudenti?_limit=100'
    console.log(req.params);
    res.json(predmeti);
});

app.get('/api/fox/grupe/:idPredmeta', cors(), (req, res) => {
    //'/api/fox/tabelaStudenti?_limit=100'
    console.log(req.params);
    res.json(grupe);
});




//Listen on port
app.listen(port, () => console.log(`Example app listening on port ${port}!`))