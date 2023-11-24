var request = new XMLHttpRequest(); 
request.open("GET", "Server/adatok.json", false);
request.send(null);
var data = JSON.parse(request.responseText);
var AlapDiv = document.getElementsByClassName("AlapDiv")[0];
//Ha van kategória változás, itt is és a style_script.js-ben is megkell változtatni
//Fooldalhoz
function foOldalTablaFeltolt(kat){
    let KatNevek = [];
    kat.forEach(elem => {
        KatNevek.push(elem.split(' ')[0]);
    });
    let tablaMenny = document.getElementsByClassName("AlapKeretDiv").length;
    for(let i = 0; i<tablaMenny;i++)
    {
        let tabla = document.getElementById("AlapKeretDiv"+i);
        let sorok = tabla.getElementsByClassName("TablaSorok");
        let katAdatok = data.filter(c=> c.kategoria == KatNevek[i]);
        for(let j = 0; j<sorok.length;j++)
        {
            sorok[j].getElementsByClassName("NevDiv")[0].innerHTML = "<p>"+katAdatok[j].nev+"</p>";
            sorok[j].getElementsByClassName("JeleDiv")[0].innerHTML = "<p>"+katAdatok[j].jel+"</p>";
            sorok[j].getElementsByClassName("DefDiv")[0].innerHTML = "<p>"+katAdatok[j].def+"</p>";
            sorok[j].getElementsByClassName("MertekDiv")[0].innerHTML = "<p>"+katAdatok[j].mert+"</p>";
        }
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "expression"]);
}

//Testoldalhoz
var MasodikAlapDiv2 = document.createElement('div');
MasodikAlapDiv2.classList.add('AlapDiv');
MasodikAlapDiv2.id ="MasodikAlapDiv2";
var TestSelectedCategory = undefined;
var ProbaTestSlider =["Haladómozgással kapcsolatos","Rezgések és hullámok","Hőtan","Elektromossággal kapcsolatos","Egyéni"];
var TestKategoriaSelector = ['Haladómozgással','Rezgések','Hőtan','Elektromossággal','Egyéni'];
function menuGen(){
    Silder(AlapDiv,ProbaTestSlider,1);
    AlapDiv.appendChild(MasodikAlapDiv2);
    TestCategoryLoad('ProbaTest');
}


function TestCategoryLoad(category){
    if(MegjelenitettOldal != 1){
        ProbaTest();
    }
    if(category != TestSelectedCategory){
        MasodikAlapDiv2.innerHTML = "";
        
        if(category != "" && category != undefined && category != 'ProbaTest'){
            TestSelectedCategory = category;
        }
        if(TestSelectedCategory == "Egyéni" || TestSelectedCategory == undefined){
            TestSelectedCategory = "Egyéni";
            SliderPick(4);
            console.log('Ide jön az egyéni');
        }else{
            SliderPick(TestKategoriaSelector.indexOf(TestSelectedCategory),1);
            let div = document.createElement('div');
            div.id = "KategoriaKivalasztDiv";
            let KatSelectDiv = document.createElement('div');
            KatSelectDiv.id ="KatSelectDiv";
            KatSelectDiv.innerHTML="<p>Kategóra Kiválasztás</p>";
            div.appendChild(KatSelectDiv);
            MasodikAlapDiv2.appendChild(div);
            AlapKiGen(MasodikAlapDiv2,KategoriakMatrix[KategoriakMatrix.indexOf(KategoriakMatrix[TestKategoriaSelector.indexOf(TestSelectedCategory)])][0],0);
            SorKiGen(document.getElementById('AlapKeretDiv'+0),KategoriakNum[KategoriakMatrix.indexOf(KategoriakMatrix[TestKategoriaSelector.indexOf(TestSelectedCategory)])][0]);
            //ide jön a sor ki generálás miután meg lett adva
            /*for (let i = 0; i < KategoriakMatrix[TestKategoriaSelector.indexOf(TestSelectedCategory)].length; i++) {
                SorKiGen(document.getElementById('AlapKeretDiv'+i),KategoriakNum[TestKategoriaSelector.indexOf(TestSelectedCategory)][i]);
            } */
            foOldalTablaFeltolt(KategoriakMatrix[TestKategoriaSelector.indexOf(TestSelectedCategory)], TestKategoriaSelector.indexOf(TestSelectedCategory));
        }
    }
    CloseSideBar();
}

