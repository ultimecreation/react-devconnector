const { check } = require("express-validator");
const AuthModel = require("../Models/AuthModel");

module.exports = new class Uservalidator{
    validateRegister = [
        check("name").not().isEmpty().withMessage("Le nom est requis"),
        check("email")
            .not()
            .isEmpty()
            .withMessage("L'email est requis")
            .bail()
            .isEmail()
            .withMessage("L'email n'est pas valide")
            .bail()
            .custom(async  email=>{
                const userExists = await AuthModel.checkEmailExists(email)
                if(userExists){
                    throw new Error("L'email est déjà pris")
                }
                return true
            }),
        check("password")
            .not()
            .isEmpty()
            .withMessage("Le mot de passe est requis")
            .bail()
            .custom( (password,{req})=>{
                if(password != req.body.password_confirm){
                    throw new Error("Les mots de passe ne correspondent pas")
                }
                return true
            })
            .bail(),
        check("password_confirm")
            .not()
            .isEmpty()
            .withMessage("La confirmation du mot de passe est requise"),
    ];
    
    validateLogin = [
        check("email")
            .not()
            .isEmpty()
            .withMessage("L'email est requis")
            .bail()
            .isEmail()
            .withMessage("L'email n'est pas valide"),
        check("password")
            .not()
            .isEmpty()
            .withMessage("Le mot de passe est requis")
            
        
    ];
}() 