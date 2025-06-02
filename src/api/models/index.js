module.exports = (sequelize, DataTypes) => {
    const Users = require("../models/users")(sequelize, DataTypes);
    const Usersettings = require("./usersettings")(sequelize, DataTypes);
    const Tables = require("./tables")(sequelize, DataTypes);
    const Exams = require("./exams")(sequelize, DataTypes);
    const Notification = require("./notifications")(sequelize, DataTypes);
    const Tkat = require("./tkat")(sequelize, DataTypes);
    const Alkat = require("./alkat")(sequelize, DataTypes);
    const Validation = require("./validation")(sequelize, DataTypes);
    const Results = require("./results")(sequelize, DataTypes);

    // Kapcsolatok
    Users.hasOne(Usersettings, {
        foreignKey: "user_id",
    });
    Usersettings.belongsTo(Users, {
        foreignKey: "user_id",
    });

    Users.hasOne(Validation, {
        foreignKey: "user_id",
    });
    Validation.belongsTo(Users, {
        foreignKey: "user_id",
    });

    Users.hasOne(Notification, {
        foreignKey: "user_id",
    });
    Notification.belongsTo(Users, {
        foreignKey: "user_id",
    });

    const UserNotification = sequelize.define('UserNotification', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false    
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        notification_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("shown", "read"),
            allowNull: false
        }
        }, {
        timestamps: false
    });


    Users.belongsToMany(Notification, {
        through: UserNotification,
        foreignKey: "user_id",
        otherKey: "notification_id",
        as: 'notifications'  // alias az asszociációra
    });

    Notification.belongsToMany(Users, {
        through: UserNotification,
        foreignKey: "notification_id",
        otherKey: "user_id",
        as: 'users'  // alias az asszociációra
    });
    UserNotification.belongsTo(Notification, { foreignKey: 'notification_id', as: 'notification' });

    Tkat.hasMany(Alkat, {
        foreignKey: "tkat_id",
    });
    Alkat.belongsTo(Tkat, {
        foreignKey: "tkat_id",
    });

    Alkat.hasMany(Tables, {
        foreignKey: "alkat_id",
    });
    Tables.belongsTo(Alkat, {
        foreignKey: "alkat_id",
    });

    Users.hasMany(Results, { foreignKey: "users_id" });
    Results.belongsTo(Users, { foreignKey: "users_id" });

    Exams.hasMany(Results, {
        foreignKey: 'exam_id'
    });

    // Kapcsolótábla létrehozása Many-to-Many kapcsolat számára
    const ExamAlkat = sequelize.define('ExamTableId', {}, { timestamps: false });

    Exams.belongsToMany(Alkat, { through: ExamAlkat, foreignKey: "exam_id", as: 'alkats' });
    Alkat.belongsToMany(Exams, { through: ExamAlkat, foreignKey: "alkat_id", as: 'exams' });

    return {
        Users,
        Notification,
        Usersettings,
        Exams,
        Alkat,
        Tables,
        Tkat,
        Validation,
        Results,
        ExamAlkat,
        UserNotification
    };
};
