const db = require('../models/db');
const Sequelize = require("sequelize");
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
    
    
    db.PredmetStudent.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('idStudent')), 'idStudent']],
        where:{
            idPredmet: idPredmeta,
            idAkademskaGodina:11
        }
      }).then(idStudenata=>{
          let studenti=[];
          for(i in idStudenata){
            let idStudenta=idStudenata[i].idStudent;
            let r1=db.Korisnik.findOne({
                where: {id:idStudenta}
            });
            studenti.push(r1);
          }
          Promise.all(studenti).then( (values)=> {
            callback(null,values);
          });
        });
    
}
module.exports = {
    getStudenti
}