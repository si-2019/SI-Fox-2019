const db = require('../models/db');

const getBodoviPrisustvo = (idStudenta,idPredmeta, callback) => {
    //console.log("idPredmeta " + idPredmeta);
    // pristup tabelama
}
const provjeraParametara = (postBody) => {
    if(!postBody['idStudenta'] || !postBody['idPredmeta'] || !postBody['prisutan'] || !postBody['brojSedmice']) return false;
    return true;
}
const addPredavanja = (postBody, callback) => {

    let prisustvo = {
        idStudenta: postBody['idStudenta'],
        idPredmeta: postBody['idPredmeta'],
        prisutan: postBody['prisutan'],
        brojSedmice: postBody['brojSedmice']
    }
    //Provjera da li postoje predmet sa idPredmeta i student sa idStudenta
    db.Predmet.findOne({
        where: {
            id: postBody['idPredmeta'] 
        }
    }).then((predmet) => {
        if (!predmet || predmet.length==0) callback(true); //Greska
        else {
            db.Korisnik.findOne({
                where: {
                    id: postBody['idStudenta'],
                    idUloga: 1
                }
            }).then((student) => {
                if(!student) callback(true); //Greska
                else {
                    db.PrisustvoPredavanja.create(prisustvo)
                    .then(predavanje =>{
                        if (!predavanje) callback(true); //Greska
                        else callback(null, predavanje);
                    });
                }
            });
           
        }
    });
}
const addVjezbe = (postBody, callback) => {

    let prisustvo = {
        idStudenta: postBody['idStudenta'],
        idPredmeta: postBody['idPredmeta'],
        prisutan: postBody['prisutan'],
        brojSedmice: postBody['brojSedmice']
    }
    //Provjera da li postoje predmet sa idPredmeta i student sa idStudenta
    db.Predmet.findOne({
        where: {
            id: postBody['idPredmeta'] 
        }
    }).then((predmet) => {
        if (!predmet || predmet.length==0) callback(true); //Greska
        else {
            db.Korisnik.findOne({
                where: {
                    id: postBody['idStudenta'],
                    idUloga: 1
                }
            }).then((student) => {
                if(!student) callback(true); //Greska
                else {
                    db.PrisustvoVjezbe.create(prisustvo)
                    .then(vjezbe =>{
                        if (!vjezbe) callback(true); //Greska
                        else callback(null, vjezbe);
                    });
                }
            });
           
        }
    });
}
module.exports = {
    getBodoviPrisustvo,
    provjeraParametara,
    addPredavanja,
    addVjezbe
}
