var Tuser;
var usersetting;
var CurTime;
var Tablak;var Teljeskategoriak; var Alkategoriak;
var tudnivalok = ["Valami tudnivaló első","Valami tudnivaló második","Valami tudnivaló harmadik","Valami tudnivaló negyedik","Valami tudnivaló ötödik"];
var EgyediKat = [{nev: "Tudnivalók",rendel:"FooldalNav",id:"T"},{nev: "Egyéni",rendel: "TestoldalNav",id:"E"}];
var ValasztottTablak;
var ValasztottTablaSorok;

function SideBarOpen(){
    document.getElementById("SideBarNav").classList.add("SideBarNavOpen");
    document.getElementById("BlackBG").classList.add("BlackBGOn");
    document.getElementById("BlackBG").setAttribute("onclick","SideBarClose()");
    document.body.style.overflowY = "hidden";
    CurTime = setInterval(TimerLog,100);
}

function SideBarClose(){
    document.getElementById("SideBarNav").classList.remove("SideBarNavOpen");
    document.getElementById("BlackBG").classList.remove("BlackBGOn");
    document.getElementById("BlackBG").removeAttribute("onclick");
    document.body.style.overflowY = "auto";
    clearInterval(CurTime);
}

function TimerLog(){
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    document.getElementById("CurTime").innerText = (h<10?"0"+h:h) +":"+(m<10?"0"+m:m);
}

function SignInOpen(){
    if(!document.getElementById("SignInNav").classList.contains("SignInOpen")){
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
    document.getElementById("DrkModeDiv").children[1].innerText = color==1?"dark mode":"white mode";
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
    color==1?document.getElementById("SettingsDivIMG").children[0].src = "ph/settings_dark.png":document.getElementById("SettingsDivIMG").children[0].src = "ph/settings_white.png";
    color==1?document.getElementById("TestResultsDivIMG").children[0].src = "ph/notepad_dark.png":document.getElementById("TestResultsDivIMG").children[0].src = "ph/notepad_white.png";
    color==1?document.getElementById("DrkModeDivIMG").children[0].src = "ph/mode_dark.png":document.getElementById("DrkModeDivIMG").children[0].src = "ph/mode_white.png";
    color==1?document.getElementById("LogoutDivIMG").children[0].src = "ph/logout_dark.png":document.getElementById("LogoutDivIMG").children[0].src = "ph/logout_white.png";
    color==1?document.getElementById("SignInIMG").children[0].src = "ph/user_dark.png":document.getElementById("SignInIMG").children[0].src = "ph/user_white.png";
    color==1?document.getElementById("SBCloseIMG").children[0].src = "ph/close_dark.png":document.getElementById("SBCloseIMG").children[0].src = "ph/close_white.png";
    color==1?document.getElementById("FooldalBetoltDivIMG").children[0].src = "ph/home_dark.png":document.getElementById("FooldalBetoltDivIMG").children[0].src = "ph/home_white.png";
    color==1?document.getElementById("TestoldalBetoltDivIMG").children[0].src = "ph/test_dark.png":document.getElementById("TestoldalBetoltDivIMG").children[0].src = "ph/test_white.png";
    document.getElementById("ValasztoTablakClose") != undefined?color==1?document.getElementById("ValasztoTablakClose").children[0].src = "ph/close_dark.png":document.getElementById("ValasztoTablakClose").children[0].src = "ph/close_white.png":"";
    document.getElementById("NavSelectorFirst")!=undefined?color==1?document.getElementById("NavSelectorFirst").children[0].src = (document.getElementById("OldalName").innerHTML =="<p>home page</p>"?"ph/test_dark.png":"ph/home_dark.png"):document.getElementById("NavSelectorFirst").children[0].src = (document.getElementById("OldalName").innerHTML =="<p>home page</p>"?"ph/test_white.png":"ph/home_white.png"):"";
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
        document.getElementById("OldalName").innerText = "Settings";
        document.getElementById("MainBody").appendChild(DivCreate("ProfilPicDiv","ProfilPicDiv"));
        document.getElementById("ProfilPicDiv").appendChild(DivCreate("ProfilPicDivIMG","ProfilPicDivIMG"));
        //UserAvatarLeker(Tuser.id);
        console.log(usersetting.avatar);
    
        document.getElementById("ProfilPicDivIMG").style.backgroundImage = "url("+(usersetting.drkmode==1?"ph/user_dark.png":"ph/user_white.png")+")";
        document.getElementById("ProfilPicDiv").innerHTML += "<p>Change profile picture</p>";
        document.getElementById("ProfilPicDiv").setAttribute("onclick","importIMG()");
        PrivateModOn("load");
    
        document.getElementById("MainBody").appendChild(DivCreate("SettingsDiv","UNChangeDiv"));
        document.getElementById("UNChangeDiv").appendChild(DivCreate("SettingsDivIMG","UNChangeDivIMG"));
        document.getElementById("UNChangeDivIMG").appendChild(ImgCreate(usersetting.drkmode==1?"ph/idcard_dark.png":"ph/idcard_white.png"));
        document.getElementById("UNChangeDiv").innerHTML += "<p>change username</p>";
        document.getElementById("UNChangeDiv").setAttribute("onclick","UNChange()");
    
        document.getElementById("MainBody").appendChild(DivCreate("SettingsDiv","PWChangeDiv"));
        document.getElementById("PWChangeDiv").appendChild(DivCreate("SettingsDivIMG","PWChangeDivIMG"));
        document.getElementById("PWChangeDivIMG").appendChild(ImgCreate(usersetting.drkmode==1?"ph/password_dark.png":"ph/password_white.png"));
        document.getElementById("PWChangeDiv").innerHTML += "<p>change password</p>";
        document.getElementById("PWChangeDiv").setAttribute("onclick","PWChange()");
    
        document.getElementById("MainBody").appendChild(DivCreate("SettingsDiv","PrivateChangeDiv"));
        document.getElementById("PrivateChangeDiv").appendChild(DivCreate("SettingsDivIMG","PrivateChangeDivIMG"));
        document.getElementById("PrivateChangeDivIMG").appendChild(ImgCreate(usersetting.drkmode==1?"ph/private_dark.png":"ph/private_white.png"));
        document.getElementById("PrivateChangeDiv").innerHTML += "<p>change profile visibility</p>";
        document.getElementById("PrivateChangeDiv").setAttribute("onclick","PrivateModOn('change')");
    }
}

function AvatarBeallit(response){
    console.log(response, "data:image/png;base64,"+response);
    document.getElementById("ProfilPicDivIMG").style.backgroundImage = "url("+(response != undefined?"data:image/png;base64,"+response:usersetting.drkmode==1?"ph/user_dark.png":"ph/user_white.png")+")";
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
        document.getElementById("EgyDivMindFelett").innerHTML += "<p class='UserNameMess'>A felhasználó név megváltoztatását csak a rendszergazda tudja engedélyezni!</p>";
        document.getElementById("EgyDivMindFelett").appendChild(DivCreate("UNchangeSubmit","UNchangeSubmit"));
        document.getElementById("UNchangeSubmit").innerHTML = "<p>username change</p>";
        document.getElementById("UNchangeSubmit").setAttribute("onclick","UNChangeSubmit()");
        document.getElementById("inputnew").setAttribute("onclick","WarningColorRemove('inputnew')");document.getElementById("inputnew").setAttribute("onfocus","WarningColorRemove('inputnew')");
    }
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
        document.getElementById("EgyDivMindFelett").innerHTML += InputCreate("password","current","Current password");
        document.getElementById("EgyDivMindFelett").innerHTML += InputCreate("password","new","New password");
        document.getElementById("EgyDivMindFelett").innerHTML += InputCreate("password","newconfirm","new password confirm");
        document.getElementById("EgyDivMindFelett").innerHTML += InputCreate("checkbox","showpw","show password");
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

function AdatokKiitaras(){
    FooldalBetoltese("default");
    document.getElementById("SideBarBody").appendChild(DivCreate("NavGombok","FooldalNav"));
    document.getElementById("SideBarBody").appendChild(DivCreate("NavGombok","TestoldalNav"));

    document.getElementById("FooldalNav").appendChild(DivCreate("NavGomb","FooldalBetolt"));
    document.getElementById("FooldalBetolt").setAttribute("onclick","FooldalBetoltese('default')");
    document.getElementById("FooldalBetolt").appendChild(DivCreate("NavGombIMG","FooldalBetoltDivIMG"));
    document.getElementById("FooldalBetoltDivIMG").appendChild(ImgCreate(usersetting.drkmode==1?"ph/home_dark.png":"ph/home_white.png"));
    document.getElementById("FooldalBetolt").innerHTML += "<p>főoldal</p>";

    document.getElementById("TestoldalNav").appendChild(DivCreate("NavGomb","TestoldalBetolt"));
    document.getElementById("TestoldalBetolt").setAttribute("onclick","TestoldalBetoltese('default')");
    document.getElementById("TestoldalBetolt").appendChild(DivCreate("NavGombIMG","TestoldalBetoltDivIMG"));
    document.getElementById("TestoldalBetoltDivIMG").appendChild(ImgCreate(usersetting.drkmode==1?"ph/test_dark.png":"ph/test_white.png"));
    document.getElementById("TestoldalBetolt").innerHTML += "<p>test oldal</p>";

    for (let i = 0; i < EgyediKat.length; i++) {
        for (let j = 0; j < Teljeskategoriak.length; j++) {
            document.getElementById(EgyediKat[i].rendel).appendChild(DivCreate("NavGomb",Teljeskategoriak[j].nev+EgyediKat[i].id));
            document.getElementById(Teljeskategoriak[j].nev+EgyediKat[i].id).innerHTML ="<p>"+Teljeskategoriak[j].nev+"</p>";
            document.getElementById(Teljeskategoriak[j].nev+EgyediKat[i].id).setAttribute("onclick","CategoryLoad(this)");
        }
    }
    DrkModeSwitch("load");
}

function FooldalBetoltese(value){
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
    SignInClose();SideBarClose();
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

function TestoldalBetoltese(value){
    document.getElementById("MainBody").innerHTML = "";
    document.getElementById("OldalName").innerHTML = "<p>Test page</p>";
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

function TestSettings(array){
    document.getElementById("MainBody").appendChild(DivCreate("TestSettings","TestSettingsDiv"));
    ValasztottTablak = array;

    ValasztottTablaSorok = [];
    array.forEach(elem => {
        Tablak.filter(c=>c.alkat_id == elem.id).forEach(e => {
            ValasztottTablaSorok.push(e);
        });
    });
    document.getElementById("TestSettingsDiv").appendChild(DivCreate("TestTablakValaszt","TestTablakValaszt"));
    document.getElementById("TestTablakValaszt").innerHTML += "<p>Choose table</p>";
    document.getElementById("TestTablakValaszt").setAttribute("onclick","TablaValasztoOpen()");
    TablaValaszto(array);
    
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

    document.getElementById("TestSettingsDiv").appendChild(DivCreate("DifValaszto","DifValaszto"));
    document.getElementById("DifValaszto").appendChild(DivCreate("DifShowDiv","DifShowDiv"));
    document.getElementById("DifShowDiv").classList.add("DifShowDivEasy");
    document.getElementById("DifValaszto").appendChild(DivCreate("DifDivek","EasyDifDiv"));
    document.getElementById("EasyDifDiv").innerHTML = "<p>Easy</p>";
    document.getElementById("EasyDifDiv").classList.add("DifActive");
    document.getElementById("EasyDifDiv").setAttribute("onclick","DifValaszto(this)");
    document.getElementById("DifValaszto").appendChild(DivCreate("DifDivek","NormalDifDiv"));
    document.getElementById("NormalDifDiv").innerHTML = "<p>Normal</p>";
    document.getElementById("NormalDifDiv").setAttribute("onclick","DifValaszto(this)");
    document.getElementById("DifValaszto").appendChild(DivCreate("DifDivek","HardDifDiv"));
    document.getElementById("HardDifDiv").innerHTML = "<p>Hard</p>";
    document.getElementById("HardDifDiv").setAttribute("onclick","DifValaszto(this)");

    document.getElementById("TestSettingsDiv").appendChild(DivCreate("TestStartDiv","TestStartDiv"));
    document.getElementById("TestStartDiv").appendChild(ImgCreate("ph/start_default.png"));
    document.getElementById("TestStartDiv").innerHTML += "<p>Start</p>";
}

function DifValaszto(div){
    let DifArray = ["DifShowDivEasy","DifShowDivNormal","DifShowDivHard"];
    let index = Array.from(document.getElementsByClassName("DifDivek")).indexOf(div);
    if(!document.getElementsByClassName("DifDivek")[index].classList.contains("DifActive")){
        document.getElementById("DifShowDiv").classList = "DifShowDiv "+DifArray[index];
        document.getElementsByClassName("DifActive")[0].classList.remove("DifActive");
        document.getElementsByClassName("DifDivek")[index].classList.add("DifActive");
    }//document.getElementsByClassName("DifActive")[0].firstChild.innerText
}

function TablaValaszto(array){
    document.body.appendChild(DivCreate("TablaValasztoDiv","TablaValasztoDiv"));
    document.getElementById("TablaValasztoDiv").appendChild(DivCreate("ValasztoTablakClose","ValasztoTablakClose"));
    document.getElementById("ValasztoTablakClose").appendChild(ImgCreate(usersetting.drkmode==1?"ph/close_dark.png":"ph/close_white.png"));
    document.getElementById("ValasztoTablakClose").firstChild.setAttribute("onclick","TablaValasztoClose()");
    array.forEach(elem => {
        document.getElementById("TablaValasztoDiv").innerHTML += "<div class='ValasztoTDiv' onclick='TablaKivalasztasa(this)'><p>"+elem.nev+"</p></div";
    });
}

function TablaKivalasztasa(div){
    let db =ValasztottTablaSorok.filter(x=>x.alkat_id == ValasztottTablak.filter(c=>c.nev == div.firstChild.innerText)[0].id).length;
    if(document.getElementById("inputTestSlider").max=="5" && !div.classList.contains("ValasztoTDivValaszt")){
        document.getElementById("inputTestSlider").max = db;
    }else if(document.getElementById("inputTestSlider").max > 5 && !div.classList.contains("ValasztoTDivValaszt")){
        document.getElementById("inputTestSlider").max = (Number(document.getElementById("inputTestSlider").max) + db);
    }else if(document.getElementById("inputTestSlider").max > 5 && div.classList.contains("ValasztoTDivValaszt") && (Number(document.getElementById("inputTestSlider").max) - db) > 5){
        document.getElementById("inputTestSlider").max = (Number(document.getElementById("inputTestSlider").max) - db);
    }else if(document.getElementById("inputTestSlider").max > 5 && div.classList.contains("ValasztoTDivValaszt") && (Number(document.getElementById("inputTestSlider").max) - db) <= 5){
        document.getElementById("inputTestSlider").max = 5;
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

function TablaValasztoOpen(){
    document.getElementById("TablaValasztoDiv").classList.add("TablaValasztoDivOpen");
    document.getElementById("BlackBG").classList.add("BlackBGOn");
    document.getElementById("BlackBG").setAttribute("onclick","TablaValasztoClose()");
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
    document.getElementById("MainBody").innerHTML = "";
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
    if(DivId[DivId.length-1] == "T"){
        document.getElementById("OldalName").innerHTML = "<p>Home page</p>";
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
        document.getElementById("OldalName").innerHTML = "<p>Test page</p>";
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

function TablaSorokCreate(id,nev,jel,def,mert){
    document.getElementById(id).innerHTML += "<div class='TablaBelsoErtekek'> <div><p>"+nev+"</p></div> <div><p>"+jel+"</p></div> <div><p>"+def+"</p></div> <div><p>"+mert+"</p></div> </div>";
}

function DivCreate(Class,id){
    let div = document.createElement("div");
    div.id = id;
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
    document.getElementById("UserNameP").innerText = Tuser.nev;
}
function TeacherView(){
    document.getElementById("ExamDiv").classList.add("SignInBodyButton");
    document.getElementById("ExamDiv").innerHTML = "<div class='SignInBodyButtonImg' id='ExamDivIMG'><img src='ph/plus_white.png' alt=''></div><p>exam publish</p>";
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