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
            ido:{
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            kezdet:{
                type: DataTypes.TEXT,
                allowNull: false,
            },
            dif:{
                type: DataTypes.INTEGER,
                allowNull: true,
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
            modelName: 'Notifications',
            tableName: 'notifications',
            timestamps: false,
        }
    );

    return Notifications;
};
