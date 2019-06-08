const db = require('../models/db');

const getBodoviPrisustvo = (idStudenta,idPredmeta, callback) => {

    let brojIzostanaka=0;
    db.PrisustvoPredavanja.count({
        where:{
            idStudenta:idStudenta,
            idPredmeta:idPredmeta,
            prisutan:false
        }
    }).then(broj=>{
        brojIzostanaka+=broj;
        db.PrisustvoTutorijali.count({
            where:{
                idStudenta:idStudenta,
                idPredmeta:idPredmeta,
                prisutan:false
            }
        }).then(broj=>{

            brojIzostanaka+=broj;
            db.PrisustvoVjezbe.count({
                where:{
                    idStudenta:idStudenta,
                    idPredmeta:idPredmeta,
                    prisutan:false
                }
            }).then(broj=>{
    
                brojIzostanaka+=broj;
                
                console.log(brojIzostanaka);
                if(brojIzostanaka>3){
                    callback(null,{bodovi:0});
                }
                else{
                    callback(null,{bodovi:10});
                }
            });
            
        });
        
    });
    
}
/*const getStudenti = (idPredmeta, callback) => {

    //db.
    db.PrisustvoPredavanja.count({
        where:{
            idStudenta:idStudenta,
            idPredmeta:idPredmeta,
            prisutan:false
        }
    }).then(broj=>{
        brojIzostanaka+=broj;
        db.PrisustvoTutorijali.count({
            where:{
                idStudenta:idStudenta,
                idPredmeta:idPredmeta,
                prisutan:false
            }
        }).then(broj=>{

            brojIzostanaka+=broj;
            db.PrisustvoVjezbe.count({
                where:{
                    idStudenta:idStudenta,
                    idPredmeta:idPredmeta,
                    prisutan:false
                }
            }).then(broj=>{
    
                brojIzostanaka+=broj;
                
                console.log(brojIzostanaka);
                if(brojIzostanaka>3){
                    callback(null,{bodovi:0});
                }
                else{
                    callback(null,{bodovi:10});
                }
            });
            
        });
        
    });
    
}*/
const provjeraParametara = (postBody) => {
    
    if(!postBody['idStudenta'] || !postBody['idPredmeta'] || !postBody['brojSedmice']) return false;
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
const updatePredavanja = (body, callback) => {
    db.PrisustvoPredavanja.findOne({
        where: {idStudenta:body['idStudenta'],idPredmeta:body['idPredmeta'],brojSedmice:body['brojSedmice']}
    }).then((prisustvo) => { //Ne detektuje gresku :()
        if(!prisustvo || prisustvo.length==0) callback(true); //Greska - ne postoji
        else {
            //Mijenjamo
            db.PrisustvoPredavanja.update({
                prisutan:body['prisutan']             
            }, {
                where: {
                    id:prisustvo.id
                }
            });
            callback(null, prisustvo);
        };
    })
}
const updateTutorijali = (body, callback) => {
    db.PrisustvoTutorijali.findOne({
        where: {idStudenta:body['idStudenta'],idPredmeta:body['idPredmeta'],brojSedmice:body['brojSedmice']}
    }).then((prisustvo) => { //Ne detektuje gresku :()
        if(!prisustvo || prisustvo.length==0) callback(true); //Greska - ne postoji
        else {
            //Mijenjamo
            db.PrisustvoTutorijali.update({
                prisutan:body['prisutan']             
            }, {
                where: {
                    id:prisustvo.id
                }
            });
            callback(null, prisustvo);
        };
    })
}
const updateVjezbe = (body, callback) => {
    db.PrisustvoVjezbe.findOne({
        where: {idStudenta:body['idStudenta'],idPredmeta:body['idPredmeta'],brojSedmice:body['brojSedmice']}
    }).then((prisustvo) => { //Ne detektuje gresku :()
        if(!prisustvo || prisustvo.length==0) callback(true); //Greska - ne postoji
        else {
            //Mijenjamo
            db.PrisustvoVjezbe.update({
                prisutan:body['prisutan']             
            }, {
                where: {
                    id:prisustvo.id
                }
            });
            callback(null, prisustvo);
        };
    })
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
const addTutorijali = (postBody, callback) => {

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
                    db.PrisustvoTutorijali.create(prisustvo)
                    .then(tutorijal =>{
                        if (!tutorijal) callback(true); //Greska
                        else callback(null, tutorijal);
                    });
                }
            });
           
        }
    });
}

const getPrisustvoPredavanja = (idStudenta,idPredmeta,brojSedmice, callback) => {
    //console.log("idPredmeta " + idPredmeta);
    db.Predmet.findOne({
        where: {
            id: idPredmeta 
        }
    }).then((predmet) => {
        if (!predmet || predmet.length==0) callback(true,null,null); //Greska
        else {
            db.Korisnik.findOne({
                where: {
                    id: idStudenta,
                    idUloga: 1
                }
            }).then((student) => {
                if(!student) callback(true,null,null); //Greska
                else {
                    db.PrisustvoPredavanja.findOne({
                        where: {idStudenta : idStudenta,idPredmeta:idPredmeta,brojSedmice:brojSedmice},
                        attributes: ['prisutan']  
                    }).then((prisustvo) => {
                        if (!prisustvo || prisustvo.length==0) callback(null,true,null);
                        else callback(null, null,prisustvo);
                        
                    });
                   
                }
            });
           
        }
    });
    
}
const getPrisustvoVjezbe = (idStudenta,idPredmeta,brojSedmice, callback) => {
    //console.log("idPredmeta " + idPredmeta);
    db.Predmet.findOne({
        where: {
            id: idPredmeta 
        }
    }).then((predmet) => {
        if (!predmet || predmet.length==0) callback(true,null,null); //Greska
        else {
            db.Korisnik.findOne({
                where: {
                    id: idStudenta,
                    idUloga: 1
                }
            }).then((student) => {
                if(!student) callback(true,null,null); //Greska
                else {
                    db.PrisustvoVjezbe.findOne({
                        where: {idStudenta : idStudenta,idPredmeta:idPredmeta,brojSedmice:brojSedmice},
                        attributes: ['prisutan']  
                    }).then((prisustvo) => {
                        if (!prisustvo || prisustvo.length==0) callback(null,true,null);
                        else callback(null, null,prisustvo);
                        
                    });
                   
                }
            });
           
        }
    });
    
}
const getPrisustvoTutorijali = (idStudenta,idPredmeta,brojSedmice, callback) => {
    //console.log("idPredmeta " + idPredmeta);
    db.Predmet.findOne({
        where: {
            id: idPredmeta 
        }
    }).then((predmet) => {
        if (!predmet || predmet.length==0) callback(true,null,null); //Greska
        else {
            db.Korisnik.findOne({
                where: {
                    id: idStudenta,
                    idUloga: 1
                }
            }).then((student) => {
                if(!student) callback(true,null,null); //Greska
                else {
                    db.PrisustvoTutorijali.findOne({
                        where: {idStudenta : idStudenta,idPredmeta:idPredmeta,brojSedmice:brojSedmice},
                        attributes: ['prisutan']  
                    }).then((prisustvo) => {
                        if (!prisustvo || prisustvo.length==0) callback(null,true,null);
                        else callback(null, null,prisustvo);
                        
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
    addVjezbe,
    addTutorijali,
    //getStudenti,
    updatePredavanja,
    updateVjezbe,
    updateTutorijali,
    getPrisustvoPredavanja,
    getPrisustvoTutorijali,
    getPrisustvoVjezbe
}
