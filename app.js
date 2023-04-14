const path = require('path');
const express = require('express')
const ejs = require('ejs');
const bodyParser = require('body-parser')
const port= process.env.PORT || 3000;
const mysql = require('mysql');
const db = require('./databasevariables/conn.js')
var app=express();

// set views file
app.set('views',path.join(__dirname,'views'));

//set view engine
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));


app.use('/api',require('./routes/emproutes.js'));

app.listen(port ,()=>{
    console.log("Server started on port "+ port);
});