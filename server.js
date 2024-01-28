const express=require('express')
const mongoose=require('mongoose')
const authRoutes=require('./route/auth')
const dotenv=require('dotenv').config()
const app=express()


mongoose.connect("mongodb://localhost:27017/otp",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
console.log("DB connected")
}).catch((error)=>{
console.log(error)
})


app.use(express.json())
app.use('/auth',authRoutes)

app.listen(3000,(req,res)=>{
    console.log("Server is Running");
});