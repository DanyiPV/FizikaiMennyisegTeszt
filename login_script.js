// ---- Login oldal
var User;
var MegerositoKod = "88888888";

function SwitchTab(value){
    FaultDivClose();
    document.getElementsByClassName("WarningColor").length>0?document.getElementsByClassName("WarningColor")[0].classList.remove("WarningColor"):"";
    value=='B'?document.getElementById("Tab").classList.remove("TabSwitch"):document.getElementById("Tab").classList.add("TabSwitch");
    value=='B'?document.getElementById("Underline").classList.remove("UnderlineSwitch"):document.getElementById("Underline").classList.add("UnderlineSwitch");
    value=='B'?document.getElementById("container").classList.remove("ContainerHeight"):document.getElementById("container").classList.add("ContainerHeight");
    value=='B'?document.getElementsByClassName("PickedClass").length>0?document.getElementsByClassName("PickedClass")[0].classList.remove("PickedClass"):"":"";
    value=='B'?document.getElementsByClassName("PickedGrade").length>0?document.getElementsByClassName("PickedGrade")[0].classList.remove("PickedGrade"):"":"";
    document.getElementById("container").classList.remove("ContainerPlusHeight");
    let LogTab = document.getElementsByClassName("LogTabIndex");
    let RegTab = document.getElementsByClassName("RegTabIndex");
    for (let i = 0; i < LogTab.length; i++) {
        if(value == "B"){
            LogTab[i].tabIndex = 0;
        }else{
            LogTab[i].tabIndex = -1;
        }
    }
    for (let i = 0; i < RegTab.length; i++) {
        if(value == "B"){
            RegTab[i].tabIndex = -1;
        }else{
            RegTab[i].tabIndex = 0;
        }
    }
}

function SwitchOsztaly(value){
    value=='S'?document.getElementById("OsztalyUnderline").classList.remove("OsztalyUnderlineSwitch"):document.getElementById("OsztalyUnderline").classList.add("OsztalyUnderlineSwitch");
    value=='S'?document.getElementById("OsztalySelect").classList.remove("OsztalySelectSwitch"):document.getElementById("OsztalySelect").classList.add("OsztalySelectSwitch");
    value=='S'?document.getElementById("OsztalyContainer").classList.remove("OsztalyContainerHeight"):document.getElementById("OsztalyContainer").classList.add("OsztalyContainerHeight");
    if(document.getElementsByClassName("DetailsOpen").length > 0){
        for (let i = 1; i < 3; i++) {
            document.getElementById("DetailsDiv"+i).style.setProperty("opacity","0","important");
            document.getElementById("DetailsHeader"+i).classList.remove("DetailsOpen");
            DetailsDivRemove(i);
        }
    }
    document.getElementsByClassName("PickedClass").length>0?document.getElementsByClassName("PickedClass")[0].classList.remove("PickedClass"):"";
    document.getElementsByClassName("PickedGrade").length>0?document.getElementsByClassName("PickedGrade")[0].classList.remove("PickedGrade"):"";
    if(value == "S"){
        document.getElementById("TKod").tabIndex = "-1";
        document.getElementById("SDiv").children[0].tabIndex = "0";
        document.getElementById("SDiv").children[1].tabIndex = "0";
    }else{
        document.getElementById("TKod").tabIndex = "0";
        document.getElementById("SDiv").children[0].tabIndex = "-1";
        document.getElementById("SDiv").children[1].tabIndex = "-1";
    }
}

function DetailsOpen(id){
    document.getElementById("DetailsHeader1").classList.remove("WarningDetails");
    document.getElementById("DetailsHeader1").children[0].src = "ph/ad.png";
    if(!document.getElementById("DetailsHeader"+id).classList.contains("DetailsOpen")){
        document.getElementById("DetailsHeader"+id).classList.add("DetailsOpen");
        document.getElementById("DetailsDiv"+id).classList.add("DetailsDivOpen");
        document.getElementById("OsztalyContainer").classList.add("OsztalyContainerHeight");
    }else{
        if(document.getElementsByClassName("DetailsOpen").length < 2){
            document.getElementById("OsztalyContainer").classList.remove("OsztalyContainerHeight");
        }
        document.getElementById("DetailsDiv"+id).style.setProperty("opacity","0","important");
        document.getElementById("DetailsHeader"+id).classList.remove("DetailsOpen");
        setTimeout(DetailsDivRemove,400,id);
    }
}

function DetailsDivRemove(id){
    document.getElementById("DetailsDiv"+id).classList.remove("DetailsDivOpen");
    document.getElementById("DetailsDiv"+id).style.removeProperty("opacity");
}

function PasswordStrongCheck(){
    let pw = document.getElementById("input5").value;
    for (let i = 0; i < 6; i++) {
        document.getElementById("StrongPWDiv").children[i].classList.remove("PWStrong1");
        document.getElementById("StrongPWDiv").children[i].classList.remove("PWStrong2");
        document.getElementById("StrongPWDiv").children[i].classList.remove("PWStrong3");
    }
    if(document.getElementById("input5").value!=""){
        let db = 0;
        if(/[a-z]/.test(pw)){
            db++;
        }
        if(/[A-Z]/.test(pw)){
            db++;
        }
        if(pw.length > 12){
            db++;
        }
        let fn = document.getElementById("input3").value.toLowerCase().split(' ');
        let i = 0;
        while(i < fn.length && pw.toLowerCase().includes(fn[i])){
            i++;
        }
        if(i == fn.length-1 || document.getElementById("input3").value == ""){
            db++;
        }
        if(/[0-9]/.test(pw)){
            db++;
        }
        if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pw)){
            db++;
        }
        for (let i = 0; i < db; i++) {
            document.getElementById("StrongPWDiv").children[i].classList.add(db>2?(db>4?"PWStrong1":"PWStrong2"):"PWStrong3");
        }
    }
}

function PWShow(id){
    if(id==1){
        document.getElementById("input2").type == "password"?document.getElementById("input2").type="text":document.getElementById("input2").type="password";
    }else{
        document.getElementById("input5").type == "password"?document.getElementById("input5").type="text":document.getElementById("input5").type="password";
        document.getElementById("input6").type == "password"?document.getElementById("input6").type="text":document.getElementById("input6").type="password";
    }
}

function CGPick(p,Class){
    if(document.getElementsByClassName(Class).length == 0){p.classList.add(Class);}
    else if(document.getElementsByClassName(Class)[0]!=p){
        document.getElementsByClassName(Class)[0].classList.remove(Class);
        p.classList.add(Class);
    }
}

function ElfelejtettJelszo(){
    FaultDivOpen("A jelszó megváltoztatásához keresse meg a rendszergazdát!");
}

function FaultDivOpen(text){
    document.getElementById("FaultDiv").innerHTML = "<p>"+text+"</p>";
    document.getElementById("FaultDiv").classList.add("FaultDivOpen");
    setTimeout(FaultDivClose,5000);
}

function FaultDivClose(){
    document.getElementById("FaultDiv").classList.remove("FaultDivOpen");
}

function Login(){
    UserBetoltese(document.getElementById("input1").value,0,0,1);
}

function LogCheckFunction(){
    let igaze = true;
    if(document.getElementById("input1").value == ""){
        igaze = false;
        FaultDivOpen("A bejelentkezéshez írja be az e-mail címét!");
        WarningColorAdd(1);
    }
    else if(document.getElementById("input1").value.split("@")[1] != "ckik.hu"){
        igaze = false;
        FaultDivOpen("Hibásan írta be az e-mail címet!");
        WarningColorAdd(1);
    }
    else if(document.getElementById("input2").value == ""){
        igaze = false;
        FaultDivOpen("A bejelentkezéshez írja be az e-mailhez tartozó jelszót!");
        WarningColorAdd(2);
    }
    else if(!JelszoCheck(2)){
        igaze = false;
        FaultDivOpen("A jelszó hibásan lett beírva!");
        WarningColorAdd(2);
    }
    if(igaze == true){
        localStorage.setItem("User",User.id);
        window.open("index.html","_self");
    }
}

function Register(){
    UserBetoltese(document.getElementById("input4").value,0,1,1);
}

function RegCheckFunction(email){
    let igaze = true;
    if(document.getElementById("input3").value == ""){
        igaze = false;
        FaultDivOpen("A regisztráláshoz írjon be egy felhasználó nevet!");
        WarningColorAdd(3);
    }
    else if(document.getElementById("input4").value == ""){
        igaze = false;
        FaultDivOpen("A regisztráláshoz írjon be egy e-mail címet!");
        WarningColorAdd(4);
    }
    else if(document.getElementById("input4").value.split("@")[1] != "ckik.hu"){
        igaze = false;
        FaultDivOpen("Hibásan írta be az e-mail címet!");
        WarningColorAdd(4);
    }
    else if(email == document.getElementById("input4").value){
        igaze = false;
        FaultDivOpen("Az e-mail már szerepel a nyílvántartásban!");
        WarningColorAdd(4);
    }
    else if(document.getElementById("input5").value == ""){
        igaze = false;
        FaultDivOpen("Az e-mail cím regisztálásához adjon meg egy jelszót!");
        WarningColorAdd(5);
    }
    else if(document.getElementById("input6").value == ""){
        igaze = false;
        FaultDivOpen("Adja meg a jelszavát újra!");
        WarningColorAdd(6);
    }
    else if(document.getElementById("input6").value != document.getElementById("input5").value){
        igaze = false;
        FaultDivOpen("A két megadott jelszó nem egyezik!");
        WarningColorAdd(6);
    }
    if(igaze == true && document.getElementsByClassName("OsztalyUnderlineSwitch").length == 0){
        if(document.getElementsByClassName("PickedClass").length != 1){
            igaze = false;
            document.getElementById("DetailsHeader1").classList.add("WarningDetails");
            document.getElementById("DetailsHeader1").children[0].src = "ph/ad_red.png";
        }
        else if(document.getElementsByClassName("PickedGrade").length != 1){
            igaze = false;
            document.getElementById("DetailsHeader2").classList.add("WarningDetails");
            document.getElementById("DetailsHeader2").children[0].src = "ph/ad_red.png";
        }
    }else if(igaze == true && document.getElementsByClassName("OsztalyUnderlineSwitch").length == 1 && document.getElementById("TKod").value != MegerositoKod){
        igaze = false;
        document.getElementById("TKod").value != MegerositoKod?document.getElementById("TKodLabel").classList.add("WarningColor"):"";
        FaultDivOpen("A megerősító kód nem egyezik!");
    }
    if(igaze == true){
        let d = new Date();
        UsersFeltolt({email:document.getElementById("input4").value,nev:document.getElementById("input3").value,osztaly:document.getElementsByClassName("PickedClass").length>0?document.getElementsByClassName("PickedClass")[0].innerText+"/"+document.getElementsByClassName("PickedGrade")[0].innerText:"T",jelszo:hash(document.getElementById("input5").value),letrehozva: d.getFullYear()+"-"+((d.getMonth()+1)<10?"0"+(d.getMonth()+1):(d.getMonth()+1))+"-"+d.getDate()});
        BackToDefault();
    }
}

function BackToDefault(){
    for (let i = 0; i < 4; i++) {
        document.getElementById("input"+(3+i)).value = "";
    }
    document.getElementById("Checkbox2").checked = false;
    SwitchOsztaly("S");
    SwitchTab("B");
    PasswordStrongCheck();
}
function WarningColorAdd(id){
    document.getElementById("label"+id).classList.add("WarningColor");
}
function WarningColorRemove(id){
    document.getElementById("label"+id).classList.remove("WarningColor");
    FaultDivClose();
}
function WarningColoRemoveT(){
    document.getElementById("TKodLabel").classList.remove("WarningColor")
}

function JelszoCheck(id){
    return User.jelszo==hash(document.getElementById("input"+id).value);
}

function hash(pw) {
    var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(pw);
    var hash = hashObj.getHash("HEX");
    return hash
}
// ---- Login oldal --------------------------------------------------------------------------------------------------------------------------------------------