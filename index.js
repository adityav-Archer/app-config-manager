const { readFile, readdir } = require('fs');
const util = require('util');
const readFileAsync = util.promisify(readFile);
const process = require('process');
const main = async (env) => {
    let shellFile = await readFileAsync(`dev/config.json`, "utf8");
    console.log("the contents are:" , shellFile);
    shellFile = JSON.parse(shellFile);
    console.log(shellFile);
}

let environment = process.env.environment ? process.env.environment : "dev"
main(environment);