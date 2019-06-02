const express = require('express');
const temeZavrsnihAPIRouter = express.Router();
const axios = require('axios');
const cors = require('cors');

//const request = require('request');

/*const teme = [
    {
        id: 1,
        naziv: "Tema 1",
        opis: "Opis teme",
        odabrana: "da",
        student: "Neko Nekić"
    },
    {
        id: 2,
        naziv: "Tema 2",
        opis: "Opis teme",
        odabrana: "ne",
        student: ""
    },
    {
        id: 3,
        naziv: "Tema 3",
        opis: "Opis teme",
        odabrana: "ne",
        student: ""
    }
]*/

//Pomocna funkcija
const kreirajTemu = (id, naziv, opis, odabrana, student) => {
    return {id: id, naziv: naziv, opis: opis, odabrana: odabrana, student: student}
}

//Get teme zavrsnih na predmetu
temeZavrsnihAPIRouter.get('/tabelaTemeZavsnih/:idPredmeta', cors(), (req, res) => {
    //'/api/fox/tabelaStudenti?_limit=100'
    let idPredmeta = req.params.idPredmeta;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    axios.get('http://localhost:31906/fox/teme/'+idPredmeta)
    .then(
        (res1) => {
            let nizTema = res1.data; //id, naziv, opis teme 
            var teme = [];          
            //if (res1.status != 200) greska = true;
            //else {
                for(i in nizTema) {
                    //if(i==0) console.log(res1.status);
                    let id = nizTema[i].id;
                    let naziv = nizTema[i].naziv;
                    let opis = nizTema[i].opis;
                   // console.log(res1.data[i].id);
                    rez = axios.get('http://localhost:31906/fox/teme/zahtjevi/'+id).then(
                        (res2) => {
                            let odobreno = "ne";
                            if (res2.data.odobreno == '1') {
                                odobreno = "da";
                            }
                            //console.log(res2.data.idStudent); //Poziv apija idStudent -> ime i prezime studenta
                            tema = kreirajTemu(id, naziv, opis, odobreno, res2.data.idStudent);
                            //console.log(res2);
                            teme.push(tema); 
                            if (res2.status != 200) {
                                res.status(400); 
                                res.send(res2.data.message);
                            }
                            return teme;                  
                        }
                    ).catch((err) => {
                        res.status(err.response.status); 
                        res.send(err.response.data)
                    });
                }          
            //}
            rez.then((teme)=> {
                //console.log(teme);
                res.status(200);
                res.send(teme);
            }).catch((err) => {
                //console.log(err); console.log(err.response)
                res.status(err.response.status); 
                res.send(err.response.data)
            });          
        }).catch((err) => {
            res.status(err.response.status); 
            res.send(err.response.data) 
        });
});

temeZavrsnihAPIRouter.post('/novaTema', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200);
    console.log(req.body);
    naziv = req.body.naziv;
    opis = req.body.opis;
    idProfesora = req.body.idProfesora;
    idPredmeta = req.body.idPredmeta;

    axios.post('http://localhost:31906/fox/teme/novaTema', {
        "naziv": naziv,
        "opis": opis,
        "idProfesora": idProfesora,
        "idPredmeta": idPredmeta
    }).then((response) => {
        if (response.status!=200) {
            res.status(400);
            res.send(response.data);
        }
        axios.post('http://localhost:31906/fox/teme/dodajZahtjev', {
        "idTema":  response.data.tema.id,
        "idStudent": null,
        "idProfesor": idProfesora,
        "odobreno": null
        }).then((res2)=> {
            if (res2.status!=200) {
                res.status(400);
                res.send(res2.data);
            }
            res.send(JSON.stringify("Uspješno kreirana nova tema!"));
        }).catch((err) => {res.status(err.response.status); res.send(err.response.data);});
    }).catch((err) => {res.status(err.response.status); res.send(err.response.data);});
});

temeZavrsnihAPIRouter.put('/izmjeniTemu/:idTema', (req, res) => {
    let idTema = req.params.idTema;
    naziv = req.body.naziv;
    opis = req.body.opis;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    axios.put('http://localhost:31906/fox/teme/izmjeniTemu/'+idTema, {
        "naziv": naziv,
        "opis": opis
    }).then((response) => {
        if (response.status != 200) {
            res.status(response.status);
        }
        res.send(response.data);
    }).catch((err) => {res.status(err.response.status); res.send(err.response.data)});
    
});

temeZavrsnihAPIRouter.delete('/izbrisiTemu/:idTema', (req, res) => {
    let idTema = req.params.idTema;
    let greska = false;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200);
    p1=axios.delete('http://localhost:31906/fox/teme/izbrisiTemu/'+idTema).then((response) => {
       // console.log(response.status);
        if (response.status != 200) {
            res.status(response.status);
            res.send(response.data);
            greska = true;
        }
    }).catch((err) => {greska = true; res.status(err.response.status); res.send(err.response.data);});
    
    p2=axios.delete('http://localhost:31906/fox/teme/izbrisiZahtjev/'+idTema).then((response) => {
       // console.log(response.status);
        if (response.status != 200) {
            res.status(response.status);
            res.send(response.data);
            greska = true;
        }
    }).catch((err) => {greska = true; res.status(err.response.status); res.send(err.response.data);});
    //axios returns promise, Promise.all returns a single Promise that resolves when all of the promises passed as an iterable have resolved or when the iterable contains no promises. It rejects with the reason of the first promise that rejects.
    Promise.all([p1, p2]).then( ()=> {
        if(!greska)
        res.send(JSON.stringify("Uspjesno obrisana tema!"));
    });
    
});

module.exports = temeZavrsnihAPIRouter;
