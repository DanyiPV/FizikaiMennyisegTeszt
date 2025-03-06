const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {}

    Users.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            email: {
                type: DataTypes.STRING(150),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.CHAR(60),
                allowNull: false,
            },
            user_name: {
                type: DataTypes.STRING(40),
                allowNull: false,
                unique: true,
            },
            user_role: {
                type: DataTypes.CHAR(15),
                defaultValue: "student",
            },
            osztaly: {
                type: DataTypes.CHAR(4),
                allowNull: true,
            },
            admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            activated: {
                type: DataTypes.INTEGER,
                validate: {
                    min: 0,
                    max: 2,
                },
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: 'Users',
            tableName: 'users',
            timestamps: true,
        }
    );

    return Users;
};
