const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const uuid = require('uuid')
const path = require('path')
const {Op} = require('sequelize')

const generateJWT = (id, name, surname, email, avatar) => {
    return jwt.sign(
        {
            id,
            name,
            surname,
            email,
            avatar
        }, 
        process.env.SECRET_KEY,
        {
            expiresIn: '24h'
        }
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const {name, surname, email, password} = req.body

            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный адрес почты или пароль!'))
            }

            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким адресом почты уже зарегистрирован!'))
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({name, surname, email, password: hashPassword})
            
            const token = generateJWT(user.id, user.name, user.surname, user.email)
            return res.json({token})
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body

            const user = await User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.internal('Пользователь с такой почтой не найден!'))
            }

            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal('Неверный пароль!')) 
            }

            const token = generateJWT(user.id, user.name, user.surname, user.email, user.avatar)
            return res.json({token})
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJWT(req.user.id, req.user.name, req.user.surname, req.user.email, req.user.avatar)
            return res.json({token})
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    } 

    async updateUser(req, res) {
        try {
            const data = req.body

            await User.update({...data},
                {
                    where: {
                        id: data.id
                    },
                }
            )

            const user = await User.findOne({where: {id}})

            const token = generateJWT(user.id, user.name, user.surname, user.email, req.user.avatar)
            return res.json({token})
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async changePassword(req, res, next) {
        try {
            const {id, oldPassword, newPassword} = req.body

            const user = await User.findOne({where: {id}})

            let comparePassword = bcrypt.compareSync(oldPassword, user.password)
            if (!comparePassword) {
                return next(ApiError.internal('Wrong password!'))
            }

            const hashPassword = await bcrypt.hash(newPassword, 5)

            await User.update(
                {
                    password: hashPassword
                },
                {
                    where: {
                        id
                    },
                }
            )

            return res.json({message: 'Password was changed!'})
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async changeAvatar(req, res, next) {
        try {
            const userToUpdate = await User.findOne({where: { id: req.user.id }})
            
            const imageFile = req.files?.img

            if (!imageFile) {
                return next(ApiError.internal('No file chosen!'))
            }

            const oldFileName = userToUpdate.avatar
            if (oldFileName) {
                rm(path.resolve(__dirname, '..', 'static', 'users', oldFileName), () => {})
            }

            let fileName = uuid.v4() + '.jpg'
            imageFile.mv(path.resolve(__dirname, '..', 'static', 'users', fileName))
            userToUpdate.update({avatar: fileName})

            const token = generateJWT(req.user.id, req.user.name, req.user.surname, req.user.email, fileName)
            return res.json({token})
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async deleteUser(req, res) {
        try {
            await User.destroy({
                where: {
                    id: req.user.id
                },
            })

            return res.json({message: 'User was deleted!'})
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new UserController()