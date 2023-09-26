const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const HabitDay = sequelize.define('habitDay', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATEONLY
    }
})

module.exports = HabitDay