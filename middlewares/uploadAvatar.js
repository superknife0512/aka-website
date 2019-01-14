const multer = require('multer');

const teacherStorage = multer.diskStorage({
    destination: function(req,file,cb){
        //we still in root folder
        cb(null, './public/teacherData')
    },

    filename: function(req,file,cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

//create multer filter 
const teacherFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'  ){
        cb(null, true)
    } else {
        cb(null,false)
        const err = new Error('Not right file type')
        throw err
    }
}

exports.uploadImg = multer({storage: teacherStorage, fileFilter: teacherFilter}).single('avatar');