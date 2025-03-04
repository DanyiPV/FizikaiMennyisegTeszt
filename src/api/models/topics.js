const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Topics extends Model {}

    Topics.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            topic_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Topics',
            tableName: 'topics',
            timestamps: false,
        }
    );

    return Topics;
};
