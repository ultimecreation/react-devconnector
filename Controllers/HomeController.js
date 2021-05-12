const path = require('path')
module.exports = new class HomeController{
    
    index = (req,res)=>{
        const appDir = path.dirname(require.main.filename);
        return res.sendFile(path.resolve(appDir, 'public/', 'api.html'));
    }
    
}()