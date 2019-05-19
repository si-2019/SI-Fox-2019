const db = require('../models/db');

const provjeraParametaraBoduj = (postBody) => {
    let bodovi = postBody['bodovi'];
    if(!postBody['idIspita'] || !postBody['idKorisnika'] || !bodovi ) 
        return false;
    if (bodovi < 0 || bodovi > 100) return false;
    return true;
}

const bodujIspit = (postBody, callback) => {
    idIspita = postBody['idIspita']; 
    idKorisnika = postBody['idKorisnika'];
    bodovi = postBody['bodovi'];
    
    db.Ispit.findOne({ //Provjera postoji li ispit
        where: {idIspit: idIspita}
    }).then((ispit) => {
        if(!ispit) callback(true); //Greska - ne postoji
        else { //Provjera postoji li student
            db.Korisnik.findOne({
                where: {
                    id: idKorisnika,
                    idUloga : 1 //Student
                }
            }).then((student)=> {
                if (!student) callback(true);
                else {
                    //Unos bodova
                    db.IspitBodovi.update({
                        bodovi: bodovi 
                    }, {
                        where: {
                            idIspita: idIspita,
                            idKorisnika: idKorisnika
                        }
                    }).then((unos)=> {
                        callback(null, unos);
                    });   
                }
            });           
        };
    });
}

module.exports = {
    provjeraParametaraBoduj,
    bodujIspit
}