const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Task = sequelize.define('task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    date: {
        type: DataTypes.DATEONLY
    },
    dayOrder: {
        type: DataTypes.INTEGER
    },
    highlightColor: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    lastInteraction: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}) 

module.exports = Task