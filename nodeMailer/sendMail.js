const nodeMailer =require('nodemailer');
const email=['arundhathibabu28@gmail.com'];
const sendMail=async(email,otp)=>{
    const transporter=nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user:"arundhathibabu28@gmail.com",
            pass:"axks sqmh ouvb qlkq",
        },
    });
    const info = await transporter.sendMail({
        from:'"NodeMail"<arundhathibabu28@gmail.com>',
        to: email,
        subject:"Reset  Password",
        html:`<h2>${otp}</h2>`,
    })
}
module.exports=sendMail