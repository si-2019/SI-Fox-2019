const express = require('express');
const ispitBodoviRouter = express.Router();

const ispitBodoviUtils = require('../utils/ispitBodoviUtils');

ispitBodoviRouter.post('/bodoviIspit', (req,res) => {
    let postBody = req.body;
    res.setHeader('Content-Type', 'application/json');

    let ispravniParametri = ispitBodoviUtils.provjeraParametaraBoduj(postBody);
    if (!ispravniParametri) res.send(JSON.stringify({
        message: 'Neispravni parametri unutar body-a! Ocekivani format [idIspita, idKorisnika, bodovi]'
    }))
    else {
        ispitBodoviUtils.bodujIspit(postBody, (err,tema)=> {
            if (err) res.send(JSON.stringify({
                message: "Neispravni id-evi! Ne postoji idIspita ili idKorisnika sa ulogom idUloga:1 (student)"
            }));
            else res.send(JSON.stringify({
                message: "Uspjesno bodovan ispit!"
            }));
        });
    } 
});

/*
ispitBodoviRouter.get('/bodoviIspit/:idStudenta/:idPredmeta/:idIspita', (req,res)=> {
    let idStudenta = req.params.idStudenta;
    let idPredmeta = req.params.idPredmeta;
    res.setHeader('Content-Type', 'application/json');

    ispitBodoviUtils.getZahtjeviZavrsni(idProfesora, (err, zahtjevi) => {
        if (err) res.send(JSON.stringify( {
            message: 'Greska!',
            err
        }));
        else res.send(zahtjevi);
    });
});

ispitBodoviRouter.put('/bodoviIspit', (req,res) => {
    res.setHeader('Content-Type', 'application/json');

    ispitBodoviUtils.odobriZahtjeviZavrsni(idTeme, (err, tema) => {
        if(err) {
            res.status(404);
            res.send(JSON.stringify( {
                message: 'Greska! Ne postoji tema sa id-em idTeme.',
                err
            }));
        }
        else res.send(tema);
    })

});*/






module.exports = ispitBodoviRouter;
