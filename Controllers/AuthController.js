module.exports = new class AuthController{
    login = (re,res)=>{

        return res.json({"page":"login"})
    }

    register = (req,res)=>{

        return res.json({"page":"register"})
    }
}()