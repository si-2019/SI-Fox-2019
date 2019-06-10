const db = require('../models/db');

const getInfo = (id, callback) => {
    db.Korisnik.findOne({
        where: {id: id},
        attributes: ['id', 'ime', 'prezime', 'indeks']
    }).then((student)=>{
        if (!student) callback(true);
        else callback(null, student);
    })
}

module.exports = {
    getInfo
}