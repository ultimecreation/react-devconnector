const router = require('express').Router()
const AuthController = require('../Controllers/AuthController')
const HomeController = require('../Controllers/HomeController')
const PostsController = require('../Controllers/PostsController')
const UsersController = require('../Controllers/UsersController')


router.get('/',HomeController.index)
router.get('/api/posts',PostsController.index)
router.get('/api/users',UsersController.index)
router.post('/api/login',AuthController.login)
router.get('/api/register',AuthController.register)
module.exports = router