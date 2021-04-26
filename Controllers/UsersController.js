module.exports = new class UsersController{
    index = (req,res)=>{

        return res.json({"page":"users page"})
    }
}()