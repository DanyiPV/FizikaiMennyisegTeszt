const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task_solutions extends Model {}

  Task_solutions.init(
    {
      submission_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Let the DB handle this
      },
      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tasks',
          key: 'id',
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isIn: [[0, 1]],
        },
      },
    },
    {
      sequelize,
      modelName: 'Task_solutions',
      tableName: 'task_solutions',
      timestamps: false, // You are manually controlling the timestamps
    }
  );
  return Task_solutions;
};