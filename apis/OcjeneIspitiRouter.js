const express = require('express');
const router = express.Router();
const axios = require('axios');
const cors = require('cors');
const http = require('http');

function getAllStudents(endpoint) {
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

// rezultat je objekat {ime: "ime", indeks: "indeks", id: _id}
// GET na api/fox/ocjene/:index
router.get('/:index', cors(), (req, res) => {
    getAllStudents("http://localhost:31901/api/korisnik/getAllStudents")
        .then(students => {
            const student = students.find(s => s.indeks === req.params.index);
            if(!student) 
                res.status(404).json("Ne postoji student sa tim brojem indeksa!");
            else {
                res.status(200).json({
                    ime: student.ime + ' ' + student.prezime,
                    indeks: student.indeks,
                    id: student.id
                });
            }
        });
});

// unos ocjene
// tijelo zahtjeva izgleda ovako: 
// { idPredmet: "id", idStudent: "id", ocjena: "ocjena"}
// POST na api/fox/ocjene
router.post('/', cors(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200); console.log(req.body)

    axios.post('http://localhost:31906/fox/ocjene/ocjena', {
        "idStudent": req.body.idStudent,
        "idPredmet": req.body.idPredmet,
        "idAkademskaGodina": '11', // ??? treba dobiti trenutnu akGod
        "ocjena": req.body.ocjena
    }).then((response) => {
        if (response.status != 200) {
            res.status(400);
            res.send(response.data);
        }
        res.status(200).json(response.data);
    }).catch((err) => { res.status(err.response.status); res.send(err.response.data); });
});

module.exports = router;