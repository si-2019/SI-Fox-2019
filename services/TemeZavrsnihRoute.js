const express = require('express');
const temeZavrsnihRouter = express.Router();

const temeZavrsnihUtils = require('../utils/temeZavrsnihUtils');

//Get teme zavrsnih na predmetu
temeZavrsnihRouter.get('/:idPredmeta', (req, res)=> {
    let idPredmeta = req.params.idPredmeta;
    console.log(idPredmeta);
    res.setHeader('Content-Type', 'application/json');

    temeZavrsnihUtils.getTemeZavrsnih(idPredmeta, (err, teme)=> {
        if (err) res.send(JSON.stringify( {
            message: 'Greska! Ne postoji predmet sa id-em idPredmeta.',
            err
        }));
        else res.send(teme);
    });
});

module.exports = temeZavrsnihRouter;
