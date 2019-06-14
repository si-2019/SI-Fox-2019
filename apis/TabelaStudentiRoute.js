const express = require('express');
const tabelaStudentiAPIRouter = express.Router();
const axios = require('axios');
const http = require('http');

//Return info for table Studenti
const studenti = [
    {
        index: 12345,
        imePrezime: 'Neko Nekić',
        prisustvo: 10,
        zadace: 10,
        ispiti : [
            {naziv: 'I parcijalni ispit', bodovi: '15'},
            {naziv: 'II parcijalni ispit', bodovi: '15'},
            {naziv: 'Usmeni ispit', bodovi: '20'}
        ],
        ukupno: 70,
        ocjena: 7
    },
    {
        index: 12345,
        imePrezime: 'Neko Nekić',
        prisustvo: 10,
        zadace: 10,
        ispiti : [
            {naziv: 'I parcijalni ispit', bodovi: '15'},
            {naziv: 'II parcijalni ispit', bodovi: '15'},
            {naziv: 'Usmeni ispit', bodovi: '20'}
        ],
        ukupno: 70,
        ocjena: 7
    },
    {
        index: 12345,
        imePrezime: 'Neko Nekić',
        prisustvo: 10,
        zadace: 10,
        ispiti : [
            {naziv: 'I parcijalni ispit', bodovi: '15'},
            {naziv: 'II parcijalni ispit', bodovi: '15'},
            {naziv: 'Usmeni ispit', bodovi: '20'}
        ],
        ukupno: 70,
        ocjena: 7
    }

];

const ispiti = [
    {id: 1, naziv: 'I parcijalni ispit', bodovi: 10},
    {id: 2, naziv: 'II parcijalni ispit', bodovi:15},
    {id: 3, naziv: 'Usmeni ispit', bodovi: 23}
]

const vratiBodove = () => {
    return 48;
}

//'/api/fox/tabelaStudenti?_limit=100'

function getAllStudents(endpoint) {
    return new Promise((resolve, reject) => {
        http.get(endpoint, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                resolve(JSON.parse(data));
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    });
}

// rezultat je objekat {ime: "ime", indeks: "indeks", id: _id}
// GET na api/fox/tabelaStudenti/:index
tabelaStudentiAPIRouter.get('/:index', (req, res) => {
    getAllStudents("https://si2019alpha.herokuapp.com/api/korisnik/getAllStudents")
        .then(students => {
            const student = students.find(s => s.indeks === req.params.index);
            if(!student) 
                res.status(404).json("Ne postoji student sa tim brojem indeksa!");
            else {
                res.status(200).json({
                    ime: student.ime + ' ' + student.prezime,
                    indeks: student.indeks,
                    id: student.id
                });
            }
        });
});

const azurirajOcjenu = (id, studenti, ocjena) => {
    for (let i = 0; i < studenti.length; i++) {
        if (studenti[i].id == id) {
            studenti[i].ocjena = ocjena;
            break;
        }
    }
    return studenti;
}

const azurirajZadace = (id, studenti, zadace) => {
    for (let i = 0; i < studenti.length; i++) {
        if (studenti[i].id == id) {
            studenti[i].zadace = zadace;
            break;
        }
    }
    return studenti;
}

const azurirajPrisustvo = (id, studenti, bodovi) => {
    for (let i = 0; i < studenti.length; i++) {
        if (studenti[i].id == id) {
            studenti[i].bodovi = bodovi;
            break;
        }
    }
    return studenti;
}

const azurirajUkupno = (studenti) => {
    console.log(studenti);
    for (let i = 0; i < studenti.length; i++) {
        let zbir = 0;
        zbir += studenti[i].prisustvo + studenti[i].zadace;
        for (let j=0; j<studenti[i].ispiti.length; j++) {
            zbir+= studenti[i].ispiti[j].bodovi;
        }
        studenti.ukupno = zbir;
    }
    return studenti;
}

const azurirajIspiti = (id, studenti, ispiti) => {
    for (let i = 0; i < studenti.length; i++) {
        if (studenti[i].id == id) {
            studenti[i].ispiti = ispiti;
            break;
        }
    }
    return studenti;
}

tabelaStudentiAPIRouter.get('/predmet/:idPredmeta', (req,res) => {
    let idPredmeta = req.params.idPredmeta;
    let sviStudenti = [];
    //console.log(idPredmeta);
    res.setHeader('Content-Type', 'application/json');
    promisesPrisustvo = [];
    promisesZadace = [];
    promisesOcjena = [];
    promisesIspiti= [];
    rutaStudenti="https://si2019fox.herokuapp.com/fox/studenti/"+idPredmeta;
    //Poziv apija koji vraca listu svih studenata koji slusaju predmet 
    axios.get(rutaStudenti).then((res1) => {
        for (var i = 0; i<res1.data.length; i++) {
            sviStudenti.push({
                id: res1.data[i].id, 
                imePrezime: res1.data[i].ime + " " + res1.data[i].prezime,
                indeks: res1.data[i].indeks,
                prisustvo: 0,
                zadace: 0,
                ukupno: vratiBodove(),
                ocjena: 7,
                ispiti: ispiti
             });
            promisesPrisustvo.push(
                //http://localhost:31906/fox/prisustvo/bodovi?idStudenta=104&idPredmeta=101
                axios.get("https://si2019fox.herokuapp.com/fox/prisustvo/bodovi?idStudenta="+res1.data[i].id+"&idPredmeta="+idPredmeta).then( (resBodovi) => {
                    //Azuriramo studenta
                    console.log(sviStudenti[0]); console.log(i);
                    sviStudenti = azurirajPrisustvo(sviStudenti[0].id, sviStudenti, resBodovi.data.bodovi);
                }).catch(
                    (err) => {console.log(err)}
                )
                //vraca {"bodovi": 10}
            )
            promisesOcjena.push(axios.get("https://si2019fox.herokuapp.com/fox/ocjene/"+res1.data[i].indeks+"/"+idPredmeta).then( (resOcjena) => {
                //Azuriramo ocjenu
                sviStudenti = azurirajOcjenu(resOcjena.data[i].idStudent, sviStudenti, resOcjena.data.ocjena);
                //http://localhost:31906/fox/ocjene/1/3 //index/idPredmeta
                //vraca 
                // [
                //     {
                //         "id": 1,
                //         "idStudent": 1,
                //         "idPredmet": 3,
                //         "idAkademskaGodina": 11,
                //         "ocjena": 7,
                //         "datum_upisa": "2019-06-03"
                //     }
                // ]    
                })
            );
            promisesZadace.push(axios.get("https://si2019kilo.herokuapp.com/bodoviZadace/:idStudenta/:idPredmet").then((resZadace) => {
                 sviStudenti = azurirajZadace(sviStudenti[0].id, sviStudenti, resZadace.data);
                })
            );
                
        }
        axios.all(promisesPrisustvo, promisesOcjena, promisesZadace).then(() => { //add promisesZadace
            //Sve završeno
            sviStudenti = azurirajUkupno(sviStudenti);
        }).then(res.send(sviStudenti)); 
      
    });
    
});

module.exports = tabelaStudentiAPIRouter;