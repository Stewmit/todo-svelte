const Router = require('express')
const router = new Router()
const goalController = require('../controllers/goal.controller')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/', authMiddleware, goalController.createGoal)
router.put('/publish', authMiddleware, goalController.publishGoal)
router.get('/feed', authMiddleware, goalController.getFeed)
router.get('/:id', authMiddleware, goalController.getOne)
router.get('/', authMiddleware, goalController.getAll)
router.put('/', authMiddleware, goalController.updateGoal)
router.delete('/', authMiddleware, goalController.deleteGoal)

module.exports = router