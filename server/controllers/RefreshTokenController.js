const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const mongoConfig = require('../config/MongoSettings')
const Users = require('../models/User')

mongoConfig.initialize();

require('dotenv').config()

async function handleRefresh(req,res,next){
    const cookies = req.cookies
    console.log(cookies)
    if(!cookies || !cookies.jwt) {
        res.json({message:"No cookie"})
    }
    else{
        refreshToken = cookies.jwt

        foundUser = await Users.findOne({refreshToken})
        if(!foundUser){
            res.sendStatus(403)
        }
        else{
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (error,decoded)=>{
                    if(error){
                        //res.clearCookie('jwt',{httpOnly:true, maxAge:2*60*60*1000, sameSite:'None' , secure:true})
                        res.sendStatus(403)
                    }
                    else{
                        if(decoded.username === foundUser.username){
                            const accessToken = jwt.sign(
                                {username:foundUser.username},
                                process.env.ACCESS_TOKEN_SECRET,
                                {expiresIn:'5m'}
                            )

                            res.json({accessToken})
                            next()
                        }
                    }
                }
            )
        }
    }
}

module.exports = handleRefresh