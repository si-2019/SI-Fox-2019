const express = require('express');
const router = express.Router();
const axios = require('axios');
const cors = require('cors');

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