// Imports
const express = require ('express')
const router = require('./Router/routes')
const cors = require('cors')
const dbConnection = require('./config/dbConnection')


// Initialization
require('dotenv').config()
const app = express()
dbConnection()

// Middlewares
app.use(cors())
app.use(express.json({extended:true}))
app.use(express.urlencoded({ extended:true }))

app.use('/',router)
const PORT = process.env.SERVER_PORT || 3001
app.listen(PORT,()=>console.log('server started'))