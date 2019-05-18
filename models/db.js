const Sequelize = require("sequelize");
console.log(process.env.db_name + " " + process.env.db_user + " " + process.env.db_password)
const sequelize = new Sequelize(process.env.db_name, process.env.db_user, process.env.db_password, {
    host: process.env.db_host_ip,
    dialect: "mysql",
    logging: false,
    port: 3306,
    define: {
        timestamps: false
    }
});
const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importovanje modela
db.Korisnik = sequelize.import(__dirname + '/Korisnik.js');
db.Predmet = sequelize.import(__dirname + '/Predmet.js');
db.TemeZavrsnih = sequelize.import(__dirname + '/TemeZavrsnih.js');
db.ZahtjeviZavrsni = sequelize.import(__dirname + '/ZahtjeviZavrsni.js');
db.PredmetStudent = sequelize.import(__dirname + '/PredmetStudent.js');

module.exports = db;