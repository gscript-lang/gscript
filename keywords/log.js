"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const split_1 = __importDefault(require("@methods/split"));
module.exports = {
    name: "log",
    syntax: "log value",
    run: function (line, output, warn, variables) {
        if (line.startsWith('log "')) {
            const logLine = line.trim().slice(this.name.length + 2, -1);
            const res = [];
            if (line.endsWith('".split(" ")')) {
                split_1.default.run(line, warn, variables, this.name.length + 2, -12, (response) => {
                    response.forEach((partOfString) => {
                        res.push(partOfString);
                    });
                });
                output.push(res);
            }
            else if (!line.endsWith('".split(" ")') &&
                line.includes('.split(" ")')) {
                split_1.default.run(line, warn, variables, this.name.length + 2, -14, (response) => {
                    response.forEach((partOfString) => {
                        res.push(partOfString);
                    });
                });
                output.push(res);
            }
            else
                output.push(logLine);
        }
        else if (line.includes("operation")) {
            const logLine = line
                .trim()
                .slice(this.name.length + 1)
                .split(" ");
            const operationData = logLine.slice(1);
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
            const res = [];
            const logLine = line.trim().slice(this.name.length + 1);
            const variableValue = variables[logLine];
            if (!variableValue.includes("operation")) {
                if (variableValue.endsWith('".split(" ")')) {
                    split_1.default.run(variableValue, warn, variables, 1, -12, (response) => {
                        response.forEach((partOfString) => {
                            res.push(partOfString);
                        });
                    });
                    output.push(res);
                }
                else if (!variableValue.endsWith('".split(" ")') &&
                    variableValue.includes('.split(" ")')) {
                    split_1.default.run(variableValue, warn, variables, 1, -14, (response) => {
                        response.forEach((partOfString) => {
                            res.push(partOfString);
                        });
                    });
                    output.push(res);
                }
                else
                    output.push(variableValue.slice(1, -2));
                // Operations
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
    },
};
