const db = require('../models/db');

const odobriZahtjeviZavrsni = (idTeme, callback) => {
    db.ZahtjeviZavrsni.findOne({
        where: {idTema: idTeme}
    }).then((tema) => {
        if(!tema) callback(true); //Greska - ne postoji
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

const getZahtjeviZavrsni = (idProfesora, callback) => {
    db.ZahtjeviZavrsni.findAll({
        where: {idProfesor: idProfesora}
    }).then((zahtjevi) => {
        callback(null, zahtjevi);
    });
}

const provjeraParametaraDodajZahtjev = (postBody) => {
    if(!postBody['idTema'] || !postBody['idStudent'] || !postBody['idProfesor'] || !postBody['odobreno']) return false;
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
        if (!tema) callback(true); //Greska
        else {
            db.Korisnik.findOne({
                where: {
                    id: postBody['idProfesor']
                }
            }).then((profesor) => {
                if(!profesor) callback(true); //Greska
                else {
                    db.Korisnik.findOne({
                        where: {
                            id: postBody['idStudent']
                        }
                    }).then((student) => {
                        if(!student) callback(true); //Greska
                        else {
                            db.ZahtjeviZavrsni.create(noviZahtjev).then((novi) => {
                                if (!novi) callback(true); //Greska
                                else callback(null, novi); })
                        }
                    });
                }
            });
        }
    })
}

module.exports = {
    odobriZahtjeviZavrsni,
    getZahtjeviZavrsni,
    provjeraParametaraDodajZahtjev,
    dodajZahtjev
}