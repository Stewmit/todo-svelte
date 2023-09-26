const ApiError = require('../error/ApiError')
const Goal = require('../models/goal.model')
const uuid = require('uuid')
const path = require('path')
const Task = require('../models/task.model')
const Habit = require('../models/habit.model')
const { rm } = require('fs')
const User = require('../models/user.model')
const { Op } = require('sequelize')

class GoalController {
    async createGoal(req, res, next) {
        try {
            const {name, category, description, dueDate, taskIDs, habitIDs} = req.body
            
            const imageFile = req.files?.img

            let fileName = null
            
            if (imageFile) {
                fileName = uuid.v4() + '.jpg'
                imageFile.mv(path.resolve(__dirname, '..', 'static', 'goals', fileName))
            }
            
            const newGoal = await Goal.create({
                name,
                category,
                description,
                dueDate,
                image: fileName,
                userId: req.user.id
            })
            
            for (let i = 0; i < taskIDs?.length; i++) {
                await Task.update({ 
                    goalId: newGoal.id
                }, 
                {
                    where: {
                        id: taskIDs[i],
                        userId: req.user.id
                    }
                })
            }

            for (let i = 0; i < habitIDs?.length; i++) {
                await Habit.update({ 
                    goalId: newGoal.id
                }, 
                {
                    where: {
                        id: habitIDs[i],
                        userId: req.user.id
                    }
                })
            }

            // Returning created goal with tasks and habits
            const goal = await Goal.findOne({
                where: { 
                    id: newGoal.id 
                },
                include: [{
                    model: Task,
                },
                {
                    model: Habit,
                }]
            })

            return res.json(goal)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const goal = await Goal.findOne({
                where: {
                    id,
                    userId: req.user.id
                },
                include: [{
                    model: Task,
                },
                {
                    model: Habit,
                }],
                order: [
                    ['id', 'ASC']
                ]
            })

            return res.json(goal)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const goals = await Goal.findAll({
                where: {
                    userId: req.user.id
                },
                include: [{
                    model: Task,
                },
                {
                    model: Habit,
                }],
                order: [
                    ['id', 'ASC']
                ]
            })

            return res.json(goals)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getFeed(req, res, next) {
        try {
            const {categoryFilter} = req.params

            let filtering = categoryFilter ? {category: categoryFilter} : {}

            const goals = await Goal.findAll({
                where: {
                    [Op.and]: [
                        {
                            userId: req.user.id
                        },
                        {
                            isAchieved: true
                        },
                        filtering
                    ]
                },
                include: [{
                    model: User,
                },
                {
                    model: Task,
                },
                {
                    model: Habit,
                }],
                order: [
                    ['achievementTime', 'DESC']
                ]
            })

            return res.json(goals)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async publishGoal(req, res, next) {
        try {
            const {id, isAchieved} = req.body
            
            let achievementTime = null

            if (isAchieved) {
                achievementTime = new Date()
            }

            await Goal.update({isAchieved, achievementTime}, {
                where: {
                    id,
                    userId: req.user.id
                }
            })

            return res.json({message: 'Goal achievement was updated!'})
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async updateGoal(req, res, next) {
        try {
            const data = req.body
            const id = data.id
            const taskIDs = data.taskIDs
            const habitIDs = data.habitIDs

            // Updating goal fields
            const goalToUpdate = await Goal.findOne({where: { id }})
            goalToUpdate.update({...data})

            // Uploading a new image and deleting an old one
            const imageFile = req.files?.img
            let fileName = null
            
            if (imageFile) {
                const oldFileName = goalToUpdate.image
                if (oldFileName) {
                    rm(path.resolve(__dirname, '..', 'static', 'goals', oldFileName), () => {})
                }

                fileName = uuid.v4() + '.jpg'
                imageFile.mv(path.resolve(__dirname, '..', 'static', 'goals', fileName))
                goalToUpdate.update({image: fileName})
            }

            // Resetting goal binding for tasks and habits
            await Task.update({goalId: null}, {
                where: {
                    goalId: goalToUpdate.id,
                    userId: req.user.id
                }
            })

            await Habit.update({goalId: null}, {
                where: {
                    goalId: goalToUpdate.id,
                    userId: req.user.id
                }
            })

            // Creating new connections according to task and habit lists
            for (let i = 0; i < taskIDs?.length; i++) {
                await Task.update({ 
                    goalId: goalToUpdate.id
                }, 
                {
                    where: {
                        id: taskIDs[i],
                        userId: req.user.id
                    }
                })
            }

            for (let i = 0; i < habitIDs?.length; i++) {
                await Habit.update({ 
                    goalId: goalToUpdate.id
                }, 
                {
                    where: {
                        id: habitIDs[i],
                        userId: req.user.id
                    }
                })
            }

            return res.json({message: 'Goal was updated!'})
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async deleteGoal(req, res, next) {
        try {
            const {id} = req.body

            const goal = await Goal.findOne({
                where: {
                    id,
                    userId: req.user.id
                }
            })

            const fileName = goal.image
            rm(path.resolve(__dirname, '..', 'static', 'goals', fileName), () => {})
            goal.destroy()

            return res.json({message: 'Goal was deleted!'})
        } 
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new GoalController()