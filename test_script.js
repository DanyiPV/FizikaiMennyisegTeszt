var Tuser;
var usersetting;
var CurTime;
var Tablak;var Teljeskategoriak; var Alkategoriak;
var tudnivalok = ["Valami tudnivaló első","Valami tudnivaló második","Valami tudnivaló harmadik","Valami tudnivaló negyedik","Valami tudnivaló ötödik"];
var EgyediKat = [{nev: "Tudnivalók",rendel:"FooldalNav",id:"T"},{nev: "Egyéni",rendel: "TestoldalNav",id:"E"}];
var ValasztottTablak;
var KivalasztottTablak = [];
var EredetiKivalasztottTablak = [];
var KivettErtekekDB = 0;
var ValasztottTablaSorok;
var ValasztottTime;
var DogaOsztaly;
var DogaKezdet;
var EredetiValasztottTime;
var TestActive = false;
var Difficulty;
var TestTimer;
var DogaKategTabla = [];
var DogaTeljesTabla = [];

function SideBarOpen(){
    if(!TestActive){
        document.getElementById("SideBarNav").classList.add("SideBarNavOpen");
        document.getElementById("BlackBG").classList.add("BlackBGOn");
        document.getElementById("BlackBG").setAttribute("onclick","SideBarClose()");
        document.body.style.overflowY = "hidden";
        CurTime = setInterval(TimerLog,100);
    }
}

function SideBarClose(){
    document.getElementById("SideBarNav").classList.remove("SideBarNavOpen");
    document.getElementById("BlackBG").classList.remove("BlackBGOn");
    document.getElementById("BlackBG").removeAttribute("onclick");
    document.body.style.overflowY = "auto";
    document.getElementsByClassName("SideBarNotActive").length != 0?SideBarNotif():"";
    clearInterval(CurTime);
}

function TimerLog(){
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    document.getElementById("CurTime").innerText = (h<10?"0"+h:h) +":"+(m<10?"0"+m:m);
}

function SignInOpen(){
    if(!document.getElementById("SignInNav").classList.contains("SignInOpen") && !TestActive){
        document.getElementById("SignInNav").classList.add("SignInOpen");
        document.getElementById("SignIn").classList.add("SignInDivOpen");
        document.getElementById("BlackBG").classList.add("BlackBGOn");
        document.getElementById("BlackBG").setAttribute("onclick","SignInOpen()");
        document.body.style.overflowY = "hidden";
    }else{
        SignInClose();
    }
}

function SignInClose(){
    document.getElementById("SignInNav").classList.remove("SignInOpen");
    document.getElementById("SignIn").classList.remove("SignInDivOpen");
    document.getElementById("BlackBG").classList.remove("BlackBGOn");
    document.getElementById("BlackBG").removeAttribute("onclick");
    document.body.style.overflowY = "auto";
}

function RemoveAnim(){
    document.getElementById("SignIn").classList.remove("SignInAnim");
}

function LogOut(){
    localStorage.removeItem("User");
    window.open("index_login.html","_self");
}

function DrkModeSwitch(value){
    var color = undefined;
    if(value == "load"){
        color = usersetting.drkmode;
    }
    else if(value == "change"){
        usersetting.drkmode==0?color=1:color=0;
        usersetting.drkmode = color;
    }
    document.getElementById("DrkModeDiv").children[1].innerText = color==1?"fekete mód":"fehér mód";
    value == "change"?UserSettingsChange("drkmode = "+usersetting.drkmode+"","userid = '"+Tuser.id+"'"):"";
    getComputedStyle(document.querySelector(':root'));
    color==1?document.getElementById("DrkModeDiv").children[1].innerText = "dark mode":document.getElementById("DrkModeDiv").children[1].innerText = "white mode";
    color==1?document.querySelector(':root').style.setProperty('--button_hover',"rgba( 0, 0, 0, .5)"):document.querySelector(':root').style.setProperty('--button_hover',"rgba(170, 170, 170, .4)");
    color==1?document.querySelector(':root').style.setProperty('--text_color',"black"):document.querySelector(':root').style.setProperty('--text_color',"whitesmoke");
    color==1?document.querySelector(':root').style.setProperty('--modal_bc',"rgba(230,230,230, .7)"):document.querySelector(':root').style.setProperty('--modal_bc',"rgba(30, 30, 30, .9)");
    color==1?document.querySelector(':root').style.setProperty('--modal_border',"black"):document.querySelector(':root').style.setProperty('--modal_border',"whitesmoke");
    color==1?document.querySelector(':root').style.setProperty('--body_bc',"rgba(170,170,170, 1)"):document.querySelector(':root').style.setProperty('--body_bc',"rgba(30, 30, 30, 1)");
    color==1?document.querySelector(':root').style.setProperty('--input_bc',"rgba(150, 150, 150, 1)"):document.querySelector(':root').style.setProperty('--input_bc',"rgba(70, 70, 70, 1)");
    color==1?document.querySelector(':root').style.setProperty('--tablanev_bc',"rgba(230, 230, 230, 1)"):document.querySelector(':root').style.setProperty('--tablanev_bc',"rgba(100, 100, 100, 1)");
    color==1?document.querySelector(':root').style.setProperty('--tabla_bc',"rgba(200, 200, 200, 1)"):document.querySelector(':root').style.setProperty('--tabla_bc',"rgba(80, 80, 80, 1)");
    color==1?document.querySelector(':root').style.setProperty('--dif_div_bc',"rgba(255, 255, 255, 0.4)"):document.querySelector(':root').style.setProperty('--dif_div_bc',"rgba(170, 170, 170, 0.4)");
    color==1?document.querySelector(':root').style.setProperty('--kivettdiv',"rgba(150, 150, 150, 0.6)"):document.querySelector(':root').style.setProperty('--kivettdiv',"rgba(0, 0, 0, 0.4)");
    color==1?document.getElementById("SettingsDivIMG").children[0].src = "ph/settings_dark.png":document.getElementById("SettingsDivIMG").children[0].src = "ph/settings_white.png";
    color==1?document.getElementById("TestResultsDivIMG").children[0].src = "ph/notepad_dark.png":document.getElementById("TestResultsDivIMG").children[0].src = "ph/notepad_white.png";
    color==1?document.getElementById("DrkModeDivIMG").children[0].src = "ph/mode_dark.png":document.getElementById("DrkModeDivIMG").children[0].src = "ph/mode_white.png";
    color==1?document.getElementById("LogoutDivIMG").children[0].src = "ph/logout_dark.png":document.getElementById("LogoutDivIMG").children[0].src = "ph/logout_white.png";
    color==1?document.getElementById("SignInIMG").children[0].src = "ph/user_dark.png":document.getElementById("SignInIMG").children[0].src = "ph/user_white.png";
    color==1?document.getElementById("SBCloseIMG").children[0].src = "ph/close_dark.png":document.getElementById("SBCloseIMG").children[0].src = "ph/close_white.png";
    color==1?document.getElementById("SideBarSwitchIMG").children[0].src = "ph/arrow_dark.png":document.getElementById("SideBarSwitchIMG").children[0].src = "ph/arrow_white.png";
    color==1?document.getElementById("FooldalBetoltDivIMG").children[0].src = "ph/home_dark.png":document.getElementById("FooldalBetoltDivIMG").children[0].src = "ph/home_white.png";
    color==1?document.getElementById("TestoldalBetoltDivIMG").children[0].src = "ph/test_dark.png":document.getElementById("TestoldalBetoltDivIMG").children[0].src = "ph/test_white.png";
    if(document.getElementById("TestStartDiv")!=undefined && document.getElementById("TestStartDiv").classList.contains("TestStartDivActive")){
        color==1?document.getElementById("TestStartDiv").firstChild.src = "ph/start_dark.png":document.getElementById("TestStartDiv").firstChild.src = "ph/start_white.png";
    }
    document.getElementById("ValasztoTablakClose") != undefined?color==1?document.getElementById("ValasztoTablakClose").children[0].src = "ph/close_dark.png":document.getElementById("ValasztoTablakClose").children[0].src = "ph/close_white.png":"";
    document.getElementById("FelGorgetoDiv") != undefined?color==1?document.getElementById("FelGorgetoDiv").children[0].src = "ph/uparrow_dark.png":document.getElementById("FelGorgetoDiv").children[0].src = "ph/uparrow_white.png":"";
    document.getElementById("NavSelectorFirst")!=undefined?color==1?document.getElementById("NavSelectorFirst").children[0].src = (document.getElementById("OldalName").innerHTML =="<p>CKIK Fizika</p>"?"ph/test_dark.png":"ph/home_dark.png"):document.getElementById("NavSelectorFirst").children[0].src = (document.getElementById("OldalName").innerHTML =="<p>CKIK Fizika</p>"?"ph/test_white.png":"ph/home_white.png"):"";
    document.getElementsByClassName("TimerIMGOn").length==1?document.getElementById("TimerIMG").firstChild.src = color==1?"ph/on_dark.png":"ph/on_white.png":"";
    document.getElementsByClassName("TimerIMGOn").length==1?document.getElementById("TimerSetIMG").firstChild.src = color==1?"ph/time_set_dark.png":"ph/time_set_white.png":"";
    Tuser.osztaly == "T" || Tuser.osztaly == "A"?color==1?document.getElementById("ExamDivIMG").children[0].src = "ph/plus_dark.png":document.getElementById("ExamDivIMG").children[0].src = "ph/plus_white.png":"";
    document.getElementById("ProfilPicDiv") != undefined?SettingsCheck():"";
}

function Settings(){
    if(document.getElementById("NavSelectorFoDiv")!=undefined){
        document.body.removeChild(document.getElementById("NavSelectorFoDiv"));
    }
    SignInClose();
    if(document.getElementById("ProfilPicDiv") == undefined){
        document.getElementById("MainBody").innerHTML = "";
        document.getElementById("OldalName").innerText = "Beállítások";
        document.getElementById("MainBody").appendChild(DivCreate("ProfilPicDiv","ProfilPicDiv"));
        document.getElementById("ProfilPicDiv").appendChild(DivCreate("ProfilPicDivIMG","ProfilPicDivIMG"));
        //UserAvatarLeker(Tuser.id);
    
        document.getElementById("ProfilPicDivIMG").style.backgroundImage = "url("+(usersetting.drkmode==1?"ph/user_dark.png":"ph/user_white.png")+")";
        document.getElementById("ProfilPicDiv").innerHTML += "<p>Profilkép megváltoztatás</p>";
        document.getElementById("ProfilPicDiv").setAttribute("onclick","importIMG()");
        PrivateModOn("load");
    
        document.getElementById("MainBody").appendChild(DivCreate("TestGombDivek","TestGombDivek"));
        document.getElementById("TestGombDivek").appendChild(DivCreate("SettingsDiv","UNChangeDiv"));
        document.getElementById("UNChangeDiv").innerHTML += "<p>Felhasználónév</p>";
        document.getElementById("UNChangeDiv").appendChild(DivCreate("SettingsDivIMG","UNChangeDivIMG"));
        document.getElementById("UNChangeDivIMG").appendChild(ImgCreate(usersetting.drkmode==1?"ph/idcard_dark.png":"ph/idcard_white.png"));
        document.getElementById("UNChangeDiv").setAttribute("onclick","UNChange()");0
    
        document.getElementById("TestGombDivek").appendChild(DivCreate("SettingsDiv","PWChangeDiv"));
        document.getElementById("PWChangeDiv").innerHTML += "<p>jelszó</p>";
        document.getElementById("PWChangeDiv").appendChild(DivCreate("SettingsDivIMG","PWChangeDivIMG"));
        document.getElementById("PWChangeDivIMG").appendChild(ImgCreate(usersetting.drkmode==1?"ph/password_dark.png":"ph/password_white.png"));
        document.getElementById("PWChangeDiv").setAttribute("onclick","PWChange()");
    
        document.getElementById("TestGombDivek").appendChild(DivCreate("SettingsDiv","PrivateChangeDiv"));
        document.getElementById("PrivateChangeDiv").innerHTML += "<p>Profil láthatóság</p>";
        document.getElementById("PrivateChangeDiv").appendChild(DivCreate("SettingsDivIMG","PrivateChangeDivIMG"));
        document.getElementById("PrivateChangeDivIMG").appendChild(ImgCreate(usersetting.drkmode==1?"ph/private_dark.png":"ph/private_white.png"));
        document.getElementById("PrivateChangeDiv").setAttribute("onclick","PrivateModOn('change')");
    }
}

function UNChange(){
    if(document.getElementById("EgyDivMindFelett").classList.contains("EgyDivMindFelettOpen")){
        EgyMindFelettClose();
    }
    else{
        document.getElementById("EgyDivMindFelett").classList.add("EgyDivMindFelettOpen");
        document.getElementById("EgyDivMindFelett").classList.add("UNChange");
        document.getElementById("BlackBG").classList.add("BlackBGOn");
        document.getElementById("BlackBG").setAttribute("onclick","EgyMindFelettClose()");
        document.getElementById("EgyDivMindFelett").innerHTML += InputCreate("text","new","new username");
        if(Tuser.osztaly != "T" && Tuser.osztaly != "A"){
            document.getElementById("EgyDivMindFelett").innerHTML += "<p class='UserNameMess'>A felhasználó név megváltoztatását csak a rendszergazda tudja engedélyezni!</p>";
        }
        document.getElementById("EgyDivMindFelett").appendChild(DivCreate("UNchangeSubmit","UNchangeSubmit"));
        document.getElementById("UNchangeSubmit").innerHTML = "<p>username change</p>";
        document.getElementById("UNchangeSubmit").setAttribute("onclick","UNChangeSubmit()");
        document.getElementById("inputnew").setAttribute("onclick","WarningColorRemove('inputnew')");
        document.getElementById("inputnew").setAttribute("onfocus","WarningColorRemove('inputnew')");
    }
}

function UNChangeSubmit(){
    if(Tuser.osztaly == "T" || Tuser.osztaly == "A"){
        UserNameChange(document.getElementById("UNchangeSubmit").value,Tuser.id);
    }else{
        ErtesitesFeltoltese({id: Tuser.id, message: "A felhasználó megakarja változtatni a nevét!", extra: document.getElementById("inputnew").value +","+Tuser.nev, kinek: "A", lezarva: 0});
        ErtesitesFeltoltese({id: Tuser.id, message: "A felhasználónév megváltoztatási kérelem elküldve!", extra: "", kinek: Tuser.id, lezarva: 1});
    }
    EgyMindFelettClose();
}

function PWChange(){
    if(document.getElementById("EgyDivMindFelett").classList.contains("EgyDivMindFelettOpen")){
        EgyMindFelettClose();
    }
    else{
        document.getElementById("EgyDivMindFelett").classList.add("EgyDivMindFelettOpen");
        document.getElementById("EgyDivMindFelett").classList.add("PWChange");
        document.getElementById("BlackBG").classList.add("BlackBGOn");
        document.getElementById("BlackBG").setAttribute("onclick","EgyMindFelettClose()");
        document.getElementById("EgyDivMindFelett").innerHTML += InputCreate("password","current","Jelenlegi jelszó");
        document.getElementById("EgyDivMindFelett").innerHTML += InputCreate("password","new","Új jelszó");
        document.getElementById("EgyDivMindFelett").innerHTML += InputCreate("password","newconfirm","Új jelszó megerősítése");
        document.getElementById("EgyDivMindFelett").innerHTML += InputCreate("checkbox","showpw","jelszó mutatás");
        document.getElementById("inputshowpw").setAttribute("onchange","PWShow(1)");
        document.getElementById("EgyDivMindFelett").appendChild(DivCreate("PWchangeSubmit","PWchangeSubmit"));
        document.getElementById("PWchangeSubmit").innerHTML = "<p>password change</p>";
        document.getElementById("PWchangeSubmit").setAttribute("onclick","PWChangeSubmit()");
        document.getElementById("inputnew").setAttribute("onclick","WarningColorRemove('inputnew')");document.getElementById("inputnew").setAttribute("onfocus","WarningColorRemove('inputnew')");
        document.getElementById("inputcurrent").setAttribute("onclick","WarningColorRemove('labelcurrent')");document.getElementById("inputcurrent").setAttribute("onfocus","WarningColorRemove('labelcurrent')");
        document.getElementById("inputnewconfirm").setAttribute("onclick","WarningColorRemove('labelnewconfirm')");document.getElementById("inputnewconfirm").setAttribute("onfocus","WarningColorRemove('labelnewconfirm')");

    }
}

function PWChangeSubmit(){
    let currentpw = hash(document.getElementById("inputcurrent").value);
    let newpw = document.getElementById("inputnew").value;
    let newpwconf = document.getElementById("inputnewconfirm").value;
    let igaze = true
    if(document.getElementById("inputcurrent").value == ""){
        igaze = false;
        FaultDivOpen("Írja be a jelenlegi jelszavát!");
        WarningColorAdd("labelcurrent");
    }
    else if(currentpw != Tuser.jelszo){
        igaze = false;
        FaultDivOpen("Hibásan írta be a jelenlegi jelszót!");
        WarningColorAdd("labelcurrent");
    }
    else if(newpw == ""){
        igaze = false;
        FaultDivOpen("Írja be az új jelszavát!");
        WarningColorAdd("labelnew");
    }
    else if(newpwconf == ""){
        igaze = false;
        FaultDivOpen("Írja be újra az új jelszavát!");
        WarningColorAdd("labelnewconfirm");
    }
    else if(newpw != newpwconf){
        igaze = false;
        FaultDivOpen("A két jelszó nem egyezik!");
        WarningColorAdd("labelnewconfirm");
    }
    if(igaze == true){
        Tuser.jelszo = hash(newpw);
        UsersAdatFeltolt("jelszo = '"+Tuser.jelszo+"'","id = "+Tuser.id);
    }

}

function PWShow(value){
    if(value == 1){
        document.getElementById("inputnew").type=="password"?document.getElementById("inputnew").type="text":document.getElementById("inputnew").type="password";
        document.getElementById("inputcurrent").type=="password"?document.getElementById("inputcurrent").type="text":document.getElementById("inputcurrent").type="password";
        document.getElementById("inputnewconfirm").type=="password"?document.getElementById("inputnewconfirm").type="text":document.getElementById("inputnewconfirm").type="password";
    }
}

function EgyMindFelettClose(){
    document.getElementById("EgyDivMindFelett").classList = "";
    document.getElementById("EgyDivMindFelett").innerHTML = "";
    document.getElementById("BlackBG").classList.remove("BlackBGOn");
    document.getElementById("BlackBG").removeAttribute("onclick");
}

function PrivateModOn(value){
    let private = undefined;
    if(value == "load"){
        private = usersetting.private;
    }
    else if(value == "change"){
        usersetting.private==0?private=1:private=0;
        usersetting.private = private;
    }
    value == "change"?UserSettingsChange("private = "+usersetting.private+"","userid = '"+Tuser.id+"'"):"";
    private==0?document.getElementById("ProfilPicDivIMG").classList.remove("ProfilPicDivIMGOn"):document.getElementById("ProfilPicDivIMG").classList.add("ProfilPicDivIMGOn");
}

function SettingsCheck(){
    document.getElementById("ProfilPicDivIMG").style.backgroundImage = "url("+(usersetting.drkmode==1?"ph/user_dark.png":"ph/user_white.png")+")";
    document.getElementById("UNChangeDivIMG").removeChild(document.getElementById("UNChangeDivIMG").firstChild);
    document.getElementById("UNChangeDivIMG").appendChild(ImgCreate(usersetting.drkmode==1?"ph/idcard_dark.png":"ph/idcard_white.png"));
    document.getElementById("PWChangeDivIMG").removeChild(document.getElementById("PWChangeDivIMG").firstChild);
    document.getElementById("PWChangeDivIMG").appendChild(ImgCreate(usersetting.drkmode==1?"ph/password_dark.png":"ph/password_white.png"));
    document.getElementById("PrivateChangeDivIMG").removeChild(document.getElementById("PrivateChangeDivIMG").firstChild);
    document.getElementById("PrivateChangeDivIMG").appendChild(ImgCreate(usersetting.drkmode==1?"ph/private_dark.png":"ph/private_white.png"));
}

function FaultDivOpen(text){
    document.getElementById("FaultDiv").innerHTML = "<p>"+text+"</p>";
    document.getElementById("FaultDiv").classList.add("FaultDivOpen");
    setTimeout(FaultDivClose,5000);
}
function FaultDivClose(){
    document.getElementById("FaultDiv").classList.remove("FaultDivOpen");
}

function WarningColorAdd(id){
    document.getElementById(id).classList.add("WarningColor");
}
function WarningColorRemove(id){
    document.getElementById(id).classList.remove("WarningColor");
    FaultDivClose();
}

function TesztEredmenyLoad(){
    SignInClose();
    if(document.getElementById("NavSelectorFoDiv") != undefined){
        document.body.removeChild(document.getElementById("NavSelectorFoDiv"));
    }
    if(document.getElementById("KivettErtekek") != undefined){
        document.body.removeChild(document.getElementById("KivettErtekek"));
    }
    if(document.getElementById("OldalName").innerText != "TESZT EREDMÉNYEK"){
        document.getElementById("OldalName").innerText = "TESZT EREDMÉNYEK";
        document.getElementById("MainBody").innerHTML = "";
        document.getElementById("MainBody").appendChild(DivCreate("TesztEredmenyDiv","TesztEredmenyDiv"));
        document.getElementById("TesztEredmenyDiv").appendChild(DivCreate("TesztEredmeny","TesztEredmeny"));
        document.getElementById("TesztEredmenyDiv").appendChild(DivCreate("DogaEredmeny","DogaEredmeny"));
        EredmenyLekeres(Tuser.id);
    }
}

function EredmenyekKiGen(response){
    let TestGen = false;
    let DogaGen = false;
    if(response.length == 0){
        document.getElementById("MainBody").innerHTML = "<div class='UresTesztEredmenyDiv'><p>Jelenleg még nincs egyetlen dolgozata vagy teszt eredménye!</p></div>";
    }
    for (let i = 0; i < response.length; i++){
        let Szazalek = Math.floor(Number(response[i].Epont)/Number(response[i].Mpont)* 100);
        let Jegy;
        if(Szazalek <= 100 && Szazalek>=85){Jegy = "5"}
        else if(Szazalek < 85 && Szazalek >= 70){Jegy = "4"}
        else if(Szazalek < 70 && Szazalek >= 50){Jegy = "3"}
        else if(Szazalek < 50 && Szazalek >= 30){Jegy = "2"}
        else{Jegy = "1"}
        if(response[i].fajta == 0){
            if(!TestGen){
                TestGen = true;
                TestHeaderGen("TesztEredmeny");
            }
        }
        else{
            if(!DogaGen){
                DogaGen = true;
                TestHeaderGen("DogaEredmeny");
            }
        }
        document.getElementById(response[i].fajta == 0?"TesztEredmeny":"DogaEredmeny").appendChild(DivCreate((response[i].fajta == 0?"TEredmeny":"TEredmenyDoga"),"")); //TEredmenyDoga
        document.getElementsByClassName((response[i].fajta == 0?"TEredmeny":"TEredmenyDoga"))[document.getElementsByClassName((response[i].fajta == 0?"TEredmeny":"TEredmenyDoga")).length-1].innerHTML += "<div><p>"+response[i].datum.split('T')[0]+"<br>"+response[i].datum.split('T')[1].split('.')[0]+"</p></div>";
        document.getElementsByClassName((response[i].fajta == 0?"TEredmeny":"TEredmenyDoga"))[document.getElementsByClassName((response[i].fajta == 0?"TEredmeny":"TEredmenyDoga")).length-1].innerHTML += "<div class='EredmenyEJegy'><p>"+Jegy+"</p></div>";
        document.getElementsByClassName((response[i].fajta == 0?"TEredmeny":"TEredmenyDoga"))[document.getElementsByClassName((response[i].fajta == 0?"TEredmeny":"TEredmenyDoga")).length-1].innerHTML += "<div class='EredmenyESzazalek'><p>"+Szazalek+"%</p></div>";
        document.getElementsByClassName((response[i].fajta == 0?"TEredmeny":"TEredmenyDoga"))[document.getElementsByClassName((response[i].fajta == 0?"TEredmeny":"TEredmenyDoga")).length-1].innerHTML += "<div class='EredmenyDif'><p>"+(response[i].dif==1?"Könnyű":response[i].dif==2?"Közepes":"Nehéz")+"</p></div>";
        if(response[i].TIdo != undefined && response[i].TIdo != "0" && response[i].TIdo != "-1"){
            let MaradtTime = response[i].TIdo - response[i].EIdo;
            let h = Math.floor(MaradtTime/3600);
            let sec = h>0?Math.floor((MaradtTime-h*3600)%60):Math.floor(MaradtTime%60);
            let min = h>0?Math.floor((MaradtTime-h*3600)/60):Math.floor(MaradtTime/60);
            document.getElementsByClassName((response[i].fajta == 0?"TEredmeny":"TEredmenyDoga"))[document.getElementsByClassName((response[i].fajta == 0?"TEredmeny":"TEredmenyDoga")).length-1].innerHTML += "<div class='EredmenyEIdo'><p> "+(h>0?h+":":"")+(min>9?min:"0"+min)+":"+(sec>9?sec:"0"+sec)+"</p></div>";
        }
        else{document.getElementsByClassName((response[i].fajta == 0?"TEredmeny":"TEredmenyDoga"))[document.getElementsByClassName((response[i].fajta == 0?"TEredmeny":"TEredmenyDoga")).length-1].innerHTML += "<div class='EredmenyEIdoNincs'><p>Nem volt beállítva idő!</p></div>"};
        let KatArray = response[i].katok.split(',');
        document.getElementsByClassName((response[i].fajta == 0?"TEredmeny":"TEredmenyDoga"))[document.getElementsByClassName((response[i].fajta == 0?"TEredmeny":"TEredmenyDoga")).length-1].innerHTML += "<div class='EredmenyKatok'><p></p></div>";
        for (let j = 0; j < KatArray.length; j++) {
            document.getElementsByClassName("EredmenyKatok")[document.getElementsByClassName("EredmenyKatok").length-1].firstChild.innerText += KatArray[j];
        }
    }
}

function TestHeaderGen(id){
    document.getElementById(id).appendChild(DivCreate("TesztEredmenyekNevek",""));
    document.getElementsByClassName("TesztEredmenyekNevek")[document.getElementsByClassName("TesztEredmenyekNevek").length-1].innerHTML += "<p>"+(document.getElementsByClassName("TesztEredmenyekNevek").length==1?"Teszt":"Dolgozat")+"</p>";
    document.getElementById(id).appendChild(DivCreate("EHeaderDiv",""));
    document.getElementsByClassName("EHeaderDiv")[document.getElementsByClassName("EHeaderDiv").length-1].innerHTML += "<div class='EHeaderStyleDiv'><p>Dátum<p></div>";
    document.getElementsByClassName("EHeaderDiv")[document.getElementsByClassName("EHeaderDiv").length-1].innerHTML += "<div class='EHeaderStyleDiv EHeaderJegy'><p>jegy</p></div>";//(document.getElementsByClassName("EHeaderDiv").length==1?"Láthatatlan":"Kapott")
    document.getElementsByClassName("EHeaderDiv")[document.getElementsByClassName("EHeaderDiv").length-1].innerHTML += "<div class='EHeaderStyleDiv EHeaderSzazalek'><p>Százalék<p></div>";
    document.getElementsByClassName("EHeaderDiv")[document.getElementsByClassName("EHeaderDiv").length-1].innerHTML += "<div class='EHeaderStyleDiv'><p>Nehézség<p></div>";
    document.getElementsByClassName("EHeaderDiv")[document.getElementsByClassName("EHeaderDiv").length-1].innerHTML += "<div class='EHeaderStyleDiv'><p>Eltelt idő<p></div>";
    document.getElementsByClassName("EHeaderDiv")[document.getElementsByClassName("EHeaderDiv").length-1].innerHTML += "<div class='EHeaderStyleDiv'><p>Kategóriák<p></div>";
}

function AdatokKiitaras(){
    FooldalBetoltese("default");
    document.getElementById("SideBarBody").appendChild(DivCreate("SideBarNavGombokDiv","SideBarNavGombokDiv"));
    document.getElementById("SideBarBody").appendChild(DivCreate("SideBarNotifDiv","SideBarNotifDiv"));
    ErtesitesekLeker(Tuser.osztaly, Tuser.nev, Tuser.id);
    document.getElementById("SideBarNavGombokDiv").appendChild(DivCreate("NavGombok","FooldalNav"));
    document.getElementById("SideBarNavGombokDiv").appendChild(DivCreate("NavGombok","TestoldalNav"));

    document.getElementById("FooldalNav").appendChild(DivCreate("NavGomb","FooldalBetolt"));
    document.getElementById("FooldalBetolt").setAttribute("onclick","FooldalBetoltese('default')");
    document.getElementById("FooldalBetolt").appendChild(DivCreate("NavGombIMG","FooldalBetoltDivIMG"));
    document.getElementById("FooldalBetoltDivIMG").appendChild(ImgCreate(usersetting.drkmode==1?"ph/home_dark.png":"ph/home_white.png"));
    document.getElementById("FooldalBetolt").innerHTML += "<p>főoldal</p>";

    document.getElementById("TestoldalNav").appendChild(DivCreate("NavGomb","TestoldalBetolt"));
    document.getElementById("TestoldalBetolt").setAttribute("onclick","TestoldalBetoltese('default')");
    document.getElementById("TestoldalBetolt").appendChild(DivCreate("NavGombIMG","TestoldalBetoltDivIMG"));
    document.getElementById("TestoldalBetoltDivIMG").appendChild(ImgCreate(usersetting.drkmode==1?"ph/test_dark.png":"ph/test_white.png"));
    document.getElementById("TestoldalBetolt").innerHTML += "<p>teszt oldal</p>";

    for (let i = 0; i < EgyediKat.length; i++) {
        for (let j = 0; j < Teljeskategoriak.length; j++) {
            document.getElementById(EgyediKat[i].rendel).appendChild(DivCreate("NavGomb",Teljeskategoriak[j].nev+EgyediKat[i].id));
            document.getElementById(Teljeskategoriak[j].nev+EgyediKat[i].id).innerHTML ="<p>"+Teljeskategoriak[j].nev+"</p>";
            document.getElementById(Teljeskategoriak[j].nev+EgyediKat[i].id).setAttribute("onclick","CategoryLoad(this)");
        }
    }
    DrkModeSwitch("load");
}

function NotifBetolt(response){
    if(response.length == 0){
        document.getElementById("SideBarNotifDiv").innerHTML += "<div class='NotifHiba'><p>Nincs egy értesítésed se!</p></div>";
    }else{
        let ResArray = Array.from(response).reverse();
        for (let i = 0; i < ResArray.length; i++) {
            document.getElementById("SideBarNotifDiv").appendChild(DivCreate("NotifKiirDiv",""));
            let datum = ResArray[i].datum.split('T')[0] +" "+ ResArray[i].datum.split('T')[1].split('.')[0];
            document.getElementsByClassName("NotifKiirDiv")[document.getElementsByClassName("NotifKiirDiv").length-1].innerHTML += "<div class='NotifDatum'><p>"+datum+"</p></div>";
            document.getElementsByClassName("NotifKiirDiv")[document.getElementsByClassName("NotifKiirDiv").length-1].innerHTML += "<div class='NotifKiiras'><p>"+ResArray[i].message+"</p></div>";
            if(ResArray[i].message == "A felhasználó megakarja változtatni a nevét!"){
                let Extra = ResArray[i].extra.split(',');
                document.getElementsByClassName("NotifKiirDiv")[document.getElementsByClassName("NotifKiirDiv").length-1].innerHTML += "<div class='NotifExtra'><p>"+Extra[1]+" -> "+Extra[0]+"</p></div>";
                if(ResArray[i].lezarva == '0'){
                    document.getElementsByClassName("NotifKiirDiv")[document.getElementsByClassName("NotifKiirDiv").length-1].innerHTML += "<div class='NotifElfogadas' id='NotifElfogadDiv"+i+"'><div><p>Elfogadás</p></div><div onclick='KerelemElfogadas("+ResArray[i].id+",false,"+i+","+ResArray[i].user_id+")'><p>Elutasítás</p></div></div>";
                    document.getElementById("NotifElfogadDiv"+i).firstChild.setAttribute("onclick","KerelemElfogadas("+ResArray[i].id+",true,"+i+","+ResArray[i].user_id+",'"+Extra[0]+"',0)");
                }
            }else if(ResArray[i].message == "A felhasználónak új dolgozat lett kiírva!"){
                document.getElementsByClassName("NotifKiirDiv")[document.getElementsByClassName("NotifKiirDiv").length-1].innerHTML += "<div class='DolgozatNotif' id='DolgozatNotif"+i+"'><p>Dolgozat megkezdése</p></div>";
            }
            if(ResArray[i].lezarva == '1'){
                document.getElementsByClassName("NotifKiirDiv")[document.getElementsByClassName("NotifKiirDiv").length-1].firstChild.classList.add("NotifLezarvaElfogadva");
            }
            else if(ResArray[i].lezarva == '-1'){
                document.getElementsByClassName("NotifKiirDiv")[document.getElementsByClassName("NotifKiirDiv").length-1].firstChild.classList.add("NotifLezarvaElutasitva");
            }
        }
    }
}

function KerelemElfogadas(id,igaze,index, userid, fn , value){
    document.getElementById("NotifElfogadDiv"+index).parentElement.firstChild.classList.add(igaze==true?"NotifLezarvaElfogadva":"NotifLezarvaElutasitva");
    document.getElementById("NotifElfogadDiv"+index).parentElement.removeChild(document.getElementById("NotifElfogadDiv"+index));
    ErtesitesLezaras(id,igaze==true?"1":"-1");
    if(igaze == true){
        if(value == 0){
            UserNameChange(fn,userid);
        }
    }
    ErtesitesFeltoltese({id: Tuser.id, message: "A felhasználó név megváltoztatás "+(igaze==true?"sikeres":"sikertelen")+" volt!",extra: "null",kinek: userid, lezarva: igaze==true?"1":"-1"});
}

function SideBarNotif(){
    if(document.getElementsByClassName("SideBarNotActive").length == 0){
        document.getElementById("SideBarNavGombokDiv").classList.add("SideBarNotActive");
        document.getElementById("SideBarNotifDiv").classList.add("SideBarNotActive");
        document.getElementById("SideBarSwitchIMG").classList.add("SideBarSwitchIMGActive");
        document.getElementById("SideBarSwitch").classList.add("SideBarSwitchActive");
        document.getElementById("SideBarSwitch").children[0].innerText = "Navigáció";
    }
    else{
        document.getElementById("SideBarNavGombokDiv").classList.remove("SideBarNotActive");
        document.getElementById("SideBarNotifDiv").classList.remove("SideBarNotActive");
        document.getElementById("SideBarSwitchIMG").classList.remove("SideBarSwitchIMGActive");
        document.getElementById("SideBarSwitch").classList.remove("SideBarSwitchActive");
        document.getElementById("SideBarSwitch").children[0].innerText = "értesítések";
    }
}

function ExamPub(){
    ValasztottTime = undefined;
    DogaOsztaly = undefined;
    DogaKezdet = undefined;
    DogaKategTabla = [];
    DogaTeljesTabla = [];
    document.getElementById("MainBody").innerHTML = "";
    if(document.getElementById("KivettErtekek") != undefined){
        document.body.removeChild(document.getElementById("KivettErtekek"));
    }
    SignInClose();
    document.getElementById("NavSelectorFoDiv")!=undefined?document.body.removeChild(document.getElementById("NavSelectorFoDiv")):"";
    document.getElementById("OldalName").innerText = "Dolgozat Kiírás";
    document.getElementById("MainBody").appendChild(DivCreate("DolgozatPubDivHeader","DolgozatPubDivHeader"));
    document.getElementById("DolgozatPubDivHeader").appendChild(DivCreate("DogaEHeaderGomb","DogaTablaValasztoDiv"));
    document.getElementById("DogaTablaValasztoDiv").innerHTML = "<p>Kategória választás</p>";
    document.getElementById("DogaTablaValasztoDiv").setAttribute("onclick","TablaValasztoOpen('Kateg')");

    document.getElementById("DolgozatPubDivHeader").appendChild(DivCreate("DogaEHeaderGomb","DogaTeljesTablaDiv"));
    document.getElementById("DogaTeljesTablaDiv").innerHTML = "<p>Tábla választás</p>";
    document.getElementById("DogaTeljesTablaDiv").classList.add("EHeaderGombDisable");
    document.getElementById("DogaTeljesTablaDiv").setAttribute("onclick","TablaValasztoOpen('DogaTabla')");

    if(document.getElementById("TablaValasztoDiv") == undefined){
        document.body.appendChild(DivCreate("TablaValasztoDiv","TablaValasztoDiv"));
    }
    else{
        document.getElementById("TablaValasztoDiv").innerHTML = "";
    }
    document.getElementById("TablaValasztoDiv").appendChild(DivCreate("ValasztoTablakClose","ValasztoTablakClose"));
    document.getElementById("ValasztoTablakClose").appendChild(ImgCreate(usersetting.drkmode==1?"ph/close_dark.png":"ph/close_white.png"));
    document.getElementById("ValasztoTablakClose").firstChild.setAttribute("onclick","TablaValasztoClose()");

    document.getElementById("DolgozatPubDivHeader").appendChild(DivCreate("DogaSettingsSliderDiv","DogaSettingsSliderDiv"));
    document.getElementById("DogaSettingsSliderDiv").appendChild(DivCreate("DogaSettingsSliderDivDisable","DogaSettingsSliderDivDisable"));
    document.getElementById("DogaSettingsSliderDiv").appendChild(DivCreate("DogaSettingsSlider","DogaSettingsSlider"));
    document.getElementById("DogaSettingsSlider").innerHTML += InputCreate("range","DogaSlider","Tábla Sorok");
    document.getElementById("inputDogaSlider").min = "5";
    document.getElementById("inputDogaSlider").value = "5";
    document.getElementById("inputDogaSlider").max = "5";
    document.getElementById("inputDogaSlider").step = "1";
    document.getElementById("DogaSettingsSliderDiv").appendChild(DivCreate("DogaSettingsSorDB","DogaSettingsSorDB"));
    document.getElementById("DogaSettingsSorDB").innerHTML += "<form><input type='text' name='inputDogaSettingsSorDB' id='inputDogaSettingsSorDB' maxlength='3' minlength='1' onchange='DogaSorValueChange()'/></form>";
    var slider = document.getElementById("inputDogaSlider");
    var output = document.getElementById("inputDogaSettingsSorDB");
    output.value = 5;
    slider.oninput = function() {
        output.value = this.value;
    }

    document.getElementById("DolgozatPubDivHeader").appendChild(DivCreate("DogaDifSettingsDiv","DogaDifSettingsDiv"));
    document.getElementById("DogaDifSettingsDiv").appendChild(DivCreate("DogaDifValaszto","DogaDifValaszto"));
    document.getElementById("DogaDifSettingsDiv").appendChild(DivCreate("DogaDif","DogaDifKonnyu"));
    document.getElementById("DogaDifKonnyu").innerHTML = "<p>könnyű</p>";
    document.getElementById("DogaDifKonnyu").setAttribute("onclick","DogaDifValaszto('')");
    document.getElementById("DogaDifSettingsDiv").appendChild(DivCreate("DogaDif","DogaDifNormal"));
    document.getElementById("DogaDifNormal").innerHTML = "<p>normál</p>";
    document.getElementById("DogaDifNormal").setAttribute("onclick","DogaDifValaszto('DogaDifValasztoNo')");
    document.getElementById("DogaDifSettingsDiv").appendChild(DivCreate("DogaDif","DogaDifNehez"));
    document.getElementById("DogaDifNehez").innerHTML = "<p>nehéz</p>";
    document.getElementById("DogaDifNehez").setAttribute("onclick","DogaDifValaszto('DogaDifValasztoNe')");

    document.getElementById("MainBody").appendChild(DivCreate("DolgozatPubDivHeader","DolgozatPubDivHeaderSecond"));

    document.getElementById("DolgozatPubDivHeaderSecond").appendChild(DivCreate("DogaEHeaderGomb","DogaOsztalyValaszto"));
    document.getElementById("DogaOsztalyValaszto").innerHTML = "<p>Osztály választás</p>";
    document.getElementById("DogaOsztalyValaszto").setAttribute("onclick","TablaValasztoOpen('Osztaly')");
    DogaOsztaly = ["9","A"];

    document.getElementById("DolgozatPubDivHeaderSecond").appendChild(DivCreate("DogaEHeaderGomb","DogaKezdetDiv"));
    document.getElementById("DogaKezdetDiv").innerHTML = "<p>Dolgozat Kezdet</p>";
    document.getElementById("DogaKezdetDiv").setAttribute("onclick","TablaValasztoOpen('Kezdet')");
    let d = new Date();
    DogaKezdet = [d.getFullYear(),(d.getMonth()+1),d.getDate(),d.getHours(),d.getMinutes()];

    document.getElementById("DolgozatPubDivHeaderSecond").appendChild(DivCreate("TimerOnOff","TimerOnOff"));
    document.getElementById("TimerOnOff").innerHTML = "<p>Idő Beállítás</p>";
    document.getElementById("TimerOnOff").setAttribute("onclick","TimerOnOff()");
    document.getElementById("TimerOnOff").appendChild(DivCreate("TimerIMG","TimerIMG"));
    document.getElementById("TimerIMG").appendChild(ImgCreate("ph/on_def.png"));
    document.getElementById("TimerIMG").setAttribute("onclick","TimerOnOff()");
    document.getElementById("TimerOnOff").appendChild(DivCreate("TimerSetIMG","TimerSetIMG"));
    document.getElementById("TimerSetIMG").appendChild(ImgCreate("ph/time_set_def.png"));
    document.getElementById("TimerSetIMG").setAttribute("onclick","TimerOnOff()");
    ValasztottTime = [0,2,30];

    document.getElementById("MainBody").appendChild(DivCreate("DogaKiirasGomb","DogaKiirasGomb"));
    document.getElementById("DogaKiirasGomb").innerHTML = "<p>Dolgozat Kiírása</p>";
    document.getElementById("DogaKiirasGomb").setAttribute("onclick","DolgozatKiiras()");
}

function DolgozatKiiras(){
    let sordb = document.getElementById("DogaSettingsSliderDivDisable") == undefined?document.getElementById("inputDogaSlider").value:undefined;
    let ido = document.getElementById("TimerIMG").classList.contains("TimerIMGOn")?ValasztottTime[0]*3600 + ValasztottTime[1]*60 + ValasztottTime[2]:undefined;
    let dif;
    if(document.getElementById("DogaDifValaszto").classList == "DogaDifValaszto"){
        dif = "1";
    }else if(document.getElementById("DogaDifValaszto").classList == "DogaDifValaszto DogaDifValasztoNo"){
        dif = "2";
    }else{dif = "3";}
    let TablaId = "";
    DogaTeljesTabla = Alkategoriak.filter(c=> DogaTeljesTabla.includes(c.nev));
    for (let i = 0; i < DogaTeljesTabla.length; i++) {
        TablaId += DogaTeljesTabla[i].id+ (i!=DogaTeljesTabla.length-1?",":"");
    }
    let Kezdet = "";
    for (let i = 0; i < DogaKezdet.length; i++) {
        Kezdet += DogaKezdet[i] + (i!=DogaKezdet.length-1?",":"");
    }
    if(sordb != undefined && TablaId != "" &&  Kezdet != ""){
        ErtesitesFeltoltese({id: Tuser.id, message: "A felhasználónak új dolgozat lett kiírva!", extra: "", kinek: (DogaOsztaly[0]+"/"+DogaOsztaly[1]), lezarva: 1});
        DolgozatFeltolt({id: Tuser.id, ido: (ido == undefined?-1:ido), kezdet: Kezdet, dif: dif, tabla_id: TablaId, tabla_sor: sordb, osztaly: DogaOsztaly[0]+"/"+DogaOsztaly[1]});
    }
    TablaId = "";
    for (let i = 0; i < DogaTeljesTabla.length; i++){
        TablaId += DogaTeljesTabla[i].nev+ (i!=DogaTeljesTabla.length-1?", ":"");
    }

    document.getElementById("MainBody").innerHTML = "";
    document.getElementById("MainBody").appendChild(DivCreate("DogaVegsoKiiras","DogaVegsoKiiras"));
    document.getElementById("DogaVegsoKiiras").innerHTML += "<h1>Dolgozat kiírva!</h1>";
    document.getElementById("DogaVegsoKiiras").innerHTML += "<p>Dolgozat kezdete: "+DogaKezdet[0]+"-"+DogaKezdet[1]+"-"+DogaKezdet[2]+" "+DogaKezdet[3]+":"+DogaKezdet[4]+"</p>";
    document.getElementById("DogaVegsoKiiras").innerHTML += "<p>Dolgozat sorok száma: "+sordb+"</p>";
    document.getElementById("DogaVegsoKiiras").innerHTML += "<p>Dolgozat táblái: "+TablaId+"</p>";
    document.getElementById("DogaVegsoKiiras").innerHTML += "<p>Dolgozat nehézsége: "+(dif=='1'?"Könnyű":(dif=='2'?"Normál":"Nehéz"))+"</p>";
    document.getElementById("DogaVegsoKiiras").innerHTML += "<p>Dolgozatot író osztály: "+DogaOsztaly[0]+"/"+DogaOsztaly[1]+"</p>";
    ido = (ValasztottTime[0]==0?"":ValasztottTime[0]+":")+(ValasztottTime[1]<10?"0"+ValasztottTime[1]:ValasztottTime[1])+":"+(ValasztottTime[2]<10?"0"+ValasztottTime[2]:ValasztottTime[2]);
    document.getElementById("DogaVegsoKiiras").innerHTML += "<p>Beállított idő: "+(ValasztottTime==undefined?"Nem lett beállítva idő!":ido)+"</p>";

    document.getElementById("MainBody").appendChild(DivCreate("DogaVegsoGombokDiv","DogaVegsoGombokDiv"));
    document.getElementById("DogaVegsoGombokDiv").innerHTML += "<div><p>Visszatérés a főoldalra</p></div>";
    document.getElementById("DogaVegsoGombokDiv").lastChild.setAttribute("onclick","FooldalBetoltese('default')");
    document.getElementById("DogaVegsoGombokDiv").innerHTML += "<div onclick='ExamPub()'><p>Új dolgozat kiírása</p></div>";
}

function DogaDifValaszto(CL){
    document.getElementById("DogaDifValaszto").classList = CL==''?"DogaDifValaszto":"DogaDifValaszto "+CL;
}

function FooldalBetoltese(value){
    SignInClose();SideBarClose();
    if(document.getElementById("KivettErtekek") != undefined){
        document.body.removeChild(document.getElementById("KivettErtekek"));
    }
    if(document.getElementById("TudnivalokDiv") == undefined){
        document.getElementById("OldalName").innerHTML = "<p>CKIK Fizika</p>";
        document.getElementById("MainBody").innerHTML = "";
        var IdCheck;
        if(document.getElementById("NavSelectorFoDiv") != undefined){
            IdCheck = document.getElementById("NavSelectorFoDiv").children[1].id;
            IdCheck = IdCheck[IdCheck.length-2];
        }
        if(document.getElementById("NavSelectorFoDiv") == undefined){
            NavSelectorCreate("T");
        }else if(document.getElementById("NavSelectorFoDiv") != undefined && IdCheck == "E"){
            document.body.removeChild(document.getElementById("NavSelectorFoDiv"));
            NavSelectorCreate("T");
        }
        if(value == "default"){
            document.getElementById("MainBody").appendChild(DivCreate("TablaDivek","TudnivalokDiv"));
            document.getElementById("TudnivalokDiv").appendChild(DivCreate("TablaNevDivek","TudnivaloNevDiv"));
            document.getElementById("TudnivaloNevDiv").innerHTML ="<p>Tudnivalók</p>";
            document.getElementById("TudnivalokDiv").appendChild(DivCreate("TudnivaloKiiras","TudnivaloKiiras"));
            for (let i = 0; i < tudnivalok.length; i++) {
                document.getElementById("TudnivaloKiiras").innerHTML += "<p>"+tudnivalok[i]+"</p>";
            }
            if(document.getElementsByClassName("SelectedNav")[0].id!="NavSelectorFirst"){
                document.getElementsByClassName("SelectedNav")[0].classList.remove("SelectedNav");
                document.getElementById("NavSelectorFirst").classList.add("SelectedNav");
            }
        }
    }
}

function TestoldalBetoltese(value){
    if(!TestActive){
        document.getElementById("MainBody").innerHTML = "";
        document.getElementById("OldalName").innerHTML = "<p>Teszt oldal</p>";
        var IdCheck;
        if(document.getElementById("NavSelectorFoDiv") != undefined){
            IdCheck = document.getElementById("NavSelectorFoDiv").children[1].id;
            IdCheck = IdCheck[IdCheck.length-2];
        }
        if(document.getElementById("TablaValasztoDiv") != undefined){
            document.body.removeChild(document.getElementById("TablaValasztoDiv"));
        }
        if(document.getElementById("NavSelectorFoDiv") == undefined){
            NavSelectorCreate("E");
        }else if(document.getElementById("NavSelectorFoDiv") != undefined && IdCheck == "T"){
            document.body.removeChild(document.getElementById("NavSelectorFoDiv"));
            NavSelectorCreate("E");
        }
        SignInClose();SideBarClose();
        if(value == "default"){
            if(document.getElementsByClassName("SelectedNav")[0].id!="NavSelectorFirst"){
                document.getElementsByClassName("SelectedNav")[0].classList.remove("SelectedNav");
                document.getElementById("NavSelectorFirst").classList.add("SelectedNav");
            }
            TestSettings(Alkategoriak);
        }
    }
}

function TestSettings(array){
    document.getElementById("MainBody").appendChild(DivCreate("TestSettings","TestSettingsDiv"));
    ValasztottTablak = array;
    ValasztottTime = [0, 2, 30];

    ValasztottTablaSorok = [];
    array.forEach(elem => {
        Tablak.filter(c=>c.alkat_id == elem.id).forEach(e => {
            ValasztottTablaSorok.push(e);
        });
    });
    document.getElementById("TestSettingsDiv").appendChild(DivCreate("TestTablakValaszt","TestTablakValaszt"));
    document.getElementById("TestTablakValaszt").innerHTML += "<p>Tábla választás</p>";
    document.getElementById("TestTablakValaszt").setAttribute("onclick","TablaValasztoOpen('Tabla')");
    TablaValaszto();
    
    document.getElementById("TestSettingsDiv").appendChild(DivCreate("TestSettingsSliderDiv","TestSettingsSliderDiv"));
    document.getElementById("TestSettingsSliderDiv").appendChild(DivCreate("TestSettingsSliderDivDisable","TestSettingsSliderDivDisable"));
    document.getElementById("TestSettingsSliderDiv").appendChild(DivCreate("TestSettingsSlider","TestSettingsSlider"));
    document.getElementById("TestSettingsSlider").innerHTML += InputCreate("range","TestSlider","Tábla Sorok");
    document.getElementById("inputTestSlider").min = "5";
    document.getElementById("inputTestSlider").value = "5";
    document.getElementById("inputTestSlider").max = "5";
    document.getElementById("inputTestSlider").step = "1";
    document.getElementById("TestSettingsSliderDiv").appendChild(DivCreate("TestSettingsSorDB","TestSettingsSorDB"));
    document.getElementById("TestSettingsSorDB").innerHTML += "<form><input type='text' name='inputTestSettingsSorDB' id='inputTestSettingsSorDB' maxlength='3' minlength='1' onchange='SorValueChange()'/></form>";
    var slider = document.getElementById("inputTestSlider");
    var output = document.getElementById("inputTestSettingsSorDB");
    output.value = 5;
    slider.oninput = function() {
        output.value = this.value;
    }

    document.getElementById("TestSettingsDiv").appendChild(DivCreate("TimerOnOff","TimerOnOff"));
    document.getElementById("TimerOnOff").innerHTML = "<p>Idő limit</p>";
    document.getElementById("TimerOnOff").setAttribute("onclick","TimerOnOff()");
    document.getElementById("TimerOnOff").appendChild(DivCreate("TimerIMG","TimerIMG"));
    document.getElementById("TimerIMG").appendChild(ImgCreate("ph/on_def.png"));
    document.getElementById("TimerIMG").setAttribute("onclick","TimerOnOff()");
    document.getElementById("TimerOnOff").appendChild(DivCreate("TimerSetIMG","TimerSetIMG"));
    document.getElementById("TimerSetIMG").appendChild(ImgCreate("ph/time_set_def.png"));
    document.getElementById("TimerSetIMG").setAttribute("onclick","TimerOnOff()");

    document.getElementById("TestSettingsDiv").appendChild(DivCreate("DifValaszto","DifValaszto"));
    document.getElementById("DifValaszto").appendChild(DivCreate("DifShowDiv","DifShowDiv"));
    document.getElementById("DifShowDiv").classList.add("DifShowDivEasy");
    document.getElementById("DifValaszto").appendChild(DivCreate("DifDivek","EasyDifDiv"));
    document.getElementById("EasyDifDiv").innerHTML = "<p>Könnyű</p>";
    document.getElementById("EasyDifDiv").classList.add("DifActive");
    document.getElementById("EasyDifDiv").setAttribute("onclick","DifValaszto(this)");
    document.getElementById("DifValaszto").appendChild(DivCreate("DifDivek","NormalDifDiv"));
    document.getElementById("NormalDifDiv").innerHTML = "<p>Normál</p>";
    document.getElementById("NormalDifDiv").setAttribute("onclick","DifValaszto(this)");
    document.getElementById("DifValaszto").appendChild(DivCreate("DifDivek","HardDifDiv"));
    document.getElementById("HardDifDiv").innerHTML = "<p>Nehéz</p>";
    document.getElementById("HardDifDiv").setAttribute("onclick","DifValaszto(this)");

    document.getElementById("TestSettingsDiv").appendChild(DivCreate("TestStartDiv","TestStartDiv"));
    document.getElementById("TestStartDiv").appendChild(ImgCreate("ph/start_default.png"));
    document.getElementById("TestStartDiv").innerHTML += "<p>Indítás</p>";
    document.getElementById("TestStartDiv").setAttribute("onclick","TestInditasa()");
}

function TimerOnOff(){
    if(document.getElementById("TimerIMG").classList.contains("TimerIMGOn")){
        document.getElementById("TimerIMG").classList.remove("TimerIMGOn");
        document.getElementById("TimerIMG").firstChild.src = "ph/on_def.png";
        document.getElementById("TimerSetIMG").firstChild.src = "ph/time_set_def.png";
        document.getElementById("TimerOnOff").classList.remove("TimerOnOffActive");
        document.getElementById("TimerSetIMG").classList.remove("TimerSetIMGActive");
        document.getElementById("TimerSetIMG").removeAttribute('onclick','TimerSettingsOn()');
        document.getElementById("TimerOnOff").firstChild.setAttribute("onclick","TimerOnOff()");
        document.getElementById("TimerIMG").setAttribute("onclick","TimerOnOff()");
        document.getElementById("TimerSetIMG").setAttribute("onclick","TimerOnOff()");
        document.getElementById("TimerOnOff").style.removeProperty("cursor");
    }else{
        document.getElementById("TimerIMG").classList.add("TimerIMGOn");
        document.getElementById("TimerIMG").firstChild.src = usersetting.drkmode == 1?"ph/on_dark.png":"ph/on_white.png";
        document.getElementById("TimerOnOff").removeAttribute("onclick");
        document.getElementById("TimerOnOff").classList.add("TimerOnOffActive");
        document.getElementById("TimerIMG").setAttribute("onclick","TimerOnOff()");
        document.getElementById("TimerOnOff").firstChild.setAttribute("onclick","TimerOnOff()");
        document.getElementById("TimerOnOff").style.setProperty("cursor","default");
        document.getElementById("TimerSetIMG").setAttribute('onclick','TimerSettingsOn()');
        document.getElementById("TimerSetIMG").classList.add("TimerSetIMGActive");
        document.getElementById("TimerSetIMG").firstChild.src = usersetting.drkmode == 1?"ph/time_set_dark.png":"ph/time_set_white.png";
        TimerSettingsOn();
    }
}

function TimerSettingsOn(){
    if(document.getElementById("TablaValasztoDiv") == undefined){
        document.body.appendChild(DivCreate("TablaValasztoDiv","TablaValasztoDiv"));
    }
    else{
        document.getElementById("TablaValasztoDiv").innerHTML = "";
    }
    TablaValasztoOpen("Timer");
    document.getElementById("TablaValasztoDiv").appendChild(DivCreate("ValasztoTablakClose","ValasztoTablakClose"));
    document.getElementById("TablaValasztoDiv").classList.add("TimerInputs");
    document.getElementById("ValasztoTablakClose").appendChild(ImgCreate(usersetting.drkmode==1?"ph/close_dark.png":"ph/close_white.png"));
    document.getElementById("ValasztoTablakClose").firstChild.setAttribute("onclick","TablaValasztoClose()");
    document.getElementById("TablaValasztoDiv").innerHTML += "<form><label id='labelTestTimerH' for='inputTestTimerH'>óra</label><input type='number' max=24 min=0 value="+ValasztottTime[0]+" name='inputTestTimerH' id='inputTestTimerH' onchange='TimerChanged(this)'/></form>";
    document.getElementById("TablaValasztoDiv").innerHTML += "<form><label id='labelTestTimerM' for='inputTestTimerM'>perc</label><input type='number' max=60 min=0 value="+ValasztottTime[1]+" name='inputTestTimerM' id='inputTestTimerM' onchange='TimerChanged(this)'/></form>";
    document.getElementById("TablaValasztoDiv").innerHTML += "<form><label id='labelTestTimerS' for='inputTestTimerS'>másodperc</label><input type='number' max=60 min=0 value="+ValasztottTime[2]+" name='inputTestTimerS' id='inputTestTimerS' onchange='TimerChanged(this)'/></form>";
}

function TimerChanged(input){
    let value = input.id[input.id.length-1];
    Number(input.value)>Number(input.max)?input.value = input.max:"";
    Number(input.value)<Number(input.min)?input.value = input.min:"";
    value=='H'?ValasztottTime[0]=Number(document.getElementById("inputTestTimerH").value):value=='M'?ValasztottTime[1]=Number(document.getElementById("inputTestTimerM").value):ValasztottTime[2]=Number(document.getElementById("inputTestTimerS").value);
}

function TestInditasa(){
    TestActive = true;
    Difficulty = document.getElementById("DifShowDiv").classList[1]=="DifShowDivEasy"?1:(document.getElementById("DifShowDiv").classList[1]=="DifShowDivNormal"?2:"R");
    let Sorok = Number(document.getElementById("inputTestSlider").value);
    document.getElementById("TimerIMG").classList.contains("TimerIMGOn")?EredetiValasztottTime = (ValasztottTime[0]*3600) + (ValasztottTime[1]*60) + ValasztottTime[2]:"";
    document.getElementById("TimerIMG").classList.contains("TimerIMGOn")?ValasztottTime = (ValasztottTime[0]*3600) + (ValasztottTime[1]*60) + ValasztottTime[2]:"";
    let ValasztottSorok = [];
    for (let i = 0; i < KivalasztottTablak.length; i++) {
        Tablak.filter(x=>x.alkat_id == Alkategoriak.filter(c=>c.nev==KivalasztottTablak[i])[0].id).forEach(k=>ValasztottSorok.push(k));
    }
    let RandomArray = [];
    while(RandomArray.length < Sorok){
        let random = Math.floor(Math.random()*ValasztottSorok.length);
        !RandomArray.includes(random)?RandomArray.push(random):"";
    }
    KivalasztottTablak = [];
    for (let i = 0; i < RandomArray.length; i++) {
        KivalasztottTablak.push(ValasztottSorok[RandomArray[i]]);
    }
    let TeljesTablak = [];
    let KivettErtekek = [];
    for (let i = 0; i < KivalasztottTablak.length; i++) {
        let SorokArray = [KivalasztottTablak[i].nev,KivalasztottTablak[i].jel,KivalasztottTablak[i].def,KivalasztottTablak[i].mert,KivalasztottTablak[i].id];
        if(Difficulty != "R"){
            RandomArray = [Math.floor(Math.random()*4)];
            if(Difficulty == 2){
                while(RandomArray.length < 2){
                    let random = Math.floor(Math.random()*4);
                    !RandomArray.includes(random)?RandomArray.push(random):"";
                }
            }
            let BA = [];
            for (let i = 0; i < SorokArray.length; i++) {
                if(!RandomArray.includes(i)){
                    BA.push(SorokArray[i])
                }else{
                    KivettErtekek.push({nev:SorokArray[i], id: SorokArray[4]});
                    BA.push("");
                }
            }
            TeljesTablak.push(BA);
        }else{
            let random = RandomGen();
            if(random != 3){
                RandomArray = [Math.floor(Math.random()*4)];
                if(random > 1){
                    while(RandomArray.length < 2){
                        let random1 = Math.floor(Math.random()*4);
                        !RandomArray.includes(random1)?RandomArray.push(random1):"";
                    }
                }
                let BA = [];
                for (let i = 0; i < SorokArray.length; i++) {
                    if(!RandomArray.includes(i)){
                        BA.push(SorokArray[i])
                    }else{
                        KivettErtekek.push({nev:SorokArray[i], id: SorokArray[4]});
                        BA.push("");
                    }
                }
                BA.push(KivalasztottTablak[i].id);
            }else{
                TeljesTablak.push([SorokArray[0],"","",""]);
                KivettErtekek.push({nev:SorokArray[1], id: SorokArray[4]});
                KivettErtekek.push({nev:SorokArray[2], id: SorokArray[4]});
                KivettErtekek.push({nev:SorokArray[3], id: SorokArray[4]});
            }
        }
    }
    document.getElementById("TestSettingsDiv").classList.add("FeltolTestSettings");
    KivettErtekekDB = KivettErtekek.length
    setTimeout(TestTablaBetoltesek,700,TeljesTablak,KivettErtekek);
}

function TestTablaBetoltesek(array,kivettarray){
    let timeractive = document.getElementsByClassName("TimerIMGOn").length==1?true:false;
    document.getElementById("MainBody").innerHTML = "";
    document.getElementById("MainBody").appendChild(DivCreate("TablaDivek","TestTablaDiv"));
    document.getElementById("MainBody").classList.add("MainBodyMegemel");
    document.getElementById("TestTablaDiv").appendChild(DivCreate("TablaNevDivek","TestTablaNevDiv"));
    document.getElementById("TestTablaNevDiv").innerHTML ="<p>Teszt</p>";
    document.getElementById("TestTablaDiv").appendChild(DivCreate("TablaNevekKiiras","TestDivKiiras"));
    TablaSorokCreate("TestDivKiiras","Név","Jele","Definíció","Mértékegység");
    for (let i = 0; i < array.length; i++) {
        TablaSorokCreate("TestDivKiiras",array[i][0],array[i][1],array[i][2],array[i][3]);
        let UtolsoChild = document.getElementById("TestDivKiiras").lastChild.children;
        for (let j = 0; j <UtolsoChild.length; j++) {
            if(UtolsoChild[j].firstChild.innerText == ""){
                UtolsoChild[j].classList.add("KivettValaszDivek");
                UtolsoChild[j].dataset.sorid = array[i][4];
            }
        }
    }
    document.body.appendChild(DivCreate("KivettErtekek","KivettErtekek"));
    let ra = [];
    while(ra.length < kivettarray.length){
        let random = Math.floor(Math.random()*kivettarray.length);
        !ra.includes(random)?ra.push(random):"";
    }
    for (let i = 0; i < ra.length; i++) {
        document.getElementById("KivettErtekek").appendChild(DivCreate("KEDivek",""));
        let elem = document.getElementsByClassName("KEDivek")[document.getElementsByClassName("KEDivek").length-1];
        elem.innerHTML = "<p id='"+kivettarray[ra[i]].id+"' >"+kivettarray[ra[i]].nev+"</p>";
        elem.setAttribute("onclick","KivettErtekek(this,'KivettErtek')");
    }
    if(timeractive){
        document.getElementById("TestDivKiiras").appendChild(DivCreate("TestTimer","TestTimer"));
        TestTimer = setInterval(TestTimerKiir,1000);
    }
    document.getElementsByClassName("TablaBelsoErtekek")[document.getElementsByClassName("TablaBelsoErtekek").length-1].classList.add("AlsoBorder");
    document.getElementsByClassName("TablaBelsoErtekek")[document.getElementsByClassName("TablaBelsoErtekek").length-1].children[0].style.borderBottomLeftRadius = ".6vw";
    document.getElementsByClassName("TablaBelsoErtekek")[document.getElementsByClassName("TablaBelsoErtekek").length-1].children[3].style.borderBottomRightRadius = ".6vw";
    document.getElementById("TestDivKiiras").appendChild(DivCreate("TestDone","TestDone"));
    document.getElementById("TestDone").innerHTML = "<p>teszt leadása</p>";
    document.getElementById("TestDone").setAttribute("onclick","TesztLeadasa()")
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "expression"]);
}

function TesztLeadasa(){
    clearInterval(TestTimer);
    let Pontok = 0;
    let ValaszArray = Array.from(document.getElementsByClassName("TablaBelsoErtekek"));
    for (let i = 1; i < ValaszArray.length; i++){
        for (let j = 0; j < ValaszArray[i].children.length; j++){
            let Valasz = KivalasztottTablak.filter(c=>c.id == ValaszArray[i].children[j].firstChild.id)[0];
            if(Valasz != undefined){
                Valasz = j==0?Valasz.nev:(j==1?Valasz.jel:(j==2?Valasz.def:Valasz.mert));
                let HelyesValasz = j==0?KivalasztottTablak[i-1].nev:(j==1?KivalasztottTablak[i-1].jel:(j==2?KivalasztottTablak[i-1].def:KivalasztottTablak[i-1].mert));
                Valasz == HelyesValasz?Pontok++:"";
            }
        }
    }
    document.getElementById("MainBody").innerHTML = "";
    Kiertekeles("T",Pontok);
}

function Kiertekeles(value, Pontok){
    document.getElementById("MainBody").appendChild(DivCreate("KiertekelesDiv","KiertekelesDiv"));
    document.getElementById("KiertekelesDiv").appendChild(DivCreate("JegyDiv","JegyDiv"));
    document.getElementById("KiertekelesDiv").appendChild(DivCreate("IdoDiv","IdoDiv"));
    document.getElementById("KiertekelesDiv").appendChild(DivCreate("ValasztottTablakDiv","ValasztottTablakDiv"));
    let Szazalek = Math.floor(Pontok/KivettErtekekDB * 100);
    let Jegy;
    if(Szazalek <= 100 && Szazalek>=85){Jegy = "5"}
    else if(Szazalek < 85 && Szazalek >= 70){Jegy = "4"}
    else if(Szazalek < 70 && Szazalek >= 50){Jegy = "3"}
    else if(Szazalek < 50 && Szazalek >= 30){Jegy = "2"}
    else{Jegy = "1"}
    let ETablak = "";
    if(value == "T"){
        document.getElementById("JegyDiv").innerHTML = "<p>Láthatatlan jegy: "+Jegy+" - Százalék: "+Szazalek+"%</p>";
        if(EredetiValasztottTime!=undefined){
            let MaradtTime = EredetiValasztottTime - ValasztottTime;        
            let h = Math.floor(MaradtTime/3600);
            let sec = h>0?Math.floor((MaradtTime-h*3600)%60):Math.floor(MaradtTime%60);
            let min = h>0?Math.floor((MaradtTime-h*3600)/60):Math.floor(MaradtTime/60);
            document.getElementById("IdoDiv").innerHTML = "<p>Eltelt idő: </p><p>"+(h>0?h+":":"")+(min>9?min:"0"+min)+":"+(sec>9?sec:"0"+sec)+"</p>";
        }
        else{document.getElementById("IdoDiv").innerHTML = "Nem volt beállítva idő!"};
        for (let i = 0; i < EredetiKivalasztottTablak.length; i++) {
            ETablak += EredetiKivalasztottTablak[i] + (i<EredetiKivalasztottTablak.length-1?", ":"");
        }
        document.getElementById("ValasztottTablakDiv").innerHTML = "<p>"+ETablak+"</p>";
    }
    EredmenyFeltolt({id:Tuser.id, mpont:KivalasztottTablak.length, epont:Pontok, kateg:ETablak, nehezseg:(Difficulty=="R"?3:Difficulty), fajta:(value == "T"?0:1), EIdo:(typeof ValasztottTime != 'number'?-1:ValasztottTime), TIdo:(EredetiValasztottTime==undefined?-1:EredetiValasztottTime)});
    TestActive = false;
}

function TestTimerKiir(){
    if(ValasztottTime == 0){
        TesztLeadasa();
    }
    if(ValasztottTime >= 0){
        let h = Math.floor(ValasztottTime/3600);
        let sec = h>0?Math.floor((ValasztottTime-h*3600)%60):Math.floor(ValasztottTime%60);
        let min = h>0?Math.floor((ValasztottTime-h*3600)/60):Math.floor(ValasztottTime/60);
        document.getElementById("TestTimer").innerHTML = "<p>"+(h>0?h+":":"")+(min>9?min:"0"+min)+":"+(sec>9?sec:"0"+sec)+"</p>";
        if(min == 0 && h == 0 && sec <= 30){
            sec <= 10?document.getElementById("TestTimer").classList.add("TestTimerE"):document.getElementById("TestTimer").classList.add("TestTimerAE");
        }
        ValasztottTime = ValasztottTime -1;
    }
}

function KivettErtekek(div,value){
    if(value == "KivettErtek"){
        if(document.getElementsByClassName("ActiveValasz").length == 1){
            document.getElementsByClassName("ActiveValasz")[0].classList.add("CserelhetoValasz");
            document.getElementsByClassName("ActiveValasz")[0].classList.remove('ActiveValasz');
        }
    }
    if(document.getElementsByClassName("KivettErtekActive").length == 0 || document.getElementsByClassName("KivettErtekActive")[0]!=div){
        document.getElementsByClassName("KivettErtekActive").length>0?document.getElementsByClassName("KivettErtekActive")[0].classList.remove("KivettErtekActive"):"";
        div.classList.add("KivettErtekActive");
        let ValaszthatoHelyek = document.getElementsByClassName("KivettValaszDivek");
        for (let i = 0; i < ValaszthatoHelyek.length; i++) {
            !ValaszthatoHelyek[i].classList.contains("ActiveValasz")?ValaszthatoHelyek[i].firstChild.innerText==""?ValaszthatoHelyek[i].classList.add("LetehetoValasz"):ValaszthatoHelyek[i].classList.add("CserelhetoValasz"):"";
            ValaszthatoHelyek[i].setAttribute("onclick","ValaszBetevese(this,'"+(ValaszthatoHelyek[i].firstChild.innerText==""?'betesz':'csere')+"')");
        }
    }
}

function ValaszBetevese(div,value){
    if(value == "betesz"){
        div.classList.remove("LetehetoValasz");
        div.removeAttribute("onclick");
        if(document.getElementsByClassName("KivettErtekActive").length == 1){
            div.innerHTML = document.getElementsByClassName("KivettErtekActive")[0].children[0].outerHTML;
            document.getElementById("KivettErtekek").removeChild(document.getElementsByClassName("KivettErtekActive")[0]);
            if(document.getElementsByClassName("ActiveValasz").length == 1 && document.getElementsByClassName("ActiveValasz")[0] != div){
                document.getElementsByClassName("ActiveValasz")[0].classList.remove("ActiveValasz");
                div.classList.add("ActiveValasz");
            }else if(document.getElementsByClassName("ActiveValasz").length == 0){
                div.classList.add("ActiveValasz");
            }
        }else if(document.getElementsByClassName("ActiveValasz").length == 1){
            div.innerHTML = document.getElementsByClassName("ActiveValasz")[0].children[0].outerHTML;
            document.getElementsByClassName("ActiveValasz")[0].setAttribute("onclick","ValaszBetevese(this,'betesz')");
            document.getElementsByClassName("ActiveValasz")[0].classList.add("LetehetoValasz");
            document.getElementsByClassName("ActiveValasz")[0].innerHTML = "<p></p>";
            document.getElementsByClassName("ActiveValasz")[0].classList.remove("ActiveValasz");
            div.classList.add("ActiveValasz");
        }
    }else{
        if(document.getElementsByClassName("KivettErtekActive").length == 1){
            let innertext = div.firstChild;
            div.innerHTML = document.getElementsByClassName("KivettErtekActive")[0].children[0].outerHTML;
            div.classList.remove("CserelhetoValasz");
            div.classList.add("ActiveValasz");
            document.getElementsByClassName("KivettErtekActive")[0].innerHTML = innertext.outerHTML;
            document.getElementsByClassName("KivettErtekActive")[0].classList.remove("KivettErtekActive");

        }else if(document.getElementsByClassName("ActiveValasz").length == 1){
            let innertext = div.firstChild;
            div.innerHTML = document.getElementsByClassName("ActiveValasz")[0].firstChild.outerHTML;
            div.classList.remove("CserelhetoValasz");
            document.getElementsByClassName("ActiveValasz")[0].innerHTML = innertext.outerHTML;
            document.getElementsByClassName("ActiveValasz")[0].classList.add("CserelhetoValasz");
            document.getElementsByClassName("ActiveValasz")[0].setAttribute("onclick","ValaszBetevese(this,'csere')");
            document.getElementsByClassName("ActiveValasz")[0].classList.remove("ActiveValasz");
            div.classList.add("ActiveValasz");
        }
    }
    if(document.getElementById("KivettErtekek") != undefined && document.getElementById("KivettErtekek").children.length == 0){
        document.body.removeChild(document.getElementById("KivettErtekek"));
    }
}

function RandomGen(){
    let random = Math.random()*100+1;
    if(random <= 85 && random > 40){
        return 2;
    }else if(random < 40 && random >= 0){
        return 1;
    }else{
        return 3;
    }
}

function DifValaszto(div){
    let DifArray = ["DifShowDivEasy","DifShowDivNormal","DifShowDivHard"];
    let index = Array.from(document.getElementsByClassName("DifDivek")).indexOf(div);
    if(!document.getElementsByClassName("DifDivek")[index].classList.contains("DifActive")){
        document.getElementById("DifShowDiv").classList = "DifShowDiv "+DifArray[index];
        document.getElementsByClassName("DifActive")[0].classList.remove("DifActive");
        document.getElementsByClassName("DifDivek")[index].classList.add("DifActive");
    }
}

function TablaValaszto(){
    document.getElementById("TablaValasztoDiv") == undefined?document.body.appendChild(DivCreate("TablaValasztoDiv","TablaValasztoDiv")):document.getElementById("TablaValasztoDiv").innerHTML = "";
    document.getElementById("TablaValasztoDiv").appendChild(DivCreate("ValasztoTablakClose","ValasztoTablakClose"));
    document.getElementById("ValasztoTablakClose").appendChild(ImgCreate(usersetting.drkmode==1?"ph/close_dark.png":"ph/close_white.png"));
    document.getElementById("ValasztoTablakClose").firstChild.setAttribute("onclick","TablaValasztoClose()");
    ValasztottTablak.forEach(elem => {
        document.getElementById("TablaValasztoDiv").innerHTML += "<div class='ValasztoTDiv "+(KivalasztottTablak.includes(elem.nev)?'ValasztoTDivValaszt':"")+"'  onclick='TablaKivalasztasa(this)'><p>"+elem.nev+"</p></div";
    });
}

function TablaKivalasztasa(div){
    let db =ValasztottTablaSorok.filter(x=>x.alkat_id == ValasztottTablak.filter(c=>c.nev == div.firstChild.innerText)[0].id).length;
    if(db < 5 && document.getElementsByClassName("ValasztoTDivValaszt").length == 0){
        div.classList.add("ValasztoTDivValaszt");
        document.getElementById("inputTestSlider").max = db;
        document.getElementById("inputTestSlider").min = db;
    }else{
        if(document.getElementById("inputTestSlider").max<=5 && !div.classList.contains("ValasztoTDivValaszt")){
            document.getElementsByClassName("ValasztoTDivValaszt").length == 0?document.getElementById("inputTestSlider").max = db:document.getElementById("inputTestSlider").max = Number(document.getElementById("inputTestSlider").max) +db;
        }else if(document.getElementById("inputTestSlider").max > 5 && !div.classList.contains("ValasztoTDivValaszt")){
            document.getElementById("inputTestSlider").max = (Number(document.getElementById("inputTestSlider").max) + db);
        }else if(document.getElementById("inputTestSlider").max > 5 && div.classList.contains("ValasztoTDivValaszt") && (Number(document.getElementById("inputTestSlider").max) - db) > 5){
            document.getElementById("inputTestSlider").max = (Number(document.getElementById("inputTestSlider").max) - db);
        }else if(document.getElementById("inputTestSlider").max > 5 && div.classList.contains("ValasztoTDivValaszt") && (Number(document.getElementById("inputTestSlider").max) - db) <= 5){
            document.getElementsByClassName("ValasztoTDivValaszt").length == 1?document.getElementById("inputTestSlider").max = 5:document.getElementById("inputTestSlider").max = (Number(document.getElementById("inputTestSlider").max) - db);
        }

        div.classList.contains("ValasztoTDivValaszt")?div.classList.remove("ValasztoTDivValaszt"):div.classList.add("ValasztoTDivValaszt");
        if(document.getElementById("TestSettingsSliderDivDisable")!=undefined && document.getElementsByClassName("ValasztoTDivValaszt").length>0){
            document.getElementById("TestSettingsSliderDiv").removeChild(document.getElementById("TestSettingsSliderDivDisable"));
            document.getElementById("TestStartDiv").firstChild.src = usersetting.drkmode==1?"ph/start_dark.png":"ph/start_white.png";
            document.getElementById("TestStartDiv").classList.add("TestStartDivActive");
        }else if(document.getElementById("TestSettingsSliderDivDisable")==undefined && document.getElementsByClassName("ValasztoTDivValaszt").length==0){
            document.getElementById("TestSettingsSliderDiv").appendChild(DivCreate("TestSettingsSliderDivDisable","TestSettingsSliderDivDisable"));
            document.getElementById("TestStartDiv").firstChild.src = "ph/start_default.png";
            document.getElementById("TestStartDiv").classList.remove("TestStartDivActive");
        }
    }
    let IT = div.firstChild.innerText;
    div.classList.contains("ValasztoTDivValaszt")?KivalasztottTablak.push(IT):KivalasztottTablak.splice(KivalasztottTablak.indexOf(IT),1);
    div.classList.contains("ValasztoTDivValaszt")?EredetiKivalasztottTablak.push(IT):EredetiKivalasztottTablak.splice(EredetiKivalasztottTablak.indexOf(IT),1);
}

function TablaValasztoOpen(value){
    document.getElementById("TablaValasztoDiv").classList = "TablaValasztoDiv";
    if(value == 'Tabla'){
        TablaValaszto();
        document.getElementById("TablaValasztoDiv").classList.add("TablaValasztoDivOpen");
        document.getElementById("BlackBG").classList.add("BlackBGOn");
        document.getElementById("BlackBG").setAttribute("onclick","TablaValasztoClose()");
    }
    else if(value == "Kateg"){
        DogaTablaValaszto();
        document.getElementById("TablaValasztoDiv").classList.add("TablaValasztoDivOpen");
        document.getElementById("BlackBG").classList.add("BlackBGOn");
        document.getElementById("BlackBG").setAttribute("onclick","TablaValasztoClose()");
    }
    else if(value == "DogaTabla" && DogaKategTabla.length != 0){
        DogaTeljesValaszto();
        document.getElementById("TablaValasztoDiv").classList.add("TablaValasztoDivOpen");
        document.getElementById("BlackBG").classList.add("BlackBGOn");
        document.getElementById("BlackBG").setAttribute("onclick","TablaValasztoClose()");
    }
    else if(value == "Timer"){
        document.getElementById("TablaValasztoDiv").classList.add("TablaValasztoDivOpen");
        document.getElementById("BlackBG").classList.add("BlackBGOn");
        document.getElementById("BlackBG").setAttribute("onclick","TablaValasztoClose()");
    }
    else if(value == "Osztaly"){
        DogaOsztalyValaszto();
        document.getElementById("TablaValasztoDiv").classList.add("TablaValasztoDivOpen");
        document.getElementById("BlackBG").classList.add("BlackBGOn");
        document.getElementById("BlackBG").setAttribute("onclick","TablaValasztoClose()");
    }
    else if(value == "Kezdet"){
        IdoKezdetValaszto();
        document.getElementById("TablaValasztoDiv").classList.add("TablaValasztoDivOpen");
        document.getElementById("BlackBG").classList.add("BlackBGOn");
        document.getElementById("BlackBG").setAttribute("onclick","TablaValasztoClose()");
    }
}

function IdoKezdetValaszto(){
    if(document.getElementById("TablaValasztoDiv").children.length>1){
        document.getElementById("TablaValasztoDiv").innerHTML = "";
        document.getElementById("TablaValasztoDiv").appendChild(DivCreate("ValasztoTablakClose","ValasztoTablakClose"));
        document.getElementById("ValasztoTablakClose").appendChild(ImgCreate(usersetting.drkmode==1?"ph/close_dark.png":"ph/close_white.png"));
        document.getElementById("ValasztoTablakClose").firstChild.setAttribute("onclick","TablaValasztoClose()");
    }
    document.getElementById("TablaValasztoDiv").appendChild(DivCreate("DogaKezdetDivValaszto","DogaKezdetDivValaszto"));
    document.getElementById("DogaKezdetDivValaszto").innerHTML += "<div class='DogaInput'><form><label for='DogaEv' id='DogaEvLabel'>Év</label><input maxlength='4' value='"+DogaKezdet[0]+"' type='text' name='DogaEv' id='DogaEv' onchange='DogaKezdetChange(this,0)'></form></div>";
    document.getElementById("DogaKezdetDivValaszto").innerHTML += "<div class='DogaInput'><form><label for='DogaHonap' id='DogaHonapLabel'>Hónap</label><input maxlength='2' value='"+DogaKezdet[1]+"' type='text' name='DogaHonap' id='DogaHonap' onchange='DogaKezdetChange(this,1)'></form></div>";
    document.getElementById("DogaKezdetDivValaszto").innerHTML += "<div class='DogaInput'><form><label for='DogaNap' id='DogaNapLabel'>Nap</label><input maxlength='2' type='text' value='"+DogaKezdet[2]+"' name='DogaNap' id='DogaNap' onchange='DogaKezdetChange(this,2)'></form></div>";
    document.getElementById("DogaKezdetDivValaszto").innerHTML += "<div class='DogaInput'><form><label for='DogaOra' id='DogaOraLabel'>Óra</label><input maxlength='2' type='text' value='"+DogaKezdet[3]+"' name='DogaOra' id='DogaOra' onchange='DogaKezdetChange(this,3)'></form></div>";
    document.getElementById("DogaKezdetDivValaszto").innerHTML += "<div class='DogaInput'><form><label for='DogaPerc' id='DogaPercLabel'>Perc</label><input type='text' maxlength='2' value='"+DogaKezdet[4]+"' name='DogaPerc' id='DogaPerc' onchange='DogaKezdetChange(this,4)'></form></div>";
}

function DogaKezdetChange(input,id){
    DogaKezdet[Number(id)] = input.value;
}

function DogaOsztalyValaszto(){
    if(document.getElementById("TablaValasztoDiv").children.length>1){
        document.getElementById("TablaValasztoDiv").innerHTML = "";
        document.getElementById("TablaValasztoDiv").appendChild(DivCreate("ValasztoTablakClose","ValasztoTablakClose"));
        document.getElementById("ValasztoTablakClose").appendChild(ImgCreate(usersetting.drkmode==1?"ph/close_dark.png":"ph/close_white.png"));
        document.getElementById("ValasztoTablakClose").firstChild.setAttribute("onclick","TablaValasztoClose()");
    }
    document.getElementById("TablaValasztoDiv").appendChild(DivCreate("OsztalyValasztoDiv","EvfolyamValaszt"));
    document.getElementById("EvfolyamValaszt").innerHTML += "<div class='' id='EvfolyamHatter'></div>";
    document.getElementById("EvfolyamValaszt").innerHTML += "<div class='EvfolyamDivek' onclick='OsztalyKiValaszt(this)'><p>9</p></div>";
    document.getElementById("EvfolyamValaszt").innerHTML += "<div class='EvfolyamDivek' onclick='OsztalyKiValaszt(this)'><p>10</p></div>";
    document.getElementById("EvfolyamValaszt").innerHTML += "<div class='EvfolyamDivek' onclick='OsztalyKiValaszt(this)'><p>11</p></div>";
    document.getElementById("EvfolyamValaszt").innerHTML += "<div class='EvfolyamDivek' onclick='OsztalyKiValaszt(this)'><p>12</p></div>";
    document.getElementById("TablaValasztoDiv").appendChild(DivCreate("OsztalyValasztoDiv","OsztalyValaszt"));
    document.getElementById("OsztalyValaszt").innerHTML += "<div class='' id='OsztalyHatter'></div>";
    document.getElementById("OsztalyValaszt").innerHTML += "<div class='OsztalyDivek' onclick='OsztalyKiValaszt(this)'><p>A</p></div>";
    document.getElementById("OsztalyValaszt").innerHTML += "<div class='OsztalyDivek' onclick='OsztalyKiValaszt(this)'><p>B</p></div>";
    document.getElementById("OsztalyValaszt").innerHTML += "<div class='OsztalyDivek' onclick='OsztalyKiValaszt(this)'><p>C</p></div>";
    document.getElementById("OsztalyValaszt").innerHTML += "<div class='OsztalyDivek' onclick='OsztalyKiValaszt(this)'><p>K</p></div>";
    for (let i = 0; i < Array.from(document.getElementsByClassName("EvfolyamDivek")).length; i++){
        if(Array.from(document.getElementsByClassName("EvfolyamDivek"))[i].innerText == DogaOsztaly[0]){
            Array.from(document.getElementsByClassName("EvfolyamDivek"))[i].classList.add("OsztalyKiValasztDiv");
            document.getElementById("EvfolyamHatter").classList.add("OsztalyHatter"+i);
        }
    }
    for (let i = 0; i < Array.from(document.getElementsByClassName("OsztalyDivek")).length; i++){
        if(Array.from(document.getElementsByClassName("OsztalyDivek"))[i].innerText == DogaOsztaly[1]){
            Array.from(document.getElementsByClassName("OsztalyDivek"))[i].classList.add("OsztalyKiValasztDiv");
            document.getElementById("OsztalyHatter").classList.add("OsztalyHatter"+i);
        }
    }
}

function OsztalyKiValaszt(div){
    let Divek = Array.from(document.getElementsByClassName(div.classList));
    let KivalasztottDivek = Array.from(document.getElementsByClassName("OsztalyKiValasztDiv"));
    for (let i = 0; i < KivalasztottDivek.length; i++){
        if(Divek.includes(KivalasztottDivek[i]) && div != KivalasztottDivek[i] && KivalasztottDivek[i].classList[0] == div.classList[0]){
            KivalasztottDivek[i].classList = div.classList[0];
            div.classList.add("OsztalyKiValasztDiv");
            let index = Divek.indexOf(div);
            i==0? document.getElementById("EvfolyamHatter").classList = "OsztalyHatter"+index:document.getElementById("OsztalyHatter").classList = "OsztalyHatter"+index;
            DogaOsztaly[i] = div.innerText;
        }
    }
}

function DogaTablaValaszto(){
    if(document.getElementById("TablaValasztoDiv").children.length>1){
        document.getElementById("TablaValasztoDiv").innerHTML = "";
        document.getElementById("TablaValasztoDiv").appendChild(DivCreate("ValasztoTablakClose","ValasztoTablakClose"));
        document.getElementById("ValasztoTablakClose").appendChild(ImgCreate(usersetting.drkmode==1?"ph/close_dark.png":"ph/close_white.png"));
        document.getElementById("ValasztoTablakClose").firstChild.setAttribute("onclick","TablaValasztoClose()");
    }
    for (let i = 0; i < Teljeskategoriak.length; i++){
        document.getElementById("TablaValasztoDiv").appendChild(DivCreate("ValasztoTDiv",""));
        DogaKategTabla.includes(Teljeskategoriak[i].nev)?document.getElementsByClassName("ValasztoTDiv")[document.getElementsByClassName("ValasztoTDiv").length-1].classList.add("DogaTKivalaszt"):"";
        document.getElementsByClassName("ValasztoTDiv")[document.getElementsByClassName("ValasztoTDiv").length-1].innerHTML = "<p>"+Teljeskategoriak[i].nev+"</p>";
        document.getElementsByClassName("ValasztoTDiv")[document.getElementsByClassName("ValasztoTDiv").length-1].setAttribute("onclick","KategTablaKivalaszt(this,'DogaTKivalaszt')");
    }
}

function DogaTeljesValaszto(){
    if(document.getElementById("TablaValasztoDiv").children.length>1){
        document.getElementById("TablaValasztoDiv").innerHTML = "";
        document.getElementById("TablaValasztoDiv").appendChild(DivCreate("ValasztoTablakClose","ValasztoTablakClose"));
        document.getElementById("ValasztoTablakClose").appendChild(ImgCreate(usersetting.drkmode==1?"ph/close_dark.png":"ph/close_white.png"));
        document.getElementById("ValasztoTablakClose").firstChild.setAttribute("onclick","TablaValasztoClose()");
    }
    let KategArray = [];
    for (let i = 0; i < Teljeskategoriak.filter(c=>DogaKategTabla.includes(c.nev)).length; i++) {
        KategArray.push(Teljeskategoriak.filter(c=>DogaKategTabla.includes(c.nev))[i].id);
    }
    KategArray = Alkategoriak.filter(c=>KategArray.includes(c.tkat_id));
    for (let i = 0; i < KategArray.length; i++){
        document.getElementById("TablaValasztoDiv").appendChild(DivCreate("ValasztoTDiv",""));
        DogaTeljesTabla.includes(KategArray[i].nev)?document.getElementsByClassName("ValasztoTDiv")[document.getElementsByClassName("ValasztoTDiv").length-1].classList.add("DogaTeljesKivalaszt"):"";
        document.getElementsByClassName("ValasztoTDiv")[document.getElementsByClassName("ValasztoTDiv").length-1].innerHTML = "<p>"+KategArray[i].nev+"</p>";
        document.getElementsByClassName("ValasztoTDiv")[document.getElementsByClassName("ValasztoTDiv").length-1].setAttribute("onclick","KategTablaKivalaszt(this,'DogaTeljesKivalaszt')");
    }
}

function KategTablaKivalaszt(div,CList){
    let ALkatID;
    let DB;
    if(CList == "DogaTeljesKivalaszt"){
        ALkatID = Alkategoriak.filter(c=>c.nev == div.innerText)[0].id;
        DB = Tablak.filter(c=>c.alkat_id == ALkatID).length;
    }
    if(div.classList.contains(CList)){
        div.classList.remove(CList);
        if(CList == "DogaTKivalaszt"){
            DogaKategTabla.splice(DogaKategTabla.indexOf(div.innerText),1);
        }
        if(CList == "DogaTeljesKivalaszt"){
            DogaTeljesTabla.splice(DogaTeljesTabla.indexOf(div.innerText),1);
            if(DogaTeljesTabla.length==0){
                document.getElementById("inputDogaSlider").max = 5;
                document.getElementById("inputDogaSlider").min = 5;
                document.getElementById("inputDogaSlider").value = 5;
                document.getElementById("inputDogaSettingsSorDB").value = 5;
                document.getElementById("DogaSettingsSliderDiv").appendChild(DivCreate("DogaSettingsSliderDivDisable","DogaSettingsSliderDivDisable"));
            }
            else{
                document.getElementById("inputDogaSlider").max = Number(document.getElementById("inputDogaSlider").max) - DB;
            }
        }
    }
    else{
        div.classList.add(CList);
        if(CList == "DogaTKivalaszt" && !DogaKategTabla.includes(div.innerText)){
            DogaKategTabla.push(div.innerText);
        }
        if(CList == "DogaTeljesKivalaszt" && !DogaTeljesTabla.includes(div.innerText)){
            if(DB < 5){
                document.getElementById("inputDogaSlider").min = DB;
            }
            if(DogaTeljesTabla.length==0){
                document.getElementById("inputDogaSlider").max = DB;
                if(DB < 5){
                    document.getElementById("inputDogaSlider").min = DB;
                    document.getElementById("inputDogaSlider").max = DB;
                    document.getElementById("inputDogaSlider").value = DB;
                    document.getElementById("inputDogaSettingsSorDB").value = DB;
                }
                document.getElementById("DogaSettingsSliderDiv").removeChild(document.getElementById("DogaSettingsSliderDivDisable"));
            }
            else{
                document.getElementById("inputDogaSlider").max = Number(document.getElementById("inputDogaSlider").max) + DB;
            }
            DogaTeljesTabla.push(div.innerText);
        }
    }
    if(DogaKategTabla.length > 0){
        document.getElementById("DogaTeljesTablaDiv").classList.remove("EHeaderGombDisable");
    }
    else{
        document.getElementById("DogaTeljesTablaDiv").classList.add("EHeaderGombDisable");
    }
}

function TablaValasztoClose(){
    document.getElementById("TablaValasztoDiv").classList.remove("TablaValasztoDivOpen");
    document.getElementById("BlackBG").classList.remove("BlackBGOn");
    document.getElementById("BlackBG").removeAttribute("onclick");
}

function SorValueChange(){
    let max = Number(document.getElementById("inputTestSlider").max);
    let min = Number(document.getElementById("inputTestSlider").min);
    let SorDB = Number(document.getElementById("inputTestSettingsSorDB").value);
    if(isNaN(SorDB) == false && SorDB != Number(document.getElementById("inputTestSlider").value)){
        if(SorDB <= max && SorDB >= min){
            document.getElementById("inputTestSlider").value = document.getElementById("inputTestSettingsSorDB").value;
        }
        else if(SorDB > max){
            document.getElementById("inputTestSettingsSorDB").value = max;
            document.getElementById("inputTestSlider").value = max;
        }else if(SorDB < min){
            document.getElementById("inputTestSettingsSorDB").value = min;
            document.getElementById("inputTestSlider").value = min;
        }
    }else if(isNaN(SorDB) == true){
        document.getElementById("inputTestSettingsSorDB").value = document.getElementById("inputTestSlider").value;
    }
}

function DogaSorValueChange(){
    let max = Number(document.getElementById("inputDogaSlider").max);
    let min = Number(document.getElementById("inputDogaSlider").min);
    let SorDB = Number(document.getElementById("inputDogaSettingsSorDB").value);
    if(isNaN(SorDB) == false && SorDB != Number(document.getElementById("inputDogaSlider").value)){
        if(SorDB <= max && SorDB >= min){
            document.getElementById("inputDogaSlider").value = document.getElementById("inputDogaSettingsSorDB").value;
        }
        else if(SorDB > max){
            document.getElementById("inputDogaSettingsSorDB").value = max;
            document.getElementById("inputDogaSlider").value = max;
        }else if(SorDB < min){
            document.getElementById("inputDogaSettingsSorDB").value = min;
            document.getElementById("inputDogaSlider").value = min;
        }
    }else if(isNaN(SorDB) == true){
        document.getElementById("inputDogaSettingsSorDB").value = document.getElementById("inputDogaSlider").value;
    }
}

function NavSelectorCreate(value){
    document.body.appendChild(DivCreate("NavSelectorFoDiv","NavSelectorFoDiv"));
    document.getElementById("NavSelectorFoDiv").appendChild(DivCreate("NavSelectorDiv","NavSelectorFirst"));
    document.getElementById("NavSelectorFirst").appendChild(ImgCreate(value=="T"?(usersetting.drkmode==1?"ph/home_dark.png":"ph/home_white.png"):(usersetting.drkmode==1?"ph/test_dark.png":"ph/test_white.png")));
    document.getElementById("NavSelectorFirst").setAttribute("onclick",(value=="T"?"FooldalBetoltese('default')":"TestoldalBetoltese('default')"));
    document.getElementById("NavSelectorFirst").classList.add("SelectedNav");
    for (let i = 0; i < Teljeskategoriak.length; i++) {
        document.getElementById("NavSelectorFoDiv").appendChild(DivCreate("NavSelectorDiv",Teljeskategoriak[i].nev+value+"N"));
        document.getElementById(Teljeskategoriak[i].nev+value+"N").innerHTML = "<p>"+(i+1)+"</p>";
        document.getElementById(Teljeskategoriak[i].nev+value+"N").setAttribute("onclick","CategoryLoad(this)");
    }
}

function CategoryLoad(div){
    if(!TestActive){
        if(document.getElementById("KivettErtekek") != undefined){
            document.body.removeChild(document.getElementById("KivettErtekek"));
        }
        SignInClose();SideBarClose();
        let DivId = div.id;
        if(DivId.split('N').length > 1){
            DivId = DivId.split('N')[0];
        }
        var IdCheck;
        if(document.getElementById("NavSelectorFoDiv") != undefined){
            IdCheck = document.getElementById("NavSelectorFoDiv").children[1].id;
            IdCheck = IdCheck[IdCheck.length-2];
        }
        else if(document.getElementById("NavSelectorFoDiv") == undefined){
            NavSelectorCreate(DivId[DivId.length-1]);
        }
        if(DivId[DivId.length-1] == "T" && !document.getElementById(DivId+"N").classList.contains("SelectedNav")){
            document.getElementById("MainBody").innerHTML = "";
            document.getElementById("OldalName").innerHTML = "<p>CKIK Fizika</p>";
            if(document.getElementById("NavSelectorFoDiv") != undefined && IdCheck == "E"){
                document.body.removeChild(document.getElementById("NavSelectorFoDiv"));
                NavSelectorCreate("T");
            }
            if(document.getElementsByClassName("SelectedNav")[0].id!=DivId+"N"){
                document.getElementsByClassName("SelectedNav")[0].classList.remove("SelectedNav");
                document.getElementById(DivId+"N").classList.add("SelectedNav");
            }
            DivId = DivId.split('T')[0];
            let Alkat = Alkategoriak.filter(c=>c.tkat_id == Teljeskategoriak.filter(c=>c.nev == DivId)[0].id);
            if(Alkat.length > 1){
                document.getElementById("MainBody").appendChild(DivCreate("NavGorgeto","NavGorgeto"));
                for (let i = 1; i < Alkat.length; i++){
                    document.getElementById("NavGorgeto").appendChild(DivCreate("GorgetoDivek","GorgetoDiv"+i));
                    document.getElementById("GorgetoDiv"+i).innerHTML += "<p>"+Alkat[i].nev+"</p";
                    document.getElementById("GorgetoDiv"+i).dataset.sn = Alkat[i].nev;
                    document.getElementById("GorgetoDiv"+i).setAttribute("onclick","ScrollToDiv(this)");
                }
            }
            if(document.getElementById("FelGorgetoDiv") == undefined){
                document.body.appendChild(DivCreate("FelGorgetoDiv","FelGorgetoDiv"));
                document.getElementById("FelGorgetoDiv").appendChild(ImgCreate(usersetting.drkmode==1?"ph/uparrow_dark.png":"ph/uparrow_white.png"));
                document.getElementById("FelGorgetoDiv").setAttribute("onclick","TetejereGorget()");
            }

            for (let i = 0; i < Alkat.length; i++) {
                document.getElementById("MainBody").appendChild(DivCreate("TablaDivek",Alkat[i].nev+"Div"));
                document.getElementById(Alkat[i].nev+"Div").appendChild(DivCreate("TablaNevDivek",Alkat[i].nev+"NevDiv"));
                document.getElementById(Alkat[i].nev+"NevDiv").innerHTML ="<p>"+Alkat[i].nev+"</p>";
                document.getElementById(Alkat[i].nev+"Div").appendChild(DivCreate("TablaNevekKiiras",Alkat[i].nev+"Kiiras"));
                let tabla = Tablak.filter(c=>c.alkat_id == Alkat[i].id);
                TablaSorokCreate(Alkat[i].nev+"Kiiras","Név","Jele","Definíció","Mértékegység");
                for (let j = 0; j < tabla.length; j++) {
                    TablaSorokCreate(Alkat[i].nev+"Kiiras",tabla[j].nev,tabla[j].jel,tabla[j].def,tabla[j].mert);
                }
            }
        }else if(DivId[DivId.length-1] == "E"){
            document.getElementById("MainBody").innerHTML = "";
            document.getElementById("OldalName").innerHTML = "<p>Teszt oldal</p>";
            if(document.getElementById("NavSelectorFoDiv") != undefined && IdCheck == "T"){
                document.body.removeChild(document.getElementById("NavSelectorFoDiv"));
                NavSelectorCreate("E");
            }
            if(document.getElementsByClassName("SelectedNav").length > 0 && [0].id!=DivId+"N" && DivId != undefined){
                document.getElementsByClassName("SelectedNav")[0].classList.remove("SelectedNav");
                document.getElementById(DivId+"N").classList.add("SelectedNav");
            }
            if(document.getElementById("TablaValasztoDiv") != undefined){
                document.body.removeChild(document.getElementById("TablaValasztoDiv"));
            }
            let SegedDivId = "";
            for (let i = 0; i < DivId.length-1; i++) {
                SegedDivId += DivId[i];
            }
            DivId = SegedDivId;
            let Alkat = Alkategoriak.filter(c=>c.tkat_id == Teljeskategoriak.filter(c=>c.nev == DivId)[0].id);
            TestSettings(Alkat);
        }
        MathJax.Hub.Queue(["Typeset",MathJax.Hub, "expression"]);
    }
}

function ScrollToDiv(div){
    let nev = div.dataset.sn;
    nev = nev+"NevDiv";
    document.getElementById(nev).scrollIntoView();
}
window.onscroll = function ()
{
    if(document.getElementsByClassName("TablaNevDivek") != undefined && document.getElementById("OldalName").firstChild.innerText == "CKIK FIZIKA"){
        let element = document.getElementsByClassName("TablaNevDivek")[1].getBoundingClientRect();
        if(document.getElementsByClassName("TablaNevDivek").length > 1 && element.top < 350){
            TetejereGorgetShow(true);
        }else if(document.getElementsByClassName("TablaNevDivek").length > 1 && element.top >= 350){
            TetejereGorgetShow(false);
        }
    }
}

function TetejereGorget(){
    document.getElementById("OldalName").scrollIntoView();
}

function TetejereGorgetShow(value){
    value?document.getElementById("FelGorgetoDiv").classList.add("FelGorgetoDivOpen"):document.getElementById("FelGorgetoDiv").classList.remove("FelGorgetoDivOpen");
}

function TablaSorokCreate(id,nev,jel,def,mert){
    document.getElementById(id).innerHTML += "<div class='TablaBelsoErtekek'> <div><p>"+nev+"</p></div> <div><p>"+jel+"</p></div> <div><p>"+def+"</p></div> <div><p>"+mert+"</p></div> </div>";
}

function AdminPanel(){
    SignInClose();SideBarClose();
    document.getElementById("MainBody").innerHTML = "";
    document.getElementById("OldalName").innerText = "Admin panel";
    document.getElementById("MainBody").appendChild(DivCreate("AdminPanelDiv","AdminPanelDiv"));
    document.getElementById("AdminPanelDiv").appendChild(DivCreate("AdminPanelDiv","AdminPanelDiv"));
}

function DivCreate(Class,id){
    let div = document.createElement("div");
    id!=""?div.id = id:"";
    div.classList.add(Class);
    return div;
}

function ImgCreate(path){
    let img = document.createElement("img");
    img.src = path;
    return img;
}

function InputCreate(type,id,nev){
    return "<form><label id='label"+id+"' for='input"+id+"'>"+nev+"</label><input type='"+type+"' name='input"+id+"' id='input"+id+"'/></form>";
}

/* --------------------------------------------------------------- */

function importIMG() {
    let input = document.createElement('input');
    input.type = 'file';
    var file;
    var reader = new FileReader();
    input.onchange = _ => {
        file = Array.from(input.files)[0];
        reader.addEventListener(
          "load",
          () => {
            console.log(reader.result);
            UserSettingsChange("avatar = '"+reader.result+"'","userid = "+Tuser.id+"");
            document.getElementById("ProfilPicDivIMG").style.backgroundImage = "url("+reader.result+")";
          },
          false,
        );
      
        if (file) {
          reader.readAsArrayBuffer(file);
        }
    };
    input.click();
}
/* --------------------------------------------------------------- */

function hash(pw) {
    var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(pw);
    var hash = hashObj.getHash("HEX");
    return hash
}

function AlapBeallitasok(){
    Tuser.osztaly == "T" || Tuser.osztaly == "A"?TeacherView():"";
    Tuser.osztaly == "A"?AdminPanelEnable():"";
    document.getElementById("UserNameP").innerText = Tuser.nev;
}
function TeacherView(){
    document.getElementById("ExamDiv").classList.add("SignInBodyButton");
    document.getElementById("ExamDiv").setAttribute("onclick","ExamPub()");
    document.getElementById("ExamDiv").innerHTML = "<div class='SignInBodyButtonImg' id='ExamDivIMG'><img src='ph/plus_white.png' alt=''></div><p>Dolgozat kiírás</p>";
}

function AdminPanelEnable(){
    document.getElementById("AdminPanel").classList.add("SignInBodyButton");
    document.getElementById("AdminPanel").setAttribute("onclick","AdminPanel()");
    document.getElementById("AdminPanel").innerHTML = "<div class='SignInBodyButtonImg' id='AdminPanelDivIMG'><img src='ph/admin-panel_white.png' alt=''></div><p>admin panel</p>";
}

function Alapok(){
    if(Tuser==undefined){
        Tuser = JSON.parse(localStorage.getItem("User"));
        if(Tuser == null || Tuser == "-1" || Tuser == -1){
            LogOut();
        }else{
            UserSettings(Tuser);
            UserBetoltese("",Tuser,2,0);
            AdatokBetoltes();
        }
    }
}
Alapok();
setTimeout(RemoveAnim,800);