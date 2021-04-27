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
const ProfilesController = require('../Controllers/ProfilesController')
const UserProfileValidator = require('../Middlewares/UserProfileValidator')


router.get('/api/articles/liste',PostsController.index)

router.get('/api/utilisateurs/liste',UsersController.index)

router.get('/api/profils',ProfilesController.index)
router.get('/api/profils/utilisateur/:user_id',ProfilesController.getSingleProfile)
router.get('/api/profils/mon-profil',[UserAuth.checkIfAuthenticated],ProfilesController.myProfile)
router.put('/api/profils/modifier',[UserAuth.checkIfAuthenticated,UserProfileValidator.validate],ProfilesController.update)
router.put('/api/profils/experience/modifier',[UserAuth.checkIfAuthenticated,UserProfileValidator.validateExperience],ProfilesController.updateExperience)
router.delete('/api/profils/experience/supprimer/:exp_id',[UserAuth.checkIfAuthenticated,UserProfileValidator.validateExperience],ProfilesController.deleteExperience)
router.put('/api/profils/education/modifier',[UserAuth.checkIfAuthenticated,UserProfileValidator.validateEducation],ProfilesController.updateEducation)
router.delete('/api/profils/education/supprimer/:edu_id',[UserAuth.checkIfAuthenticated,UserProfileValidator.validateEducation],ProfilesController.deleteEducation)
router.post('/api/profils/creer',[UserAuth.checkIfAuthenticated,UserProfileValidator.validate],ProfilesController.create)
router.delete('/api/profils/supprimer',[UserAuth.checkIfAuthenticated],ProfilesController.deleteProfilePostsAndUser)

router.get('/api/profile/github/:username',ProfilesController.getGithubRepos)

router.post('/api/connexion',UserValidator.validateLogin ,AuthController.login)
router.post('/api/inscription',[UserValidator.validateRegister],AuthController.register)

router.get('/',UserAuth.checkIfAuthenticated,HomeController.index)
module.exports = router