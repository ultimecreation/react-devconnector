const PostEntity = require("../Entity/PostEntity")

module.exports = new class PostModel{

    getAllPosts = () =>{
        try {
            return PostEntity.find().sort({date: -1})
        } catch (error) {
            console.log(error)
            return false
        }
    }

    getPostById = (id) =>{
        try {
            return PostEntity.findOne({_id:id})
        } catch (error) {
            console.log(error)
            return false
        }
    }
    save = (data) =>{
        try {
            return PostEntity({...data}).save()
        } catch (error) {
            console.log(error)
            return false
        }
    }

    update = (postId,data) =>{
        try {
            return PostEntity.findByIdAndUpdate({_id:postId},{...data})
        } catch (error) {
            console.log(error)
            return false
        }
    }
    delete = (id)=>{
        try {
            return PostEntity.findByIdAndRemove({_id:id})
        } catch (error) {
            console.log(error)
            return false
        }
    }
}()