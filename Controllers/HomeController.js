module.exports = new class HomeController{
    index = (req,res)=>{

        return res.json({"message":"hoem page"})
    }
    
}()