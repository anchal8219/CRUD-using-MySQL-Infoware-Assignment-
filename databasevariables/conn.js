var mysql = require('mysql');  
var db = mysql.createConnection({  
host: "localhost",  
user: "root",  
password: "",   
database: "employeeDetail"  
});  
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Mysql Database!!");
});

 

module.exports = db;