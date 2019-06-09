const express = require('express');
const temeZavrsnihAPIRouter = express.Router();
const axios = require('axios');
const cors = require('cors');


//Pomocne funkcije
const kreirajTemu = (id, naziv, opis, odobrena, student) => {
    return {id: id, naziv: naziv, opis: opis, odobrena: odobrena, student: student}
}

const azurirajOdobrena = (id, teme) => {
    // console.log("teme poslane");
    // console.log(teme);
    let i;
    for (i=0; i<teme.length; i++) {
        if(teme[i].id == id) {
            teme[i].odobrena = "da";
            // console.log("azuriranje odobrena");
            // console.log(teme);
            break;
        }
    }
    return teme;
}

const azurirajStudent = (id, teme, student) => {
    var i;
    // console.log(id);
    // console.log("poslane teme");
    // console.log(student);
    // console.log(teme);
    for (i=0; i<teme.length; i++) {
        if(teme[i].student == id) {
            teme[i].student = student;
            // console.log("azuriranje studenta");
            // console.log(teme);
            break;
        }
    }
    return teme;
}

const upisiStudent = (id, teme, idStudenta) => {
    var i;

    for (i=0; i<teme.length; i++) {
        if(teme[i].id == id) {
            teme[i].student = idStudenta;
            // console.log("azuriranje studenta");
            // console.log(teme);
            break;
        }
    }
    return teme;
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
                promises = [];
            for(i in nizTema) {
                let id = nizTema[i].id;
                teme.push(kreirajTemu(id, nizTema[i].naziv, nizTema[i].opis, "ne", ""));
                promises.push(axios.get('http://localhost:31906/fox/teme/zahtjevi/'+id));     
            } 
            axios.all(promises).then(function(results) {
                promises2 = [];
                results.forEach(function(response) {
                    if(response.data) {
                        // console.log("Zahtjevi: "); console.log(response.data);
                        //Poziv apija - sve spremno za ubacivanje teme            
                        if (response.data.odobreno == '1') {
                            // console.log("poziv");
                            teme = azurirajOdobrena(response.data.idTema, teme);
                            teme = upisiStudent(response.data.idTema, teme, response.data.idStudent);
                            promises2.push(axios.get('http://localhost:31906/fox/getStudentInfo/'+response.data.idStudent));
                        }
                        
                    }
                    else console.log("Greska");   
                });
                axios.all(promises2).then(function(results) {
                    results.forEach(function(response) {
                        let student = response.data.ime + " " + response.data.prezime;
                        console.log("student");
                        console.log(response.data);
                        teme = azurirajStudent(response.data.id, teme, student);    
                    });                          
                }).then(()=> {
                   // console.log("Konacno: "); console.log(teme);
                    res.send(teme);
                });
            })         
        })
        .catch((err) => {
            res.status(400); 
            console.log(err);
            res.send(JSON.stringify("Doslo je do greske!"));
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
