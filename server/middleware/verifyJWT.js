const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT= (req,res,next)=>{
    const authHeaders = req.header['authorization']
    if(!authHeaders) res.status(401)
    console.log(authHeaders) //Bearer Token

    const token = authHeaders.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded) =>{
            if(err) res.sendStatus(403)
            else{
                req.user = decoded.username;
                next();
            }
        }
    )

}

module.exports = verifyJWT;