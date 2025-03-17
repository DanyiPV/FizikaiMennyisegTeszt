const tablesService = require("../services/tablesService");
const settingsConfirmService = require("../services/settingsConfirmService");

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
    let maradekAdatok = JSON.parse(JSON.stringify(data));

    maradekAdatok.forEach((obj) => {
        let lehetsegesMezok = ["nev", "jel", "def", "mer"];
        let kiválasztottMezok = [];

        let mezokSzama;
        if (diff === 1) {
            mezokSzama = 1;
        } else if (diff === 2) {
            mezokSzama = Math.random() < 0.7 ? 2 : 1;
        } else if (diff === 3) {
            mezokSzama = Math.random() < 0.5 ? 3 : Math.random() < 0.7 ? 2 : 1;
        }

        if (mezokSzama === 3) {
            lehetsegesMezok = ["jel", "def", "mer"];
        }

        while (kiválasztottMezok.length < mezokSzama) {
            let randomMezo = lehetsegesMezok[Math.floor(Math.random() * lehetsegesMezok.length)];
            if (!kiválasztottMezok.includes(randomMezo)) {
                kiválasztottMezok.push(randomMezo);
            }
        }

        kiválasztottMezok.forEach((mezo) => {
            kivettAdatok.push(obj[mezo]);
            obj[mezo] = { value: null, takeable: true };
        });
    });

    return { kivettAdatok, maradekAdatok };
}

exports.getFinalStats = async (req, res, next) => {
    const {tables, tablak , time, diff, def_time, tpont, exam_id, token} = req.body;

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
    const token = req.headers.token;

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
    const token = req.headers.token;

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
    const {search, osztaly, token, last} = req.body;

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