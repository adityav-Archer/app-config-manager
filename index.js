const { readFile, readdir, writeFile,appendFile, writeFileSync } = require('fs');
const util = require('util');
const readFileAsync = util.promisify(readFile);
const writeFileAsync = util.promisify(writeFile)
const process = require('process');
const { BlobServiceClient } = require("@azure/storage-blob");
const mime = require('mime-types');

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
            blobContentType: guessMimeType("config_test_file2.js"),
            blobCacheControl: 'no-cache', // Disable caching since we want changes to be immediately visible in WebXR.
        }
    });
}

function guessMimeType(filename) {
    return mime.lookup(filename) || 'application/octet-stream';
}

const main = async (env) => {
    let shellFile = await readFileAsync(`dev/config.json`, "utf8");
    console.log("the contents are:" , shellFile);
    shellFile = JSON.parse(shellFile);
    let fileContents = `export let config = ${JSON.stringify(shellFile)}`;
    console.log(shellFile);
    writeFileSync("./config_dev/config_test_file.js", fileContents);
    let status = await upload(`${process.cwd()}/config_dev/config_test_file.js`, `config_test_file2.js`)
        
    console.log(typeof status);
}

let environment = process.env.environment ? process.env.environment : "dev";
console.log(environment);
main(environment);