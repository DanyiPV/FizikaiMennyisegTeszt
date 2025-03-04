const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Competitions extends Model {};

    Competitions.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            start_time: {
                type: DataTypes.DATE,
                allowNull: false
            },
            end_time: {
                type: DataTypes.DATE,
                allowNull: false
            },
            competition_type_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            acces_restriction: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            max_reward: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Competitions',
            tableName: 'competitions',
            timestamps: false
        }
    );

    return Competitions;
};
