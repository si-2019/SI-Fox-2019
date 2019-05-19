const db = require('../models/db');

const provjeraParametaraBoduj = (postBody) => {
    if(!postBody['idIspita'] || !postBody['idKorisnika'] || !postBody['bodovi'] ) 
        return false;
 
    return true;
}

const bodujIspit = (idTeme, callback) => {
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

module.exports = {
    provjeraParametaraBoduj,
    bodujIspit
}