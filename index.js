const { readFile, readdir, writeFile, writeFileSync, mkdirSync, existsSync, readFileSync } = require('fs');
const util = require('util');
const readFileAsync = util.promisify(readFile);
const writeFileAsync = util.promisify(writeFile)
const readDirAsync = util.promisify(readdir);
const process = require('process');
const { BlobServiceClient } = require("@azure/storage-blob");

const webContainerClient = (
    BlobServiceClient
    .fromConnectionString(process.env.CONNECTION_STRING)
    .getContainerClient('aditya-test')
);
const url = webContainerClient.url;


webContainerClient.createIfNotExists()
    .catch(err => console.error(err));

function upload(localPath, blobPath) {
    const blobClient = webContainerClient.getBlockBlobClient(blobPath);
    return blobClient.uploadFile(localPath, {
        blobHTTPHeaders: {
            blobContentType: 'application/octet-stream',
            blobCacheControl: 'no-cache', // Disable caching since we want changes to be immediately visible in WebXR.
        }
    });
}



async function getApplicationsList(env){
    let dirPath = `${env}/apps`;
    let filesList = await readDirAsync(dirPath);
    let appsList = [];
    if(filesList.length === 0) return [];
    filesList.forEach(async item => {
        let app =  readFileSync(`${dirPath}/${item}`, "utf8");
    
        app = JSON.parse(app);
        appsList.push(app);
    })
    return appsList;
}

const main = async (env) => {
    let shellFile = await readFileAsync(`dev/config.json`, "utf8");
    
    shellFile = JSON.parse(shellFile);
    if(!existsSync("./config"))
    mkdirSync(`${process.cwd()}/config`)
    let applications = await getApplicationsList(env);
    shellFile.applications = applications;
    let fileContents = `export let config = ${JSON.stringify(shellFile, null , 2)}`;
    writeFileSync("./config/config.js", fileContents);

    let status = await upload(`${process.cwd()}/config/config.js`, `config.js`)
        
    
}

let environment = process.env.environment ? process.env.environment : "dev";
console.log(environment);
main(environment);