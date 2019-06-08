const express = require('express');
const tabelaStudentiAPIRouter = express.Router();
const axios = require('axios');
const cors = require('cors');
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
    {naziv: 'I parcijalni ispit'},
    {naziv: 'II parcijalni ispit'},
    {naziv: 'Usmeni ispit'}
]

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
tabelaStudentiAPIRouter.get('/:index', cors(), (req, res) => {
    getAllStudents("http://localhost:31901/api/korisnik/getAllStudents")
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

tabelaStudentiAPIRouter.get('', cors(), (req,res) => {
    res.json(studenti);
});

tabelaStudentiAPIRouter.get('/ispiti', cors(), (req,res) => {
    res.json(ispiti);
});

module.exports = tabelaStudentiAPIRouter;