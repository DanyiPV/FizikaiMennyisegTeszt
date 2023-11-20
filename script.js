let adat = [];
fetch('Server/adatok.json').then((response) => response.json()).then((json) => console.log(json));
console.log(adat);
//Ha van kategória változás, itt is és a style_script.js-ben is megkell változtatni
function foOldalTablaFeltolt(number){
    let tablaMenny = document.getElementsByClassName("AlapKeretDiv").length-1;
    for(let i = 0; i<tablaMenny;i++)
    {
        let tabla = document.getElementById("AlapKeretDiv"+i);
        let sorok = tabla.getElementsByClassName("TablaSorok");
        let katAdatok = adatok.filter((c)=>c.kat == KategoriakMatrix[number][i]);
        for(let j = 0; j<katAdatok.length;j++)
        {
            sorok[j].getElementsByClassName("NevDiv")[0].innerText = katAdatok[j].nev;
            sorok[j].getElementsByClassName("JeleDiv")[0].innerText = katAdatok[j].jel;
            sorok[j].getElementsByClassName("DefDiv")[0].innerText = katAdatok[j].def;
            sorok[j].getElementsByClassName("MertekDiv")[0].innerText = katAdatok[j].mer;
        }
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
