const { Model,Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Topic_comments extends Model {}

    Topic_comments.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            topic_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            comment_text: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            comment_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        },
        {
            sequelize,
            modelName: 'Topic_comments',
            tableName: 'topic_comments',
            timestamps: false,
        }
    );

    return Topic_comments;
};
