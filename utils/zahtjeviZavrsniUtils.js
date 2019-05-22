const db = require('../models/db');

const odobriZahtjeviZavrsni = (idTeme, callback) => {
    db.ZahtjeviZavrsni.findOne({
        where: {idTema: idTeme}
    }).then((tema) => {
        if(!tema || tema.length==0) callback(true); //Greska - ne postoji
        else {
            //Mijenjamo
            db.ZahtjeviZavrsni.update({
                odobreno: '1' 
            }, {
                where: {
                    idTema: idTeme
                }
            });
            callback(null, tema);
        };
    });
}

const getZahtjeviZavrsni = (idTeme, callback) => {
    db.ZahtjeviZavrsni.findOne({
        where: {idTema: idTeme}
    }).then((zahtjev) => {
        callback(null, zahtjev);
    });
}

const provjeraParametaraDodajZahtjev = (postBody) => {
    if(typeof postBody['idTema'] === 'undefined' || typeof postBody['idStudent'] === 'undefined' || typeof postBody['idProfesor'] === 'undefined' || typeof postBody['odobreno'] === 'undefined') return false;
    return true;
}

const dodajZahtjev = (postBody, callback) => {
    let noviZahtjev = {
        idTema: postBody['idTema'],
        idStudent: postBody['idStudent'],
        idProfesor: postBody['idProfesor'],
        odobreno: postBody['odobreno']
    }
    //Provjera da li postoje tema, student i profesor
    db.TemeZavrsnih.findOne({
        where: {
            id: postBody['idTema'] 
        }
    }).then((tema) => {
        if (!tema || tema.length) callback(true); //Greska
        else {
            db.Korisnik.findOne({
                where: {
                    id: postBody['idProfesor']
                }
            }).then((profesor) => {
                if(!profesor) callback(true); //Greska
                else {
                    /*db.Korisnik.findOne({
                        where: {
                            id: postBody['idStudent']
                        }
                    }).then((student) => {
                        if(!student) callback(true); //Greska
                        else {*/
                            db.ZahtjeviZavrsni.create(noviZahtjev).then((novi) => {
                                if (!novi) callback(true); //Greska
                                else callback(null, novi); })
                        //}
                    //});
                }
            });
        }
    })
}

const obrisiZahtjev = (idTeme, callback) => {
    db.ZahtjeviZavrsni.findOne({
        where: {idTema: idTeme}
    }).then((zahtjev) => {
        if(!zahtjev || zahtjev.length) callback(true); //Greska - ne postoji
        else {
            //Brisemo
            db.ZahtjeviZavrsni.destroy({
                where: {
                    idTema: idTeme
                }
            });
            callback(null);
        };
    });
}


module.exports = {
    odobriZahtjeviZavrsni,
    getZahtjeviZavrsni,
    provjeraParametaraDodajZahtjev,
    dodajZahtjev, 
    obrisiZahtjev
}