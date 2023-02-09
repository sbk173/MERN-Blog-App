const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT= (req,res,next)=>{
    const cookie = req.cookies;
    if(!cookie?.atk){
        res.sendStatus(40)
    }
    else{
        const token = cookie.atk;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err,decoded) =>{
                if(err) res.sendStatus(403)
                else{
                    req.user = decoded.username;
                    res.sendStatus(200)
                    next();
                }
            }
        )
    }


}

module.exports = verifyJWT;