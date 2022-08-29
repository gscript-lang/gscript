"use strict";
module.exports = {
    name: "print",
    syntax: "print: value",
    run: (line, output, warn, variables) => {
        if (line.startsWith('print: "')) {
            const printLine = line.trim().slice(8, -1);
            const res = [];
            if (line.endsWith('.split(" ")')) {
                line.slice(8, -12).split(" ").forEach((partOfString) => {
                    res.push(`${partOfString}`);
                });
                output.push(res);
            }
            else if (!line.endsWith('.split(" ")') && line.includes('.split(" ")')) {
                line.slice(8, -14).split(" ").forEach((partOfString) => {
                    res.push(`${partOfString}`);
                });
                output.push(res);
            }
            else
                output.push(printLine);
        }
        else if (line.includes("operation")) {
            const printLine = line.trim().slice(7).split(" ");
            const operationData = printLine.slice(1);
            if (!operationData.includes("+") &&
                !operationData.includes("-") &&
                !operationData.includes("*") &&
                !operationData.includes("/")) {
                warn("Error: Invalid Syntax");
            }
            else if (operationData[1] === "+") {
                output.push(Number(operationData[0]) + Number(operationData[2]));
            }
            else if (operationData[1] === "-") {
                output.push(Number(operationData[0]) - Number(operationData[2]));
            }
            else if (operationData[1] === "*") {
                output.push(Number(operationData[0]) * Number(operationData[2]));
            }
            else if (operationData[1] === "/") {
                output.push(Number(operationData[0]) / Number(operationData[2]));
            }
        }
        else {
            const printLine = line.trim().slice(7);
            const variableValue = variables[printLine];
            if (!variableValue.includes("operation")) {
                output.push(variableValue.slice(1, -2));
            }
            else if (variableValue.includes("operation")) {
                const operationData = variableValue.split(" ").slice(1);
                if (!operationData.includes("+") &&
                    !operationData.includes("-") &&
                    !operationData.includes("*") &&
                    !operationData.includes("/")) {
                    warn("Error: Invalid Syntax");
                }
                else if (operationData[1] === "+") {
                    output.push(Number(operationData[0]) + Number(operationData[2]));
                }
                else if (operationData[1] === "-") {
                    output.push(Number(operationData[0]) - Number(operationData[2]));
                }
                else if (operationData[1] === "*") {
                    output.push(Number(operationData[0]) * Number(operationData[2]));
                }
                else if (operationData[1] === "/") {
                    output.push(Number(operationData[0]) / Number(operationData[2]));
                }
            }
        }
    }
};
