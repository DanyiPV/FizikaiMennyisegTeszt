const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Community_posts extends Model {}

    Community_posts.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT('long'),
                allowNull: false,
            },
            gotEdit: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            }
        },
        {
            sequelize,
            modelName: 'Community_posts',
            tableName: 'community_posts',
            timestamps: false,
        }
    );

    // FULLTEXT index hozzáadása az 'title' és 'content' oszlopokra
    Community_posts.sync().then(async () => {
        const [results] = await sequelize.query(`
            SHOW INDEX FROM community_posts WHERE Key_name = 'title';
        `);
        if (results.length === 0) {
            await sequelize.query(`
                ALTER TABLE community_posts ADD FULLTEXT(title, content);
            `).catch(err => {
                console.error('FULLTEXT index létrehozása sikertelen:', err);
            });
        } else {
            console.log('FULLTEXT index már létezik, nem adom hozzá újra.');
        }
    });    

    return Community_posts;
};