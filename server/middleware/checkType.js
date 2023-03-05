const checkType = (req,res,next) =>{
    const files = req.files
    const r1 = new RegExp('image/*')
    const r2 = new RegExp('application.pdf')
    const c2 = files.pdf.mimetype
    const c1 = files.image.mimetype
    if(c1 && c2){
        next();
    }
    else{
        console.log('Here')
        res.json({status:'error',message:'Invalid File Type'})
    }
}

module.exports = checkType;