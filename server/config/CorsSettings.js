const whitelist = ['https://www.google.com','http://localhost:9000']

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
    optionsSuccessStatus: 200
}

module.exports = corsOptions;
