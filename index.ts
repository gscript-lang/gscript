/**
 * Syntax: No Tabs Or Spaces Other Than Between Keywords.
 */
import * as fs from "fs";
import axios from "axios";

class Compiler {
  code: any;
  constructor(file) {
    this.code = fs.readFileSync(file, "utf-8").split("\n");
  }

  compile() {
    const output: any = [];
    const variables = {};

    for (const line of this.code) {
      switch (true) {
        case line.startsWith("//"):
          break;
        case line.startsWith("print"):
          if (line.startsWith('print: "')) {
            const printLine: any = line.trim().slice(8, -1);
            output.push(printLine);
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
            const variableValue = variables[printLine];
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
          const variableName = defArray[0];
          variables[variableName] = defArray[1];
          /**
           * console.log('VARS:');
           * console.log(variables);
           */
          break;
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


if (process.argv[2] == "--version") {
  axios.get("https:\/\/raw.githubusercontent.com/gscript-lang/gscript/v1/package.json").then(
    res => {
      console.log(res.data.version);
    }
  )
}

export { Compiler };