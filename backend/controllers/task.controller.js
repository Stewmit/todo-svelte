const ApiError = require('../error/ApiError')
const Task = require("../models/task.model")
const Subtask = require("../models/subtask.model")
const {Op} = require("sequelize");

class TaskController {
    async createTask(req, res, next) {
        try {
            const {name, date, description, highlightColor, isComplete, subtasks} = req.body

            const newTask = await Task.create({
                name,
                date,
                description,
                highlightColor,
                isComplete,
                userId: req.user.id
            })

            for (let i = 0; i < subtasks.length; i++) {
                let tempSubtask = await Subtask.create({name: subtasks[i].name, order: i+1, isComplete: subtasks[i].isComplete})
                await newTask.addSubtask(tempSubtask)
            }
            
            // Returning created task with subtasks
            const task = await Task.findOne({
                where: { id: newTask.id },
                include: [{
                    model: Subtask,
                }],
                order: [
                    [Subtask, 'order', 'ASC']
                ]
            })

            return res.json(task)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const {sort, filter} = req.query

            let condition = undefined
            let sortDirection = 'DESC'

            if (sort === 'name' || sort === 'date') {
                sortDirection = 'ASC'
            }

            switch (filter) {
                case 'planned':
                    condition = {
                        date: {
                            [Op.not]: null
                        }
                    }
                    break;
                case 'highlighted':
                    condition = {
                        highlightColor: {
                            [Op.not]: { 
                                [Op.any]: [null, ''] 
                            }
                        }   
                    }
                    break;
                    case 'goal-connected':
                        condition = {
                            goalId: {
                                [Op.not]: null
                            }   
                        }
                        break;
            }

            const tasks = await Task.findAll({
                where: {
                    [Op.and]: [
                        {
                            userId: req.user.id
                        },
                        !!condition ? condition : {}
                    ]
                },
                include: [{
                    model: Subtask,
                }],
                order: [
                    [sort ? sort : 'id', sortDirection],
                    [Subtask, 'order', 'ASC']
                ]
            })
            return res.json(tasks)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const task = await Task.findOne({
                where: {
                    id,
                    userId: req.user.id
                },
                include: [{
                    model: Subtask,
                }],
                order: [
                    ['id', 'ASC'],
                    [Subtask, 'order', 'ASC']
                ]
            })

            return res.json(task)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getBetween(req, res, next) {
        try {
            const {startDate, endDate} = req.query

            if (startDate && endDate) {
                const tasks = await Task.findAll({
                where: {
                    [Op.and]: [
                        {
                            userId: req.user.id
                        },
                        {
                            date: {
                                [Op.between]: [startDate, endDate]
                            }
                        }
                    ]
                },
                include: [{
                    model: Subtask,
                }],
                order: [
                    ['date', 'ASC'],
                    [Subtask, 'order', 'ASC']
                ]})
                return res.json(tasks)
            }
            else {
                return res.json([])
            }
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getSuggested(req, res, next) {
        try {
            const tasks = await Task.findAll({
                limit: 30,
                where: {
                    userId: req.user.id
                },
                include: [{
                    model: Subtask,
                }],
                order: [
                    ['lastInteraction', 'ASC'],
                    [Subtask, 'order', 'ASC']
                ]
            })
            return res.json(tasks)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async updateTask(req, res, next) {
        try {
            const data = req.body
            const id = data.id
            const subtasks = data.subtasks

            const taskToUpdate = await Task.findOne({where: { id }})
            taskToUpdate.update({...data, lastInteraction: new Date()})

            await Subtask.destroy({
                where: {
                    taskId: id
                },
            })

            for (let i = 0; i < subtasks.length; i++) {
                let tempSubtask = await Subtask.create({name: subtasks[i].name, order: i+1, isComplete: subtasks[i].isComplete})
                await taskToUpdate.addSubtask(tempSubtask)
            }

            return res.json({message: 'Task was updated!'})
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async deleteTask(req, res, next) {
        try {
            const {id} = req.body

            await Task.destroy({
                where: {
                    id
                },
            })

            return res.json({message: 'Task was deleted!'})
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new TaskController()