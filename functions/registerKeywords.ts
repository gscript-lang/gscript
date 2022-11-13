import * as fs from "fs";
const keywordFiles = fs.readdirSync("../keywords");

export function run(line: string, output: any[], warn: any, message: any, variables: any, codeArray: any, filename: string) {
  keywordFiles.forEach((keywordFile) => {
    if (!keywordFile.endsWith(".js")) return;
    const keyword = require(`../keywords/${keywordFile}`);
    const imports = line.trim().split(" ").slice(1);

    if (!line.startsWith("//")) {
      if (line.startsWith(keyword.name)) {
        keyword.run(line, output, warn, variables, imports, message);
      }
    } else return;
  });
}
