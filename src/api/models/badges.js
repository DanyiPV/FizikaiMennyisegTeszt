const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Badges extends Model {}

    Badges.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            badge_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            badge_image: {
                type: DataTypes.BLOB('long'),
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Badges',
            tableName: 'badges',
            timestamps: false,
        }
    );

    return Badges;
};
