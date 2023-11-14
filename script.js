var AlapDiv = document.getElementsByClassName('AlapDiv')[0];
var SideBarOpen = 0;
var TablazatokOpen = 0;
var Timer = setInterval(Timer,1000);
function Fooldal(){
    AlapDiv.innerHTML="";
    document.getElementById('FoOldal').classList.add('h2Active');
    document.getElementById('TestKitoltes').classList.remove('h2Active');
    document.getElementById('OldalName').innerHTML="<h2>Fizikai Mennyiségek - Főoldal</h2>";
    let FoTittle = document.createElement('div');
    FoTittle.id ="FoTittle";
    FoTittle.innerHTML="<h2>Próbáld ki, mennyire értesz a Fizikához!</h2>";
    AlapDiv.appendChild(FoTittle);
    CloseSideBar();
}
function ProbaTest(){
    AlapDiv.innerHTML="";
    document.getElementById('TestKitoltes').classList.add('h2Active');
    document.getElementById('FoOldal').classList.remove('h2Active');
    document.getElementById('OldalName').innerHTML="<h2>Fizikai Mennyiségek - Teszt kitöltés</h2>";
    let FoTittle = document.createElement('div');
    FoTittle.id ="FoTittle";
    FoTittle.innerHTML="<h2>Ez lesz a test oldal</h2>";
    AlapDiv.appendChild(FoTittle);
    CloseSideBar();
}

function SideBar(){
    if(SideBarOpen == 0){
        SideBarOpen=1;
        document.body.style.overflow = "hidden";
        document.getElementById('SideBarDiv').classList.add('SideBarDivOpen');
        document.getElementById('BlackBackground').classList.add('BlackBackgroundActive');
        document.getElementById('BlackBackground').setAttribute('onclick',"CloseSideBar()")
    }
}
function CloseSideBar(){
    if(SideBarOpen == 1){
        SideBarOpen=0;
        document.body.style.overflow = "";
        document.getElementById('SideBarDiv').classList.remove('SideBarDivOpen');
        document.getElementById('BlackBackground').classList.remove('BlackBackgroundActive');
        document.getElementById('BlackBackground').removeAttribute('onclick',"CloseSideBar()")
        if(TablazatokOpen == 1){
            document.getElementById('TabazatokDiv').classList.remove('TabazatokDivOpen');
            document.getElementById('Tablazatok').classList.remove('h2Active');
            TablazatokOpen=1;
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
function TablazatokMegjelenit(){
    if(TablazatokOpen == 0){
        TablazatokOpen=1;
        document.getElementById('TabazatokDiv').classList.add('TabazatokDivOpen');
    }else if(TablazatokOpen == 1){
        TablazatokOpen=0;
        document.getElementById('TabazatokDiv').classList.remove('TabazatokDivOpen');
    }
}
Fooldal();