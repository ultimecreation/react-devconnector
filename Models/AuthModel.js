const UserEntity = require("../Entity/UserEntity")

module.exports = new class AuthModel{
    save = data =>{
        try {
            return UserEntity({...data}).save()
        } catch (error) {
            console.log(error)
        }
    }
    checkEmailExists = email =>{
        try {
            return UserEntity.findOne({email:email})
        } catch (error) {
            console.log(error)
        }
    }

    
}()