const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');  // definisanje env varijabli
dotenv.config();
// postavljanje configa 

// init express
const app = express();
const port = process.env.port || 31906;
const cors = require('cors');

//Body parser
app.use(bodyParser.json());

//Swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//database connection
/*const db = require('./databaseConfig.js');  
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});*/

//database connection sa sequelize
const db = require ('./models/db.js');
db.sequelize.sync()
    .then(() => console.log("Connected!"))
    .catch((err)=> console.log("Neuspjesno povezivanje"))
    

//npm run dev
app.get('/', (req, res) => res.send('Hello World from FOX!'));

//---------------Mikroservisi--------------------------------------------------------------------
const TemeZavrsnihRouter = require('./services/TemeZavrsnihRoute');
//Definisanje rute za Teme Zavrsnih
app.use('/fox/teme', TemeZavrsnihRouter);
const ZahtjeviZavrsniRouter = require('./services/ZahtjeviZavrsniRoute');
app.use('/fox/teme', ZahtjeviZavrsniRouter);


//---------------APIs--------------------------------------------------------------------
const temeZavrsnihAPIRouter = require('./apis/TemeZavrsnihRoute');
app.use('/api/fox/temeZavrsnih', temeZavrsnihAPIRouter);
const pocetnaStranicaAPIRouter = require('./apis/PocetnaStranicaRoute');
app.use('/api/fox', pocetnaStranicaAPIRouter);
const tabelaStudentiAPIRouter = require('./apis/TabelaStudentiRoute');
app.use('/api/fox/tabelaStudenti', tabelaStudentiAPIRouter);

//------------Hardkodirani APIji-----------------------------------------




//Listen on port
app.listen(port, () => console.log(`Example app listening on port ${port}!`))