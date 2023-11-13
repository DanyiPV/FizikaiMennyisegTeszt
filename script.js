var AlapDiv = document.getElementsByClassName('AlapDiv')[0];
var SideBarOpen = 0;
var Timer = setInterval(Timer,1000);
function Fooldal(){
    AlapDiv.innerHTML="";
    let FoTittle = document.createElement('div');
    FoTittle.id ="FoTittle";
    FoTittle.innerHTML="<h2>Próbáld ki, mennyire értesz a Fizikához!</h2>";
    AlapDiv.appendChild(FoTittle);
}
function ProbaTest(){
    AlapDiv.innerHTML="";
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
        SideBarOpen=0;
        document.getElementById('SideBarDiv').classList.remove('SideBarDivOpen');
        document.getElementById('BlackBackground').classList.remove('BlackBackgroundActive');
        document.getElementById('BlackBackground').removeAttribute('onclick',"CloseSideBar()")
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
Fooldal();