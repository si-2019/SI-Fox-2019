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
    axios.get('http://localhost:31906/fox/teme/'+idPredmeta)
    .then(
        (res1) => {
            let nizTema = res1.data; //id, naziv, opis teme
            var teme = [];
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

                        return teme;                   
                    }
                ).catch(err => console.log(err));
            }
            rez.then((teme)=> {
                //console.log(teme);
                res.send(teme);
            });         
        })
    .catch(err => console.log(err));
    
});

temeZavrsnihAPIRouter.post('/novaTema', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    //console.log(req.body);
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
        axios.post('http://localhost:31906/fox/teme/dodajZahtjev', {
        "idTema":  response.data.tema.id,
        "idStudent": null,
        "idProfesor": idProfesora,
        "odobreno": null
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));

    res.send("");
});

temeZavrsnihAPIRouter.put('/izmjeniTemu/:idTema', (req, res) => {
    let idTema = req.params.idTema;
    naziv = req.body.naziv;
    opis = req.body.opis;
    res.setHeader('Content-Type', 'application/json');
    axios.put('http://localhost:31906/fox/teme/izmjeniTemu/'+idTema, {
        "naziv": naziv,
        "opis": opis
    }).then((response) => {
        console.log(response);
    }).catch(err => console.log(err));
    res.send("");
});

temeZavrsnihAPIRouter.delete('/izbrisiTemu/:idTema', (req, res) => {
    let idTema = req.params.idTema;
    res.setHeader('Content-Type', 'application/json');
    axios.delete('http://localhost:31906/fox/teme/izbrisiTemu/'+idTema).then((response) => {
        console.log(response);
    }).catch(err => console.log(err));
    
    axios.delete('http://localhost:31906/fox/teme/izbrisiZahtjev/'+idTema).then((response) => {
        console.log(response);
    }).catch(err => console.log(err));

    res.send("");
});

module.exports = temeZavrsnihAPIRouter;
