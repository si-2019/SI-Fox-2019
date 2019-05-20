const express = require('express');
const prisustvoRouter = express.Router();
const prisustvoUtils = require('../utils/prisustvoUtils');

// Get bodova za prisustvo studenta na predmetu
// /fox/prisustvo/bodovi/:idStudenta/:idPredmeta
prisustvoRouter.get('/bodovi/:idStudenta/:idPredmeta', (req, res)=> {
    let idPredmeta = req.params.idPredmeta;
    let idStudenta = req.params.idStudenta;
    res.setHeader('Content-Type', 'application/json');

    
    prisustvoUtils.getBodoviPrisustvo(idStudenta,idPredmeta, (err, bodovi)=> {
        /*if (err) res.send(JSON.stringify( {
            message: 'Greska! Ne postoji predmet sa id-em idPredmeta.',
            err
        }));
        else res.send(bodovi);*/
    });
    
});


//
module.exports = prisustvoRouter;