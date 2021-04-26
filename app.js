const express = require ('express')

const app = express()


app.get('/',(req,res)=> res.send('ok'))


const PORT = process.env.Port || 3001
app.listen(PORT,()=>'server started')