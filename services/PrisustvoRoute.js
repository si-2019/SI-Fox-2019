const express = require('express');
const prisustvoRouter = express.Router();
const prisustvoUtils = require('../utils/prisustvoUtils');

//prikaz tabele



// Get bodova za prisustvo studenta na predmetu

prisustvoRouter.get('/bodovi', (req, res)=> {
    let idPredmeta = req.query.idPredmeta;
    let idStudenta = req.query.idStudenta;

    prisustvoUtils.getBodoviPrisustvo(idStudenta,idPredmeta, (err,bodovi)=> {
        
        if (err) {
            res.status(400);
            res.send(JSON.stringify( {
                message: 'Neispravni id-evi!'
                }));
        }

        else{
            res.status(200);
            res.send(bodovi);
        }
    }); 
});

//put prisustva

prisustvoRouter.put('/unosPredavanja', (req, res)=> {
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
        
        prisustvoUtils.updatePredavanja(postBody, (err,prisustvo)=> {
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

//put prisustva studenta na vjezbama
prisustvoRouter.put('/unosVjezbe', (req, res)=> {
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
        prisustvoUtils.updateVjezbe(postBody, (err,prisustvo)=> {
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

//put prisustva studenta na tutorijalima
prisustvoRouter.put('/unosTutorijali', (req, res)=> {
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
        prisustvoUtils.updateTutorijali(postBody, (err,prisustvo)=> {
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

//get prisustva na predavanju za studenta sa idStudenta na predmetu idPredmeta
//predavanja/{idStudenta}/{idPredmeta}/{brojSedmice}
prisustvoRouter.get('/predavanja', (req, res)=> {
    
    let idStudenta = req.query.idStudenta
    let idPredmeta = req.query.idPredmeta;
    let brojSedmice = req.query.brojSedmice;
    res.setHeader('Content-Type', 'application/json');

    prisustvoUtils.getPrisustvoPredavanja(idStudenta,idPredmeta,brojSedmice, (err1,err2, prisustvo)=> {
        if (err1) {
            res.status(400);
            res.send(JSON.stringify( {
                message: 'Neispravni id-evi!'
                }));
        }
        else if(err2){
            res.status(404);
            res.send(JSON.stringify( {
                message: 'Ne postoji prisustvo za navedenog studenta na tom predmetu!'
                }));
        }

        else{
            res.status(200);
            res.send(prisustvo);
        }
    });
});
//get prisustva na vjezbama za studenta sa idStudenta na predmetu idPredmeta
//vjezbe/{idStudenta}/{idPredmeta}/{brojSedmice}
prisustvoRouter.get('/vjezbe', (req, res)=> {
    
    let idStudenta = req.query.idStudenta
    let idPredmeta = req.query.idPredmeta;
    let brojSedmice = req.query.brojSedmice;
    res.setHeader('Content-Type', 'application/json');

    prisustvoUtils.getPrisustvoVjezbe(idStudenta,idPredmeta,brojSedmice, (err1,err2, prisustvo)=> {
        if (err1) {
            res.status(400);
            res.send(JSON.stringify( {
                message: 'Neispravni id-evi!'
                }));
        }
        else if(err2){
            res.status(404);
            res.send(JSON.stringify( {
                message: 'Ne postoji prisustvo za navedenog studenta na tom predmetu!'
                }));
        }

        else{
            res.status(200);
            res.send(prisustvo);
        }
    });
});
//get prisustva na tutorijalima za studenta sa idStudenta na predmetu idPredmeta
//tutorijali/{idStudenta}/{idPredmeta}/{brojSedmice}
prisustvoRouter.get('/tutorijali', (req, res)=> {
    
    let idStudenta = req.query.idStudenta
    let idPredmeta = req.query.idPredmeta;
    let brojSedmice = req.query.brojSedmice;
    res.setHeader('Content-Type', 'application/json');

    prisustvoUtils.getPrisustvoTutorijali(idStudenta,idPredmeta,brojSedmice, (err1,err2, prisustvo)=> {
        if (err1) {
            res.status(400);
            res.send(JSON.stringify( {
                message: 'Neispravni id-evi!'
                }));
        }
        else if(err2){
            res.status(404);
            res.send(JSON.stringify( {
                message: 'Ne postoji prisustvo za navedenog studenta na tom predmetu!'
                }));
        }

        else{
            res.status(200);
            res.send(prisustvo);
        }
    });
});


module.exports = prisustvoRouter;