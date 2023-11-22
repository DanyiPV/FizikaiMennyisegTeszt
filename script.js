var request = new XMLHttpRequest();
request.open("GET", "Server/adatok.json", false);
request.send(null);
var data = JSON.parse(request.responseText);
console.log(data);
//Ha van kategória változás, itt is és a style_script.js-ben is megkell változtatni
function foOldalTablaFeltolt(kat,n){
    let tablaMenny = document.getElementsByClassName("AlapKeretDiv").length-1;
    console.log(kat);
    for(let i = 0; i<tablaMenny;i++)
    {
        let tabla = document.getElementById("AlapKeretDiv"+i);
        let sorok = tabla.getElementsByClassName("TablaSorok");
        console.log(kat);
        let katAdatok = data.map((c)=>kat.includes(c.kategoria) ? c : 0);
        console.log(katAdatok);
        for(let j = 0; j<katAdatok.length;j++)
        {
            sorok[j].getElementsByClassName("NevDiv")[0].innerText = katAdatok[j].nev;
            sorok[j].getElementsByClassName("JeleDiv")[0].innerText = katAdatok[j].jel;
            sorok[j].getElementsByClassName("DefDiv")[0].innerText = katAdatok[j].def;
            sorok[j].getElementsByClassName("MertekDiv")[0].innerText = katAdatok[j].mer;
        }
    }
}


//Teszt oldal functionjai
function katValaszt(elem){
    if(elem.innerText == "Egyéni")
    {
    }
    else{

    }
}
function menuGen(){
    let div = document.createElement("div");
    div.className="csereld";
    let AlapDiv = document.getElementsByClassName("AlapDiv")[0];
    
}
function tesztAdatGen(){
    
}
//Teszt oldal functionjai
