var fs = require ('fs');
var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fizikai_tablazatok"
});

con.connect(function(err){
    if(err) throw err;
    console.log("Connected!");
    con.query('SELECT * FROM sorok', function(err,result){
        if(err) throw err;
        console.log(result);
        const jsonOutput = JSON.stringify(result,null,2);
        fs.writeFile('adatok.json',jsonOutput,'utf-8',(err) =>{
            if(err){
                console.error('Hiba: '+err.stack);
                return;
            }
            console.log('siker');
        })
        con.end();
    });
});