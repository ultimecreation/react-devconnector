const UserEntity = require("../Entity/UserEntity")

module.exports = new class UserModel{
    getUserById = id =>{
        try {
            return UserEntity.findById(id).select("-password")
        } catch (error) {
            
            return false
        }
    }
}()