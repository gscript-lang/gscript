import * as fs from "fs";
const keywordFiles = fs.readdirSync("./keywords");

export function run(line: string, output: any[], warn: any, variables: any) {
    keywordFiles.forEach(keywordFile => {
        if(!keywordFile.endsWith('.js')) return;
        const keyword = require(`../keywords/${keywordFile}`)

        if(!line.startsWith("//")) {
            if(line.startsWith(keyword.name)) {
                keyword.run(line, output, warn, variables);
            }
        } else return;
    });
}