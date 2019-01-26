const storage = require('azure-storage');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const blogService = storage.createBlobService();

exports.deleteBlob = async (containerName, blobName)=>{
    try{
        await blogService.deleteBlobIfExists(containerName, blobName, err=>{
            if(err) {
                throw err;
            } else {
                console.log('Has deleted a blob');
            }
        })

    } catch (err) {
        throw err
    }
}