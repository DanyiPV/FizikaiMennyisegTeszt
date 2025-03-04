const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Themes extends Model {}

    Themes.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            theme: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Themes',
            tableName: 'themes',
            timestamps: false,
        }
    );

    // Add default themes
    Themes.initializeThemes = async () => {
        const defaultThemes = [
            { theme: "Abszolútérték, gyök" },
            { theme: "Bizonyítások" },
            { theme: "Egyenletek" },
            { theme: "Egyenletrendszerek" },
            { theme: "Egyenlőtlenségek" },
            { theme: "Egyszerűsítések, átalakítások" },
            { theme: "Értelmezési tartomány, értékkészlet" },
            { theme: "Exponenciális és logaritmusos feladatok" },
            { theme: "Függvények, analízis" },
            { theme: "Halmazok" },
            { theme: "Kombinatorika" },
            { theme: "Paraméter" },
            { theme: "Koordinátageometria" },
            { theme: "Logika, grafok" },
            { theme: "Síkmértan" },
            { theme: "Sorozatok" },
            { theme: "Statisztika" },
            { theme: "Számelmélet" },
            { theme: "Szöveges feladatok" },
            { theme: "Térmértan" },
            { theme: "Trigonometria" },
            { theme: "Valószínűségszámítás" },
        ];

        //await Themes.bulkCreate(defaultThemes, { ignoreDuplicates: false });

        for (const th of defaultThemes) {
            await Themes.findOrCreate({
                where: { theme: th.theme },
                defaults: th,
            });
        }
    };

    return Themes;
};
