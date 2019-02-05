const multer = require('multer');
const MulterAzureStorage = require('multer-azure-storage');

const teacherStorage = new MulterAzureStorage({
      azureStorageConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
      containerName: 'teacher-photo',
      containerSecurity: 'blob'
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