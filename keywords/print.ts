module.exports = {
    name: "print",
    syntax: "print: value",
    run: (line: any, output: any[], warn: any, variables: any) => {
        if (line.startsWith('print: "')) {
            const printLine: any = line.trim().slice(8, -1);
            const res: any = [];
            if(line.endsWith('.split(" ")')) {
              line.slice(8, -12).split(" ").forEach((partOfString: string) => {
                res.push(`${partOfString}`)
              });

              output.push(res);
            } else if(!line.endsWith('.split(" ")') && line.includes('.split(" ")')) {
              line.slice(8, -14).split(" ").forEach((partOfString: string) => {
                res.push(`${partOfString}`)
              });

              output.push(res);
            }  else output.push(printLine);
          } else if (line.includes("operation")) {
            const printLine: any = line.trim().slice(7).split(" ");
            const operationData: any = printLine.slice(1);
            if (
              !operationData.includes("+") &&
              !operationData.includes("-") &&
              !operationData.includes("*") &&
              !operationData.includes("/")
            ) {
              warn("Error: Invalid Syntax")
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
                warn("Error: Invalid Syntax")
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
    }
}