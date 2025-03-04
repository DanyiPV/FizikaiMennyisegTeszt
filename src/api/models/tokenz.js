const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Tokenz extends Model {}

    Tokenz.init(
        {
            token: {
                type: DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true,
            },
            expires: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            type: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Tokenz',
            tableName: 'tokenz',
            timestamps: false,
        }
    );

    return Tokenz;
};
