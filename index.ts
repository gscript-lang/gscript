/**
 * Syntax: No Tabs Or Spaces Other Than Between Keywords.
**/
import * as fs from "fs";
const chalk = require('chalk');

class Compiler {
  code: any;
  constructor(file: string) {
    this.code = fs.readFileSync(file, "utf-8").split("\n");
  }

  warn(text: string) {
    return console.log(chalk.red(`${text}\n`));
  }

  compile() {
    const output: any[] = [];
    const variables: any = {};

    for (const line of this.code) {
      switch (true) {
        case line.startsWith("//"):
          break;
        case line.startsWith("print"):
          if (line.startsWith('print: "')) {
            const printLine: any = line.trim().slice(8, -1);
            const res: any = [];
            if(line.endsWith(".split()")) {
              line.slice(8, -9).split(" ").forEach((partOfString: any) => {
                res.push(`${partOfString}`)
              });

              output.push(res);
              console.log(output);
            } else output.push(printLine);
          } else if (line.includes("operation")) {
            const printLine: any = line.trim().slice(7).split(" ");
            const operationData: any = printLine.slice(1);
            if (
              !operationData.includes("+") &&
              !operationData.includes("-") &&
              !operationData.includes("*") &&
              !operationData.includes("/")
            ) {
              this.warn("Error: Invalid Syntax")
            } else if (operationData[1] === "+") {
              output.push(Number(operationData[0]) + Number(operationData[2]));
            } else if (operationData[1] === "-") {
              output.push(Number(operationData[0]) - Number(operationData[2]));
            } else if (operationData[1] === "*") {
              output.push(Number(operationData[0]) * Number(operationData[2]));
            } else if (operationData[1] === "/") {
              output.push(Number(operationData[0]) / Number(operationData[2]));
            }
          } else {
            const printLine = line.trim().slice(7);
            const variableValue: string = variables[printLine as keyof object];
            if (!variableValue.includes("operation")) {
              output.push(variableValue.slice(1, -2));
            } else if (variableValue.includes("operation")) {
              const operationData = variableValue.split(" ").slice(1);
              if (
                !operationData.includes("+") &&
                !operationData.includes("-") &&
                !operationData.includes("*") &&
                !operationData.includes("/")
              ) {
                this.warn("Error: Invalid Syntax")
              } else if (operationData[1] === "+") {
                output.push(
                  Number(operationData[0]) + Number(operationData[2])
                );
              } else if (operationData[1] === "-") {
                output.push(
                  Number(operationData[0]) - Number(operationData[2])
                );
              } else if (operationData[1] === "*") {
                output.push(
                  Number(operationData[0]) * Number(operationData[2])
                );
              } else if (operationData[1] === "/") {
                output.push(
                  Number(operationData[0]) / Number(operationData[2])
                );
              }
            }
          }

          break;
        case line.startsWith("operation"):
          this.warn("Error: Invalid Syntax")
          break;
        case line.startsWith("def"):
          const defArray = line.slice(5).split(" = ");
          const variableName: string = defArray[0];
          variables[variableName as keyof typeof variables] = defArray[1];
        case !line.startsWith("print") && !line.startsWith("def") && !line.startsWith("//"):
          this.warn("Error: Invalid Syntax")
          break;
      }
    }

    return output;
  }

  run() {
    this.warn("GScript is currently in beta! Not suitable for production. Use at your own risk!")
    const output = this.compile();
    for(const line of output) {
      console.log(line)
    }
  }
}

export { Compiler };
