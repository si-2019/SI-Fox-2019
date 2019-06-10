const express = require('express');
const studentInfoRouter = express.Router();
const studentInfoUtils = require('../utils/studentInfoUtils');

studentInfoRouter.get('/:id',(req, res) => {
    let id = req.params.id;
    res.setHeader('Content-Type', 'application/json');

    studentInfoUtils.getInfo(id, (err, student) => {
        if (err) {
            res.status(404);
            res.send(JSON.stringify({
                message:'Greska! Ne postoji student sa datim id-em.',
                err
            }))
        }
        else res.send(student);
    })

});


module.exports = studentInfoRouter;

