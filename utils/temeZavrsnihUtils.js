const db = require('../models/db');

const getTemeZavrsnih = (idPredmeta, callback) => {
    console.log("idPredmeta" + idPredmeta);
    db.TemeZavrsnih.findAll({
        where: {idPredmeta : idPredmeta},
        attributes: ['id','naziv', 'opis', 'idPredmeta']  
    }).then((teme) => {
        console.log(teme);
        callback(null, teme);
        //return teme?
    });
}

module.exports = {
    getTemeZavrsnih
}