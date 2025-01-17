const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'files');
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + "-" + file.originalname)
    }
})

exports.imageFileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null,true);
    }else{
        const error = new Error("File Format Not Supported");
        error.statusCode = 422;
        cb(error,false);
    }
}

exports.upload = (filter)=>{
    return multer({
        storage: storage,
        fileFilter: filter
    })
}