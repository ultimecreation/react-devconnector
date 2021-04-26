const express = require ('express')
require('dotenv').config()
const app = express()
const dbConnection = require('./config/dbConnection')
dbConnection()
const router = require('./Router/routes')

app.use('/',router)


const PORT = process.env.Port || 3001
app.listen(PORT,()=>console.log('server started'))