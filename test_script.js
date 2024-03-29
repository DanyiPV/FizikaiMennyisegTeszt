var Tuser;
var usersetting;

function SideBarOpen(){
    document.getElementById("SideBarNav").classList.add("SideBarNavOpen");
    document.getElementById("BlackBG").classList.add("BlackBGOn");
    document.getElementById("BlackBG").setAttribute("onclick","SideBarClose()");
}

function SideBarClose(){
    document.getElementById("SideBarNav").classList.remove("SideBarNavOpen");
    document.getElementById("BlackBG").classList.remove("BlackBGOn");
    document.getElementById("BlackBG").removeAttribute("onclick");
}

function SignInOpen(){
    if(!document.getElementById("SignInNav").classList.contains("SignInOpen")){
        document.getElementById("SignInNav").classList.add("SignInOpen");
        document.getElementById("SignIn").classList.add("SignInDivOpen");
        document.getElementById("BlackBG").classList.add("BlackBGOn");
        document.getElementById("BlackBG").setAttribute("onclick","SignInOpen()");
    }else{
        SignInClose();
    }
}

function SignInClose(){
    document.getElementById("SignInNav").classList.remove("SignInOpen");
    document.getElementById("SignIn").classList.remove("SignInDivOpen");
    document.getElementById("BlackBG").classList.remove("BlackBGOn");
    document.getElementById("BlackBG").removeAttribute("onclick");
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
    color==1?document.querySelector(':root').style.setProperty('--body_bc',"rgba(230,230,230, 1)"):document.querySelector(':root').style.setProperty('--body_bc',"rgba(30, 30, 30, 1)");
    color==1?document.querySelector(':root').style.setProperty('--input_bc',"rgba(150, 150, 150, 1)"):document.querySelector(':root').style.setProperty('--input_bc',"rgba(70, 70, 70, 1)");
    color==1?document.getElementById("SettingsDivIMG").children[0].src = "ph/settings_dark.png":document.getElementById("SettingsDivIMG").children[0].src = "ph/settings_white.png";
    color==1?document.getElementById("TestResultsDivIMG").children[0].src = "ph/notepad_dark.png":document.getElementById("TestResultsDivIMG").children[0].src = "ph/notepad_white.png";
    color==1?document.getElementById("DrkModeDivIMG").children[0].src = "ph/mode_dark.png":document.getElementById("DrkModeDivIMG").children[0].src = "ph/mode_white.png";
    color==1?document.getElementById("LogoutDivIMG").children[0].src = "ph/logout_dark.png":document.getElementById("LogoutDivIMG").children[0].src = "ph/logout_white.png";
    color==1?document.getElementById("SignInIMG").children[0].src = "ph/user_dark.png":document.getElementById("SignInIMG").children[0].src = "ph/user_white.png";
    Tuser.osztaly == "T" || Tuser.osztaly == "A"?color==1?document.getElementById("ExamDivIMG").children[0].src = "ph/plus_dark.png":document.getElementById("ExamDivIMG").children[0].src = "ph/plus_white.png":"";
    document.getElementById("ProfilPicDiv") != undefined?SettingsCheck():"";
}

function Settings(){
    SignInClose();
    document.getElementById("MainBody").innerHTML = "";
    document.getElementById("OldalName").innerText = "Settings";
    document.getElementById("MainBody").appendChild(DivCreate("ProfilPicDiv","ProfilPicDiv"));
    document.getElementById("ProfilPicDiv").appendChild(DivCreate("ProfilPicDivIMG","ProfilPicDivIMG"));
    UserAvatarLeker(Tuser.id);

    //document.getElementById("ProfilPicDivIMG").style.backgroundImage = "url("+(avt != undefined?avt:usersetting.drkmode==1?"ph/user_dark.png":"ph/user_white.png")+")";
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

function AvatarBeallit(response){
    console.log(response);
    document.getElementById("ProfilPicDivIMG").style.backgroundImage = "url("+(response != undefined?"data:image/jpeg;base64,"+response:usersetting.drkmode==1?"ph/user_dark.png":"ph/user_white.png")+")";
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

function importIMG() {
    let input = document.createElement('input');
    input.type = 'file';
    var file;
    var reader = new FileReader();
    input.onchange = _ => {
        file = Array.from(input.files)[0];
        console.log(file);
        reader.addEventListener(
          "load",
          () => {
            fetch(reader.result)
            .then((res) => res.blob())
            .then((myBlob) => {
                console.log(myBlob);
                //UserSettingsChange("avatar = '"+myBlob+"'","userid = "+Tuser.id+"");
            })
            document.getElementById("ProfilPicDivIMG").style.backgroundImage = "url("+reader.result+")";
          },
          false,
        );
      
        if (file) {
          reader.readAsDataURL(file);
        }
    };
    input.click();
}  

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
        }
    }
}
Alapok();
setTimeout(RemoveAnim,800);