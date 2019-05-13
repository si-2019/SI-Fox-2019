const db = require('../models/db');

const getTemeZavrsnih = (idPredmeta, callback) => {
    //console.log("idPredmeta " + idPredmeta);
    db.TemeZavrsnih.findAll({
        where: {idPredmeta : idPredmeta},
        attributes: ['id','naziv', 'opis']  
    }).then((teme) => {
        //console.log(teme);
        callback(null, teme);
    });
}

const addNovaTema = (postBody, callback) => {
    let novaTema = {
        naziv: postBody['naziv'],
        opis: postBody['opis'],
        idProfesora: postBody['idProfesora'],
        idPredmeta: postBody['idPredmeta']
    }
    //Provjera da li postoje predmet sa idPredmeta i profesor sa idProfesora
    db.Predmet.findOne({
        where: {
            id: postBody['idPredmeta'] 
        }
    }).then((predmet) => {
        if (!predmet) callback(true); //Greska
        else {
            db.Korisnik.findOne({
                where: {
                    id: postBody['idProfesora']
                }
            }).then((profesor) => {
                if(!profesor) callback(true); //Greska
                else {
                    db.TemeZavrsnih.create(novaTema).then((tema) => {
                        if (!tema) callback(true); //Greska
                        else callback(null, tema);
                    })
                }
            })
           
        }
    })
}

const provjeraParametaraAddNovaTema = (postBody) => {
    if(!postBody['naziv'] || !postBody['opis'] || !postBody['idPredmeta'] || !postBody['idProfesora']) return false;
    return true;
}

module.exports = {
    getTemeZavrsnih,
    addNovaTema,
    provjeraParametaraAddNovaTema
}