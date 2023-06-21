const Router = require('express')
const router = new Router()
const memberController = require('../controllers/memberController')

router.post('/registration', memberController.registration)
router.post('/login', memberController.login)
router.get('/auth', )
router.get('/:id', memberController.getOne)
router.put('/addInfo', )

module.exports = router