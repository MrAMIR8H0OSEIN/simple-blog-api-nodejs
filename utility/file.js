const fs = require('fs');
const path = require('path');

exports.deleteFile = (filePath)=>{
    const pathFile = path.join(__dirname,'..',filePath);
    if(fs.existsSync(pathFile)){
        fs.unlink(pathFile,(err)=>{return err});
    }
}