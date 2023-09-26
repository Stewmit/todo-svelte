const Router = require('express')
const router = new Router()
const habitController = require('../controllers/habit.controller')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/', authMiddleware, habitController.createHabit)
router.get('/:id', authMiddleware, habitController.getOne)
router.get('/', authMiddleware, habitController.getAll)
router.put('/', authMiddleware, habitController.updateHabit)
router.delete('/', authMiddleware, habitController.deleteHabit)
router.post('/day', authMiddleware, habitController.addDay)
router.delete('/day', authMiddleware, habitController.deleteDay)

module.exports = router