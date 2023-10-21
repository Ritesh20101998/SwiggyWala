const express = require('express')
const cors = require('cors');
require('dotenv').config()

const app = express()

const connection = require('./config/config')
const userRouter = require("./routes/user.route")
const menuRouter = require("./routes/menu.route")

app.use(express.json())
app.use(cors())
app.use("/api", userRouter)
app.use("/api/menu",menuRouter)

app.get('/',(req,res)=>{
    res.send("Welcome to Swiggywalah")
})

app.listen(process.env.port,async(req,res)=>{
    try{
        await connection
        console.log(`DB connected successfully..`)
    }catch(err){
        console.log(err.message)
        console.log(`DB not connected..`)
    }
    console.log(`Server running on port ${process.env.port}`)
})