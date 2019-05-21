const db = require('../models/db');

const getOcjene = (index, idPredmeta, callback) => {
    db.Korisnik.findOne({
        where: { indeks: index }
    }).then((korisnik) => {
        if (!korisnik) {
            callback(true);
            return;
        }
        db.PredmetStudent.findAll({
            where: {
                idStudent: korisnik.id,
                idPredmet: idPredmeta
            }
        }).then(ocjene => {
            if (!ocjene)
                callback(true);
            else
                callback(null, ocjene);
        })
    });
}

const provjeraParametaraOcjena = body => {
    return body['idStudent'] && body['idPredmet'] && body['idAkademskaGodina']
        && body['ocjena'];
}

const addOcjena = (body, callback) => {
    let ocjena = {
        idStudent: body['idStudent'],
        idPredmet: body['idPredmet'],
        idAkademskaGodina: body['idAkademskaGodina'],
        ocjena: body['ocjena'],
        datum_upisa: body['datum_upisa'] || Date.now()
    }
    db.Korisnik.findOne({
        where: {
            id: body.idStudent,
            idUloga: 1
        }
    }).then(korisnik => {
        if (!korisnik) {
            callback(true);
            return;
        }
        db.Predmet.findOne({
            where: {
                id: body.idPredmet
            }
        }).then(predmet => {
            if (!predmet) {
                callback(true);
                return;
            }
            db.sequelize.query("SELECT * FROM `AkademskaGodina` WHERE id = " + body.idAkademskaGodina,
                { type: sequelize.QueryTypes.SELECT }).then(akGod => {
                    if (!akGod) {
                        callback(true);
                        return;
                    }
                    db.PredmetStudent.create(ocjena).then((ocjena) => {
                        if (!ocjena)
                            callback(true); //Greska
                        else
                            callback(null, ocjena);
                    });
                })
        })
    })
}

module.exports = {
    getOcjene,
    provjeraParametaraOcjena,
    addOcjena
}