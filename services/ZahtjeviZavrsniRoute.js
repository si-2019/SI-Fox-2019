const express = require('express');
const zahtjeviZavrsniRouter = express.Router();

const zahtjeviZavrsniUtils = require('../utils/zahtjeviZavrsniUtils');

zahtjeviZavrsniRouter.put('/odobri/:idTeme', (req,res) => {
    let idTeme = req.params.idTeme;
    res.setHeader('Content-Type', 'application/json');

    zahtjeviZavrsniUtils.odobriZahtjeviZavrsni(idTeme, (err, tema) => {
        if(err) res.send(JSON.stringify( {
            message: 'Greska! Ne postoji tema sa id-em idTeme.',
            err
        }));
        else res.send(tema);
    })

});

module.exports = zahtjeviZavrsniRouter;
