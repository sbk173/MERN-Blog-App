const path  = require('path');

const saveUpload = (req,res,next)=>{
    const files = req.files;
    var filepath
    Object.keys(files).forEach((key)=>{
        const obj = files[key]
        if(obj.mimetype === 'application/pdf'){
            filepath = path.join('../','Files','articles',obj.name.replaceAll(' ','_'))
        }
        else{
            filepath = path.join('../','Files','thumbnails',obj.name.replaceAll(' ','_'))
        }
        obj.mv(filepath)
    })
    next();
    
}

module.exports =  saveUpload; 