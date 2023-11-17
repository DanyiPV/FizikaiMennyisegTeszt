var AlapDiv = document.getElementsByClassName('AlapDiv')[0];
var MasodikAlapDiv = document.createElement('div');
MasodikAlapDiv.classList.add('AlapDiv');
MasodikAlapDiv.id ="MasodikAlapDiv";

var FooldalSlider = ["Tudnivalók","Haladómozgással kapcsolatos","Rezgések és hullámok","Hőtan","Elektromossággal kapcsolatos"];
let KategoriaSelector = ['Tudnivalo','Haladómozgással','Rezgések','Hőtan','Elektromossággal'];
var SideBarOpen = 0;
var TablazatokOpen = 0;
var TestTablazatokOpen = 0;
var Timer = setInterval(Timer,1000);
var SelectedCategory = "Tudnivalo";
var KategoriakMatrix = [["Haladómozgással kapcsolatos","Körmozgás/Forgómozgás kapcsolatos","Dinamika (erőtan)","Munka/Energiával kapcsolatos","Folyadékkal kapcsolatos","Rezgés/Hullámokkal kapcsolatos"],
["Második"],
["Harmadik"],
["Negyedik"]];
var KategoriakNum = [[7,5,13,11,4,4],[],[],[]];
function Fooldal(){
    AlapDiv.innerHTML="";
    document.getElementById('FoOldal').classList.add('h2Active');
    document.getElementById('TestKitoltes').classList.remove('h2Active');
    document.getElementById('OldalName').innerHTML="<h2>Fizikai Mennyiségek</h2><p> - Főoldal</p>";
    let FoTittle = document.createElement('div');
    FoTittle.id ="FoTittle";
    FoTittle.innerHTML="<h2>Próbáld ki, mit érsz a fizika ellen!</h2>";
    AlapDiv.appendChild(FoTittle);
    Silder(AlapDiv,FooldalSlider);
    AlapDiv.appendChild(MasodikAlapDiv);
    CategoryLoad();
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
    menuGen();
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
            Opacity1('TabazatokDiv', "f");
        }
        if(TestTablazatokOpen == 1){
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
        setTimeout(Opacity1,300,'TabazatokDiv', "t");
    }else if(TablazatokOpen == 1){
        TablazatokOpen = 0;
        TK.classList.remove('TriangleDown');
        TK.classList.remove('SharpEdgeBR');
        TD.classList.remove('TabazatokDivOpen');
        SIMG1.classList.remove('SharpEdgeBL');
        Opacity1('TabazatokDiv', "f");
        setTimeout(Delay,300);
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
        SIMG2.classList.remove('SharpEdgeBL');
        Opacity1('TestTablaDivek', "f");
        TTD.classList.remove('TabazatokTestDivOpen');
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
function Delay(){
    TKS.classList.remove('TestDown');
}

function AlapKiGen(Hova,neve,n){
    let div = document.createElement('div');
    div.classList.add('AlapKeretDiv');
    div.id="AlapKeretDiv"+n;
    div.innerHTML="<p>"+neve+"</p>";
    let AlapTablaDiv = document.createElement('div');
    AlapTablaDiv.classList.add('AlapTablaKeret');
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
    AlapTablaDiv.appendChild(NevDiv);
    AlapTablaDiv.appendChild(JeleDiv);
    AlapTablaDiv.appendChild(DefDiv);
    AlapTablaDiv.appendChild(MertekDiv);
    div.appendChild(AlapTablaDiv);
    Hova.appendChild(div);
}
function SorKiGen(Hova, n){
    for (let i = 0; i < n; i++) {
        let AlaTablaDiv = document.createElement('div');
        AlaTablaDiv.classList.add('TablaSorok');
        AlaTablaDiv.id = "TablaSorok"+i;
        let NevDiv = document.createElement('div');
        NevDiv.classList.add('NevDiv');
        NevDiv.innerHTML ="";
        NevDiv.id = "Neve"+i;
        let JeleDiv = document.createElement('div');
        JeleDiv.classList.add('JeleDiv');
        JeleDiv.innerHTML ="";
        JeleDiv.id = "Jele"+i;
        let DefDiv = document.createElement('div');
        DefDiv.classList.add('DefDiv');
        DefDiv.innerHTML ="";
        DefDiv.id = "Def"+i;
        let MertekDiv = document.createElement('div');
        MertekDiv.innerHTML ="";
        MertekDiv.classList.add('MertekDiv');
        MertekDiv.id = "Mertek"+i;
        AlaTablaDiv.appendChild(NevDiv);
        AlaTablaDiv.appendChild(JeleDiv);
        AlaTablaDiv.appendChild(DefDiv);
        AlaTablaDiv.appendChild(MertekDiv);
        Hova.appendChild(AlaTablaDiv);
        if(i == n-1){
            AlaTablaDiv.classList.add("Lekerekit");
        }
    }
}

function Silder(Hova,array){
    let div = document.createElement('div');
    div.classList.add("Slider");
    for (let i = 0; i < array.length; i++) {
        let e = document.createElement('div');
        e.classList.add("SliderDiv");
        e.id = "SliderDiv"+i;
        e.setAttribute('onclick','SliderPick('+i+')');
        e.innerHTML = "<p>"+array[i]+"</p>";
        div.appendChild(e);
    }
    Hova.appendChild(div);
}

function SliderPick(id){
    let a = document.getElementsByClassName('ActiveSlider');
    if(a.length >0){
        a[0].classList.remove('ActiveSlider');
    }
    if(id == -1){
        id = KategoriaSelector.indexOf(SelectedCategory);
    }
    document.getElementById("SliderDiv"+id).classList.add("ActiveSlider");
    if(KategoriaSelector[id] != SelectedCategory && SelectedCategory != undefined){
        CategoryLoad(KategoriaSelector[id]);
    }
}

function Tudnivalok(){
    let TudnivalokDiv = document.createElement('div');
    TudnivalokDiv.classList.add('AlapKeretDiv');
    TudnivalokDiv.innerHTML="<p>Tudnivalók</p>";
    let TudnivalokDBDiv = document.createElement('div');
    TudnivalokDBDiv.classList.add('TudnivalokDBDiv');
    let TudniValo = ["Tudni való","Tudni való","Tudni való","Tudni való"];
    for (let i = 0; i < TudniValo.length; i++) {
        TudnivalokDBDiv.innerHTML +="<h2>"+(i+1)+" - "+TudniValo[i]+"</h2>";
    }
    TudnivalokDiv.appendChild(TudnivalokDBDiv);
    MasodikAlapDiv.appendChild(TudnivalokDiv);
}

function CategoryLoad(category){
    if(category != SelectedCategory){
        if(category != "" && category != undefined){
            SelectedCategory = category;
            MasodikAlapDiv.innerHTML = "";
        }
        if(SelectedCategory == "Tudnivalo" || SelectedCategory == undefined){
            SelectedCategory = "Tudnivalo";
            SliderPick(0);
            Tudnivalok();
        }else{
            SliderPick(KategoriaSelector.indexOf(SelectedCategory));
            for (let i = 0; i < KategoriakMatrix[KategoriaSelector.indexOf(SelectedCategory)-1].length; i++) {
                AlapKiGen(MasodikAlapDiv,KategoriakMatrix[KategoriaSelector.indexOf(SelectedCategory)-1][i],i);
                SorKiGen(document.getElementById('AlapKeretDiv'+i),KategoriakNum[KategoriaSelector.indexOf(SelectedCategory)-1][i]);
            }
            foOldalTablaFeltolt(KategoriaSelector.indexOf(SelectedCategory)-1);
        }
    }
    CloseSideBar();
}

Fooldal();
//AlapDiv.innerHTML += "<p style='color:white;'>W(<sub>hasznos</sub>)`/`W(<sub>befektetett</sub>)</p>";