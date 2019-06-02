const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');  // definisanje env varijabli
dotenv.config();
// postavljanje configa 

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


app.use('/*', (req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*'); //Posebno za samo nas frontend?!
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
//---------------Mikroservisi--------------------------------------------------------------------
const TemeZavrsnihRouter = require('./services/TemeZavrsnihRoute');
//Definisanje rute za Teme Zavrsnih
app.use('/fox/teme', TemeZavrsnihRouter);
const ZahtjeviZavrsniRouter = require('./services/ZahtjeviZavrsniRoute');
//Definisanje rute za Zahtjeve Zavrsnih
app.use('/fox/teme', ZahtjeviZavrsniRouter);
const IspitBodoviRouter = require('./services/IspitBodoviRoute');
//Definisanje rute za Zahtjeve Zavrsnih
app.use('/fox/bodoviIspit', IspitBodoviRouter);

const PredmetStudentRouter = require('./services/PredmetStudentRoute');
app.use('/fox/ocjene', PredmetStudentRouter);


//Definisanje rute za prisustvo studenta na predmetu
const PrisustvoRouter = require('./services/PrisustvoRoute');
app.use('/fox/prisustvo',PrisustvoRouter);


//---------------APIs--------------------------------------------------------------------
const temeZavrsnihAPIRouter = require('./apis/TemeZavrsnihRoute');
app.use('/api/fox/temeZavrsnih', temeZavrsnihAPIRouter);
const pocetnaStranicaAPIRouter = require('./apis/PocetnaStranicaRoute');
app.use('/api/fox', pocetnaStranicaAPIRouter);
const tabelaStudentiAPIRouter = require('./apis/TabelaStudentiRoute');
app.use('/api/fox/tabelaStudenti', tabelaStudentiAPIRouter);

//------------Hardkodirani APIji-----------------------------------------

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
    },
    {
        index: 16789,
        imePrezime: 'Stu Dent',
        prisustvo: 0,
        zadace: 7,
        ispiti: [
            {naziv: 'I parcijalni ispit', bodovi: '10'},
            {naziv: 'II parcijalni ispit', bodovi: '7'}
        ],
        ukupno: 24,
        ocjena: 5
    }
];

const profesori = [
    {
        id: 0,
        imePrezime: 'Samir Ribić',
        idOdsjek: 1,
        email: 'megaribi@gmail.com',
        mjestoRodjenja: 'Sarajevo',
        predmeti: [
            'Sistemsko programiranje',
            'Operativni sistemi',
            'Programski jezici i prevodioci'
        ]
    },
    {
        id: 1,
        imePrezime: 'Prof Esor',
        idOdsjek: 2,
        email: 'profesor@gmail.com',
        mjestoRodjenja: 'Tuzla',
        predmeti: [
            'Uvod u programiranje',
            'Osnove racunarstva',
            'Razvoj programskih rjesenja'
        ]
    }
];

const ispiti = [
    {naziv: 'I parcijalni ispit'},
    {naziv: 'II parcijalni ispit'},
    {naziv: 'Usmeni ispit'}
]

/*app.get('/api/fox/tabelaStudenti', cors(), (req, res) => {
    //'/api/fox/tabelaStudenti?_limit=100'
    res.json(studenti);
});

app.get('/api/fox/tabelaStudenti/ispiti', cors(), (req, res) => {
    //'/api/fox/tabelaStudenti?_limit=100'
    res.json(ispiti);
});*/

//APIji za početnu stranicu

const predmeti = [
    {
        id: 1,
        naziv: "Tehnike programiranja"
    },
    {
        id: 2,
        naziv: "Numerički algoritmi"
    },
    {
        id: 3,
        naziv: "Diskretna matematika"
    }
]

const grupe = [
    {
        id: 1,
        naziv: "Grupa 1"
    },
    {
        id: 2,
        naziv: "Grupa 2"
    },
    {
        id:3,
        naziv: "Grupa 3"
    }
]

/*app.get('/api/fox/predmeti/:idKorisnika', cors(), (req, res) => {
    //'/api/fox/tabelaStudenti?_limit=100'
    console.log(req.params);
    res.json(predmeti);
});

app.get('/api/fox/grupe/:idPredmeta', cors(), (req, res) => {
    //'/api/fox/tabelaStudenti?_limit=100'
    console.log(req.params);
    res.json(grupe);
});*/


//endpointi za ocjene

function getStudentFromIndex(index) {
    let student = studenti.find(s => s.index === index);
    return `${student.imePrezime}, ${student.index}`;
}

app.get('/api/fox/ocjene/:index', cors(), (req, res) => {
    console.log(req.params);
    let index = req.params.index;
    let stduent = getStudentFromIndex(parseInt(index));
    res.status(200).json(stduent);
});

//profesor login

function getProfesorFromId(id) {
    return profesori.find(p => p.id === id).imePrezime;
}

app.get('/api/fox/profesori/:id', cors(), (req, res) => {
    console.log(req.params);
    let id = req.params.id;
    let profesor = getProfesorFromId(parseInt(id));
    res.status(200).json(profesor);
});

//Listen on port
app.listen(port, () => console.log(`Example app listening on port ${port}!`))