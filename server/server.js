const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const User = require('./models/User.js') 
const bcrypt = require('bcryptjs')
const cors = require('cors')
const corsOptions = require('./config/CorsSettings.js')
const jwt = require('jsonwebtoken')
const mongoConfig = require('./config/MongoSettings.js')
const handleRefresh = require('./controllers/RefreshTokenController.js')
const cookieParser = require('cookie-parser')
const handleLogOut = require('./controllers/LogOutController.js')
const credentials = require('./middleware/controller')


require('dotenv').config()

mongoConfig.initialize();

const app = express()

app.use(cookieParser())

//app.use(credentials);

app.use(cors(corsOptions));

app.use(bodyParser.json());


app.use('/',express.static(path.join('../','frontend')))


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
    const authorization = '10'
    try{
        const response = await User.create({
            username,
            password,
            authorization
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
        const valid = await bcrypt.compare(password,user.password)
        if(valid){
            //console.log("in password")
            const accessToken = jwt.sign(
                {'username':user.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            )
            const refreshToken = jwt.sign(
                {'username':user.username},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '2h'}
            )
            await User.updateOne({username:user.username},{refreshToken})

            res.cookie('jwt',refreshToken,{httpOnly:true, maxAge:2*60*60*1000 ,sameSite:'None', secure: true})
            res.cookie('atk',accessToken,{httpOnly:true , maxAge:2*60*60*1000 , sameSite:'None' , secure: true} )
            res.json({'username':user.username})
        }
        else{
            res.sendStatus(401)
        }
    }
    else{
        res.sendStatus(401)

    }
    
})

app.get('/refresh',handleRefresh)
app.get('/logout',handleLogOut)
app.get('/verifyAccessToken',require('./middleware/verifyJWT'))

app.get('/refreshAccessToken',require('./controllers/RefreshTokenController')) 

app.listen(9000,()=>{
    console.log("Server running at 9000")
})