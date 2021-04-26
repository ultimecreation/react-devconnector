const express = require ('express')
require('dotenv').config()
const dbConnection = require('./backend/config/dbConnection')

const app = express()
dbConnection()
app.get('/',(req,res)=> res.send('ok'))


const PORT = process.env.Port || 3001
app.listen(PORT,()=>console.log('server started'))