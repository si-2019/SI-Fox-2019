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

zahtjeviZavrsniRouter.get('/zahtjevi/:idProfesora', (req,res)=> {
    let idProfesora = req.params.idProfesora;
    res.setHeader('Content-Type', 'application/json');

    zahtjeviZavrsniUtils.getZahtjeviZavrsni(idProfesora, (err, zahtjevi) => {
        if (err) res.send(JSON.stringify( {
            message: 'Greska!',
            err
        }));
        else res.send(zahtjevi);
    });
});

zahtjeviZavrsniRouter.post('/dodajZahtjev', (req,res) => {
    let postBody = req.body;
    res.setHeader('Content-Type', 'application/json');

    let ispravniParametri = zahtjeviZavrsniUtils.provjeraParametaraDodajZahtjev(postBody);
    if (!ispravniParametri) res.send(JSON.stringify({
        message: 'Neispravni parametri unutar body-a! Ocekivani format formatu [idTema, idStudent, idProfesor, odobreno]'
    }))
    else {
        zahtjeviZavrsniUtils.dodajZahtjev(postBody, (err,tema)=> {
            if (err) res.send(JSON.stringify({
                message: "Neispravni id-evi!"
            }));
            else res.send(JSON.stringify({
                message: "Uspjesno dodan novi zahtjev!"
            }));
        });
    } 
});

zahtjeviZavrsniRouter.delete('/izbrisiZahtjev/:idTeme', (req, res) => {
    let idTeme = req.params.idTeme;
    res.setHeader('Content-Type', 'application/json');

    zahtjeviZavrsniUtils.obrisiZahtjev(idTeme, (err)=> {
        if (err) res.send(JSON.stringify({
            message: "Neispravan id teme!"
        }));
        else res.send(JSON.stringify({
            message: "Uspjesno obrisan zahtjev!"
        }));
    });
});



module.exports = zahtjeviZavrsniRouter;
