const express = require('express');
const studentiRouter = express.Router();
const studentiUtils = require('../utils/studentiUtils');


//get studenata na predmetu sa podacima
studentiRouter.get('/:idPredmeta', (req, res) => {
    let idPredmeta = req.params.idPredmeta;
    
    res.setHeader('Content-Type', 'application/json');

    studentiUtils.getStudenti(idPredmeta, (err, studenti) => {
        if (err)
            res.send(JSON.stringify('Greska!'));
        else
            res.send(studenti);
    });
    
});



module.exports = studentiRouter;