var request = new XMLHttpRequest(); 
request.open("GET", "Server/adatok.json", false);
request.send(null);
var data = JSON.parse(request.responseText);
var AlapDiv = document.getElementsByClassName("AlapDiv")[0];
//Ha van kategória változás, itt is és a style_script.js-ben is megkell változtatni
//Fooldalhoz
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
            sorok[j].getElementsByClassName("NevDiv")[0].innerHTML = "<p>"+katAdatok[j].nev+"</p>";
            sorok[j].getElementsByClassName("JeleDiv")[0].innerHTML = "<p>"+katAdatok[j].jel+"</p>";
            sorok[j].getElementsByClassName("DefDiv")[0].innerHTML = "<p>"+katAdatok[j].def+"</p>";
            sorok[j].getElementsByClassName("MertekDiv")[0].innerHTML = "<p>"+katAdatok[j].mert+"</p>";
        }
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "expression"]);
}

//Testoldalhoz
var MasodikAlapDiv2 = document.createElement('div');
MasodikAlapDiv2.classList.add('AlapDiv');
MasodikAlapDiv2.id ="MasodikAlapDiv2";
var TestSelectedCategory = undefined;
var ProbaTestSlider =["Haladómozgással kapcsolatos","Rezgések és hullámok","Hőtan","Elektromossággal kapcsolatos","Egyéni"];
var TestKategoriaSelector = ['Haladómozgással','Rezgések','Hőtan','Elektromossággal','Egyéni'];
function menuGen(){
    Silder(AlapDiv,ProbaTestSlider,1);
    AlapDiv.appendChild(MasodikAlapDiv2);
    TestCategoryLoad('ProbaTest');
}


function TestCategoryLoad(category){
    if(MegjelenitettOldal != 1){
        ProbaTest();
    }
    if(category != TestSelectedCategory){
        MasodikAlapDiv2.innerHTML = "";
        
        if(category != "" && category != undefined && category != 'ProbaTest'){
            TestSelectedCategory = category;
        }
        if(TestSelectedCategory == "Egyéni" || TestSelectedCategory == undefined){
            TestSelectedCategory = "Egyéni";
            SliderPick(4);
            console.log('Ide jön az egyéni');
        }else{
            SliderPick(TestKategoriaSelector.indexOf(TestSelectedCategory),1);
            let div = document.createElement('div');
            div.id = "KategoriaKivalasztDiv";
            let KatSelectDiv = document.createElement('div');
            KatSelectDiv.id ="KatSelectDiv";
            KatSelectDiv.innerHTML="<p>Kategóra Kiválasztás</p>";
            KatSelectDiv.setAttribute('onclick',"TesztKiGen()");
            div.appendChild(KatSelectDiv);
            let nudDiv = document.createElement("div");
            nudDiv.id = "KategoriaNumericUpdownDiv";
            let KatNumUD = document.createElement("input");
            KatNumUD.type = "number";
            KatNumUD.id = "KategoriaNumericUpdown";
            KatNumUD.min = 1;
            KatNumUD.max = KategoriakNum[KategoriakMatrix.indexOf(KategoriakMatrix[TestKategoriaSelector.indexOf(TestSelectedCategory)])][0];
            KatNumUD.setAttribute('onchange',"nudValtozas("+KategoriakNum[KategoriakMatrix.indexOf(KategoriakMatrix[TestKategoriaSelector.indexOf(TestSelectedCategory)])][0]+")");
            nudDiv.appendChild(KatNumUD);
            div.appendChild(nudDiv);
            MasodikAlapDiv2.appendChild(div);
            AlapKiGen(MasodikAlapDiv2,KategoriakMatrix[KategoriakMatrix.indexOf(KategoriakMatrix[TestKategoriaSelector.indexOf(TestSelectedCategory)])][0],0);
            SorKiGen(document.getElementById('AlapKeretDiv'+0),KategoriakNum[KategoriakMatrix.indexOf(KategoriakMatrix[TestKategoriaSelector.indexOf(TestSelectedCategory)])][0]);
            //ide jön a sor ki generálás miután meg lett adva
            /*for (let i = 0; i < KategoriakMatrix[TestKategoriaSelector.indexOf(TestSelectedCategory)].length; i++) {
                SorKiGen(document.getElementById('AlapKeretDiv'+i),KategoriakNum[TestKategoriaSelector.indexOf(TestSelectedCategory)][i]);
            } */
            foOldalTablaFeltolt(KategoriakMatrix[TestKategoriaSelector.indexOf(TestSelectedCategory)], TestKategoriaSelector.indexOf(TestSelectedCategory));
        }
    }
    CloseSideBar();
}

function nudValtozas(maxval){
    let nudval = parseInt(document.getElementById("KategoriaNumericUpdown").value);
    if(nudval > maxval) document.getElementById("KategoriaNumericUpdown").value = maxval.toString();
    if(nudval < 1) document.getElementById("KategoriaNumericUpdown").value = '1';
}


function kever(list) {
    const l = [...list];
    for (let i = l.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [l[i], l[j]] = [l[j], l[i]];
    }  
    return l;
  }

var rosszak = [];
var userLista = [];
var tesztLista = [];
function joEaSor(sor_be,sor_ref){
    var akt_rossz = [];
    if(sor_be.nev != sor_ref.nev)
    {
        akt_rossz.push(0);
    }
    else{
        akt_rossz.push(-1);
    }
    if(sor_be.jel != sor_ref.jel)
    {
        akt_rossz.push(1);
    }
    else{
        akt_rossz.push(-1);
    }
    if(sor_be.def != sor_ref.def)
    {
        akt_rossz.push(2);
    }
    else{
        akt_rossz.push(-1);
    }
    if(sor_be.mert != sor_ref.mert)
    {
        akt_rossz.push(3);
    }
    else{
        akt_rossz.push(-1);
    }
    rosszak.push(akt_rossz);
}

//vissza adja soronként hanyadik mező hibás
//ciklus minden elemre meghívva külön külön és bele teszi sorban a rossz listába 
//jó sornál [-1] kerül bele
// [[0,2],[3],[1,3]...]

function HosszSzam(lista){
    var db;
    for (let i = 0; i < lista.length; i++) {
        if(lista[i,0] != -1)
        {
            db++;
        }
        
    }
    return db;
}

//Teszt kigenerálása

function TesztKiGen(){
    if(document.getElementById("KategoriaNumericUpdown").value != ''){
        tesztListaFeltolt();
        userListaKiszed();
        console.log("tesztlista: ");
        console.log(tesztLista);
        console.log("userlista: ");
        console.log(userLista);
    }else{
        console.log("Nincs megadva hány sor legyen kivéve!");
    }
}


//teszt lista feltöltése a helyes adatokkal

function tesztListaFeltolt(){
    let adatLista = data.filter(c => c.kategoria == KategoriakMatrix[KategoriakMatrix.indexOf(KategoriakMatrix[TestKategoriaSelector.indexOf(TestSelectedCategory)])][0].split(' ')[0]);
    for(let i = parseInt(document.getElementById("KategoriaNumericUpdown").value)-1;i>=0;i--){
        let rnd = randomSzam(0,adatLista.length-1);
        tesztLista.push(adatLista[rnd]);
        adatLista.splice(rnd,1);
    }
    
}

//kell egy function ami kitöröl a user lstából hogy tudjon tesztelni

function userListaKiszed(){
    let szempontok = ['nev','jel','def','mert'];
    for(let i = 0; i < tesztLista.length;i++){
        let rnd = randomSzam(1,3);
        let kivettHelyek = [];
        let temp = {nev:"" ,jel:"" ,def:"" ,mert:""};
        for(let j = 0;j < rnd;j++){
            let rndHely = randomSzam(0,3);
            while(kivettHelyek.includes(rndHely)){
                rndHely = randomSzam(0,3);
            }
            temp[szempontok[rndHely]] = tesztLista[i][szempontok[rndHely]];
            tesztLista[i][szempontok[rndHely]] = "";
            kivettHelyek.push(rndHely);
        }
        userLista.push(temp);
    }
    
}


function randomSzam(also,felso){
    return Math.floor(Math.random()*(felso-also+1)+also);
}

//százalé + osztály function