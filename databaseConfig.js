var mysql = require('mysql');
var db = mysql.createConnection({
    host: "remotemysql.com",
    user: "TYQcLL35gV",
    port: "3306",
    password: "BLysSj9ZrP",
    database: "TYQcLL35gV"
   });
module.exports=db;