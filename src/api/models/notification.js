const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {}

    Notification.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            type: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            notif_content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content_type: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            content_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            closed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Notification',
            tableName: 'notification',
            timestamps: false,
        }
    );

    return Notification;
};