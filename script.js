var request = new XMLHttpRequest(); 
request.open("GET", "Server/adatok.json", false);
request.send(null);
var data = JSON.parse(request.responseText);
var AlapDiv = document.getElementsByClassName("AlapDiv")[0];
//Ha van kategória változás, itt is és a style_script.js-ben is megkell változtatni
function foOldalTablaFeltolt(kat){
    let KatNevek = [];
    kat.forEach(elem => {
        KatNevek.push(elem.split(' ')[0]);
    });
    let tablaMenny = document.getElementsByClassName("AlapKeretDiv").length;
    for(let i = 0; i<tablaMenny;i++)
    {
        let tabla = document.getElementById("AlapKeretDiv"+i);
        let sorok = tabla.getElementsByClassName("TablaSorok");
        let katAdatok = data.filter(c=> c.kategoria == KatNevek[i]);
        for(let j = 0; j<sorok.length;j++)
        {
            sorok[j].getElementsByClassName("NevDiv")[0].innerHTML += "<p>"+katAdatok[j].nev+"</p>";
            sorok[j].getElementsByClassName("JeleDiv")[0].innerHTML += "<p>"+katAdatok[j].jel+"</p>";
            sorok[j].getElementsByClassName("DefDiv")[0].innerHTML += "<p>"+katAdatok[j].def+"</p>";
            sorok[j].getElementsByClassName("MertekDiv")[0].innerHTML += "<p>"+katAdatok[j].mert+"</p>";
        }
    }
}
function menuGen(){
    let div = document.createElement("div");
    div.className="csereld";
}
function tesztAdatGen(){
    
}
//Teszt oldal functionjai
