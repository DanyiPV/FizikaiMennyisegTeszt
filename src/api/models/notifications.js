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
            datum:{
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            type:{
                type: DataTypes.INTEGER,
                allowNull:false
            },
            osztaly:{
                type: DataTypes.TEXT,
                allowNull:false
            }
        },
        {
            sequelize,
            modelName: 'Notifications',
            tableName: 'notifications',
            timestamps: false,
        }
    );

    return Notifications;
};
