const express = require('express');
const temeZavrsnihRouter = express.Router();

const temeZavrsnihUtils = require('../utils/temeZavrsnihUtils');

//Get teme zavrsnih na predmetu
temeZavrsnihRouter.get('/:idPredmeta', (req, res)=> {
    let idPredmeta = req.params.idPredmeta;
    res.setHeader('Content-Type', 'application/json');

    temeZavrsnihUtils.getTemeZavrsnih(idPredmeta, (err, teme)=> {
        if (err) res.send(JSON.stringify( {
            message: 'Greska! Ne postoji predmet sa id-em idPredmeta.',
            err
        }));
        else res.send(teme);
    });
});

temeZavrsnihRouter.post('/novaTema', (req, res) => {
    let postBody = req.body;
    console.log(postBody);
    res.setHeader('Content-Type', 'application/json');

    let ispravniParametri = temeZavrsnihUtils.provjeraParametaraAddNovaTema(postBody);
    if (!ispravniParametri) res.send(JSON.stringify({
        message: 'Neispravni parametri unutar body-a! Ocekivani format formatu [naziv, opis, idPredmeta, idProfesora]'
    }))

    temeZavrsnihUtils.addNovaTema(postBody, (err,tema)=> {
        if (err) res.send(JSON.stringify({
            message: "Neispravni id-evi!"
        }));
        else res.send(JSON.stringify({
            message: "Uspjesno dodana nova tema!"
        }));
    });
});

temeZavrsnihRouter.delete('/izbrisiTemu/:idTeme', (req,res) => {
    let idTeme = req.params.idTeme;
    res.setHeader('Content-Type', 'application/json');

    temeZavrsnihUtils.deleteTemaZavrsnih(idTeme, (err) => {
        if (err) res.send(JSON.stringify({
            message: "Neispravan id teme!"
        }));
        else res.send(JSON.stringify({
            message: "Uspjesno obrisana tema!"
        }));
    });
});

module.exports = temeZavrsnihRouter;
