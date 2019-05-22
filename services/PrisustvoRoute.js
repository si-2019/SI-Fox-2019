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


//post prisustva studenta na predavanju
prisustvoRouter.post('/addPredavanja', (req, res)=> {
    let postBody = req.body;
    console.log(postBody);
    res.setHeader('Content-Type', 'application/json');

    let ispravniParametri = prisustvoUtils.provjeraParametara(postBody);
    if (!ispravniParametri) {
        res.status(400);
        res.send(JSON.stringify({
            message: 'Neispravni parametri unutar body-a!'
        }));
    }
    else {
        prisustvoUtils.addPredavanja(postBody, (err,prisustvo)=> {
            if (err) {
                res.status(405);
                res.send(JSON.stringify({
                    message: "Neispravni id-evi!"
                }));
            }
            else {
                res.status(200);
                res.send(JSON.stringify({
                
                message: "Uspjesan unos!"
            }));}
        });
    } 
});

//post prisustva studenta na vjezbama
prisustvoRouter.post('/addVjezbe', (req, res)=> {
    let postBody = req.body;
    console.log(postBody);
    res.setHeader('Content-Type', 'application/json');

    let ispravniParametri = prisustvoUtils.provjeraParametara(postBody);
    if (!ispravniParametri) {
        res.status(400);
        res.send(JSON.stringify({
            message: 'Neispravni parametri unutar body-a!'
        }));
    }
    else {
        prisustvoUtils.addVjezbe(postBody, (err,prisustvo)=> {
            if (err) {
                res.status(405);
                res.send(JSON.stringify({
                    message: "Neispravni id-evi!"
                }));
            }
            else {
                res.status(200);
                res.send(JSON.stringify({
                
                message: "Uspjesan unos!"
            }));}
        });
    }
});

//post prisustva studenta na tutorijalima
prisustvoRouter.post('/addTutorijali', (req, res)=> {
    let postBody = req.body;
    console.log(postBody);
    res.setHeader('Content-Type', 'application/json');

    let ispravniParametri = prisustvoUtils.provjeraParametara(postBody);
    if (!ispravniParametri) {
        res.status(400);
        res.send(JSON.stringify({
            message: 'Neispravni parametri unutar body-a!'
        }));
    }
    else {
        prisustvoUtils.addTutorijali(postBody, (err,prisustvo)=> {
            if (err) {
                res.status(405);
                res.send(JSON.stringify({
                    message: "Neispravni id-evi!"
                }));
            }
            else {
                res.status(200);
                res.send(JSON.stringify({
                
                message: "Uspjesan unos!"
            }));}
        });
    }
});

module.exports = prisustvoRouter;