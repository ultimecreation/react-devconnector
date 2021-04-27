const { check } = require("express-validator")

module.exports = new class UserProfileValidator{
    validate = [
        check('status').not().isEmpty().withMessage("Le status est requis"),
        check('skills').not().isEmpty().withMessage("Les compétences sont requises")
    ]

    validateExperience = [
        check('title').not().isEmpty().withMessage("Le titre est requis"),
        check('company').not().isEmpty().withMessage("Le nom de l'entreprise est requis"),
        check('from').not().isEmpty().withMessage("La date de début est requise")
    ]

    validateEducation = [
        check('school').not().isEmpty().withMessage("L'école est requise"),
        check('degree').not().isEmpty().withMessage("Le diplome est requis"),
        check('fieldOfStudy').not().isEmpty().withMessage("Le domain est requis"),
        check('from').not().isEmpty().withMessage("La date de début est requise")
    ]
}()