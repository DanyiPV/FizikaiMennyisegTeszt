const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Notifications extends Model {}

    Notifications.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            message:{
                type: DataTypes.TEXT,
                allowNull:false,
            },
            extra:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            closed:{
                type: DataTypes.BOOLEAN,
                allowNull:false,
                validate: {
                    min: 0,
                    max: 1,
                },
                defaultValue: 0,
            },
            megjelenitve:{
                type: DataTypes.BOOLEAN,
                allowNull:false,
                validate: {
                    min: 0,
                    max: 1,
                },
                defaultValue: 0,
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
            modelName: 'Notifications',
            tableName: 'notifications',
            timestamps: true,
        }
    );

    return Notifications;
};
