const { Sequelize, Model} = require("sequelize")

module.exports = (Sequelize, DataTypes) =>{
    class Alkat extends Model {}

    Alkat.init(
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            nev:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            tkat_id:{
                type: DataTypes.INTEGER,
                allowNull:false
            }
        },
        {
            sequelize: Sequelize,
            modelName: 'Alkat',
            tableName: 'alkat',
            timestamps: false,
        }
    )

    Alkat.initializeAlkats = async () => {
        const Alkats = [
            { nev: "Haladómozgással kapcsolatos", tkat_id: 1 },
            { nev: "Körmozgás/Forgómozgás kapcsolatos", tkat_id: 1  },
            { nev: "Dinamika (erőtan)", tkat_id: 1  },
            { nev: "Munka/Energiával kapcsolatos", tkat_id: 1 },
            { nev: "Folyadékokkal kapcsolatos", tkat_id: 1 },
            { nev: "Rezgés/Hullámokkal kapcsolatos", tkat_id: 2 },
            { nev: "Hőtan", tkat_id: 3 },
            { nev: "Elektromossággal kapcsolatos", tkat_id: 4 },
            { nev: "Mágnesességgel kapcsolatos", tkat_id: 4 },
            { nev: "Ellenállások fajtái", tkat_id: 4 },
        ];

        for (const alKatData of Alkats) {
            await Alkat.findOrCreate({
                where: { nev: alKatData.nev, tkat_id : alKatData.tkat_id },
                defaults: alKatData,
            });
        }
    }

    return Alkat;
}