const mongoose = require('mongoose')

const dbConnection = async ()=>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        })
       
        return db
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = dbConnection