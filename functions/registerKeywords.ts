import * as fs from "fs";
const keywordFiles = fs.readdirSync("./keywords");

export function run(line: string, output: any[], warn: any, variables: any, codeArray: any, filename: string) {
  keywordFiles.forEach((keywordFile) => {
    if (!keywordFile.endsWith(".js")) return;
    const keyword = require(`../keywords/${keywordFile}`);

    if (!line.startsWith("//")) {
      if (line.startsWith(keyword.name)) {
        if (keyword.name === "import") {
          const imports = line.trim().split(" ").slice(1);
          keyword.run(line, output, warn, variables, imports);
        } else {
          keyword.run(line, output, warn, variables);
        }
      }
    } else return;
  });
}
