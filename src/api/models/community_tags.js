const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Community_tags extends Model {}

    Community_tags.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            tag: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Community_tags',
            tableName: 'community_tags',
            timestamps: false,
        }
    );

    // Add default themes
    Community_tags.initializeTags = async () => {
        const Tags = [
            { tag: "Megoldások" },
            { tag: "Programozás" },
            { tag: "Segítség" },
            { tag: "Probléma" },
            { tag: "Bejelentés" },
        ];

        for (const tagData of Tags) {
            await Community_tags.findOrCreate({
                where: { tag: tagData.tag },
                defaults: tagData,
            });
        }
    };

    return Community_tags;
};
