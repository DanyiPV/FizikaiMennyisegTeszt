const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Usersettings extends Model {}

    Usersettings.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            darkmode:{
                type: DataTypes.BOOLEAN,
                allowNull:false,
                validate: {
                    min: 0,
                    max: 1,
                },
                defaultValue: 0,
            },
            private:{
                type: DataTypes.BOOLEAN,
                allowNull:false,
                validate: {
                    min: 0,
                    max: 1,
                },
                defaultValue: 0,
            },
            profPic:{
                type: DataTypes.BLOB('long'),
                allowNull: true,
            }
        },
        {
            sequelize,
            modelName: 'Usersettings',
            tableName: 'usersettings',
            timestamps: false,
        }
    );

    return Usersettings;
};
