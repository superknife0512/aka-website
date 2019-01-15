const fs = require('fs');

exports.clearOldFile = (filePath)=>{
    fs.unlink(filePath, (err)=>{
        if(err){
            throw err
        } else {
            console.log('The file has been deleted');
        }
    })
}