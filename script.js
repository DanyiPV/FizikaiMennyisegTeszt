var request = new XMLHttpRequest(); 
request.open("GET", "Server/adatok.json", false);
request.send(null);
var data = JSON.parse(request.responseText);
var AlapDiv = document.getElementsByClassName("AlapDiv")[0];
//Ha van kategória változás, itt is és a style_script.js-ben is megkell változtatni

var rosszak = [];
var userLista = [];
var tesztLista = [];
var kivettElemek = [];

//Testoldalhoz
var MasodikAlapDiv2 = document.createElement('div');
MasodikAlapDiv2.classList.add('AlapDiv');
MasodikAlapDiv2.id ="MasodikAlapDiv2";
var TestSelectedCategory = undefined;
var ProbaTestSlider =["Haladómozgással kapcsolatos","Rezgések és hullámok","Hőtan","Elektromossággal kapcsolatos","Egyéni"];
var TestKategoriaSelector = ['Haladómozgással','Rezgések','Hőtan','Elektromossággal','Egyéni'];

//Fooldalhoz
function foOldalTablaFeltolt(kat,katindex){
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
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "expression"]);//Újra tölti az ascii mathat hogy működjön
}

function testOldalTablaFeltolt(){
    let tabla = document.getElementById("AlapKeretDiv0");
    console.log(TestSelectedCategory);
    let sorok = tabla.getElementsByClassName("TablaSorok");
    let katAdatok = userLista;
    for(let j = 0; j<sorok.length;j++)
    {
        sorok[j].getElementsByClassName("NevDiv")[0].innerHTML = "<p>"+katAdatok[j].nev+"</p>";
        sorok[j].getElementsByClassName("JeleDiv")[0].innerHTML = "<p>"+katAdatok[j].jel+"</p>";
        sorok[j].getElementsByClassName("DefDiv")[0].innerHTML = "<p>"+katAdatok[j].def+"</p>";
        sorok[j].getElementsByClassName("MertekDiv")[0].innerHTML = "<p>"+katAdatok[j].mert+"</p>";
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "expression"]);//Újra tölti az ascii mathat hogy működjön
}

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
            let fodiv = document.createElement("div");
            fodiv.id = "dragContainer";
            nudDiv.appendChild(KatNumUD);
            div.appendChild(nudDiv);
            MasodikAlapDiv2.appendChild(div);
            AlapKiGen(MasodikAlapDiv2,KategoriakMatrix[KategoriakMatrix.indexOf(KategoriakMatrix[TestKategoriaSelector.indexOf(TestSelectedCategory)])][0],0);
            MasodikAlapDiv2.appendChild(fodiv);
            //SorKiGen(document.getElementById('AlapKeretDiv'+0),KategoriakNum[KategoriakMatrix.indexOf(KategoriakMatrix[TestKategoriaSelector.indexOf(TestSelectedCategory)])][0]);
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
        rosszak = [];
        userLista = [];
        tesztLista = [];
        gombDisable(true);
        tesztListaFeltolt();
        userListaKiszed();
        console.log("tesztlista: ");
        console.log(tesztLista);
        console.log("userlista: ");
        console.log(userLista);
        SorKiGen(document.getElementById('AlapKeretDiv'+0),parseInt(document.getElementById("KategoriaNumericUpdown").value))
        testOldalTablaFeltolt();
        dragContainerGEN();
        MathJax.Hub.Queue(["Typeset",MathJax.Hub, "expression"]);
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
            //tesztLista[i][szempontok[rndHely]] = ""; //Az adatoknak ott kell lenniük különben nem tudjuk össze hasonlítani (persze majd valahogy titkosítani kell)
            kivettHelyek.push(rndHely);
        }
        for(let j = 0;j < 4;j++){
            if(!kivettHelyek.includes(j)){
                kivettElemek.push(tesztLista[i][szempontok[j]]);
            }
        }
        //console.log(kivettHelyek,kivettElemek);
        userLista.push(temp);
    }
    kever(userLista);
}


function randomSzam(also,felso){
    return Math.floor(Math.random()*(felso-also+1)+also);
}

//százalék + osztályzat function

function osztalyozas(min,max){
    var szazalek;
    var jegy;
    var eredmeny = [];

    szazalek = Math.floor(min/max*100);

    if(szazalek > 80){
        jegy = 5;
    }
    else if(szazalek > 65 && szazalek < 80){
        jegy = 4;
    }
    else if(szazalek > 50 && szazalek < 65){
        jegy = 3;
    }
    else if(szazalek > 30 && szazalek < 50){
        jegy = 2;
    }
    else if(szazalek > 0 && szazalek < 30){
        jegy = 1;
    }

    eredmeny.push(szazalek);
    eredmeny.push(jegy);
    return eredmeny;
    //[%,5]
}

//gombok ki/be kapcs meg bármi más kerüljön ide amit ki kell kapcsolni a teszt erejéig
function gombDisable(state){
    if(state){
        document.getElementById("KatSelectDiv").setAttribute("onclick","");
        Array.prototype.slice.call(document.getElementsByClassName("SliderDiv")).map((c)=>c.setAttribute("onclick",""));
    }else
    {
        document.getElementById("KatSelectDiv").setAttribute("onclick","TesztKiGen()");
        let sliderLista = document.getElementsByClassName("SliderDiv");
        for(let i= 0; i<sliderLista.length;i++){
            sliderLista[i].setAttribute("SliderPick("+i+",1)");//Ez még nem bizt hogy jó
        }
    }
}

//drag and droppos cuccok
function dragContainerGEN(){
    let dragCont = document.getElementById("dragContainer");
    dragCont.innerHTML="";
    for(let i = 0;i<kivettElemek.length;i++){
        let elem = document.createElement("div");
        elem.innerHTML = kivettElemek[i];
        dragCont.appendChild(elem);
    }
}