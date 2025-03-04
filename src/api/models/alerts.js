const { Model,Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Alerts extends Model {}

    Alerts.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement:true,
                allowNull: false,
                primaryKey: true,
            },
            message: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            alert_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            priority_level: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5,
                },
            },
        },
        {
            sequelize,
            modelName: 'Alerts',
            tableName: 'alerts',
            timestamps: false,
        }
    );

    return Alerts;
};