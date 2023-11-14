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
    FoTittle.innerHTML="<h2>Próbáld ki, mennyire értesz a Fizikához!</h2>";
    AlapDiv.appendChild(FoTittle);
    CloseSideBar();
}
function ProbaTest(){
    AlapDiv.innerHTML="";
    document.getElementById('TestKitoltes').classList.add('h2Active');
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
        document.getElementById('SideBarDiv').classList.add('SideBarDivOpen');
        document.getElementById('BlackBackground').classList.add('BlackBackgroundActive');
        document.getElementById('BlackBackground').setAttribute('onclick',"CloseSideBar()")
    }
}
function CloseSideBar(){
    if(SideBarOpen == 1){
        SideBarOpen = 0;
        document.getElementById('SideBarDiv').classList.remove('SideBarDivOpen');
        document.getElementById('BlackBackground').classList.remove('BlackBackgroundActive');
        document.getElementById('BlackBackground').removeAttribute('onclick',"CloseSideBar()")
        if(TablazatokOpen == 1){
            TablazatokOpen = 0;
            document.getElementById('TablazatokKiNyil').classList.remove('TriangleDown');
            document.getElementById('TestKitoltes').classList.remove('TestDown');
            document.getElementById('TabazatokDiv').classList.remove('TabazatokDivOpen');
        }
        if(TestTablazatokOpen == 1){
            TestTablazatokOpen = 0;
            document.getElementById('TestTablazatokKiNyil').classList.remove('TriangleDown');
            document.getElementById('TestTablaDivek').classList.remove('TestTablaDivekOpen');
        }
        if(TablazatokOpen == 0 && TestTablazatokOpen == 0){
            document.getElementById('SideBarDiv').style.overflowY = "hidden";
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
        document.getElementById('SideBarDiv').style.overflowY = "auto";
        document.getElementById('TablazatokKiNyil').classList.add('TriangleDown');
        document.getElementById('TestKitoltes').classList.add('TestDown');
        document.getElementById('TabazatokDiv').classList.add('TabazatokDivOpen');
    }else if(TablazatokOpen == 1){
        TablazatokOpen = 0;
        document.getElementById('TablazatokKiNyil').classList.remove('TriangleDown');
        document.getElementById('TestKitoltes').classList.remove('TestDown');
        document.getElementById('TabazatokDiv').classList.remove('TabazatokDivOpen');
    }
    if(TablazatokOpen == 0 && TestTablazatokOpen == 0){
        document.getElementById('SideBarDiv').style.overflowY = "hidden";
    }
}
function TestTablaDivek(){
    if(TestTablazatokOpen == 0){
        TestTablazatokOpen = 1;
        document.getElementById('SideBarDiv').style.overflowY = "auto";
        document.getElementById('TestTablazatokKiNyil').classList.add('TriangleDown');
        document.getElementById('TestTablaDivek').classList.add('TestTablaDivekOpen');
    }else if(TestTablazatokOpen == 1){
        TestTablazatokOpen = 0;
        document.getElementById('TestTablazatokKiNyil').classList.remove('TriangleDown');
        document.getElementById('TestTablaDivek').classList.remove('TestTablaDivekOpen');
    }
    if(TablazatokOpen == 0 && TestTablazatokOpen == 0){
        document.getElementById('SideBarDiv').style.overflowY = "hidden";
    }
}
Fooldal();