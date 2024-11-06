const AdatbazisEleres = ()=>{
    fetch("http://127.0.0.1:3000")
    .then(function (response) {
        if (!response.ok) {
            console.log("Nem jó válasz érekezett az adatbázisból");
        }
        return response.json();
    })
    .then(function (response) {
        if (response.Error) {
                console.log(response.Error);
        } else {
            //console.log("Az adatbázis kapcsolat él, az adatokat eléri.");
        }
    });
}

AdatbazisEleres();

function AdatokBetoltes(){
    const data = { lekerdezes: "select * from tablak"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        if (!response.ok) {
            console.log("Nem jó válasz érekezett az adatbázisból");
        }
        return response.json();
    })
    .then(function (response) {
        if (response.Error) {
            console.log(response.Error);
        } else {
            Tablak = response;
            Alkatok();
            return response;
        }
    });
}
function Alkatok(){
    const data = { lekerdezes: "select * from alkat"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        if (!response.ok) {
            console.log("Nem jó válasz érekezett az adatbázisból");
        }
        return response.json();
    })
    .then(function (response) {
        if (response.Error) {
            console.log(response.Error);
        } else {
            Alkategoriak = response;
            Tkatok();
            return response;
        }
    });
}
function Tkatok(){
    const data = { lekerdezes: "select * from tkat"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        if (!response.ok) {
            console.log("Nem jó válasz érekezett az adatbázisból");
        }
        return response.json();
    })
    .then(function (response) {
        if (response.Error) {
            console.log(response.Error);
        } else {
            Teljeskategoriak = response;
            AdatokKiitaras();
            return response;
        }
    });
}

function UserBetoltese(email,id,func,us){
    const data = { lekerdezes: "select * from users u where email = '"+email+"' or id = "+id+""};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        if (!response.ok) {console.log("Nem jó válasz érekezett az adatbázisból");}
        return response.json();
    })
    .then(function (response) {
        if (response.Error) {
            console.log(response.Error);
        } else {
            us==1?User = response[0]:Tuser = response[0];
            func!=-1?FuncBetolt(func,response[0]==undefined?undefined:response[0].email):"";
            return response;
        }
    });
}

function FuncBetolt(func,response){
    if(func == 0){
        LogCheckFunction();
    }else if(func == 1){
        RegCheckFunction(response);
    }else if(func == 2){
        AlapBeallitasok();
    }
}

function UsersFeltolt(User){
    const data =  { lekerdezes: "insert into users values(null,'"+User.email+"','"+User.nev+"','"+User.osztaly+"','"+User.jelszo+"','"+User.letrehozva+"',null)"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        UsersLastId();
        return response;
    });
}
function UsersAdatFeltolt(set,where){
    const data =  { lekerdezes: "update users set "+set+" where "+where+""};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        if(set.split('=')[0] == "jelszo "){
            FaultDivOpen("A jelszava sikeresen megváltozott!");
            EgyMindFelettClose();
        }
        return response;
    });
}

function UserSettings(id){
    const data = { lekerdezes: "select * from usersetting where userid = "+id+""};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        if (!response.ok) {console.log("Nem jó válasz érekezett az adatbázisból");}
        return response.json();
    })
    .then(function (response) {
        if (response.Error) {
            console.log(response.Error);
        } else {
            usersetting = response[0];
            return response;
        }
    });
}
function UserSettingsFeltolt(id){
    const data =  { lekerdezes: "insert into usersetting values(null,'"+id+"',"+0+","+0+",null)"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        return response;
    });
}
function UserSettingsChange(set,where){
    const data =  { lekerdezes: "update usersetting set "+set+" where "+where+""};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        return response;
    });
}
function UserAvatarLeker(userid){ //https://www.techieclues.com/blogs/converting-blob-to-base64-in-mysql
    const data =  { lekerdezes: "SELECT BLOB_TO_BASE64(usersetting.avatar) AS base64_data FROM usersetting WHERE userid = "+userid+";"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        if (!response.ok) {console.log("Nem jó válasz érekezett az adatbázisból");}
        return response.json();
    })
    .then(function (response) {
        if (response.Error) {
            conso
            console.log(response.Error);
        } else {
            AvatarBeallit(response[0].base64_data);
            return response;
        }
    });
}

function UsersLastId(){
    const data = { lekerdezes: "select users.id from users ORDER BY id DESC limit 1"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        if (!response.ok) {console.log("Nem jó válasz érekezett az adatbázisból");}
        return response.json();
    })
    .then(function (response) {
        if (response.Error) {
            console.log(response.Error);
        } else {
            UserSettingsFeltolt(response[0].id);
            return response;
        }
    });
}


function UserLeker(email){
    const data =  { lekerdezes: "select * from users where email = '"+email+"'"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        if (!response.ok) {console.log("Nem jó válasz érekezett az adatbázisból");}
        return response.json();
    })
    .then(function (response) {
        if (response.Error) {
            console.log(response.Error);
        } else {
            user = response[0];
            return response;
        }
    });
}


function TeljesKategoriakBetolt(){
    const data = { lekerdezes: "select * from tkat"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        if (!response.ok) {console.log("Nem jó válasz érekezett az adatbázisból");}
        return response.json();
    })
    .then(function (response) {
        if (response.Error) {
            console.log(response.Error);
        } else {
            TeljesKat(response);
            return response;
        }
    });
}

function AlkattokBetolt(){
    const data = { lekerdezes: "select * from alkat"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        if (!response.ok) {console.log("Nem jó válasz érekezett az adatbázisból");}
        return response.json();
    })
    .then(function (response) {
        if (response.Error) {
            console.log(response.Error);
        } else {
            AlKat(response);
            return response;
        }
    });
}

function EredmenyLekeres(id){
    const data = { lekerdezes: "select * from eredmenyek where user_id = '"+id+"'"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        if (!response.ok) {console.log("Nem jó válasz érekezett az adatbázisból");}
        return response.json();
    })
    .then(function (response) {
        EredmenyekKiGen(response);
        return response;
    });
}

function ErtesitesekLeker(osztaly, nev, id){
    const data = { lekerdezes: "select * from ertesitesek where kinek = '"+osztaly+"' or kinek = '"+nev+"' or kinek = '"+id+"'"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        if (!response.ok) {console.log("Nem jó válasz érekezett az adatbázisból");}
        return response.json();
    })
    .then(function (response) {
        NotifBetolt(response);
        return response;
    });
}
function ErtesitesFeltoltese(adat){
    const data =  { lekerdezes: "insert into ertesitesek values(null,'"+adat.id+"','"+adat.message+"',null,'"+adat.extra+"','"+adat.kinek+"', '"+adat.lezarva+"')"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        return response;
    });
}
function ErtesitesLezaras(id,lezarva){
    const data =  { lekerdezes: "update ertesitesek set lezarva = '"+lezarva+"' where id = '"+id+"'"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        return response;
    });
}

function EredmenyFeltolt(adat){
    const data =  { lekerdezes: "insert into eredmenyek values(null,'"+adat.id+"','"+adat.mpont+"','"+adat.epont+"',null,'"+adat.kateg+"','"+adat.nehezseg+"','"+adat.fajta+"', '"+adat.EIdo+"', '"+adat.TIdo+"')"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        return response;
    });
}

function DolgozatFeltolt(adat){
    const data =  { lekerdezes: "insert into dolgozatok values(null,'"+adat.id+"','"+adat.ido+"','"+adat.kezdet+"','"+adat.dif+"','"+adat.tabla_id+"','"+adat.tabla_sor+"', '"+adat.osztaly+"', null)"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        return response;
    });
}
function DolgozatLeker(osztaly, id){
    const data =  { lekerdezes: "select * from dolgozatok where osztaly = '"+osztaly+"'"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        if (!response.ok) {console.log("Nem jó válasz érekezett az adatbázisból");}
        return response.json();
    })
    .then(function (response) {
        DolgozatNotifBetolt(response, id);
        return response;
    });
}

function UserNameChange(nev,id){
    const data =  { lekerdezes: "update users set nev = '"+nev+"' where id = '"+id+"'"};
    fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        return response;
    });
}

//Multer