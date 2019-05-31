const express = require('express');
const pocetnaStranicaAPIRouter = express.Router();
const axios = require('axios');
const cors = require('cors');

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

pocetnaStranicaAPIRouter.get('/predmeti/:idKorisnika', cors(), (req, res) => {
    //'/api/fox/tabelaStudenti?_limit=100'
    console.log(req.params);
    res.json(predmeti);
});

pocetnaStranicaAPIRouter.get('/grupe/:idPredmeta', cors(), (req, res) => {
    //'/api/fox/tabelaStudenti?_limit=100'
    console.log(req.params);
    res.json(grupe);
});

module.exports = pocetnaStranicaAPIRouter;