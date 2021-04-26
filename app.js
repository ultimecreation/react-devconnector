// Imports
const express = require ('express')
const router = require('./Router/routes')
const dbConnection = require('./config/dbConnection')


// Initialization
require('dotenv').config()
const app = express()
dbConnection()

// Middlewares
app.use(express.json({extended:false}))
app.use(express.urlencoded({ extended:true }))

app.use('/',router)
const PORT = process.env.Port || 3001
app.listen(PORT,()=>console.log('server started'))