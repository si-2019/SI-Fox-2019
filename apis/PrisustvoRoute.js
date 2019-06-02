const express = require('express');
const prisustvoAPIRouter = express.Router();
const axios = require('axios');
const cors = require('cors');
const db = require('../models/db');

let studenti=[
    {
    idPredmeta:4,
    idStudenta:230,
    ime:"Neko Nekic",
    indeks:12345
},{
    idPredmeta:4,
    idStudenta:1,
    ime:"Neko Nekic",
    indeks:12346
}];
prisustvoAPIRouter.get('', cors(), (req, res) => {
    let idPredmeta = req.query.idPredmeta;
    let brojSedmice = req.query.brojSedmice;
    let tabela=[];
    for(i in studenti){
        let id=studenti[i].idStudenta;
        let ime=studenti[i].ime;
        let indeks=studenti[i].indeks;
        let ruta1='http://localhost:31906/fox/prisustvo/predavanja?idStudenta='+studenti[i].idStudenta+'&idPredmeta='+idPredmeta+'&brojSedmice='+brojSedmice;
        let ruta2='http://localhost:31906/fox/prisustvo/tutorijali?idStudenta='+studenti[i].idStudenta+'&idPredmeta='+idPredmeta+'&brojSedmice='+brojSedmice;
        let ruta3='http://localhost:31906/fox/prisustvo/vjezbe?idStudenta='+studenti[i].idStudenta+'&idPredmeta='+idPredmeta+'&brojSedmice='+brojSedmice;
        r1=axios.get(ruta1).then(
            (prisustvo)=>{
                let predavanje;
                if(prisustvo.data.prisutan==null)predavanje=null;
                else if(prisustvo.data.prisutan=="1")predavanje="da";
                else if(prisustvo.data.prisutan=="0")predavanje="ne";
                return predavanje;
            }
        );
        r2=axios.get(ruta2).then(
            (prisustvo)=>{
                let tutorijal;
                if(prisustvo.data.prisutan==null)tutorijal=null;
                else if(prisustvo.data.prisutan=="1")tutorijal="da";
                else if(prisustvo.data.prisutan=="0")tutorijal="ne";
                return tutorijal;  
            }
        );
        r3=axios.get(ruta3).then(
            (prisustvo)=>{
                let vjezbe;
                if(prisustvo.data.prisutan==null)vjezbe=null;
                else if(prisustvo.data.prisutan=="1")vjezbe="da";
                else if(prisustvo.data.prisutan=="0")vjezbe="ne";
                return  vjezbe;
            }
        );
        promise=Promise.all([r1, r2,r3]).then( (values)=> {

        let student={id:id,ime:ime,indeks:indeks,predavanje:values[0],tutorijal:values[1],vjezbe:values[2]};
        tabela.push(student);
        return tabela;
    }).catch((err) => {
        res.status(err.response.status); 
        res.send(err.response.data);
    });
}
    promise.then((prisustvo)=> {
        res.status(200);
        res.send(prisustvo);
    }).catch((err) => {
        
    });  
});
prisustvoAPIRouter.put('/azurirajPredavanje', cors(), (req, res) => {
    
    let status=req.query.status;
    let promises=[];
    if(status=="null"){
        status=null;
    }
    let idPredmeta=req.query.idPredmeta;
    let brojSedmice=req.query.brojSedmice;
    res.setHeader('Content-Type', 'application/json');
    db.PrisustvoPredavanja.findAll(
        {attributes: ['idStudenta']},{
        where: {idPredmeta:idPredmeta,brojSedmice:brojSedmice}
    }).then((prisustvo) => { //Ne detektuje gresku :()
        if(!prisustvo || prisustvo.length==0){
        } //Greska - ne postoji
        else {
            for(i in prisustvo){
                let idStudenta=prisustvo[i].idStudenta;
                let r1=axios.put('http://localhost:31906/fox/prisustvo/unosPredavanja', {
                "idStudenta": idStudenta,
                "idPredmeta": idPredmeta,
                "prisutan": status,
                "brojSedmice": brojSedmice
            });
            promises.push(r1);
         }
         Promise.all(promises).then(()=> {
            res.status(200);
            res.send(JSON.stringify( {
                message: 'Uspjesno azuriranje!'
                }));
         }).catch((err) => {
            res.status(err.response.status);
            res.send(err.response.data);
        });
        }
    });
});
prisustvoAPIRouter.put('/azurirajTutorijal', cors(), (req, res) => {
    
    let status=req.query.status;
    let idPredmeta=req.query.idPredmeta;
    let brojSedmice=req.query.brojSedmice;
    let promises=[];
    if(status=="null"){
        status=null;
    }
    res.setHeader('Content-Type', 'application/json');
    db.PrisustvoTutorijali.findAll(
        {attributes: ['idStudenta']},{
        where: {idPredmeta:idPredmeta,brojSedmice:brojSedmice}
    }).then((prisustvo) => { //Ne detektuje gresku :()
        if(!prisustvo || prisustvo.length==0){
        } //Greska - ne postoji
        else {
            
            for(i in prisustvo){
                let idStudenta=prisustvo[i].idStudenta;
                let promise=axios.put('http://localhost:31906/fox/prisustvo/unosTutorijali', {
                "idStudenta": idStudenta,
                "idPredmeta": idPredmeta,
                "prisutan": status,
                "brojSedmice": brojSedmice
            });
            promises.push(promise);
           
         }
         Promise.all(promises).then(()=> {
            res.status(200);
            res.send(JSON.stringify( {
                message: 'Uspjesno azuriranje!'
                }));
         }).catch((err) => {
            res.status(err.response.status);
            res.send(err.response.data);
        });
        };
    });
    
    
});

prisustvoAPIRouter.put('/azurirajVjezbe', cors(), (req, res) => {
    
    let status=req.query.status;
    let promises=[];
    if(status=="null"){
        status=null;
    }
    let idPredmeta=req.query.idPredmeta;
    let brojSedmice=req.query.brojSedmice;
    res.setHeader('Content-Type', 'application/json');
    db.PrisustvoVjezbe.findAll(
        {attributes: ['idStudenta']},{
        where: {idPredmeta:idPredmeta,brojSedmice:brojSedmice}
    }).then((prisustvo) => { //Ne detektuje gresku :()
        if(!prisustvo || prisustvo.length==0){
        } //Greska - ne postoji
        else {
            for(i in prisustvo){
                let idStudenta=prisustvo[i].idStudenta;
                axios.put('http://localhost:31906/fox/prisustvo/unosVjezbe', {
                "idStudenta": idStudenta,
                "idPredmeta": idPredmeta,
                "prisutan": status,
                "brojSedmice": brojSedmice
            });
            promises.push(promise);
         }
         Promise.all(promises).then(()=> {
            res.status(200);
            res.send(JSON.stringify( {
                message: 'Uspjesno azuriranje!'
                }));
         }).catch((err) => {
            res.status(err.response.status);
            res.send(err.response.data);
        });
        };
    });
});
prisustvoAPIRouter.put('/unosIzmjena', cors(), (req, res) => {
    let tabela=req.body;
    let idPredmeta=req.query.idPredmeta;
    let brojSedmice=req.query.brojSedmice;
    
    for(i in tabela){
        let student=req.body[i];
        let idStudenta=student.id;
        let predavanje=student.predavanje;
        let tutorijal=student.tutorijal;
        let vjezbe=student.vjezbe;
        let ruta1='http://localhost:31906/fox/prisustvo/unosPredavanja';
        let ruta2='http://localhost:31906/fox/prisustvo/unosVjezbe';
        let ruta3='http://localhost:31906/fox/prisustvo/unosTutorijali';
        r1=axios.put(ruta1, {
            "idStudenta": idStudenta,
            "idPredmeta": idPredmeta,
            "prisutan": predavanje,
            "brojSedmice": brojSedmice
        });
        r2=axios.put(ruta2, {
            "idStudenta": idStudenta,
            "idPredmeta": idPredmeta,
            "prisutan": vjezbe,
            "brojSedmice": brojSedmice
        });
        r3=axios.put(ruta3, {
            "idStudenta": idStudenta,
            "idPredmeta": idPredmeta,
            "prisutan": tutorijal,
            "brojSedmice": brojSedmice
        });
    promise=Promise.all([r1, r2,r3]).then( ()=> {
        
    }).catch((err) => {
        res.status(err.response.status); 
        res.send(err.response.data)
    });

    }
    promise.then(()=> {
        res.status(200);
        res.send(JSON.stringify( {
            message: 'Uspjesno azuriranje!'
            }));
    }).catch((err) => {
        
    });
});



module.exports = prisustvoAPIRouter;