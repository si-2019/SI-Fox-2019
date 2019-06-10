const express = require('express');
const router = express.Router();
const axios = require('axios');
const cors = require('cors');
const http = require('http');

function getIspiti(endpoint) {
    return new Promise((resolve, reject) => {
        http.get(endpoint, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                resolve(JSON.parse(data));
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    });
}

// dobavi sve registrovane ispite na predmetu
// rezultat je niz ispita od koji svaki ima atribute:
// idIspit(trebat ce poslije kod unosa bodova), tip i datum(ovo dvoje za 
// prikaz u padajucem meniju)
// GET na /api/fox/ispiti/:idPredmet
router.get('/:idPredmeta', cors(), (req, res) => {
    getIspiti(`http://localhost:31903/kreiraniIspiti/predmet/${req.params.idPredmet}`)
        .then(ispiti => {
            let ispitiTipDatum = [];
            ispiti.forEach(ispit => {
                ispitiTipDatum.push( {
                    idIspit: ispit.idIspit,
                    tip: ispit.tipIspita,
                    datum: ispit.termin
                });
            });
            res.status(200).json(ispitiTipDatum);
        });
});

// unos bodova ispita
// tijelo zahtjeva izgleda ovako: 
// { idStudent: "id", bodovi: "bodovi", idIspit: "id"}
// POST na api/fox/ispiti
router.post('/', cors(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200); console.log(req.body)

    axios.post('http://localhost:31906/fox/bodoviIspit', {
        "idKorisnika": req.body.idStudent,
        "bodovi": req.body.bodovi,
        "idIspita": req.body.idIspit
    }).then((response) => {
        if (response.status != 200) {
            res.status(400);
            res.send(response.data);
        }
        res.status(200).json(response.data);
    }).catch((err) => { res.status(err.response.status); res.send(err.response.data); });
});

module.exports = router;