const jwt = require('jsonwebtoken')
const UserModel = require('../Models/UserModel')

module.exports = new class UserAuth{
    checkIfAuthenticated = async (req,res,next) =>{

        // get token from headers
        const token = req.header('x-auth-token')

        // missing token in headers
        if(!token){
            return res.status(401).json({message:"Not Authorized"})
        }
        
        // token is present
        try {
            // decode the token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user
            
            const userExists = await UserModel.getUserById(req.user.id)
            if(userExists){
                next()
            }
        } catch (error) {
            // token is not verified, return invalid token message
            return res.status(401).json({message:"Invalid token"})
        }

       
    }
}()