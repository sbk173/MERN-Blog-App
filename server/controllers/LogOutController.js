const mongoConfig = require('../config/MongoSettings')

const User = require('../models/User')
const handleLogOut = async (req,res)=>{
    const cookie = req.cookies
    if(!cookie?.jwt){
        res.sendStatus(204)
    }
    else{
        const refreshToken = cookie.jwt
        mongoConfig.initialize();
        foundUser = await User.findOne({refreshToken})
        if(foundUser){
            await User.updateOne({foundUser},{refreshToken:''})
            res.clearCookie('jwt',{httpOnly:true , maxAge: 2*60*60*1000 , sameSite: 'None', secure:true})
            res.clearCookie('atk',{httpOnly:true , maxAge: 2*60*60*1000 , sameSite: 'None', secure:true})
            res.sendStatus(200)
        }
        else{
            res.clearCookie('atk',{httpOnly:true , maxAge: 2*60*60*1000 , sameSite: 'None', secure:true})
            res.clearCookie('jwt',{httpOnly:true , maxAge: 2*60*60*1000 , sameSite: 'None', secure:true})
            res.sendStatus(403)
        }
        
    }
}

module.exports = handleLogOut