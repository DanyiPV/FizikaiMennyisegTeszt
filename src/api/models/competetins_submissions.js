const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class CompetitionSubmissions extends Model {}

    CompetitionSubmissions.init(
        {
            Userid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'users', // A hivatkozott tábla neve
                    key: 'id', // Az idegen kulcs hivatkozott oszlopa
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            competition_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'competitions', // A hivatkozott tábla neve
                    key: 'id', // Az idegen kulcs hivatkozott oszlopa
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            experience_level: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            point: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            modifiedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'CompetitionSubmissions',
            tableName: 'competition_submissions',
            timestamps: false,
        }
    );

    return CompetitionSubmissions;
};
