import split from "@methods/split";

module.exports = {
  name: "log",
  syntax: "log value",
  run: function (line: any, output: any[], warn: any, variables: any) {
    if (line.startsWith('log "')) {
      const logLine: any = line.trim().slice(this.name.length + 2, -1);
      const res: any = [];
      if (line.endsWith('".split(" ")')) {
        split.run(
          line,
          warn,
          variables,
          this.name.length + 2,
          -12,
          (response: any) => {
            response.forEach((partOfString: string) => {
              res.push(partOfString);
            });
          }
        );

        output.push(res);
      } else if (
        !line.endsWith('".split(" ")') &&
        line.includes('.split(" ")')
      ) {
        split.run(
          line,
          warn,
          variables,
          this.name.length + 2,
          -14,
          (response: any) => {
            response.forEach((partOfString: string) => {
              res.push(partOfString);
            });
          }
        );

        output.push(res);
      } else output.push(logLine);
    } else if (line.includes("operation")) {
      const logLine: any = line
        .trim()
        .slice(this.name.length + 1)
        .split(" ");
      const operationData: any = logLine.slice(1);
      if (
        !operationData.includes("+") &&
        !operationData.includes("-") &&
        !operationData.includes("*") &&
        !operationData.includes("/")
      ) {
        warn("Error: Invalid Syntax");
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
      const res: any[] = [];
      const logLine = line.trim().slice(this.name.length + 1);
      const variableValue: string = variables[logLine as keyof object];
      if (!variableValue.includes("operation")) {
        if (variableValue.endsWith('".split(" ")')) {
          split.run(variableValue, warn, variables, 1, -12, (response: any) => {
            response.forEach((partOfString: string) => {
              res.push(partOfString);
            });
          });

          output.push(res);
        } else if (
          !variableValue.endsWith('".split(" ")') &&
          variableValue.includes('.split(" ")')
        ) {
          split.run(variableValue, warn, variables, 1, -14, (response: any) => {
            response.forEach((partOfString: string) => {
              res.push(partOfString);
            });
          });

          output.push(res);
        } else output.push(variableValue.slice(1, -2));
        // Operations
      } else if (variableValue.includes("operation")) {
        const operationData = variableValue.split(" ").slice(1);
        if (
          !operationData.includes("+") &&
          !operationData.includes("-") &&
          !operationData.includes("*") &&
          !operationData.includes("/")
        ) {
          warn("Error: Invalid Syntax");
        } else if (operationData[1] === "+") {
          output.push(Number(operationData[0]) + Number(operationData[2]));
        } else if (operationData[1] === "-") {
          output.push(Number(operationData[0]) - Number(operationData[2]));
        } else if (operationData[1] === "*") {
          output.push(Number(operationData[0]) * Number(operationData[2]));
        } else if (operationData[1] === "/") {
          output.push(Number(operationData[0]) / Number(operationData[2]));
        }
      }
    }
  },
};
