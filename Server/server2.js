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
    con.query(sql, function(err,res){
        if(err) throw err;
        console.log("Result: "+res);
    });
});