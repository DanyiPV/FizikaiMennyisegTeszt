const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Exams extends Model {}

    Exams.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            ido:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            sorok:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            kezdet:{
                type: DataTypes.TEXT,
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
            datum:{
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
            }
        },
        {
            sequelize,
            modelName: 'Exams',
            tableName: 'exams',
            timestamps: false,
        }
    );

    return Exams;
};
