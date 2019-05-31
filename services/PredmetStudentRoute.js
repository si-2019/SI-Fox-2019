const express = require('express');
const predmetStudentRouter = express.Router();

const predmetStudentUtils = require('../utils/predmetStudentUtils')


predmetStudentRouter.get('/:index/:idPredmeta', (req, res) => {
    let index = req.params.index;
    let idPredmeta = req.params.idPredmeta;
    res.setHeader('Content-Type', 'application/json');

    predmetStudentUtils.getOcjene(index, idPredmeta, (err, ocjene) => {
        if (err)
            res.send(JSON.stringify('Greska! Ne postoji taj student ili predmet.'));
        else
            res.send(ocjene);
    })
});

predmetStudentRouter.post('/ocjena', (req, res) => {
    let body = req.body;
    res.setHeader('Content-Type', 'application/json');

    if (!predmetStudentUtils.provjeraParametaraOcjena(body))
        res.send(JSON.stringify('Neispravni parametri unutar tijela zahtjeva'));
    else { 
        predmetStudentUtils.addOcjena(body, (err, ocjena) => {
            if (err)
                res.send(JSON.stringify('Greska? Ne postoji student/predmet ili neispravna akademska godina'));
            else
                res.send(JSON.stringify('Uspjesno dodana nova tema!'));
        });
    }
});

module.exports = predmetStudentRouter;