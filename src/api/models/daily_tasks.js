const {Sequalize, Model, DataTypes} = require('sequelize')


module.exports = (sequelize, DataTypes ) => {
    class Daily_tasks extends Model{}
    Daily_tasks.init(
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull:false,
                autoIncrement: true,
                primaryKey:true 
            },
            task_id:{
                type: DataTypes.INTEGER,
                allowNull:false,
                references: {
                    model:'Tasks',
                    key:'id'
                }
            },
        },
        {
            sequelize,
            modelName: 'Daily_Tasks',
            tableName:'daily_tasks',
            timestamps:false,
        }
    )
    return Daily_tasks;
}