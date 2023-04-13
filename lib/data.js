const fs = require('fs');
const path = require('path');

const lib = {};

lib.basedir = path.join(__dirname,'/../.data/');

lib.create = (dir, file, data, callback) => {
    fs.open(lib.basedir+dir+'/'+file+'.json','wx',(createError, fileDescriptor) => {
        if (!createError && fileDescriptor){
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData,(writingError) => {
                if (!writingError){
                    fs.close(fileDescriptor,(closingError) => {
                        if (!closingError){
                            callback(false)
                        } else {
                            callback('File closing failed!');
                        }
                    })
                } else {
                    callback('File writing failed!');
                }
            });
        } else {
            //callback(createError);
            callback('File creating failed!');
        }
    });
};

lib.read = (dir, file, callback) => {
    fs.readFile(lib.basedir + dir + '/' + file + '.json','utf8', (err,data) => {
        callback(err, data);
    });
};

lib.update = (dir, file, data, callback) => {
    fs.open(lib.basedir+dir+'/'+file+'.json','r+', (openError, fileDescriptor) => {
        if (!openError && fileDescriptor){
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor,(truncateError) => {
                if (!truncateError){
                    fs.writeFile(fileDescriptor, stringData, (writeError) => {
                       if (!writeError){
                           fs.close(fileDescriptor, (closeError) => {
                               if (!closeError){
                                   callback(false);
                               } else {
                                   callback('Error closing file!');
                               }
                           })
                       } else {
                           callback('Error in file writing');
                       }
                    });
                } else {
                    console.log('Error in truncating');
                }
            });
        } else {
            console.log('Updating failed due to file opening error!');
        }
    });
    fs.writeFile(lib.basedir + dir + '/' + file + '.json', 'utf8', () => {

    });
};

lib.delete = (dir, file, callback) => {
    fs.unlink(lib.basedir+dir+'/'+file+'.json', (unlinkError) => {
        if (!unlinkError){
            callback(false);
        } else {
            callback('Error in deleting!');
        }
    });
};

module.exports = lib;