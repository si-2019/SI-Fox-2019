const Sequelize = require("sequelize");
console.log(process.env.db_name + " " + process.env.db_user + " " + process.env.db_password)
/*const sequelize = new Sequelize(process.env.db_name, process.env.db_user, process.env.db_password, {
    host: process.env.db_host_ip,
    dialect: "mysql",
    logging: false,
    port: 3306,
    define: {
        timestamps: false
    }
});*/

//New db config
//const sequelize = new Sequelize("bREZd5lSqZ", "bREZd5lSqZ", "vdPjFjFYz3", {
const sequelize = new Sequelize("TYQcLL35gV", "TYQcLL35gV", "BLysSj9ZrP", {
  host: "mysql-3213-0.cloudclusters.net",
  dialect: "mysql",
  port: 10021,
  logging: false
});

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importovanje modela
db.Korisnik = sequelize.import(__dirname + '/Korisnik.js');
db.Predmet = sequelize.import(__dirname + '/Predmet.js');
db.TemeZavrsnih = sequelize.import(__dirname + '/TemeZavrsnih.js');
db.ZahtjeviZavrsni = sequelize.import(__dirname + '/ZahtjeviZavrsni.js');
db.PrisustvoPredavanja = sequelize.import(__dirname + '/PrisustvoPredavanja.js');
db.PrisustvoTutorijali = sequelize.import(__dirname + '/PrisustvoTutorijali.js');
db.PrisustvoVjezbe = sequelize.import(__dirname + '/PrisustvoVjezbe.js');
db.PredmetStudent = sequelize.import(__dirname + '/PredmetStudent.js');
db.IspitBodovi = sequelize.import(__dirname + '/IspitBodovi.js');
db.Ispit = sequelize.import(__dirname + '/Ispit.js');

module.exports = db;
