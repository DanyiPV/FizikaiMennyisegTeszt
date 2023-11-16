var AlapDiv = document.getElementsByClassName('AlapDiv')[0];
var SideBarOpen = 0;
var TablazatokOpen = 0;
var TestTablazatokOpen = 0;
var Timer = setInterval(Timer,1000);
function Fooldal(){
    AlapDiv.innerHTML="";
    document.getElementById('FoOldal').classList.add('h2Active');
    document.getElementById('TestKitoltes').classList.remove('h2Active');
    document.getElementById('OldalName').innerHTML="<h2>Fizikai Mennyiségek</h2><p> - Főoldal</p>";
    let FoTittle = document.createElement('div');
    FoTittle.id ="FoTittle";
    FoTittle.innerHTML="<h2>Próbáld ki, mit érsz a fizika ellen!</h2>";
    AlapDiv.appendChild(FoTittle);

    let TudnivalokDiv = document.createElement('div');
    TudnivalokDiv.classList.add('AlapKeretDiv');
    TudnivalokDiv.innerHTML="<p>Tudnivalók</p>";
    let TudnivalokDBDiv = document.createElement('div');
    TudnivalokDBDiv.classList.add('TudnivalokDBDiv');
    TudnivalokDBDiv.innerHTML +="<h2>1 - Tudni való</h2>";
    TudnivalokDBDiv.innerHTML +="<h2>2 - Tudni való</h2>";
    TudnivalokDBDiv.innerHTML +="<h2>3 - Tudni való</h2>";
    TudnivalokDBDiv.innerHTML +="<h2>4 - Tudni való</h2>";
    TudnivalokDiv.appendChild(TudnivalokDBDiv);
    AlapDiv.appendChild(TudnivalokDiv);

    let HaladoMozgas = document.createElement('div');
    HaladoMozgas.classList.add('AlapKeretDiv');
    HaladoMozgas.innerHTML="<p>Haladómozgással kapcsolatos</p>";
    let AlaTablaDiv = document.createElement('div');
    AlaTablaDiv.classList.add('AlaTablaKeret');
    let NevDiv = document.createElement('div');
    NevDiv.classList.add('NevDiv');
    NevDiv.innerHTML ="<p>Neve</p>";
    let JeleDiv = document.createElement('div');
    JeleDiv.classList.add('JeleDiv');
    JeleDiv.innerHTML ="<p>Jele</p>";
    let DefDiv = document.createElement('div');
    DefDiv.classList.add('DefDiv');
    DefDiv.innerHTML ="<p>Definíciója</p>";
    let MertekDiv = document.createElement('div');
    MertekDiv.innerHTML ="<p>Mértékegysége</p>";
    MertekDiv.classList.add('MertekDiv');
    AlaTablaDiv.appendChild(NevDiv);
    AlaTablaDiv.appendChild(JeleDiv);
    AlaTablaDiv.appendChild(DefDiv);
    AlaTablaDiv.appendChild(MertekDiv);
    HaladoMozgas.appendChild(AlaTablaDiv);
    AlapDiv.appendChild(HaladoMozgas);


    CloseSideBar();
}

var BG = document.getElementById('BlackBackground');
var SBD = document.getElementById('SideBarDiv');
var TK = document.getElementById('TablazatokKiNyil');
var TK1 = document.getElementById('TestTablazatokKiNyil');
var TTD = document.getElementById('TestTablaDivek');
var TKS = document.getElementById('TestKitoltes');
var TD = document.getElementById('TabazatokDiv');
var SIMG1 = document.getElementById('SideBarIMG1');
var SIMG2 = document.getElementById('SideBarIMG2');

function ProbaTest(){
    AlapDiv.innerHTML="";
    TKS.classList.add('h2Active');
    document.getElementById('FoOldal').classList.remove('h2Active');
    document.getElementById('OldalName').innerHTML="<h2>Fizikai Mennyiségek</h2><p> - Teszt kitöltés</p>";
    let FoTittle = document.createElement('div');
    FoTittle.id ="FoTittle";
    FoTittle.innerHTML="<h2>Ez lesz a test oldal</h2>";
    AlapDiv.appendChild(FoTittle);
    CloseSideBar();
}

function SideBar(){
    if(SideBarOpen == 0){
        SideBarOpen=1;
        SBD.classList.add('SideBarDivOpen');
        BG.classList.add('BlackBackgroundActive');
        BG.setAttribute('onclick',"CloseSideBar()")
    }
}
function CloseSideBar(){
    if(SideBarOpen == 1){
        SideBarOpen = 0;
        SBD.classList.remove('SideBarDivOpen');
        BG.classList.remove('BlackBackgroundActive');
        BG.removeAttribute('onclick',"CloseSideBar()")
        if(TablazatokOpen == 1){
            TablazatokOpen = 0;
            TK.classList.remove('TriangleDown');
            TK.classList.remove('SharpEdgeBR');
            TKS.classList.remove('TestDown');
            TD.classList.remove('TabazatokDivOpen');
            SIMG1.classList.remove('SharpEdgeBL');
        }
        if(TestTablazatokOpen == 1){
            TestTablazatokOpen = 0;
            TK1.classList.remove('TriangleDown');
            TK1.classList.remove('SharpEdgeBR');
            TTD.classList.remove('TabazatokTestDivOpen');
            SIMG2.classList.remove('SharpEdgeBL');
        }
        if(TablazatokOpen == 0 && TestTablazatokOpen == 0){
            SBD.style.overflowY = "hidden";
        }
    }
}
function Timer(){
    if(SideBarOpen == 1){
        const d = new Date();
        let hour = d.getHours();
        let min = d.getMinutes()
        document.getElementById('Time').innerHTML = "<p>"+(hour<10?"0"+hour:hour)+":"+(min<10?"0"+min:min)+"</p>"
    }
}
function TablazatokKiNyil(){
    if(TablazatokOpen == 0){
        TablazatokOpen = 1;
        SBD.style.overflowY = "auto";
        SBD.style.overflowX = "hidden";
        TK.classList.add('TriangleDown');
        TKS.classList.add('TestDown');
        TD.classList.add('TabazatokDivOpen');
        SIMG1.classList.add('SharpEdgeBL');
        TK.classList.add('SharpEdgeBR');
        setTimeout(Opacity1,200,'TabazatokDiv', "t");
    }else if(TablazatokOpen == 1){
        TablazatokOpen = 0;
        TK.classList.remove('TriangleDown');
        TK.classList.remove('SharpEdgeBR');
        TKS.classList.remove('TestDown');
        TD.classList.remove('TabazatokDivOpen');
        SIMG1.classList.remove('SharpEdgeBL');
        Opacity1('TabazatokDiv', "f");
    }
    if(TablazatokOpen == 0 && TestTablazatokOpen == 0){
        SBD.style.overflowY = "hidden";
    }
}
function TestTablaDivek(){
    if(TestTablazatokOpen == 0){
        TestTablazatokOpen = 1;
        SBD.style.overflowY = "auto";
        SBD.style.overflowX = "hidden";
        TK1.classList.add('TriangleDown');
        TK1.classList.add('SharpEdgeBR');
        TTD.classList.add('TabazatokTestDivOpen');
        SIMG2.classList.add('SharpEdgeBL');
        setTimeout(Opacity1,200,'TestTablaDivek', "t");
    }else if(TestTablazatokOpen == 1){
        TestTablazatokOpen = 0;
        TK1.classList.remove('TriangleDown');
        TK1.classList.remove('SharpEdgeBR');
        TTD.classList.remove('TabazatokTestDivOpen');
        SIMG2.classList.remove('SharpEdgeBL');
        Opacity1('TestTablaDivek', "f");
    }
    if(TablazatokOpen == 0 && TestTablazatokOpen == 0){
        SBD.style.overflowY = "hidden";
    }
}

function Opacity1(id, t){
    if(t == "t"){
        document.getElementById(id).style.opacity = '1';
    }else{
        document.getElementById(id).style.opacity = '0';
    }
}

Fooldal();