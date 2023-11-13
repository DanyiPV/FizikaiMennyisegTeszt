function Fooldal(){
    let AlapDiv = document.getElementsByClassName('AlapDiv')[0];
    AlapDiv.innerHTML="";
    let FoTittle = document.createElement('div');
    FoTittle.id ="FoTittle";
    FoTittle.innerHTML="<h2>Próbáld ki, mennyire értesz a Fizikához!</h2>";
    AlapDiv.appendChild(FoTittle);
}

function ProbaTest(){
    let AlapDiv = document.getElementsByClassName('AlapDiv')[0];
    AlapDiv.innerHTML="";
}

Fooldal();