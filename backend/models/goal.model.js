const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Goal = sequelize.define('goal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    dueDate: {
        type: DataTypes.DATEONLY
    },
    isAchieved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    achievementTime: {
        type: DataTypes.DATE
    },
})

module.exports = Goal