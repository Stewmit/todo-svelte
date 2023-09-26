const ApiError = require('../error/ApiError')
const Habit = require("../models/habit.model")
const HabitDay = require("../models/habit_day.model")

class HabitController {
    async createHabit(req, res, next) {
        try {
            const {name, regularity, target, unit, description} = req.body

            const habit = await Habit.create({
                name,
                regularity,
                target,
                unit,
                description,
                userId: req.user.id
            })

            return res.json(habit)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const habit = await Habit.findOne({
                where: {
                    id,
                    userId: req.user.id
                },
                include: [{
                    model: HabitDay
                }]
            })
            return res.json(habit)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const habits = await Habit.findAll({
                where: {
                    userId: req.user.id
                },
                include: [{
                    model: HabitDay
                }]
            })
            return res.json(habits)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async updateHabit(req, res, next) {
        try {
            const data = req.body
            const id = data.id

            const habitToUpdate = await Habit.findOne({where: { id }})
            habitToUpdate.update({...data})

            return res.json({message: 'Habit was updated!'})
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async deleteHabit(req, res, next) {
        try {
            const {id} = req.body

            await Habit.destroy({
                where: {
                    id
                },
            })

            return res.json({message: 'Habit was deleted!'})
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async addDay(req, res, next) {
        try {
            const {date, habitId} = req.body
            const habitDay = await HabitDay.create({
                date,
                habitId
            })

            return res.json(habitDay)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async deleteDay(req, res, next) {
        try {
            const {id} = req.body

            await HabitDay.destroy({
                where: {
                    id
                },
            })

            return res.json({message: 'Day was deleted!'})
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new HabitController()