const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Community_likes extends Model {}

    Community_likes.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            entity_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            entity_type: {
                type: DataTypes.ENUM('post', 'comment'),
                allowNull: false,
            },
            like_type: {
                type: DataTypes.ENUM('like', 'dislike'),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Community_likes',
            tableName: 'community_likes',
            timestamps: false,
        }
    );

    return Community_likes;
};
