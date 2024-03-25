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
    color==1?document.querySelector(':root').style.setProperty('--button_hover',"rgba( 0, 0, 0, .5)"):document.querySelector(':root').style.setProperty('--button_hover',"rgba(170, 170, 170, .4)");
    color==1?document.querySelector(':root').style.setProperty('--text_color',"black"):document.querySelector(':root').style.setProperty('--text_color',"whitesmoke");
    color==1?document.querySelector(':root').style.setProperty('--modal_bc',"rgba(230,230,230, .7)"):document.querySelector(':root').style.setProperty('--modal_bc',"rgba(30, 30, 30, .9)");
    color==1?document.querySelector(':root').style.setProperty('--modal_border',"black"):document.querySelector(':root').style.setProperty('--modal_border',"whitesmoke");
    color==1?document.querySelector(':root').style.setProperty('--body_bc',"rgba(230,230,230, 1)"):document.querySelector(':root').style.setProperty('--body_bc',"rgba(30, 30, 30, 1)");
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
    document.getElementById("ProfilPicDivIMG").style.backgroundImage = "url("+(usersetting.drkmode==1?"ph/user_dark.png":"ph/user_white.png")+")";
    document.getElementById("ProfilPicDiv").innerHTML += "<p>Change profile picture</p>";
    PrivateModOn("load");

    document.getElementById("MainBody").appendChild(DivCreate("SettingsDiv","UNChangeDiv"));
    document.getElementById("UNChangeDiv").appendChild(DivCreate("SettingsDivIMG","UNChangeDivIMG"));
    document.getElementById("UNChangeDivIMG").appendChild(ImgCreate(usersetting.drkmode==1?"ph/idcard_dark.png":"ph/idcard_white.png"));
    document.getElementById("UNChangeDiv").innerHTML += "<p>change username</p>";

    document.getElementById("MainBody").appendChild(DivCreate("SettingsDiv","PWChangeDiv"));
    document.getElementById("PWChangeDiv").appendChild(DivCreate("SettingsDivIMG","PWChangeDivIMG"));
    document.getElementById("PWChangeDivIMG").appendChild(ImgCreate(usersetting.drkmode==1?"ph/password_dark.png":"ph/password_white.png"));
    document.getElementById("PWChangeDiv").innerHTML += "<p>change password</p>";

    document.getElementById("MainBody").appendChild(DivCreate("SettingsDiv","PrivateChangeDiv"));
    document.getElementById("PrivateChangeDiv").appendChild(DivCreate("SettingsDivIMG","PrivateChangeDivIMG"));
    document.getElementById("PrivateChangeDivIMG").appendChild(ImgCreate(usersetting.drkmode==1?"ph/private_dark.png":"ph/private_white.png"));
    document.getElementById("PrivateChangeDiv").innerHTML += "<p>change profile visibility</p>";
    document.getElementById("PrivateChangeDiv").setAttribute("onclick","PrivateModOn('change')");
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

function AlapBeallitasok(){
    Tuser.osztaly == "T" || Tuser.osztaly == "A"?TeacherView():"";
    document.getElementById("UserNameP").innerText = Tuser.nev;
}
function TeacherView(){
    document.getElementById("ExamDiv").classList.add("SignInBodyButton");
    document.getElementById("ExamDiv").innerHTML = "<div class='SignInBodyButtonImg' id='ExamDivIMG'><img src='ph/plus_white.png' alt=''></div><p>exam publish</p>"
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