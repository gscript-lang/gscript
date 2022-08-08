/**
 * Syntax: No Tabs Or Spaces Other Than Between Keywords.
 */
import * as fs from "fs";

class Compiler {
  code: any;
  constructor(file: string) {
    this.code = fs.readFileSync(file, "utf-8").split("\n");
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
            if(line.endsWith(".split()")) {
              output.push(line.trim().slice(8, -9).split(" "));
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
              output.push("Incorrect Syntax");
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
                output.push("Incorrect Syntax");
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
          output.push("Invalid Syntax");
          break;
        case line.startsWith("def"):
          const defArray = line.slice(5).split(" = ");
          const variableName: string = defArray[0];
          variables[variableName as keyof typeof variables] = defArray[1];
        case !line.startsWith("print"):
          output.push("Error: Invalid syntax.");
          break;
      }
    }

    return output;
  }

  run() {
    const output = this.compile();
    console.log(output.join("\n"));
  }
}

export { Compiler };