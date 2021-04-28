const { check } = require("express-validator")

module.exports = new class PostsValidator{
    validate = [
        check('text').not().isEmpty().withMessage("Le corps de l'article est requis"),
    ]

    validateComment = [
        check('text').not().isEmpty().withMessage("Le corps du commentaire est requis"),
    ]
}()