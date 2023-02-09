const whitelist = require('./AllowedOrigins.js')
const corsOptions = {
    origin: (origin,callback)=>{
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }
        else{
            console.log(origin)
            callback(new Error("Access Denied"))
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}

module.exports = corsOptions;
