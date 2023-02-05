const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const User = require('./models/User.js') 
const bcrypt = require('bcryptjs')


const app = express()
mongoose.set('strictQuery',false)

mongoose.connect('mongodb://127.0.0.1:27017/Login-DB',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
})



app.use('/',express.static(path.join('../','frontend')))
app.use(bodyParser.json())

app.post('/register',async(req , res)=>{
    const {username , password:unencrypted} = req.body

    if(!username || typeof username != 'string'){
        return res.json({status:'error',error:'Invalid Username'})
    }
    if(!unencrypted || typeof unencrypted != 'string'){
        return res.json({status:'error',error:'Invalid Password'})
    }
    if(unencrypted.length <6){
        return res.json({status:'error',error:'Password length must be greater than 6'})
    }

    const password = await bcrypt.hash(unencrypted,10)

    try{
        const response = await User.create({
            username,
            password
        })
        console.log(response);
    }
    catch(error){
        if(error.code === 11000){
            return res.json({status:"error",error:"UserName already exists"})
        }
        throw error
    }
    res.json({status:"ok"});
})

app.post('/login',async (req,res)=>{
    const {username,password} = req.body

    const user = await User.findOne({username})
    if(user){
        if(bcrypt.compare(password,user.password)){
            return res.json({status:'ok',message:'Login Successful'})
        }
    }
    res.json({status:'error',error:'Invalid UserName/Password'})
})

app.listen(9000,()=>{
    console.log("Server running at 9000")
})