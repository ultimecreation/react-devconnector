const router = require('express').Router()
const multer = require('multer')
const storage = multer.diskStorage({
    destination:'uploads/',
    filename:(req,file,callback)=>{
        callback(null, Date.now()+ '-'+file.originalname)
    }
})

const uploader = multer({storage:storage})
const UserValidator = require('../Middlewares/UserValidator')
const AuthController = require('../Controllers/AuthController')
const HomeController = require('../Controllers/HomeController')
const PostsController = require('../Controllers/PostsController')
const UsersController = require('../Controllers/UsersController')
const UserAuth = require('../Middlewares/UserAuth')


router.get('/api/articles/liste',PostsController.index)
router.get('/api/utilisateurs/liste',UsersController.index)
router.post('/api/profils/creer')
router.post('/api/connexion',UserValidator.validateLogin ,AuthController.login)
router.post('/api/inscription',[UserValidator.validateRegister],AuthController.register)
router.get('/',HomeController.index)
module.exports = router