module.exports = new class PostsController{
    index = (req,res)=>{
        
        return res.json({"page":"posts page"})
    }
}()