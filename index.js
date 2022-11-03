const { readFile, readdir, writeFile,appendFile } = require('fs');
const util = require('util');
const readFileAsync = util.promisify(readFile);
const writeFileAsync = util.promisify(writeFile)
const process = require('process');
const main = async (env) => {
    let shellFile = await readFileAsync(`dev/config.json`, "utf8");
    console.log("the contents are:" , shellFile);
    shellFile = JSON.parse(shellFile);
    let fileContents = `export let config = ${JSON.stringify(shellFile)}`;
    console.log(shellFile);
    writeFileAsync("./config_dev/config_test_file.js", fileContents);

}

let environment = process.env.environment ? process.env.environment : "dev";
console.log(environment);
main(environment);