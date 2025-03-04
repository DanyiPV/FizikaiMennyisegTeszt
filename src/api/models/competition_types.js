const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Competition_types extends Model {}

    Competition_types.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement:true,
                allowNull: false,
                primaryKey: true,
            },
            type: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Competition_types',
            tableName: 'competition_types',
            timestamps: false,
        }
    );

    return Competition_types;
};