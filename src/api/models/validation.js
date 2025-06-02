const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Validation extends Model {}

    Validation.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            code:{
                type: DataTypes.TEXT,
                allowNull:true,
            },
            expires: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull:false
            },
        },
        {
            sequelize,
            modelName: 'Validation',
            tableName: 'validation',
            timestamps: false,
        }
    );

    return Validation;
};
