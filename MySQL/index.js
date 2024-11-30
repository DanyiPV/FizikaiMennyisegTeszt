const express = require('express');
const app = express();

const cors = require("cors");
const bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(cors());

var getConnection = ()=>{
    return mysql.createConnection({
        host     : "localhost",
        user     : "root",
        password : "",
        database : "fizikai_tablazatok" //adatbázis neve
    })
};

app.get('/', function(req, res){
    const connection = getConnection();
    let joe = true;
    connection.connect((err)=>{
        if(err) {
            res.send({"Error": "Nem jött létre a kapcsolat az adatbázissal."});
            joe = false;
        }
    });
    if(joe) {
        connection.query('show tables', function (error, results, fields) {
            res.send(results);
        });
    }
    connection.end();
});

app.post("/lekerdezes", bodyParser.json(), function(req,res){
    var connection = getConnection();
    connection.connect();
    const lekerdezes = req.body.lekerdezes;
    connection.query(lekerdezes, function(err, result,fields){
        if(!err){
            res.send(result);
        }else{
            res.send({"Error": 'A lekérdezés nem hozott eredményt!'});
        }
    })
    connection.end();
});

const validator = require("email-validator");

// Email validálás endpoint
app.post("/validate-email", bodyParser.json(), function (req, res) {
    var connection = getConnection();
    connection.connect();

    const email = req.body.email;

     const isValid = validator.validate(email);

    if (isValid) {
        res.json({ valid: true });
    } else {
        res.json({ valid: false });
    }

    connection.end();
});
 
app.listen(3000);
