const tablesService = require("../services/tablesService");

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
        console.log(alkatIds, sorok, diff);

        const parsedAlkatIds = alkatIds;
        const parsedSorok = Number(sorok);
        const parsedDiff = Number(diff);

        const randomRows = await tablesService.getRandomRows(parsedAlkatIds, parsedSorok);

        const { kivettAdatok, maradekAdatok } = randomFieldSelection(randomRows, parsedDiff);

        res.status(200).send({ kivettAdatok, maradekAdatok });
    } catch (error) {
        console.error("Hiba történt:", error);
        res.status(500).send({ error: "Belső szerverhiba történt." });
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
