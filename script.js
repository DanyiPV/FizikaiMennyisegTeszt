// ---- Login oldal
var Users;
var User;
var MegerositoKod = "88888888";

function LabelFeltol(index){
  WarningsRemove();
  if(!document.getElementById("label"+index).classList.contains("LabelFeltol") && document.getElementById("Input"+index).value == "" || document.activeElement.id == "Input"+index){
    document.getElementById("label"+index).classList.add("LabelFeltol");
    document.getElementById("QuestionDiv").classList.add("QuestionMarkHide");
    setTimeout(FeltolasCheck,2500,index);
  }
}

function FeltolasCheck(index){
  if(document.getElementById("Input"+index).value == "" && document.activeElement.id != "Input"+index){
    document.getElementById("label"+index).classList.remove("LabelFeltol");
    document.getElementById("QuestionDiv").classList.remove("QuestionMarkHide");
  }if(document.activeElement.id == "Input"+index){
    setTimeout(FeltolasCheck,2500,index);
    document.getElementById("QuestionDiv").classList.add("QuestionMarkHide");
  }
}

function ValueCheck(index){
  FeltolasCheck(index);
  if(document.getElementById("Input"+index).value != "" || document.activeElement.id == "Input"+index){
    LabelFeltol(index);
    document.getElementById("QuestionDiv").classList.add("QuestionMarkHide");
  }
}

function ElfelejtettJelszo(){
    FaultDivOpen("A jelszó megváltoztatásához keresse meg a rendszergazdát!");
}

function WarningsRemove(){
  let ClassLists = ["WarningColor","WarningBorderColor"];
  for (let i = 0; i < ClassLists.length; i++) {
    let Warnings = document.getElementsByClassName(ClassLists[i]);
    if(Warnings.length>0){
      while(Warnings.length != 0){
        Warnings[0].classList.remove(ClassLists[i]);
      }
    }
  }
}

function PasswordShow(Side){
  if(Side == "Login"){
    if(document.getElementById('PasswordShow1').checked == true){
      document.getElementById("Input2").type = "text";
    }else{
      document.getElementById("Input2").type = "password";
    }
  }else{
    if(document.getElementById('PasswordShow2').checked == true){
      document.getElementById("Input5").type = "text";
      document.getElementById("Input6").type = "text";
    }else{
      document.getElementById("Input5").type = "password";
      document.getElementById("Input6").type = "password";
    }
  }
}

function QuestionMark(text){
  if(!document.getElementById('AnswearDiv').classList.contains("AnswearDivOpen")){
    document.getElementById('AnswearDiv').classList.add("AnswearDivOpen");
    document.getElementById("QuestionAnsP").innerText = text;
    setTimeout(AnswearDivClose,5000);
  }
}

function AnswearDivClose(){
  document.getElementById('AnswearDiv').classList.remove("AnswearDivOpen");
}

function LogRegSwitch(side){
  if(side == "B"){
    document.getElementById("UnderLine").classList.remove("UnderLineChange");
    document.getElementById('LoginTab').classList.remove("LogSideSwitch");
    document.getElementById("RegisterTab").classList.remove("RegSideSwitch");
    document.getElementById('Container').classList.add("HeightChange");
  }else if(side == "R"){
    AnswearDivClose();
    document.getElementById("UnderLine").classList.add("UnderLineChange");
    document.getElementById('LoginTab').classList.add("LogSideSwitch");
    document.getElementById("RegisterTab").classList.add("RegSideSwitch");
    document.getElementById('Container').classList.remove("HeightChange");
  }
}

function TanarCheck(){
  if(document.getElementById("TanarRadioButton").checked){
    document.getElementById("TanarKod").style.opacity="1";
    document.getElementById("TanarKod").style.zIndex = "13";
    document.getElementById("OsztalySelect").style.opacity="0";
  }else{
    document.getElementById("TanarKod").style.opacity="0";
    document.getElementById("OsztalySelect").style.opacity="1";
  }
}

function KodCheck(div){
  if(div.value == MegerositoKod){
    return true;
  }
  return false;
}

function Bejelentkezes(){
  if(document.getElementById("Input1").value != "" && document.getElementById("Input2").value != ""){
    AnswearDivClose();
    User = Users.find(c=>c.email == document.getElementById("Input1").value);
    if(User != undefined && User.jelszo == document.getElementById("Input2").value){
        let User_serialized = JSON.stringify(User);
        localStorage.setItem("user",User_serialized);
        window.open("index.html","_self");
    }else{
      if(User == undefined){
        document.getElementById("label1").classList.add("WarningColor");
        document.getElementById("Input1").classList.add("WarningBorderColor");
        FaultDivOpen("Hibásan írta be az email címet!");
      }else if(User.jelszo != document.getElementById("Input2").value){
        document.getElementById("label2").classList.add("WarningColor");
        document.getElementById("Input2").classList.add("WarningBorderColor");
        FaultDivOpen("Hibásan írta be a jelszót!");
      }
    }
  }else if(document.getElementById("Input1").value == "" && document.getElementById("Input2").value == ""){
    AnswearDivClose();
    document.getElementById("label1").classList.add("WarningColor");
    document.getElementById("label2").classList.add("WarningColor");
    document.getElementById("Input1").classList.add("WarningBorderColor");
    document.getElementById("Input2").classList.add("WarningBorderColor");
    QuestionMark("Írjon be egy eamil címet és egy jelszót!");
  }
  else if(document.getElementById("Input1").value == ""){
    document.getElementById("label1").classList.add("WarningColor");
    document.getElementById("Input1").classList.add("WarningBorderColor");
    FaultDivOpen("Írjon be egy email címet!");
  }else if(document.getElementById("Input2").value == ""){
    document.getElementById("label2").classList.add("WarningColor");
    document.getElementById("Input2").classList.add("WarningBorderColor");
    FaultDivOpen("Írjon be egy jelszót!");
  }
}

function Regisztralas(){
  if(MindenKitoltve()){
    let d = new Date();
    let datum = {year: d.getFullYear(),month:((Number(d.getMonth())+1)<10?"0"+(Number(d.getMonth())+1):(Number(d.getMonth())+1)),day: (d.getUTCDate()<10?"0"+d.getUTCDate():d.getUTCDate()),hour:(d.getHours()<10?"0"+d.getHours():d.getHours()),minute: (d.getMinutes()<10?"0"+d.getMinutes():d.getMinutes())};
    let Modositva = datum.year+"."+datum.month+"."+datum.day+"-"+datum.hour+":"+datum.minute+"("+datum.year+"."+datum.month+"."+datum.day+"-"+datum.hour+":"+datum.minute+")";
    let osztaly = document.getElementById("DiakEvfolyam").value+"/"+document.getElementById("DiakOsztaly").value;
    User = {email: document.getElementById("Input4").value,nev:document.getElementById("Input3").value,jelszo: document.getElementById("Input5").value,osztaly: document.getElementById("DiakRadioButton").checked?osztaly:"T",modositva: Modositva};
    UsersFeltolt(User);
  }
}

function UserCheck(response){
  if(response.statusText != "OK"){
    console.log("Valami nem sikerült az adat felvitelben!");
  }
  else if(response.statusText == "OK"){
    AdatokBetoltes();
    document.getElementById("Input3").value = "";
    document.getElementById("Input4").value = "";
    document.getElementById("Input6").value = "";
    document.getElementById("DiakEvfolyam").value = "9";
    document.getElementById("DiakOsztaly").value = "A";
    LogRegSwitch("B");
  }
}

function MindenKitoltve(){
  FaultDivClose();
  let Igaze = true;
  if(document.getElementById("Input3").value == ""){
    Igaze = false;
    FaultDivOpen("Nem írt be felhasználó nevet!");
    document.getElementById("label3").classList.add("WarningColor");
    document.getElementById("Input3").classList.add("WarningBorderColor");
  }
  if(document.getElementById("Input4").value == "" || document.getElementById("Input4").value.split('@') == undefined || document.getElementById("Input4").value.split('@')[0] == "" || document.getElementById("Input4").value.split('@')[1] != "ckik.hu" || EmailCheck(document.getElementById("Input4").value) == false){
    Igaze = false;
    FaultDivOpen("Az eamilt rosszúl írta be vagy már regisztálva van!");
    document.getElementById("label4").classList.add("WarningColor");
    document.getElementById("Input4").classList.add("WarningBorderColor");
  }
  if(document.getElementById("Input5").value == "" || document.getElementById("Input5").value != document.getElementById("Input6").value){
    Igaze = false;
    let szoveg = "Nem írt be jelszót!";
    document.getElementById("label5").classList.add("WarningColor");
    document.getElementById("Input5").classList.add("WarningBorderColor");
    if(document.getElementById("Input5").value == document.getElementById("Input6").value){
      document.getElementById("label6").classList.add("WarningColor");
      document.getElementById("Input6").classList.add("WarningBorderColor");
      szoveg = "A jelszavak nem egyeznek!";
    }
    FaultDivOpen(szoveg);
  }
  if(document.getElementById("Input6").value == "" || document.getElementById("Input5").value != document.getElementById("Input6").value){
    Igaze = false;
    let szoveg = "Nem írt be jelszót!";
    document.getElementById("label6").classList.add("WarningColor");
    document.getElementById("Input6").classList.add("WarningBorderColor");
    if(document.getElementById("Input5").value == document.getElementById("Input6").value){
      document.getElementById("label5").classList.add("WarningColor");
      document.getElementById("Input5").classList.add("WarningBorderColor");
      szoveg = "A jelszavak nem egyeznek!";
    }
    FaultDivOpen(szoveg);
  }
  if(document.getElementById("TanarRadioButton").checked == true && !KodCheck(document.getElementById("TanarKodCheck"))){
    Igaze = false;
    FaultDivOpen("Nem jó kódott adott meg!");
    document.getElementById("TanarKodCheckLabel").classList.add("WarningColor");
  }
  return Igaze;
}

function EmailCheck(email){
  UsersBetoltese();
  return Users.find(c=>c.email==email)==undefined?true:false;
}

function FaultDivOpen(fault){
  if(!document.getElementById("FaultDiv").classList.contains("FaultDivOpen")){
    document.getElementById("FaultDiv").classList.add("FaultDivOpen");
    document.getElementById("FaultDiv").innerHTML ="<p>"+fault+"</p>";
    setTimeout(FaultDivClose,5000);
  }
}

function FaultDivClose(){
  document.getElementById("FaultDiv").classList.remove("FaultDivOpen");
}

UsersBetoltese();
// ---- Login oldal --------------------------------------------------------------------------------------------------------------------------------------------



// ---- Fő oldal --------------------------------------------------------------------------------------------------------------------------------------------
var Time = setInterval(Timer,1000);
var adatok;
var TeljesKategoriak = new Array();
var Kategoriak = new Array();
var SajatKategoria = [{id:"Tabla",plus:"Tudnivalók",onclick:"KategoriaLoad(this)",load: "FoOldalLoad()"},{id:"TestTabla",plus:"Egyéni",onclick:"TestKategoriaLoad(this)"}]; // Az id az csak a side barhoz kell
var KivalasztottKategoriak = [];
var SelectedCategory;
var KevertLista = [];
var MPontSzam = 0;
var BetettErtekek = [];

function Timer(){
    let d = new Date();
    document.getElementById("Time")!=undefined?document.getElementById("Time").innerHTML = "<p>"+(d.getHours()<10?"0"+d.getHours():d.getHours())+":"+(d.getMinutes()<10?"0"+d.getMinutes():d.getMinutes())+"</p>":"";
}

function SideBar(){
    if(document.getElementById("Sidebar").dataset.disable == undefined || document.getElementById("Sidebar").dataset.disable == "false"){
        document.getElementById("SideBarDiv").classList.contains("SideBarDivOpen")?SideBarClose():SideBarOpen();
    }
}

function SideBarOpen(){
    document.body.style.overflow = "hidden";
    document.getElementById("SideBarDiv").classList.add("SideBarDivOpen");
    document.getElementById("BlackBackground").classList.add("Black");
    document.getElementById("BlackBackground").setAttribute("onclick","SideBarClose()");
}

function SideBarClose(){
    document.body.style.overflowY = "auto";
    document.getElementById("SideBarDiv").classList.remove("SideBarDivOpen");
    document.getElementById("BlackBackground").classList.remove("Black");
}

function KatGombKiGen(){
    if(document.getElementsByClassName("SideBarKGomb").length == 0){
        let lista = SajatKategoria;
        for (let i = 0; i < lista.length; i++) {
            document.getElementById(lista[i].id).appendChild(GombDiv(lista[i].plus,["SideBarKGomb"],lista[i].onclick));
            for (let j = 0; j < TeljesKategoriak.length; j++) {
                document.getElementById(lista[i].id).appendChild(GombDiv(TeljesKategoriak[j],["SideBarKGomb"],lista[i].onclick));
            }
        }
    }
}

function GombDiv(Kategoria,classlist,onclick){
    let div = document.createElement("div");
    classlist.forEach(elem => {
        div.classList.add(elem);
    });
    div.innerHTML = "<p>"+Kategoria+"</p>";
    div.setAttribute("onclick",onclick);
    return div;
}

function LoginSideBar(){
    if(document.getElementById("SignIn").dataset.disable == undefined || document.getElementById("SignIn").dataset.disable == 'false'){
        document.getElementById("LoginSideBar").classList.contains("LogInOpen")?LoginClose():LoginOpen();
    }
}

function LoginOpen(){
    LoginGen();
    document.getElementById("LoginSideBar").style.overflowY = "auto";
    document.getElementById("LoginSideBar").classList.add("LogInOpen");
    document.getElementById("BlackBackground").classList.add("Black");
    document.getElementById("BlackBackground").setAttribute("onclick","LoginClose()");
}

function LoginClose(){
    document.getElementById("LoginSideBar").classList.remove("LogInOpen");
    document.getElementById("BlackBackground").classList.remove("Black");
}

function LoginGen(){
    User = Users.find(c=>c.email == User.email);
    document.getElementById("UserName").innerText = User.nev;
    EredmenyLekeres(User.email);
    if(User.osztaly != "T" && User.osztaly != "A"){
        document.getElementById("DogaEredmenyek").children[1].classList.add("TesztEredmenyError");
        document.getElementById("DogaEredmenyek").children[1].innerHTML = "<p>A felhasználó még nem írt Dolgozatot!</p>";
    }else{
        document.getElementById("DogaEredmenyek").children[0].innerText = "Kiírt dolgozatok:";
        if(document.getElementById("DogaKiirGombDiv") == undefined){
            let DogaKiirGombDiv = document.createElement("div");
            DogaKiirGombDiv.id = "DogaKiirGombDiv";
            DogaKiirGombDiv.innerHTML += "<div id='DogaHozzaAdIMG'><img src='ph/plus.png' alt='plus.png'></div>"
            let Gomb = document.createElement("div");
            Gomb.id="DogaKiirGomb";
            Gomb.innerHTML = "<p>Dolgozat Kiírás</p>";
            Gomb.setAttribute("onclick","DolgozatKiiras()");
            DogaKiirGombDiv.appendChild(Gomb);
            document.getElementById("DogaEredmenyek").children[0].appendChild(DogaKiirGombDiv);
        }
        KiirtDolgozatok(document.getElementById("DogaEredmenyek").children[1]);
    }
}

function LogOut(){
    User = undefined;
    window.open("index_login.html","_self");
}

function EredmenyekKiGen(Eredmeny){
    if(Eredmeny.Error == "A lekérdezés nem hozott eredményt!" || Eredmeny.length == 0){
        document.getElementById("TesztEredmenyek").children[1].classList.add("TesztEredmenyError");
        document.getElementById("TesztEredmenyek").children[1].innerHTML = "<p>A felhasználó még nem írt Tesztet!</p>";
    }else if(document.getElementById("TesztEredmenyek").children[1].children.length != Eredmeny.length || Eredmeny.length > 0 && document.getElementById("TesztEredmenyek").children[1].innerHTML == "<p>A felhasználó még nem írt Tesztet!</p>"){
        document.getElementById("DogaEredmenyek").children[1].classList.contains("TesztEredmenyError")?document.getElementById("DogaEredmenyek").children[1].classList.remove("TesztEredmenyError"):"";
        Eredmeny.forEach(c=> document.getElementById("TesztEredmenyek").children[1].innerHTML += "<div class='TesztKiirasok'><p>| Teszt befejezve: "+c.Datum+"<br>| Értékeles: "+c.MPont+"/"+c.Epont+" - "+Math.round(c.Epont/c.MPont*100)+"% <br>| Nehézség: "+c.Nehezseg+" <br> "+c.Kategoria+"</p></div>");
    }
}

function KiirtDolgozatok(div){
    //Ide jönnek a dogák kiiratása
}

function DolgozatKiiras(){
    LoginClose();
    if(document.getElementById("OldalName").innerText != "Dolgozat Kiírás"){
        document.getElementById("AlapDiv").innerHTML = "";
        document.getElementById("OldalName").innerText = "Dolgozat Kiírás";
        document.getElementById("Slider").style.opacity = "0";
        document.getElementById("Slider").style.left = "-110vw";
        DolgozatKiadasFelulet();
    }
}

function DolgozatKiadasFelulet(){
    let FeluletDiv = document.createElement("div");
    FeluletDiv.id = "FeluletDiv";
    let NavBar = document.createElement("div");
    NavBar.id = "FeluletNavBar";
    let Gombok = ["Osztály", "Osztaly", "Kategória", "Kategoria", "Nehézség", "Nehezseg"];
    for (let i = 0; i < Gombok.length; i+=2) {
        let gomb = document.createElement("div");
        gomb.innerHTML = "<p>"+Gombok[i]+"</p>";
        gomb.classList.add("FeluletNavGombok");
        gomb.setAttribute("onclick","Lenyil('"+Gombok[i+1]+"')")
        NavBar.appendChild(gomb);
    }
    FeluletDiv.appendChild(NavBar);
    document.getElementById("AlapDiv").appendChild(FeluletDiv);
}

function NavBarKinyit(igaze){
    igaze!=undefined?igaze==false?document.getElementById("FeluletNavBar").classList.add("NavBarKinyit"):document.getElementById("FeluletNavBar").classList.remove("NavBarKinyit"):"";
}

function Lenyil(Kat){
    NavBarKinyit(document.getElementById("FeluletNavBar").classList.contains("NavBarKinyit"));
    UsersBetoltese();
    if(document.getElementById("LenyiloDiv2") != undefined){
        document.getElementById("FeluletDiv").removeChild(document.getElementById("LenyiloDiv2"));
        LenyiloDivKinyit(true);
    }
    if(document.getElementById("FeluletNavBar").classList.contains("NavBarKinyit") == true){
        let LenyiloDiv = document.createElement("div");
        LenyiloDiv.id = "LenyiloDiv";
        LenyiloDiv.classList.add("LenyiloDivClass");
        document.getElementById("FeluletDiv").appendChild(LenyiloDiv);
        var osztalyok = Users.filter(c => c.osztaly != "A" && c.osztaly != "T");
        if(Kat == "Osztaly"){
            let db = Math.floor(osztalyok.length/6);
            let index = 0;
            for (let i = 0; i < db; i++) {
                let sor = document.createElement("div");
                sor.classList.add("NavBarGombSor");
                for (let j = 0; j < db; j++) {
                    let gomb = document.createElement("div");
                    gomb.innerHTML = "<p>"+osztalyok[index++].osztaly+"</p>";
                    gomb.classList.add("NavBarGombok");
                    sor.appendChild(gomb);
                }
                LenyiloDiv.appendChild(sor);
            }
            if(index != osztalyok.length){
                let sor = document.createElement("div");
                sor.classList.add("NavBarGombSor");
                let maradek = osztalyok.length - db;
                for (let i = 0; i < maradek; i++) {
                    let gomb = document.createElement("div");
                    gomb.innerHTML = "<p>"+osztalyok[index++].osztaly+"</p>";
                    gomb.classList.add("NavBarGombok");
                    sor.appendChild(gomb);
                }
                LenyiloDiv.appendChild(sor);
            }
        }else if(Kat == "Kategoria"){
            let sor = document.createElement("div");
            sor.classList.add("NavBarGombSor");
            for (let i = 0; i < TeljesKategoriak.length; i++) {
                let gomb = document.createElement("div");
                gomb.innerHTML = "<p>"+TeljesKategoriak[i]+"</p>";
                gomb.classList.add("NavBarGombok");
                gomb.setAttribute("onclick","DogaKatKivalaszt('"+TeljesKategoriak[i]+"')");
                sor.appendChild(gomb);
            }
            let gomb = document.createElement("div");
            gomb.innerHTML = "<p>Egyéni</p>";
            gomb.classList.add("NavBarGombok");
            gomb.setAttribute("onclick","DogaKatKivalaszt('Egyéni')");
            sor.appendChild(gomb);
            LenyiloDiv.appendChild(sor);
        }else{
            
        }
    }else{document.getElementById("FeluletDiv").removeChild(document.getElementById("LenyiloDiv"));}
}

function LenyiloDivKinyit(igaze){
    igaze==false?document.getElementById("LenyiloDiv").classList.add("LenyiloDivKinyit"):document.getElementById("LenyiloDiv").classList.remove("LenyiloDivKinyit");
}

function DogaKatKivalaszt(kat){
    LenyiloDivKinyit(document.getElementById("LenyiloDiv").classList.contains("LenyiloDivKinyit"));
    if(document.getElementById("LenyiloDiv2")==undefined && document.getElementById("LenyiloDiv").classList.contains("LenyiloDivKinyit") == true){
        let LenyiloDiv = document.createElement("div");
        LenyiloDiv.id = "LenyiloDiv2";
        LenyiloDiv.classList.add("LenyiloDivClass");
        document.getElementById("FeluletDiv").appendChild(LenyiloDiv);
        if(kat == "Egyéni"){
            let TeljesArray = new Array();
            for (let i = 0; i < Kategoriak.length; i++) {
                for (let j = 0; j < Kategoriak[i].length; j++) {
                    TeljesArray.push(Kategoriak[i][j]);
                }
            }
            let index = 0;
            let db = Math.floor(TeljesArray.length / 5);
            for (let i = 0; i < db; i++) {
                let sor = document.createElement("div");
                sor.classList.add("NavBarGombSor");
                for (let j = 0; j < 5; j++) {
                    let gomb = document.createElement("div");
                    gomb.innerHTML = "<p>"+TeljesArray[index++]+"</p>";
                    gomb.classList.add("NavBarGombok");
                    sor.appendChild(gomb);
                }
                LenyiloDiv.appendChild(sor);
            }
            if(index != TeljesArray.length){
                let sor = document.createElement("div");
                sor.classList.add("NavBarGombSor");
                let maradek = TeljesArray.length - db;
                console.log(TeljesArray.length, maradek, db);
                for (let i = 0; i < maradek; i++) {
                    let gomb = document.createElement("div");
                    gomb.innerHTML = "<p>"+TeljesArray[index++]+"</p>";
                    gomb.classList.add("NavBarGombok");
                    sor.appendChild(gomb);
                }
                LenyiloDiv.appendChild(sor);
            }
        }
    }else{document.getElementById("LenyiloDiv2")!=undefined?document.getElementById("FeluletDiv").removeChild(document.getElementById("LenyiloDiv2")):"";}
}

function KatKigyujt(){
    for (let i = 0; i < adatok.length; i++) {
        if(!TeljesKategoriak.includes(adatok[i].teljes_kategoria)){
            TeljesKategoriak.push(adatok[i].teljes_kategoria);
        }
    }
    for (let i = 0; i < TeljesKategoriak.length; i++){
        let lista = adatok.filter(c=>c.teljes_kategoria == TeljesKategoriak[i]);
        let KategoriaLista = new Array();
        for (let j = 0; j < lista.length; j++) {
            if(!KategoriaLista.includes(lista[j].kategoria_id)){
                KategoriaLista.push(lista[j].kategoria_id);
            }
        }
        Kategoriak.push(KategoriaLista);
    }
    KatGombKiGen();
}

function SelectorSlider(index){
    let Slider = document.createElement("div");
    Slider.classList.add("Slider");
    Slider.id ="Slider";
    Slider.appendChild(GombDiv(SajatKategoria[index].plus,["SlideInDiv","ActiveKat"],"KategoriaLoad(this)"));
    for (let i = 0; i < TeljesKategoriak.length; i++) {
        Slider.appendChild(GombDiv(TeljesKategoriak[i],["SlideInDiv"],"KategoriaLoad(this)"));
    }
    Slider.appendChild(SliderCloseImg());
    document.getElementById("SliderDiv").appendChild(Slider);
}

function SliderCloseImg(){
    let div = document.createElement("div");
    div.classList.add("SliderIMGDiv");
    div.id = "SlideCloseDiv"
    div.setAttribute("onclick","SlideClose()");
    let img = document.createElement("img");
    img.src = "ph/triangle.png";
    div.appendChild(img);
    return div;
}

function SlideClose(){
    if(document.getElementById("SlideCloseDiv").dataset.disable == undefined || document.getElementById("SlideCloseDiv").dataset.disable == "false"){
        if(document.getElementById("ValasztoDiv") != undefined){
            document.getElementById("ValasztoDiv").classList.contains("ValasztoDivSlideUp")?setTimeout(ValasztoDivSlideUp,800):ValasztoDivSlideUp();
        }
        document.getElementById("ValasztoDiv") != undefined?setTimeout(SliderClose,400):SliderClose();
    }
}

function ValasztoDivSlideUp(){
    document.getElementById("ValasztoDiv").classList.contains("ValasztoDivSlideUp")?document.getElementById("ValasztoDiv").classList.remove("ValasztoDivSlideUp"):document.getElementById("ValasztoDiv").classList.add("ValasztoDivSlideUp");
    document.getElementById("ValasztDiv").classList.contains("ValasztDivOpen")?document.getElementById("ValasztDiv").classList.remove("ValasztDivOpen"):"";
}

function SliderClose(){
    document.getElementById("Slider").classList.toggle("SlideClose");
    document.getElementById("SlideCloseDiv").classList.toggle("TriangleRotate");
}

function KategoriaLoad(div){
    document.getElementById("Slider").style.opacity = "1";
    document.getElementById("Slider").style.removeProperty("left");
    if(document.getElementById("ValasztoDiv") != undefined){
        document.body.removeChild(document.getElementById("ValasztoDiv"));
        document.getElementById("ValasztDiv").classList.remove("ValasztDivOpen");
    }
    if(document.getElementById("KeszGombDiv") != undefined){
        document.body.removeChild(document.getElementById("KeszGombDiv"));
    }
    let check = document.getElementById("Slider").firstChild.innerHTML.split('<')[1].split('>')[1];
    if(check != "Tudnivalók"){
        document.getElementById("Slider").firstChild.innerHTML = "<p>Tudnivalók</p>";
        document.getElementById("Slider").firstChild.setAttribute("onclick","KategoriaLoad(this)");
        document.getElementById("AlapDiv").innerHTML = "";
        document.getElementById("OldalName").innerHTML = "Fő oldal";
    }
    let id = div.innerHTML.split('<')[1].split('>')[1];
    if(!div.classList.contains("ActiveKat") && div.classList.contains("SlideInDiv") && SelectedCategory != id){
        document.getElementsByClassName("ActiveKat")[0].classList.remove("ActiveKat");
        div.classList.add("ActiveKat");
        SelectedCategory = id;
        document.getElementById("AlapDiv").innerHTML = "";
        id=="Tudnivalók"?Tudnivalok(id):Feltolt(id);
    }else if(!div.classList.contains("ActiveKat") && !div.classList.contains("SlideInDiv") && SelectedCategory != id){
        let Gombok = document.getElementsByClassName("SlideInDiv");
        let Gomb;
        for (let i = 0; i < Gombok.length; i++) {
            if(Gombok[i].innerHTML == ("<p>"+id+"</p>")){
                Gomb = Gombok[i];
            }
        }
        SelectedCategory = id;
        document.getElementsByClassName("ActiveKat")[0].classList.remove("ActiveKat");
        Gomb.classList.add("ActiveKat");
        document.getElementById("AlapDiv").innerHTML = "";
        id=="Tudnivalók"?Tudnivalok(id):Feltolt(id);
    }
    if(document.getElementById('KivettErtekDiv') != undefined){
        document.body.removeChild(document.getElementById('KivettErtekDiv'));
    }
    SideBarClose();
}

function TablaCreate(id){
    let Keret = document.createElement("div");
    Keret.classList.add("Keret");
    Keret.id = id;
    document.getElementById("AlapDiv").appendChild(Keret);
}

function TablaFeltolt(id,nev){
    let NameDiv = document.createElement("div");
    NameDiv.innerHTML = "<p>"+nev+"<p>";
    NameDiv.classList.add("NameDiv");
    document.getElementById(id).appendChild(NameDiv);
}

function Tudnivalok(id){
    TablaCreate(id);
    TablaFeltolt(id,id);
    let TudnivalokLista = ["Első tudni való",
                "Második tudni való", 
                "Harmadik tudni való",   
                "Negyedik tudni való"];
    for (let i = 0; i < TudnivalokLista.length; i++) {
        let div = document.createElement("div");
        div.innerHTML="<p>"+TudnivalokLista[i]+"</p>";
        div.classList.add("TudnivalokDiv");
        document.getElementById(id).appendChild(div);
    }
}

function Feltolt(id){
    let KatLista = new Array();
    let TeljesLista = adatok.filter(c=>c.teljes_kategoria == id);
    for (let i = 0; i < TeljesLista.length; i++) {
        if(!KatLista.includes(TeljesLista[i].kategoria_id)){
            KatLista.push(TeljesLista[i].kategoria_id);
        }
    }
    for (let i = 0; i < KatLista.length; i++) {
        TablaCreate(KatLista[i]);
        TablaFeltolt(KatLista[i],KatLista[i]);
        SorokSorBetolt(KatLista[i],["Neve","Jele","Definíciója","Mértékegyése"],true);
    }
    for (let i = 0; i < KatLista.length; i++) {
        let adat = TeljesLista.filter(c=>c.kategoria_id == KatLista[i]);
        adat.forEach(elem => {
            SorokSorBetolt(KatLista[i],[elem.nev,elem.jel,elem.def,elem.mert],false);
        });
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "expression"]);
}

function SorokSorBetolt(id,lista,IgazE){
    let div = document.createElement("div");
    div.classList.add("TablaSor");
    SorBetolt(div,lista,IgazE);
    document.getElementById(id).appendChild(div);
}

function SorBetolt(Hova,Nevek,IgazE){
    for (let i = 0; i < Nevek.length; i++) {
        let div = document.createElement("div");
        if(IgazE){
            i==0?div.classList.add("LeftShapeEdge"):"";
            i==3?div.classList.add("RightShapeEdge"):"";
        }
        if(Nevek[i] == " "){
            div.setAttribute("ondrop","drop(event,this)");
            div.setAttribute("ondragover","allowDrop(event,this)");
        }
        div.innerHTML ="<p>"+Nevek[i]+"</p>";
        Hova.appendChild(div);
    }
}

function TestKategoriaLoad(div){
    let check = document.getElementById("Slider").firstChild.innerHTML.split('<')[1].split('>')[1];
    document.getElementById("Slider").style.opacity = "1";
    document.getElementById("Slider").style.removeProperty("left");
    TesztValaszto();
    document.getElementById("Slider").classList.remove("SlideClose");
    document.getElementById("SlideCloseDiv").classList.remove("TriangleRotate");
    if(document.getElementById("ValasztoDiv") != undefined){
        document.getElementById("ValasztoDiv").classList.remove("ValasztoDivSlideUp");
        if(document.getElementById("ValasztDiv") != undefined){
            document.getElementById("ValasztDiv").classList.remove("ValasztDivOpen");
        }
    }
    document.getElementById("ValasztDiv")!=undefined?document.getElementById("ValasztDiv").classList.remove("ValasztDivOpen"):"";
    if(check != "Egyéni"){
        let SliderDivek = document.getElementsByClassName("SlideInDiv");
        for (let i = 0; i < SliderDivek.length; i++) {
            SliderDivek[i].setAttribute("onclick","TestKategoriaLoad(this)");
        }
        document.getElementById("Slider").firstChild.innerHTML = "<p>Egyéni</p>";
        document.getElementById("Slider").firstChild.setAttribute("onclick","TestKategoriaLoad(this)");
        document.getElementById("AlapDiv").innerHTML = "";
        document.getElementById("OldalName").innerHTML = "Teszt oldal";
    }
    let id = div.innerHTML.split('<')[1].split('>')[1];
    if(!div.classList.contains("ActiveKat") && div.classList.contains("SlideInDiv") && SelectedCategory != "Teszt"+id){
        document.getElementsByClassName("ActiveKat")[0].classList.remove("ActiveKat");
        div.classList.add("ActiveKat");
        SelectedCategory = "Teszt"+id;
        document.getElementById("AlapDiv").innerHTML = "";
    }else if(!div.classList.contains("ActiveKat") && !div.classList.contains("SlideInDiv") && SelectedCategory != "Teszt"+id){
        let Gombok = document.getElementsByClassName("SlideInDiv");
        let Gomb;
        for (let i = 0; i < Gombok.length; i++) {
            if(Gombok[i].innerHTML == ("<p>"+id+"</p>")){
                Gomb = Gombok[i];
            }
        }
        SelectedCategory = "Teszt"+id;
        document.getElementsByClassName("ActiveKat")[0].classList.remove("ActiveKat");
        Gomb.classList.add("ActiveKat");
        document.getElementById("AlapDiv").innerHTML = "";
    }
    if(id!="Egyéni"){
        KategoriakValasztasBetolt(Kategoriak[TeljesKategoriak.indexOf(id)]);
    }else{
        let OsszKategoria = new Array();
        Kategoriak.forEach(elem => {
            elem.forEach(kat => {
                OsszKategoria.push(kat);
            });
        });
        KategoriakValasztasBetolt(OsszKategoria);
    }
    KivettErtekekDivCreate();
    SideBarClose();
}

function KategoriakValasztasBetolt(Array){
    let ValasztDiv = document.getElementById("ValasztDiv")==undefined?document.createElement("div"):document.getElementById("ValasztDiv");
    KivalasztottKategoriak = [];
    ValasztDiv.innerHTML = "";
    ValasztDiv.id = "ValasztDiv";
    for(let i = 0; i < Array.length; i++){
        let div = document.createElement("div");
        div.innerHTML = "<p>"+Array[i]+"</p>";
        div.setAttribute("onclick","KategoriaKivalaszt(this)");
        ValasztDiv.appendChild(div);
    }
    ValasztDiv.classList.add("KategoriaValasztDiv");
    document.body.appendChild(ValasztDiv);
}

function KategoriaKivalaszt(div){
    KivalasztottKategoriak.includes(div.innerHTML.split('<')[1].split('>')[1])?KivalasztottKategoriak.splice(KivalasztottKategoriak.indexOf(div.innerHTML.split('<')[1].split('>')[1]),1):KivalasztottKategoriak.push(div.innerHTML.split('<')[1].split('>')[1]);
    div.classList.contains("KivalasztottKategoria")?div.classList.remove("KivalasztottKategoria"):div.classList.add("KivalasztottKategoria");
    NumericMaxChange();
}

function NumericMaxChange(){
    if(KivalasztottKategoriak.length!=0){
        let Max = 0;
        for (let i = 0; i < KivalasztottKategoriak.length; i++) {
            Max += adatok.filter(c=>c.kategoria_id==KivalasztottKategoriak[i]).length;
        }
        document.getElementById("SorokNumeric").max = Max;
    }else{
        document.getElementById("SorokNumeric").max = "1";
    }
}

function NumericValueCheck(){
    if(Number(document.getElementById("SorokNumeric").value) > Number(document.getElementById("SorokNumeric").max)){
        document.getElementById("SorokNumeric").value = document.getElementById("SorokNumeric").max;
    }
    if(Number(document.getElementById("SorokNumeric").value) < Number(document.getElementById("SorokNumeric").min)){
        document.getElementById("SorokNumeric").value = document.getElementById("SorokNumeric").min;
    }
}

function TesztInditas(){
    if(KivalasztottKategoriak.length!=0 && document.getElementById("SorokNumeric").value > 0 && (document.getElementById("KonnyuNehezseg").checked == true || document.getElementById("KozepesNehezseg").checked == true || document.getElementById("NehezNehezseg").checked == true) && document.getElementById("SorokValaszt").firstChild.dataset.disable == undefined || document.getElementById("SorokValaszt").firstChild.dataset.disable == false){
        KevertLista = new Array();
        let ValaszthatoListak = [];
        for (let i = 0; i < KivalasztottKategoriak.length; i++) {
            let lista = adatok.filter(c=>c.kategoria_id==KivalasztottKategoriak[i]);
            for (let j = 0; j < lista.length; j++) {
                ValaszthatoListak.push(lista[j]);
            }
        }
        ListaKeveres(ValaszthatoListak);
        setTimeout(ValasztoDivSlideUp,800);
        KeszGombCreate("Teszt");
    }
}

function KeszGombCreate(Fajta){
    //ha doga akkor "Dolgozat leadás" lesz a gomb neve
    let keszgombDiv = document.createElement("div");
    keszgombDiv.id = "KeszGombDiv";
    let gomb = document.createElement("input");
    gomb.id = "KeszGomb";
    if(Fajta == "Teszt"){
        gomb.value = "Teszt kiértékelés";
        gomb.setAttribute("onclick","LeadasKiertekeles('Teszt')");
    }else{
        gomb.value = "Dolgozat leadás";
        gomb.setAttribute("onclick","LeadasKiertekeles('Doga')");
    }
    keszgombDiv.appendChild(gomb);
    document.body.appendChild(keszgombDiv);
}

function LeadasKiertekeles(fajta){
    document.getElementById("AlapDiv").innerHTML = "";
    document.body.removeChild(document.getElementById("KivettErtekDiv"));
    document.body.removeChild(document.getElementById("KeszGombDiv"));
    let KiertekelesDiv = document.createElement("div");
    KiertekelesDiv.id = "KiertekelesDiv";
    let PontSzamokDiv = document.createElement("div");
    PontSzamokDiv.id = "PontSzamokDiv";
    let GombokDiv = document.createElement("div");
    GombokDiv.id = "GombokDivErtekeles";
    let GombKilepes = document.createElement("input");
    GombKilepes.id = "GombKilepes";
    GombKilepes.value = "Kilépés a főoldalra";
    GombKilepes.setAttribute("onclick","FoOldalLoad()");
    let TesztInditasGomb = document.createElement("input");
    TesztInditasGomb.id = "KiertekelesTesztInditasGomb";
    let Nehezseg = document.getElementById("KonnyuNehezseg").checked == true?"Könnyű":(document.getElementById("KozepesNehezseg").checked == true?"Közepes":"Nehéz");
    if(fajta == "Teszt"){
        KiertekelesDiv.innerHTML += "<h2>Teszt kiértékelés</h2>";
        PontSzamokDiv.innerHTML += "<p>Maximum / Elértpontszám: "+MPontSzam+" / "+BetettErtekek.length+"</p>";
        PontSzamokDiv.innerHTML += "<p>Választott nehézség : "+Nehezseg+"</p>";
        PontSzamokDiv.innerHTML += "<p>Elért százalék : "+Math.round(BetettErtekek.length/MPontSzam*100)+"%</p>";
        PontSzamokDiv.innerHTML += "<h3>Láthatatlan jegy : "+JegyKiertekel(BetettErtekek.length/MPontSzam)+"</h3>";
        TesztInditasGomb.value = "Új teszt indítás";
        TesztInditasGomb.setAttribute("onclick","UjTesztInditas('Uj')");
    }else{
        KiertekelesDiv.innerHTML += "<h2>Dolgozat kiértékelés</h2>";
        PontSzamokDiv.innerHTML += "<p>Maximum / Elértpontszám: "+MPontSzam+" / "+BetettErtekek.length+"</p>";
        PontSzamokDiv.innerHTML += "<p>Elért százalék : "+Math.round(BetettErtekek.length/MPontSzam*100)+"%</p>";
        PontSzamokDiv.innerHTML += "<h3>Kapott jegy : "+JegyKiertekel(BetettErtekek.length/MPontSzam)+"</h3>";
        TesztInditasGomb.value = "Teszt indítás";
        TesztInditasGomb.setAttribute("onclick","UjTesztInditas('nemUj')");
    }
    KiertekelesDiv.appendChild(PontSzamokDiv);
    GombokDiv.appendChild(GombKilepes);
    GombokDiv.appendChild(TesztInditasGomb);
    KiertekelesDiv.appendChild(GombokDiv);
    document.getElementById("AlapDiv").appendChild(KiertekelesDiv);
    //document.body.removeChild(document.getElementById("ValasztoDiv"));
    GombokDisable(false);
    TesztFeltolt(MPontSzam,BetettErtekek.length,Nehezseg);
}

function UjTesztInditas(uj){
    document.getElementById("AlapDiv").innerHTML = "";
    ValasztoDivSlideUp();
    for (let i = 0; i < document.getElementsByClassName("KivalasztottKategoria").length; i++) {
        document.getElementsByClassName("KivalasztottKategoria")[0].classList.remove("KivalasztottKategoria");
    }
    document.getElementById("SorokNumeric").value = "";
    KivalasztottKategoriak = new Array();
    if(uj == "Uj"){

    }
}

function TesztFeltolt(MPontSzam,EPontSzam,Nehezseg){
    let d = new Date();
    let datum = {year: d.getFullYear(),month:((Number(d.getMonth())+1)<10?"0"+(Number(d.getMonth())+1):(Number(d.getMonth())+1)),day: (d.getUTCDate()<10?"0"+d.getUTCDate():d.getUTCDate()),hour:(d.getHours()<10?"0"+d.getHours():d.getHours()),minute: (d.getMinutes()<10?"0"+d.getMinutes():d.getMinutes())};
    let Adatok = {email: User.email,mpont: MPontSzam,epont: EPontSzam,kateg: KivalasztottKategoriak, datum: datum.year+"."+datum.month+"."+datum.day+"-"+datum.hour+":"+datum.minute,nehezseg: Nehezseg};
    EredmenyFeltolt(Adatok);
}

function JegyKiertekel(pontszam){
    if(pontszam >= 0.85){
        return "5";
    }else if(pontszam < 0.85 && pontszam >= 0.70){
        return "4";
    }else if(pontszam < 0.70 && pontszam >= 0.50){
        return "3";
    }
    else if(pontszam < 0.50 && pontszam >= 0.30){
        return "2";
    }else if(pontszam < 0.30){
        return "1";
    }
}

function ListaKeveres(lista){
    let index = Number(document.getElementById("SorokNumeric").value);
    if(index != 0){
        let Randomlista = [];
        while(Randomlista.length != index){
            let random = Math.floor(Math.random()*index);
            if(!Randomlista.includes(random)){
                Randomlista.push(random);
            }
        }
        for (let i = 0; i < Randomlista.length; i++) {
            KevertLista.push(lista[Randomlista[i]]);
        }
        document.getElementById("ValasztDiv").classList.remove("ValasztDivOpen");
        TesztTablaBetoltes();
    }
}

function TesztTablaBetoltes(){
    TablaCreate("Teszt");
    document.getElementById("Teszt").classList.add("TesztBottom");
    TablaFeltolt("Teszt","Teszt");
    SorokSorBetolt("Teszt",["Neve","Jele","Definíciója","Mértékegyése"],true);
    var KivettErtekekArray = new Array();
    for (let i = 0; i < KevertLista.length; i++){
        let lista = RandomSorListaCreate(KivettErtekekArray,[KevertLista[i].nev,KevertLista[i].jel,KevertLista[i].def,KevertLista[i].mert],i);
        SorokSorBetolt("Teszt",lista,false);
    }
    KivettErtekekKever(KivettErtekekArray);
    KivettErtekekKiIr(KivettErtekekArray);
    document.getElementById("KivettErtekDiv").classList.add("EgyebOpacityStartAnim");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "expression"]);
    GombokDisable(true);
}

function KivettErtekekKever(lista){
    for (let index = 0; index < 150; index++) {
        for (let i = 0; i < lista.length; i++) {
            let random = Math.floor(Math.random()*lista.length);
            let c =  lista[random];
            lista[random] = lista[i];
            lista[i] = c;
        }
    }
}

function KivettErtekekKiIr(lista){
    for (let i = 0; i < lista.length; i++) {
        let Indexek = lista[i].indexek.split(",");
        MPontSzam += lista[i].ertekek.length;
        for (let j = 0; j < lista[i].ertekek.length; j++) {
            document.getElementById("KivettErtekDiv").innerHTML += "<div class='KivettDivek' ondrop='KivettDivekDrop(event)' ondragover='allowDrop(event,this)' draggable='true' ondragstart='drag(event)' data-indexek='"+lista[i].index+","+Indexek[j]+"'><p>"+lista[i].ertekek[j]+"</p></div>";
        }
    }
}

function RandomSorListaCreate(KivettErtekekArray,lista,index){
    let random;
    if(document.getElementById("KonnyuNehezseg").checked == true){random = 1;}
    else if(document.getElementById("KozepesNehezseg").checked == true){ random = 2; }
    else if(document.getElementById("NehezNehezseg").checked == true){ random = RandomKiGen(); }
    if(random == 3){
        KivettErtekekArray.push({index: index,indexek: 1+","+2+","+3,ertekek: [lista[1],lista[2],lista[3]]});
        return [lista[0]," "," "," "];
    }else{
        let RLista = [];
        while(RLista.length != random){
            let r = Math.floor(Math.random()*4);
            if(!RLista.includes(r)){
                RLista.push(r);
            }
        }
        let ReturnLista = lista;
        let ErtekLista = new Array();
        let Indexek = "";
        for (let i = 0; i < RLista.length; i++) {
            ErtekLista.push(ReturnLista[RLista[i]]);
            Indexek += i==RLista.length-1?RLista[i]:RLista[i]+",";
            ReturnLista[RLista[i]] = " ";
        }
        KivettErtekekArray.push({index: index,indexek: Indexek,ertekek: ErtekLista});
        return ReturnLista;
    }
}

function RandomKiGen(){
    let Szazalek = Math.floor(Math.random()*11);
    if(Szazalek < 9 && Szazalek > 5){
        return 2;
    }else if(Szazalek > 9){
        return 3;
    }else{
        return 1;
    }
}

function GombokDisable(bejon){
    document.getElementById("SignIn").dataset.disable = bejon;
    document.getElementById("Sidebar").dataset.disable = bejon;
    document.getElementById("SlideCloseDiv").dataset.disable = bejon;
    document.getElementById("SorokValaszt")!=undefined?document.getElementById("SorokValaszt").firstChild.dataset.disable = bejon:"";
}
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.srcElement.innerHTML);
    ev.dataTransfer.setData("DivIndex", Array.from(document.getElementsByClassName("KivettDivek")).indexOf(ev.srcElement));
    ev.dataTransfer.setData("ClassList", ev.srcElement.classList);
    ev.dataTransfer.setData("div", ev.srcElement.dataset.indexek);
}

function drop(ev,div) {
    ev.preventDefault();
    var DivIndex = ev.dataTransfer.getData("DivIndex");
    let Indexek = ev.dataTransfer.getData("div").split(',');
    var ClassList = ev.dataTransfer.getData("ClassList");
    let ExpErtekek = [KevertLista[Indexek[0]].nev,KevertLista[Indexek[0]].jel,KevertLista[Indexek[0]].def,KevertLista[Indexek[0]].mert];
    let SorDiv = Array.from(document.getElementsByClassName("TablaSor")).indexOf(div.parentNode)-1;
    let KapottErtekek = [KevertLista[SorDiv].nev,KevertLista[SorDiv].jel,KevertLista[SorDiv].def,KevertLista[SorDiv].mert];
    let index = Array.from(Array.from(document.getElementsByClassName("TablaSor")).find(c=>c==div.parentNode).children).indexOf(div);
    ClassList=="KivettDivek"?document.getElementById("KivettErtekDiv").removeChild(document.getElementsByClassName("KivettDivek")[DivIndex]):DivValtoztatas(document.getElementsByClassName("TablaSor")[Number(Indexek[0])+1].children[Indexek[1]]);
    if(div.children[0] != undefined && div.children[0].classList.contains("BetettErtek")){
        DivIndex==-1?TablaErtekekCsere(div,SorDiv,index,Indexek,ev.dataTransfer.getData("text")):"";
    }
    else{
        div.innerHTML = "<div class='BetettErtek' draggable='true' ondragstart='drag(event)' data-indexek='"+SorDiv+","+index+"'>"+ev.dataTransfer.getData("text")+"</div>";
    }
    if(ExpErtekek[Indexek[1]] == KapottErtekek[index]){
        BetettErtekek.push(ev);
    }else{
        BetettErtekek.includes(ev)?BetettErtekek.splice(BetettErtekek.indexOf(ev),1):"";
    }
}

function TablaErtekekCsere(div,SorDiv,index,Indexek,Text){
    document.getElementsByClassName("TablaSor")[Number(Indexek[0])+1].children[Indexek[1]].innerHTML = "<div class='BetettErtek' draggable='true' ondragstart='drag(event)' data-indexek='"+Indexek[0]+","+Indexek[1]+"'>"+div.innerHTML+"</div>";
    div.innerHTML = "<div class='BetettErtek' draggable='true' ondragstart='drag(event)' data-indexek='"+SorDiv+","+index+"'>"+Text+"</div>";
}

function DivValtoztatas(div){
    div.innerHTML = "";
    div.setAttribute("ondrop","drop(event,this)");
    div.setAttribute("ondragover","allowDrop(event,this)");
}

function KivettDivekDrop(ev) {
    var ClassList = ev.dataTransfer.getData("ClassList");
    var KapottText = ev.dataTransfer.getData("text");
    var Vane = Array.from(document.getElementsByClassName("KivettDivek")).find(c=>c.innerHTML == KapottText);
    if(ClassList == "BetettErtek" && Vane == undefined){
        ev.preventDefault();
        let Indexek = ev.dataTransfer.getData("div").split(',');
        var ClassList = ev.dataTransfer.getData("ClassList");
        DivValtoztatas(document.getElementsByClassName("TablaSor")[Number(Indexek[0])+1].children[Indexek[1]]);
        document.getElementById("KivettErtekDiv").innerHTML += "<div class='KivettDivek' draggable='true' ondragstart='drag(event)' data-indexek='"+Indexek[0]+","+Indexek[1]+"'>"+ev.dataTransfer.getData("text")+"</div>";
    }
}

function FoOldalLoad(){
    document.getElementById("OldalName").innerText = "fő oldal";
    document.getElementById("Slider").style.opacity = "1";
    document.getElementById("Slider").style.removeProperty("left");
    if(document.getElementById("ValasztoDiv") != undefined){
        document.body.removeChild(document.getElementById("ValasztoDiv"));
    }
    if(document.getElementById("KeszGombDiv") != undefined){
        document.body.removeChild(document.getElementById("KeszGombDiv"));
    }
    if(document.getElementById("Slider") == undefined){
        SelectorSlider(0);
    }else if(document.getElementById("Slider").firstChild.innerHTML == "<p>Tudnivalók</p>"){
        if(document.getElementById("AlapDiv").firstChild.firstChild.innerHTML != "<p>Tudnivalók</p>"){
            document.getElementById("AlapDiv").innerHTML = "";
            Tudnivalok(SajatKategoria[0].plus);
            SelectedCategory = SajatKategoria[0].plus;
        }
    }else{
        document.getElementById("Slider").firstChild.innerHTML = "<p>Tudnivalók</p>";
        document.getElementById("AlapDiv").innerHTML = "";
        Tudnivalok(SajatKategoria[0].plus);
        SelectedCategory = SajatKategoria[0].plus;
        document.getElementsByClassName("ActiveKat")[0].classList.remove("ActiveKat");
        let Divek = document.getElementById("Slider").children;
        Divek[0].classList.add("ActiveKat");
        for (let i = 0; i < Divek.length-1; i++) {
            Divek[i].setAttribute("onclick",SajatKategoria[0].onclick)
        }
    }
    SideBarClose();
}

function TestOldalLoad(){
    document.getElementById("OldalName").innerText = "teszt oldal";
    document.getElementById("Slider").classList.remove("SlideClose");
    document.getElementById("SlideCloseDiv").classList.remove("TriangleRotate");
    document.getElementById("Slider").style.opacity = "1";
    document.getElementById("Slider").style.removeProperty("left");
    if(document.getElementById("ValasztoDiv") != undefined){
        document.getElementById("ValasztoDiv").classList.remove("ValasztoDivSlideUp");
        document.getElementById("ValasztDiv").classList.remove("ValasztDivOpen");
    }
    if(document.getElementById("Slider") == undefined){
        SelectorSlider(1);
    }else if(document.getElementById("Slider").firstChild.innerHTML == "<p>Egyéni</p>"){
        if(document.getElementById("AlapDiv").firstChild.innerHTML != "<p>Egyéni</p>"){
            document.getElementById("AlapDiv").innerHTML = "";
            TesztValaszto();
            SelectedCategory = SajatKategoria[1].plus;
        }
    }else{
        document.getElementById("Slider").firstChild.innerHTML = "<p>Egyéni</p>";
        document.getElementById("AlapDiv").innerHTML = "";
        document.getElementsByClassName("ActiveKat")[0].classList.remove("ActiveKat");
        TesztValaszto();
        SelectedCategory = SajatKategoria[1].plus;
        let Divek = document.getElementById("Slider").children;
        Divek[0].classList.add("ActiveKat");
        for (let i = 0; i < Divek.length-1; i++) {
            Divek[i].setAttribute("onclick",SajatKategoria[1].onclick)
        }
    }
    KivettErtekekDivCreate();
    let OsszKategoria = new Array();
    Kategoriak.forEach(elem => {
        elem.forEach(kat => {
            OsszKategoria.push(kat);
        });
    });
    KategoriakValasztasBetolt(OsszKategoria);
    SideBarClose();
}

function KivettErtekekDivCreate(){
    if(document.getElementById('KivettErtekDiv') == undefined){
        let div = document.createElement("div");
        div.id = "KivettErtekDiv";
        div.setAttribute("ondrop","KivettDivekDrop(event)");
        div.setAttribute("ondragover","allowDrop(event,this)");
        div.style.opacity = '0';
        document.body.appendChild(div);
    }
}

function TesztValaszto(){
    if(document.getElementById("ValasztoDiv") == undefined){
        document.body.appendChild(ValasztoDivCreate());
    }
}

function ValasztKategoriaDivOpen(){
    document.getElementById("ValasztDiv").classList.contains("ValasztDivOpen")?document.getElementById("ValasztDiv").classList.remove("ValasztDivOpen"):document.getElementById("ValasztDiv").classList.add("ValasztDivOpen");
}

function ValasztoDivCreate(){
    let ValasztoDiv = document.createElement("div");//Választó div
    ValasztoDiv.id = "ValasztoDiv";
    ValasztoDiv.classList.add("ValasztoDiv");
    let KategoriakGomb = document.createElement("div");//Lenyíló választható kategóriákhoz a gomb
    KategoriakGomb.classList.add("KategoriakGomb");
    KategoriakGomb.innerHTML = "<p>Kategróiák választás</p>";
    KategoriakGomb.setAttribute("onclick","ValasztKategoriaDivOpen()");
    let SorokValaszt = document.createElement("div");//Sorok darabszáma választás
    SorokValaszt.id = "SorokValaszt";
    let SorokLabel = document.createElement("label");//Label
    SorokLabel.htmlFor = "SorokNumeric";
    SorokLabel.innerText = "Sorok száma:";
    let SorokNumeric = document.createElement("input");//Numeric input
    SorokNumeric.type = "number";
    SorokNumeric.id = "SorokNumeric";
    SorokNumeric.name = "SorokNumeric";
    SorokNumeric.setAttribute("onchange","NumericValueCheck()");
    SorokNumeric.min = "1";
    SorokValaszt.appendChild(SorokLabel);
    SorokValaszt.appendChild(SorokNumeric);
    let NehezsegValasztoDiv = document.createElement("div");
    NehezsegValasztoDiv.id = "NehezsegValasztoDiv";
    NehezsegValasztoDiv.innerHTML += "<div class='NehezsegDivek'><label for='KonnyuNehezseg'>Könnyű</label><input type='radio' name='RadioButton' id='KonnyuNehezseg'></div>";
    NehezsegValasztoDiv.innerHTML += "<div class='NehezsegDivek'><label for='KozepesNehezseg'>Közepes</label><input type='radio' name='RadioButton' id='KozepesNehezseg'></div>";
    NehezsegValasztoDiv.innerHTML += "<div class='NehezsegDivek'><label for='NehezNehezseg'>Nehéz</label><input type='radio' name='RadioButton' id='NehezNehezseg'></div>";
    let InditasGomb = document.createElement("div");//Indító gomb
    InditasGomb.classList.add("InditasGomb");
    InditasGomb.innerHTML = "<p>Indítás</p>";
    InditasGomb.setAttribute("onclick","TesztInditas()");
    ValasztoDiv.appendChild(KategoriakGomb);
    ValasztoDiv.appendChild(SorokValaszt);
    ValasztoDiv.appendChild(NehezsegValasztoDiv);
    ValasztoDiv.appendChild(InditasGomb);
    return ValasztoDiv;
}

function SliderAnimRemove(){
    document.getElementById("Slider").classList.remove("SliderSlideAnim");
}

function AlapokBetolt(){
    if(document.getElementById("AlapDiv") != undefined){
        KatKigyujt();
        SelectorSlider(0);
        document.getElementById("Slider").classList.add("SliderSlideAnim");
        setTimeout(SliderAnimRemove,1000);
        Tudnivalok(SajatKategoria[0].plus);
        document.getElementsByClassName("Keret")[0].classList.add("TablaOpacityStartAnim");
        document.getElementsByClassName("NameDiv")[0].classList.add("TablaOpacityStartAnim");
        SelectedCategory = SajatKategoria[0].plus;
        User = JSON.parse(localStorage.getItem("user"));
    }
}AdatokBetoltes();