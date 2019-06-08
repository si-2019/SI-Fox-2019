const express = require('express');
const temeZavrsnihAPIRouter = express.Router();
const axios = require('axios');
const cors = require('cors');


//Pomocne funkcije
const kreirajTemu = (id, naziv, opis, odabrana, student) => {
    return {id: id, naziv: naziv, opis: opis, odabrana: odabrana, student: student}
}

const vratiNaziv = (nazivi, id) => {
    for(naziv in nazivi) {
        if (naziv.id == id) return naziv.naziv;
    }
    return "";
}

const vratiOpis = (opisi, id) => {
    for(opis in opisi) {
        if (opis.id == id) return opis.opis;
    }
    return "";
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
            var teme = [], 
                nazivi = [], 
                opisi = [],
                promises = [];

            for(i in nizTema) {
                let id = nizTema[i].id;
                let naziv = {"id": id, "naziv": nizTema[i].naziv};
                nazivi.push(naziv);
                let opis = {"id": id, "opis": nizTema[i].opis};
                opisi.push(opis);
                //console.log(res1.data[i].id);
                promises.push(axios.get('http://localhost:31906/fox/teme/zahtjevi/'+id));     
            } 
            console.log("Nazivi: "); console.log(nazivi);
            console.log("Opisi: "); console.log(opisi);
            axios.all(promises).then(function(results) {
               
               // console.log(promises.length);
               results.forEach(function(response) {
                    if(response && response.data) {
                        // console.log(response.data);
                        //Poziv apija - sve spremno za ubacivanje teme
                        let odobreno = "ne";
                        if (response.data.odobreno == '1') {
                            odobreno = "da"; //trazi
                            axios.get('http://localhost:31906/fox/getStudentInfo/'+response.data.idStudent).then(
                                (res3) => {
                                    try{
                                        let student = res3.data.ime + " " + res3.data.prezime;
                                        let id = response.data.idTema;
                                        let naziv = vratiNaziv(nazivi, id), opis = vratiOpis(opisi, id);
                                        tema = kreirajTemu(id, naziv, opis, odobreno, student);
                                        teme.push(tema); 
                                        console.log(tema);
                                    }
                                    catch(err) {

                                    }  
                                }  
                            )
                         
                        }
                        else {
                            try {
                                let id = response.data.idTema;
                                let naziv = vratiNaziv(nazivi, id), opis = vratiOpis(opisi, id);                              
                                tema = kreirajTemu(id, naziv, opis, odobreno, "");
                                console.log(tema);
                                teme.push(tema); 
                            }
                            catch(err) {

                            };
                        } 
                    }
                    else console.log("Greska");
                   
               })
            }).then(() => {
                console.log(teme.length);
                res.send(teme); 
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
