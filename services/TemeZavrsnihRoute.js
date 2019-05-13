const express = require('express');
const temeZavrsnihRouter = express.Router();

const temeZavrsnihUtils = require('../utils/temeZavrsnihUtils');

temeZavrsnihRouter.get('/fox/teme/:idPredmeta', (req, res)=> {
    let idPredmeta = req.params.idPredmeta;
    temeZavrsnihUtils.getTemeZavrsnih(idPredmeta, (err)=> {
        if (err) res.send(JSON.stringify( {
            message: 'Greska! Ne postoji predmet sa id-em idPredmeta.',
            err
        }));
        else res.send(JSON.stringify({
            message: 'Uspjesno procitane teme zavrsnih radova.'
        }));
    });
});

module.exports = temeZavrsnihRouter;
