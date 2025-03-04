module.exports = (sequelize, DataTypes) => {
    const Users = require("../models/users")(sequelize, DataTypes);
    const Usersettings = require("./usersettings")(sequelize, DataTypes);
    const Tables = require("./tables")(sequelize, DataTypes);
    const Exams = require("./exams")(sequelize, DataTypes);
    const Notification = require("./notifications")(sequelize, DataTypes);
    const Tkat = require("./tkat")(sequelize, DataTypes);
    const Alkat = require("./alkat")(sequelize, DataTypes);

    // Kapcsolatok
    Users.hasOne(Usersettings, {
        foreignKey: "user_id",
    });
    Usersettings.belongsTo(Users, {
        foreignKey: "user_id",
    });

    Users.hasOne(Notification, {
        foreignKey: "user_id",
    });
    Notification.belongsTo(Users, {
        foreignKey: "user_id",
    });

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

    // Kapcsolótábla létrehozása Many-to-Many kapcsolat számára
    const ExamAlkat = sequelize.define('ExamAlkat', {}, { timestamps: false });

    Exams.belongsToMany(Alkat, { through: ExamAlkat, foreignKey: "exam_id" });
    Alkat.belongsToMany(Exams, { through: ExamAlkat, foreignKey: "alkat_id" });

    return {
        Users,
        Notification,
        Usersettings,
        Exams,
        Alkat,
        Tables,
        Tkat,
        ExamAlkat
    };
};
