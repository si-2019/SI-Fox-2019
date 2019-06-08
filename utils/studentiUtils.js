const db = require('../models/db');
/*const getStudenti = (callback) => {

    db.Korisnik.findAll(
        {attributes: ['id','ime','prezime']},{
        where: {
            idUloga: 1
        }
        
    }).then((studenti) => {
        if (!studenti || studenti.length==0) callback(true); //Greska
        else {
            callback(null,studenti);
        }
    });
}*/
const getStudenti = (idPredmeta, callback) => {

    
    db.PredmetStudent.findAll(
        {
        attributes: ['idStudent']},{
        where: {
            idPredmet: idPredmeta,
            idAkademskaGodina: 11
        }
        
    }).then(idStudenata=>{
        
        callback(null,idStudenata);
        });
    
}
module.exports = {
    getStudenti,
}