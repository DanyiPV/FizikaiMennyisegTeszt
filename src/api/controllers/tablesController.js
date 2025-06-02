const tablesService = require("../services/tablesService");
const settingsConfirmService = require("../services/settingsConfirmService");
const notifService = require("../services/notifService");

const jwt = require("jsonwebtoken");

const salt = 10;

exports.fullCategories = async (req,res,next) =>{
    const categories = await tablesService.fullCategories();

    res.status(200).send(categories);
}

exports.fullSubcategories = async (req,res,next) =>{
    const idList = req.body;

    const subcategories = await tablesService.fullSubcategories(idList);

    res.status(200).send(subcategories);
}

exports.fullTables = async (req,res,next) =>{
    const id = req.query.id;

    const categories = await tablesService.fullTables(id);

    res.status(200).send(categories);
}

exports.allTables = async (req,res,next) =>{
    const allTable = await tablesService.allTables();

    res.status(200).send(allTable);
}

exports.getTraningTables = async (req, res, next) => {
    try {
        const { alkatIds, sorok, diff } = req.body;

        const parsedAlkatIds = alkatIds;
        const parsedSorok = Number(sorok);
        const parsedDiff = Number(diff);
        
        const randomRows = await tablesService.getRandomRows(parsedAlkatIds, parsedSorok);

        const { kivettAdatok, maradekAdatok } = randomFieldSelection(randomRows, parsedDiff);

        res.status(200).send({ kivettAdatok, maradekAdatok });
    } catch (error) {
        next(error);
    }
};

function randomFieldSelection(data, diff) {
let kivettAdatok = [];
// Mélymásolat, hogy a maradékAdatok módosítása ne érintse az eredeti data-t
let maradekAdatok = JSON.parse(JSON.stringify(data));
const n = maradekAdatok.length;

if (diff === 1) {
    // Minden sorból 1 cellát veszünk (véletlenszerűen a 4 mezőből)
    maradekAdatok.forEach(obj => {
    const allowedFields = ["nev", "jel", "def", "mer"];
    const randomField = allowedFields[Math.floor(Math.random() * allowedFields.length)];
    kivettAdatok.push(obj[randomField]);
    obj[randomField] = { value: null, takeable: true };
    });
} else if (diff === 2) {
    // Összesen: Math.floor(n * 1.5) cella
    // Minden sorból alapból 1 cella, plusz extra: extraCount sorból plusz 1 cella (így azokból 2 cella lesz)
    const extraCount = Math.floor(n * 1.5) - n; // hány sor kapjon plusz cellát
    // Minden sorhoz alapértelmezett 1 cella
    const fieldCounts = Array(n).fill(1);

    // Véletlenszerűen kiválasztjuk azokat a sorszámokat, amelyekből 2 cellát veszünk
    const indices = [...Array(n).keys()];
    // Fisher-Yates keverés
    for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    for (let i = 0; i < extraCount; i++) {
    fieldCounts[indices[i]] = 2;
    }

    // A kiválasztás: minden sorból véletlenszerűen veszünk annyi cellát, amennyit a fieldCounts határoz meg
    maradekAdatok.forEach((obj, idx) => {
    const allowedFields = ["nev", "jel", "def", "mer"];
    const selectedFields = [];
    // Biztosítjuk, hogy ne ismétlődjön mező (a lista véges méretű, így a while nem akad be)
    while (selectedFields.length < fieldCounts[idx]) {
        const randomField = allowedFields[Math.floor(Math.random() * allowedFields.length)];
        if (!selectedFields.includes(randomField)) {
        selectedFields.push(randomField);
        }
    }
    selectedFields.forEach(field => {
        kivettAdatok.push(obj[field]);
        obj[field] = { value: null, takeable: true };
    });
    });
} else if (diff === 3) {
    // Összesen: 2 * n cella
    // Alapból minden sorból 2 cellát veszünk,
    // majd minden 5 sorhoz hozzárendelünk egy 3-as és egy 1-es kivételt,
    // így a sorok összességében 2 cella = 3 + 1 vagy 2 cella kimenet.
    const fieldCounts = Array(n).fill(2);
    const groups = Math.floor(n / 5); // hány csoport van, ahol speciális elosztás történik

    // Véletlenszerű sorrend a sorok között
    const indices = [...Array(n).keys()];
    for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    // Az első 'groups' sorból 3 cellát veszünk: ezeknél kizárólag ["jel", "def", "mer"]
    for (let i = 0; i < groups; i++) {
    fieldCounts[indices[i]] = 3;
    }
    // A következő 'groups' sorból 1 cellát veszünk, hogy az összeg maradjon 2*n (mivel 3+1=4 helyett 2+2=4)
    let count = 0;
    for (let i = groups; i < indices.length && count < groups; i++) {
    fieldCounts[indices[i]] = 1;
    count++;
    }

    maradekAdatok.forEach((obj, idx) => {
    if (fieldCounts[idx] === 3) {
        // 3 cella: mindig a "nev" kivételével, azaz ["jel", "def", "mer"]
        const fieldsToTake = ["jel", "def", "mer"];
        fieldsToTake.forEach(field => {
        kivettAdatok.push(obj[field]);
        obj[field] = { value: null, takeable: true };
        });
    } else {
        // 1 vagy 2 cella: a teljes készletből (["nev", "jel", "def", "mer"]) veszünk véletlenszerűen
        const allowedFields = ["nev", "jel", "def", "mer"];
        const selectedFields = [];
        while (selectedFields.length < fieldCounts[idx]) {
        const randomField = allowedFields[Math.floor(Math.random() * allowedFields.length)];
        if (!selectedFields.includes(randomField)) {
            selectedFields.push(randomField);
        }
        }
        selectedFields.forEach(field => {
        kivettAdatok.push(obj[field]);
        obj[field] = { value: null, takeable: true };
        });
    }
    });
}

return { kivettAdatok, maradekAdatok };
}

exports.getFinalStats = async (req, res, next) => {
    const {tables, tablak , time, diff, def_time, tpont, exam_id} = req.body;

    const token = req.cookies.token;

    const secretKey = process.env.JWT_KEY;

    var decoded = null;
        
    try{
        
        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }else{
            const error = new Error("Valami hiba történt a felhasználó igazolásában!");

            error.status = 500;

            throw error;
        }

        const get_osztaly = await tablesService.getOsztaly(decoded.id);

        if(!get_osztaly){
            const error = new Error("Valami hiba történt az osztály lekérése közben!");

            error.status = 500;

            throw error;
        }

        console.log(tables);

        const getAchivedPoints = await tablesService.getAchivedPoints(tables);

        if(!getAchivedPoints){
            const error = new Error("Valami hiba történt az ellenörzés közben!");

            error.status = 500;

            throw error;
        }

        const newResult = {
            id: null,
            osztaly: get_osztaly.dataValues.osztaly,
            tablak: tablak,
            Mpont: tpont,
            Epont: getAchivedPoints,
            dif: diff,
            Eido: time,
            Tido: def_time,
            exam_id: exam_id,
            users_id: decoded.id
        }

        const uploadResult = await tablesService.uploadResult(newResult);

        if(!uploadResult){
            const error = new Error("Nem sikerült feltölteni az új eredményt!");

            error.status = 400;

            throw error;
        }

        res.status(201).json(getAchivedPoints);
    }catch(error){
        next(error);
    }
}

exports.getResults = async (req, res, next) => {
    const token = req.cookies.token;

    const secretKey = process.env.JWT_KEY;

    try{
        var decoded = null;

        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }else{
            const error = new Error("Valami hiba történt a felhasználó igazolásában!");

            error.status = 500;

            throw error;
        }

        const getResults = await tablesService.getUserResults(decoded.id);

        res.status(200).send(getResults);
    }catch(error){
        next(error);
    }
}

exports.getOsztalyok = async (req,res,next) =>{
    const token = req.cookies.token;

    const secretKey = process.env.JWT_KEY;

    try{
        var decoded = null;

        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }else{
            const error = new Error("Valami hiba történt a felhasználó igazolásában!");

            error.status = 500;

            throw error;
        }

        const adminCheck = await settingsConfirmService.getElseUserById(decoded.id);
        
        if(!adminCheck){
            const error = new Error("A felhasználónak nincs ehhez joga!");
    
            error.status = 400;
    
            throw error;
        }

        const getOsztalyok = await tablesService.getOsztalyok();

        res.status(200).send(getOsztalyok);
    }catch(error){
        next(error);
    }
}

exports.getUsersResult = async (req,res,next) =>{
    const {search, osztaly, last} = req.body;

    const token = req.cookies.token;

    const secretKey = process.env.JWT_KEY;

    try{
        var decoded = null;

        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }else{
            const error = new Error("Valami hiba történt a felhasználó igazolásában!");

            error.status = 500;

            throw error;
        }

        const user_Check = await tablesService.getCheckedUser(decoded.id);
        
        if(!user_Check){
            const error = new Error("A felhasználónak nincs ehhez joga!");
    
            error.status = 400;
    
            throw error;
        }

        const getUserResults = await tablesService.getUsersResults(search, osztaly, last);

        res.status(200).send(getUserResults);
    }catch(error){
        next(error);
    }
}

exports.getUsersResult = async (req,res,next) =>{
    const {search, osztaly, last} = req.body;

    const token = req.cookies.token;

    const secretKey = process.env.JWT_KEY;

    try{
        var decoded = null;

        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }else{
            const error = new Error("Valami hiba történt a felhasználó igazolásában!");

            error.status = 500;

            throw error;
        }

        const user_Check = await tablesService.getCheckedUser(decoded.id);
        
        if(!user_Check){
            const error = new Error("A felhasználónak nincs ehhez joga!");
    
            error.status = 400;
    
            throw error;
        }

        const getUserResults = await tablesService.getUsersResults(search, osztaly, last);

        res.status(200).send(getUserResults);
    }catch(error){
        next(error);
    }
}

exports.setNewExam = async (req,res,next) =>{
    const {tableidList, message, sorok , time, diff, osztaly, kezdet} = req.body;

    const token = req.cookies.token;

    const secretKey = process.env.JWT_KEY;

    try{
        var decoded = null;

        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }else{
            const error = new Error("Valami hiba történt a felhasználó igazolásában!");

            error.status = 500;

            throw error;
        }

        const user_Check = await tablesService.getCheckedUser(decoded.id);
        
        if(!user_Check){
            const error = new Error("A felhasználónak nincs ehhez joga!");
    
            error.status = 400;
    
            throw error;
        }

        const newExam = {
            id: null,
            ido: time,
            sorok: sorok,
            kezdet: kezdet,
            osztaly: osztaly,
            dif: diff,
            nev: message
        }

        const addExam = await tablesService.addNewExam(newExam);
  
        if(!addExam){
            const error = new Error("Nem sikerült közzétenni a dolgozatot!");
    
            error.status = 400;
    
            throw error;
        }

        const addTables = await tablesService.addExamTables(tableidList, addExam);

        const sendNotif = await notifService.newNotif({message: "Új dolgozat lett kiírva!",extra:"dolgozat", type: 0, osztaly: osztaly, user_id: decoded.id})

        res.status(200).json(addExam);
    }catch(error){
        next(error);
    }
}

exports.getExams = async (req,res,next) =>{
    const token = req.cookies.token;

    const secretKey = process.env.JWT_KEY;

    try{
        var decoded = null;

        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }else{
            const error = new Error("Valami hiba történt a felhasználó igazolásában!");

            error.status = 500;

            throw error;
        }

        const getExams = await tablesService.getExams(decoded.id);

        res.status(200).send(getExams);
    }catch(error){
        next(error);
    }
}