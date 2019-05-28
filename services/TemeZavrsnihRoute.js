const express = require('express');
const temeZavrsnihRouter = express.Router();

const temeZavrsnihUtils = require('../utils/temeZavrsnihUtils');

//Get teme zavrsnih na predmetu
temeZavrsnihRouter.get('/:idPredmeta', (req, res)=> {
    let idPredmeta = req.params.idPredmeta;
    res.setHeader('Content-Type', 'application/json');

    temeZavrsnihUtils.getTemeZavrsnih(idPredmeta, (err, teme)=> {
        if (err) {
            res.status(404);
            res.send(JSON.stringify( {
                message: 'Greska! Ne postoji predmet sa id-em idPredmeta.',
                err
            }));
        }
        else res.send(teme);
    });
});

temeZavrsnihRouter.post('/novaTema', (req, res) => {
    let postBody = req.body;
    //console.log(postBody);
    res.setHeader('Content-Type', 'application/json');

    let ispravniParametri = temeZavrsnihUtils.provjeraParametaraAddNovaTema(postBody);
    if (!ispravniParametri) {
        res.status(400);
        res.send(JSON.stringify({
            message: 'Neispravni parametri unutar body-a! Ocekivani format [naziv, opis, idPredmeta, idProfesora]'
        }));
    }
    else {
        temeZavrsnihUtils.addNovaTema(postBody, (err,tema)=> {
            if (err) {
                res.status(404);
                res.send(JSON.stringify({
                    message: "Neispravni id-evi!"
                }));
            }
            else res.send(JSON.stringify({
                message: "Uspjesno dodana nova tema!",
                tema: tema
            }));
        });
    } 
});

temeZavrsnihRouter.delete('/izbrisiTemu/:idTeme', (req,res) => {
    let idTeme = req.params.idTeme;
    res.setHeader('Content-Type', 'application/json');

    temeZavrsnihUtils.deleteTemaZavrsnih(idTeme, (err) => {
        if (err) {
            res.status(400);
            res.send(JSON.stringify({
                message: "Neispravan id teme!"
            }));
        }
        else {
            res.status(200);
            res.send(JSON.stringify({
                message: "Uspjesno obrisana tema!"
            }));
        }
    });
});

temeZavrsnihRouter.put('/izmjeniTemu/:idTeme', (req,res) => {
    let idTeme = req.params.idTeme;
    let postBody = req.body;
    console.log(postBody);
    res.setHeader('Content-Type', 'application/json');
    
    let ispravniParametri = temeZavrsnihUtils.provjeraParametaraUpdateTema(postBody);
    if (!ispravniParametri) {
        res.status(400);
        res.send(JSON.stringify({
            message: 'Neispravni parametri unutar body-a! Ocekivani format formatu [naziv, opis]'
        }));
    }
    else {
        temeZavrsnihUtils.updateTemaZavrsnih(idTeme, postBody, (err, tema) => {
            //console.log(tema);
            if (err) {
                res.status(404);
                res.send(JSON.stringify({
                    message: "Neispravan id teme!"
                }));
            }
            else res.send(JSON.stringify({
                message: "Uspjesno azurirana tema!"
            }));
        });
    }
});

module.exports = temeZavrsnihRouter;
