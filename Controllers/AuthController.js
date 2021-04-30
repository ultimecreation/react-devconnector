const { validationResult } = require("express-validator");
const AuthModel = require("../Models/AuthModel");
const argon2 = require("argon2");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

module.exports = new (class AuthController {
    login = async (req, res) => {
        // check for errors and return theme if any
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        // get the user or return unknown user message if not found
        const user = await AuthModel.checkEmailExists(req.body.email);
        if (!user) {
            console.log(user);
            return res.status(400).json({
                success: false,
                message: "Utilisateur inconnu",
            });
        }

        // user found and return error if password is not verified
        const passwordVerified = await argon2.verify(
            user.password,
            req.body.password
        );
        if (passwordVerified === false) {
            return res.status(400).json({
                success: false,
                message: "Indentifiants non valides",
            });
        }

        // remove sensitive data and set the payload
        user.password, user.__v = undefined
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: 3600 * 24 * 7,
        });
        return res.status(200).json({
            success: true,
            token: token,
        });
    };

    register = async (req, res, next) => {
        // get errors from validation if any
        const errors = validationResult(req);

        // some errors found, return them to the user
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        // no errors found, hash the password,get retrieve gravatar url
        const hashedPassword = await argon2.hash(req.body.password_confirm);
        const avatar = await gravatar.url(req.body.email, {
            protocol: "https",
            s: "200",
            r: "pg",
            d: "mm",
        });

        // bind  and save the new user
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            avatar: avatar,
        };
        const registeredUser = await AuthModel.save(user);

        if (registeredUser) {
            registeredUser.password = undefined
            const token = jwt.sign(
                { user:registeredUser},
                process.env.JWT_SECRET,
                { expiresIn: 3600 * 24 * 7}
            );

            res.status(201).json({
                success: true,
                token: token,
            });
        } else {
            res.status(201).json({
                success: false,
                message: "Something went wrong",
            });
        }
    };

    validateToken = async (req, res) => {
        try {
            
            const user = await UserModel.getUserById(req.user._id)
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    };
})();
