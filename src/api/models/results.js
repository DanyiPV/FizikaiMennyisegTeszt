const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Results extends Model {}

    Results.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            class: {
                type: DataTypes.CHAR(4),
                allowNull: false,
            },
            Mpont: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            Epont: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            dif:{
                type: DataTypes.INTEGER,
                allowNull: false,
                validate:{
                    min: 0,
                    max: 2
                }
            },
            tabla_sorok:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            Eido:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            Tido:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            datum: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        },
        {
            sequelize,
            modelName: 'Results',
            tableName: 'results',
            timestamps: true,
        }
    );

    return Results;
};