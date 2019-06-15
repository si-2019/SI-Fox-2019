const express = require('express');
const prisustvoAPIRouter = express.Router();
const axios = require('axios');
const cors = require('cors');
const db = require('../models/db');


//upis u tabele

prisustvoAPIRouter.post('/updateTabela', cors(), (req, res) => {
    let idPredmeta = req.query.idPredmeta;
    rutaStudenti="https://si2019fox.herokuapp.com/fox/studenti/"+idPredmeta;
    axios.get(rutaStudenti).then((s)=>{
        let studenti=s.data;
        let promises=[];
        for(i in studenti){
            let id=studenti[i].id;
            let ruta1='https://si2019fox.herokuapp.com/fox/prisustvo/addPredavanja';
            let ruta2='https://si2019fox.herokuapp.com/fox/prisustvo/addVjezbe';
            let ruta3='https://si2019fox.herokuapp.com/fox/prisustvo/addTutorijali'; 
            
            for(i = 1; i <= 14; i++){
                //unesi predavanje
                let brojSedmice=i;
                let parametri={
                    "idStudenta": id,
                    "idPredmeta": idPredmeta,
                    "prisutan": null,
                    "brojSedmice": brojSedmice
                };
                
                r1=axios.post(ruta1, parametri);
                promises.push(r1);

                r2=axios.post(ruta2, {
                    "idStudenta": id,
                    "idPredmeta": idPredmeta,
                    "prisutan": null,
                    "brojSedmice": brojSedmice
                });
                promises.push(r2);
                r3=axios.post(ruta3, {
                    "idStudenta": id,
                    "idPredmeta": idPredmeta,
                    "prisutan": null,
                    "brojSedmice": brojSedmice
                });
                promises.push(r3);
            }
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
    });
});

prisustvoAPIRouter.get('', cors(), (req, res) => {
    let idPredmeta = req.query.idPredmeta;
    let brojSedmice = req.query.brojSedmice;
    let tabela=[];
    //dobavi studente
    rutaStudenti="https://si2019fox.herokuapp.com/fox/studenti/"+idPredmeta;
    axios.get(rutaStudenti).then((s)=>{
        let studenti=s.data;
        for(i in studenti){
            let id=studenti[i].id;
            let ime=studenti[i].ime+" "+studenti[i].prezime;
            let indeks=studenti[i].indeks;
            let ruta1='https://si2019fox.herokuapp.com/fox/prisustvo/predavanja?idStudenta='+id+'&idPredmeta='+idPredmeta+'&brojSedmice='+brojSedmice;
            let ruta2='https://si2019fox.herokuapp.com/fox/prisustvo/tutorijali?idStudenta='+id+'&idPredmeta='+idPredmeta+'&brojSedmice='+brojSedmice;
            let ruta3='https://si2019fox.herokuapp.com/fox/prisustvo/vjezbe?idStudenta='+id+'&idPredmeta='+idPredmeta+'&brojSedmice='+brojSedmice;
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
        let ruta1='https://si2019fox.herokuapp.com/fox/prisustvo/unosPredavanja';
        let ruta2='https://si2019fox.herokuapp.com/fox/prisustvo/unosVjezbe';
        let ruta3='https://si2019fox.herokuapp.com/fox/prisustvo/unosTutorijali';
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