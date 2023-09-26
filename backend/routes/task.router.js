const Router = require('express')
const router = new Router()
const taskController = require('../controllers/task.controller')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/', authMiddleware, taskController.createTask)
router.get('/suggested', authMiddleware, taskController.getSuggested)
router.get('/between', authMiddleware, taskController.getBetween)
router.get('/:id', authMiddleware, taskController.getOne)
router.get('/', authMiddleware, taskController.getAll)
router.put('/', authMiddleware, taskController.updateTask)
router.delete('/', authMiddleware, taskController.deleteTask)

module.exports = router