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
            adatok = response;
            AlapokBetolt();
            return response;
        }
    });
}

function UsersBetoltese(){
    const data = { lekerdezes: "select * from users u"};
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
            Users = response;
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
        UsersBetoltese();
        UserCheck(response);
        return response;
    });
}

function EredmenyLekeres(email){
    const data = { lekerdezes: "select * from eredmenyek where email = '"+email+"'"};
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

function EredmenyFeltolt(adat){
    const data =  { lekerdezes: "insert into eredmenyek values(null,'"+adat.email+"','"+adat.mpont+"','"+adat.epont+"','"+adat.datum+"','"+adat.kateg+"','"+adat.nehezseg+"')"};
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