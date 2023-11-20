let adatok=[
        {
            "nev":"Sebesség",
            "jel":"S",
            "def":"valami nagyon jó def Sebesség",
            "mer":"Méter/Secundum",
            "kat":"Haladómozgással kapcsolatos"
        },
        {
            "nev":"Távolság",
            "jel":"T",
            "def":"valami nagyon jó def Távolság",
            "mer":"Méter",
            "kat":"Haladómozgással kapcsolatos"
        },
        {
            "nev":"Teszt2",
            "jel":"Teszt2",
            "def":"Teszt2",
            "mer":"Teszt2",
            "kat":"Körmozgás/Forgómozgás kapcsolatos"
        },
        {
            "nev":"Teszt3",
            "jel":"Teszt3",
            "def":"Teszt3",
            "mer":"Teszt3",
            "kat":"Körmozgás/Forgómozgás kapcsolatos"
        }
    ];
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
console.log(adatok);

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
