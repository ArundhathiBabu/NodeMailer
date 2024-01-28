const mongoose=require('mongoose')
const userSchema=mongoose.Schema(
    {username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    mail:{type:String,required:true},
    otp:{type:Number} })

    module.exports= mongoose.model('User',userSchema)