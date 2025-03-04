const { Sequelize, Model} = require("sequelize")

module.exports = (Sequelize, DataTypes) =>{
    class Tkat extends Model {}

    Tkat.init = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        nev:{
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        modelName: 'Tkat',
        tableName: 'tkat',
        timestamps: false,
    }

    Tkat.initializeTkats = async () => {
        const TKats = [
            { nev: "Haladómozgással kapcsolatos" },
            { nev: "Rezgések és hullámok" },
            { nev: "Hőtan" },
            { nev: "Elektromossággal kapcsolatos" }
        ];

        for (const tkatData of TKats) {
            await Tkat.findOrCreate({
                where: { nev: tkatData.nev },
                defaults: tkatData,
            });
        }
    }

    return Tkat;
}