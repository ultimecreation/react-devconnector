module.exports = new class HomeController{
    index = (req,res)=>{

        return res.send('home route')
    }
    
}()