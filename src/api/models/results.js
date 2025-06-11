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
            tablak:{
                type: DataTypes.CHAR(255),
                allowNull: false,
            },
            osztaly: {
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
                    min: 1,
                    max: 3
                }
            },
            Eido:{
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            Tido:{
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            datum: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            result: {
                type: DataTypes.BLOB('long'),
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Results',
            tableName: 'results',
            timestamps: false,
        }
    );

    return Results;
};