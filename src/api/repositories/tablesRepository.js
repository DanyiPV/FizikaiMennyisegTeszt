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
                    }
                }
            }
        }

        return achivedPoints;
    }

    async uploadResult(newResult){
        const result = await this.Results.build(newResult);

        await result.save();

        return 'OK'
    }

    async getUserResults(id){
        const results = await this.Results.findAll({
            order: [['datum', 'DESC']],
            where:{
                users_id: id,
            },
            include: [
                {
                    model: this.Users,
                    attributes: ["user_name"],
                },
            ],
        })

        var resultWithUser = [];

        for (let i = 0; i < results.length; i++) {
            const result = { ...results[i].dataValues, ...results[i].dataValues.User.dataValues };
        
            delete result.User;
        
            resultWithUser.push(result);
        }

        return resultWithUser;
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

    async getUsersResults(search, osztaly, last){
        const whereClause = {};
    
        if (search && search != "") {
            whereClause.user_name = { [Sequelize.Op.like]: `%${search}%` };
        }
    
        if (osztaly) {
            whereClause.osztaly = osztaly;
        }

        const users = await this.Users.findAll(
            { 
                where: whereClause,
                attributes: ['user_name'],
                include: [
                    {
                        model: this.Results,
                        required: true,
                        limit: last === 1 ? 1 : undefined,
                        order: [['datum', 'DESC']],
                    },
                ],
            }
        );

       
        var usersWithResults = [];

        for (let i = 0; i < users.length; i++) {

            delete users[i].dataValues.id

            if (users[i].dataValues.Results && users[i].dataValues.Results[0]) {

                const values = users[i].dataValues.Results.map(c => c.dataValues);
                
                const user_name = users[i].dataValues.user_name;
                for (let j = 0; j < values.length; j++) {
                    usersWithResults.unshift({ ...values[j], user_name});
                }
            }
        }

        return usersWithResults;
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