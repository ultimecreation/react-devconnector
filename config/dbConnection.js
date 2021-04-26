const mongoose = require('mongoose')

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:true
        })
        console.log('mongo db connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = dbConnection