const express = require('express');
const ispitBodoviRouter = express.Router();

const ispitBodoviUtils = require('../utils/ispitBodoviUtils');

ispitBodoviRouter.post('/', (req,res) => {
    let postBody = req.body;
    res.setHeader('Content-Type', 'application/json');

    let ispravniParametri = ispitBodoviUtils.provjeraParametaraBoduj(postBody);
    if (!ispravniParametri) {
        res.status(400);
        res.send(JSON.stringify({
            message: 'Neispravni parametri unutar body-a! Ocekivani format [idIspita, idKorisnika, bodovi]'
        }))
    }
    else {
        ispitBodoviUtils.bodujIspit(postBody, (err,tema)=> {
            if (err) {
                res.status(404);
                res.send(JSON.stringify({
                    message: "Neispravni id-evi! Ne postoji idIspita ili idKorisnika sa ulogom idUloga:1 (student)"
                }));
            }
            else res.send(JSON.stringify({
                message: "Uspjesno bodovan ispit!"
            }));
        });
    } 
});

ispitBodoviRouter.get('/:idKorisnika/:idIspita', (req,res)=> {
    let idKorisnika = req.params.idKorisnika;
    let idIspita = req.params.idIspita;
    res.setHeader('Content-Type', 'application/json');

    ispitBodoviUtils.vratiBodove(idKorisnika, idIspita, (err, bodovi) => {
        if (err) {
            res.status(404);
            res.send(JSON.stringify( {
                message: 'Greska! Neispravni id-evi korisnika ili ispita',  
            }));
        }
        else res.send(bodovi);
    });
});






module.exports = ispitBodoviRouter;
