const db = require("../database/dbContext");

const { Op, where } = require('sequelize');

const { Sequelize, DataTypes } = require('sequelize');

class logregRepository
{
    constructor(db)
    {
        this.Tkat = db.Tkat;

        this.Alkat = db.Alkat;

        this.Tables = db.Tables;

        this.Users = db.Users;

        this.Results = db.Results;

        this.Exams = db.Exams;

        this.ExamAlkat = db.ExamAlkat;
    }

    async fullCategories() {
        return await this.Tkat.findAll();
    }

    async fullSubcategories(idList){
        var SubcategoriesArray = [];

        for (const id of idList) {
            const subcategories = await this.Alkat.findAll({
                where: {
                    tkat_id: id
                },
                include: [
                    {
                        model: this.Tables,
                        attributes: []
                    }
                ],
                attributes: [
                    'id', 'nev', 'tkat_id',
                    [Sequelize.fn('COUNT', Sequelize.col('Tables.id')), 'tablesCount'] 
                ],
                group: ['Alkat.id']
            });
        
            SubcategoriesArray.push(subcategories);
        }
        

        return SubcategoriesArray;
    }

    async fullTables(id){
        return await this.Tables.findAll(
            {
                where:{
                    alkat_id: id
                }
            }
        )
    }

    async allTables(){
        return await this.Tkat.findAll({
            include:{
                model: this.Alkat,
                include:{
                    model: this.Tables,
                }
            }
        });
    }

    async getRandomRows(alkatIds, sorok) {
        const rows = await this.Tables.findAll({
            where: {
                alkat_id: {
                    [Op.in]: alkatIds,
                },
            },
            order: db.sequelize.random(),
            limit: sorok,
        });
    
        return rows;
    }

    async getOsztaly(user_id) {
        return await this.Users.findOne({
            where:{
                id : user_id
            },
            attributes: ["osztaly"]
        })
    }

    async getAchivedPoints(tablak){
        var achivedPoints = 0;
        var forIndex = 0;
        var txtContent = ""
        for (const item of tablak) {
            const dbData = await this.Tables.findOne({ where: { id: item.id } });
            
            if (!dbData) {
                console.warn(`Nincs találat az adatbázisban id: ${item.id}`);
                continue;
            }

            const fieldsToCheck = ['nev', 'jel', 'def', 'mer'];

            for (const field of fieldsToCheck) {
                if (typeof item[field] == 'object' && item[field] != null && item[field].value != null) {
                    if (item[field].value == dbData[field]) {
                        achivedPoints++;
                        txtContent += (JSON.stringify({value: dbData[field], correct: true}) + ';')
                    }else{
                        txtContent += (JSON.stringify({value: dbData[field], correct: false}) + ';')
                    }
                }
                else if(typeof item[field] == 'object' && (item[field].value != null || item[field] != null)){
                    txtContent += (JSON.stringify({value: dbData[field], correct: false}) + ';')
                }
                else{
                    txtContent += (item[field] + ';')
                }
            }
            if(forIndex < tablak.length-1){
                txtContent += "\n"
            }
            forIndex++;
        }
        const buffer = Buffer.from(txtContent, 'utf8');

        return {achivedPoints, buffer};
    }

    async uploadResult(newResult){
        const result = await this.Results.build(newResult);

        await result.save();

        return 'OK'
    }

    async getUserResults(id, exam){
        const resultWhereClause = { users_id: id };

        if (exam == 'false') {
            resultWhereClause.exam_id = { [Sequelize.Op.not]: null };
        } else if (exam == 'true') {
            resultWhereClause.exam_id = null;
        }

        const countResults = await this.Results.count({
            where: {
                users_id: id
            },
        });

        const results = await this.Results.findAll({
            order: [['datum', 'DESC']],
            where: resultWhereClause,
            include: [
                {
                    model: this.Users,
                    attributes: ["user_name"],
                },
            ],
        });

        var resultWithUser = [];

        for (let i = 0; i < results.length; i++) {
            const raw = results[i].dataValues;
            const user = raw.User?.dataValues || {};

            const result = { ...raw, ...user };
            delete result.User;

            const rawTxt = result.result.toString('utf-8');

            const sorok = rawTxt.trim().split('\n');

            const parsedRows = sorok.map((sor) => {
                const cells = sor.split(';').filter(cell => cell.trim() !== '');

                const parsedCells = cells.map(cell => {
                const trimmed = cell.trim();

                if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
                    try {
                    return JSON.parse(trimmed);
                    } catch (e) {
                    return trimmed;
                    }
                } else {
                    return trimmed;
                }
                });

                return parsedCells;
            });
            result.result = parsedRows;

            resultWithUser.push(result);
        }

        return {res: resultWithUser, countResults};
    }

    async getOsztalyok(){
        return await this.Users.findAll({
            attributes: ["osztaly"],
            where: {
                osztaly: {
                    [Op.notIn]: ['A', 'T']
                }
            },
            group: ["osztaly"],
            raw: true
        })
    }

    async getUsersResults(search, osztaly, last, exam, id){
        const whereClause = {
            id: { [Sequelize.Op.not]: id }
        };

        if (search && search !== "") {
            whereClause.user_name = { [Sequelize.Op.like]: `%${search}%` };
        }

        if (osztaly) {
            whereClause.osztaly = osztaly;
        }

        const resultWhereClause = {};
        if (exam === false) {
            resultWhereClause.exam_id = { [Sequelize.Op.not]: null };
        } else if (exam === true) {
            resultWhereClause.exam_id = null;
        }

        // === Felhasználók lekérdezése, kizárva az adott felhasználót (id)
        const users = await this.Users.findAll({ 
            where: whereClause,
            attributes: ['user_name'],
            include: [
                {
                model: this.Results,
                required: true,
                where: Object.keys(resultWhereClause).length > 0 ? resultWhereClause : undefined,
                limit: last === 1 ? 1 : undefined,
                order: [['datum', 'DESC']],
                },
            ],
        });

        // === Eredmények számlálása az osztályra, kizárva a user id-t
        const countOsztaly = await this.Results.count({
            where: {
                osztaly,
                users_id: { [Sequelize.Op.not]: id },
            }
        });

        // === Felhasználók számlálása, kizárva a user id-t
        const countUsers = await this.Users.count({
            where: {
                user_name: { [Sequelize.Op.like]: `%${search}%` },
                id: { [Sequelize.Op.not]: id }
            },
            include: [
                {
                model: this.Results,
                required: true,
                },
            ],
        });

        var usersWithResults = [];

        for (let i = 0; i < users.length; i++) {
            delete users[i].dataValues.id;

            if (users[i].dataValues.Results && users[i].dataValues.Results[0]) {
                const values = users[i].dataValues.Results.map(c => c.dataValues);
                const user_name = users[i].dataValues.user_name;

                for (let j = 0; j < values.length; j++) {
                    const rawResult = values[j].result.toString('utf-8');
                    
                    const lines = rawResult.split('\n').filter(line => line.trim() !== '');

                    const parsedLines = lines.map(line => {
                        const parts = line.split(';').filter(p => p.trim() !== '');

                        return parts.map(part => {
                            const trimmed = part.trim();
                            try {
                                if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
                                    return JSON.parse(trimmed);
                                }
                                return trimmed;
                            } catch {
                                return trimmed;
                            }
                        });
                    });

                    values[j].result = parsedLines;

                    usersWithResults.unshift({ ...values[j], user_name });
                }
            }
        }

        return {res: usersWithResults, countResults: countOsztaly + countUsers};
    }

    async getCheckedUser(id){
        const user = await this.Users.findOne(
        {
            where: {
                id: id,
            }
        });

        return (user.osztaly == "A" && user.user_role == "admin" && user.admin == 1) || (user.osztaly == "T" && user.user_role == "teacher" && user.admin == 0)
    }

    async addNewExam(newExam){
        const exam = await this.Exams.build(newExam);

        await exam.save();

        return exam.id;
    }

    async addExamTables(tableidList, addExam){
        for(const id of tableidList){
            const examAlkat = await this.ExamAlkat.build({exam_id: addExam, alkat_id: id});

            await examAlkat.save();
        }

        return 'OK'
    }

    async getExams(userId) {
        const user = await this.Users.findOne({
          where: { id: userId },
          attributes: ['osztaly']
        });
      
        const exams = await this.Exams.findAll({
          where: { osztaly: user.osztaly },
          include: [
            {
              model: this.Results,
              required: false,
              where: { users_id: userId }
            },
            {
              model: this.Alkat,
              as: 'alkats',
              attributes: ["id","nev"],
              required: false,
              through: { attributes: [] }
            }
          ]
        });
      
        const formattedExams = exams.map(exam => {
          const closed = exam.results && exam.results.length > 0;
          const alkats = exam.alkats ? exam.alkats : [];
          return { ...exam.dataValues, closed, alkats };
        });
      
        return formattedExams;
      }
}

module.exports = new logregRepository(db);