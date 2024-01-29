const express=require('express')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User =require('../model/user')
const mailSender=require('../nodeMailer/sendMail')
const sendMail = require('../nodeMailer/sendMail')
const router=express.Router()


//user registration
router.post('/register',async(req,res)=>{
    try {
        console.log(req.body);
        const{username,password,mail}=req.body
        const hashedPassword=await bcrypt.hash(password,10)
        const user=new User({username:username,password:hashedPassword,mail:mail})
        await user.save()
        res.status(200).json({message:"User Registered"})
        
        
    } catch (error) {
        console.log(error)
       //res.status(400).json({error:"registration failed"})
        
    }
})


//user login
router.post('/login',async(req,res)=>{
    try {
        const{username,password}=req.body
        const user=await User.findOne({username})
        if(!user)
        {
            return res.status(401).json({error:"Authentication failed"})}
        
        const passwordMatch=await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return res.status(401).json({error:"Authentication failed"})}

        const token=jwt.sign({userId:user._id},"secret key",{expiresIn:"1h"})

        res.status(200).json({token})
    } 
    catch (error) {
       // console.log(error)
        res.status(500).json({error:"Login failed"})
        
    }
})

//forgotpassword

router.post('/forgotpswd',async(req,res)=>{
    try {
        const{mail}=req.body
    const user = await User.findOne({ mail:mail });
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
        const otp = Math.floor(Math.random()*100000);
        const updateOtp=await User.findByIdAndUpdate(user._id,{otp:otp},{new:true})
        if(updateOtp){
            sendMail(user.mail,otp);
            console.log(user.mail);
            return res.status(200).json({message:"OTP send to mailid"});
        }
    
     res.status(400).json({ message: 'OTP sent Failed' });
    }catch (error) {
        console.log(error)
    }


})
module.exports=router