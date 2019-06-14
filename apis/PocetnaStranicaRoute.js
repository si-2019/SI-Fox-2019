const express = require('express');
const pocetnaStranicaAPIRouter = express.Router();
const axios = require('axios');
const cors = require('cors');

//APIji za početnu stranicu

const predmeti = [
    {
        id: 64,
        naziv: "Tehnike programiranja",
        opis: "Opis predmeta"
    },
    {
        id: 2,
        naziv: "Numerički algoritmi",
        opis: "Opis predmeta"
    },
    {
        id: 3,
        naziv: "Diskretna matematika",
        opis: "Opis predmeta"
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
///api/fox/predmeti/:idKorisnika
pocetnaStranicaAPIRouter.get('/predmeti/:idKorisnika', cors(), (req, res) => {
    console.log(req.params.idKorisnika);
    axios.get('https://si2019alpha.herokuapp.com/api/korisnik/getPredmetiAsisProf/', {
        params: {
            idKorisnik: req.params.idKorisnika, 
            Uloga: 3
        }
    })
    .then((resPredmeti) => {
        //console.log(resPredmeti.data);
        let listaPredmeta = [];
        for (i in resPredmeti.data) {
            listaPredmeta.push({
                "id": resPredmeti.data[i].id,
                "naziv" : resPredmeti.data[i].naziv,
                "opis": resPredmeti.data[i].opis
            });
        }

        res.send(listaPredmeta);
    })
    .catch((err) => {
        console.log(err.message);
        res.json(predmeti);
    });
});

pocetnaStranicaAPIRouter.get('/grupe/:idPredmeta', cors(), (req, res) => {
    console.log(req.params);
    res.json(grupe);
});

module.exports = pocetnaStranicaAPIRouter;