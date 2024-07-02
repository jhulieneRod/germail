const path = require('path');
const fs = require('fs');
// const config = require('./config');
const PATH_SSL = '/src/ssl/';

const getSSLFileData = (dirname,extension,filtroName) => {
    const directoryPath = path.join(PATH_SSL, dirname);
    let fileData = {
        name: '',
        stats: {}
    }
    let listFile = fs.readdirSync(directoryPath).filter(file => (file.slice(-4) === extension));
    for (const idx in listFile) {
        const file = listFile[idx];
        let stats = fs.statSync(directoryPath + `/${file}`);
        
        // console.log('file',file);
        
        if (file.indexOf(filtroName) === 0){
            if (!fileData.stats.ctimeMs){
                fileData.stats = stats;
                fileData.name = file;
            } else {
                if (stats.mtimeMs > fileData.stats.ctimeMs) {
                    fileData.stats = stats;
                    fileData.name = file;
                }
            }
        }
    }
    return fileData;
}

module.exports = function getSSLFile(filtroName = ''){
// const getSSLFile = (filtroName = '') => {
    let SSLFile = {
        certFile : {},
        keyFile : {},
        certPathName : '',
        keyPathName : '',
        success : false
    }
    SSLFile.certFile =  getSSLFileData('certs','.cert',filtroName);
    
    filtroName = SSLFile.certFile.name.replace(filtroName+'_','');
    filtroName = filtroName.split('_');
    
    SSLFile.keyFile =  getSSLFileData('keys','.key',filtroName[0]);
    
    SSLFile.certPathName = PATH_SSL+'certs'+'/'+SSLFile.certFile['name'];
    SSLFile.keyPathName = PATH_SSL+'keys'+'/'+SSLFile.keyFile['name'];
    if (SSLFile.certFile['ctimeMs'] === SSLFile.keyFile['ctimeMs']){
        SSLFile.success = true;
    }
    
    return SSLFile;
}

// module.exports = getSSLFile();