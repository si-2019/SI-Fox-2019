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

module.exports = {
    odobriZahtjeviZavrsni,
    //getZahtjeviZavrsni,
    //addZahtjeviZavrsni
}