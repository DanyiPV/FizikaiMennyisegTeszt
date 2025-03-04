const { Model,Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Community_files extends Model {}

    Community_files.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            file_name:{
                type: DataTypes.TEXT,
                allowNull: false,
            },
            file_type:{
                type: DataTypes.TEXT,
                allowNull: false,
            },
            file_size: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            file: {
                type: DataTypes.BLOB('long'),
                allowNull: false,
            },

        },
        {
            sequelize,
            modelName: 'Community_files',
            tableName: 'community_files',
            timestamps: false,
        }
    );

    return Community_files;
};
