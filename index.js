"use strict";
exports.__esModule = true;
exports.Compiler = void 0;
/**
 * Syntax: No Tabs Or Spaces Other Than Between Keywords.
**/
var fs = require("fs");
var chalk = require('chalk');
var Compiler = /** @class */ (function () {
    function Compiler(file) {
        this.code = fs.readFileSync(file, "utf-8").split("\n");
    }
    Compiler.prototype.warn = function (text) {
        return console.log(chalk.red("".concat(text, "\n")));
    };
    Compiler.prototype.compile = function () {
        var output = [];
        var variables = {};
        var _loop_1 = function (line) {
            switch (true) {
                case line.startsWith("//"):
                    break;
                case line.startsWith("print"):
                    if (line.startsWith('print: "')) {
                        var printLine = line.trim().slice(8, -1);
                        var res_1 = [];
                        if (line.endsWith(".split()")) {
                            line.slice(8, -9).split(" ").forEach(function (partOfString) {
                                res_1.push("".concat(partOfString));
                            });
                            output.push(res_1);
                            console.log(output);
                        }
                        else
                            output.push(printLine);
                    }
                    else if (line.includes("operation")) {
                        var printLine = line.trim().slice(7).split(" ");
                        var operationData = printLine.slice(1);
                        if (!operationData.includes("+") &&
                            !operationData.includes("-") &&
                            !operationData.includes("*") &&
                            !operationData.includes("/")) {
                            this_1.warn("Error: Invalid Syntax");
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
                        var printLine = line.trim().slice(7);
                        var variableValue = variables[printLine];
                        if (!variableValue.includes("operation")) {
                            output.push(variableValue.slice(1, -2));
                        }
                        else if (variableValue.includes("operation")) {
                            var operationData = variableValue.split(" ").slice(1);
                            if (!operationData.includes("+") &&
                                !operationData.includes("-") &&
                                !operationData.includes("*") &&
                                !operationData.includes("/")) {
                                this_1.warn("Error: Invalid Syntax");
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
                    break;
                case line.startsWith("operation"):
                    this_1.warn("Error: Invalid Syntax");
                    break;
                case line.startsWith("def"):
                    var defArray = line.slice(5).split(" = ");
                    var variableName = defArray[0];
                    variables[variableName] = defArray[1];
                case !line.startsWith("print") && !line.startsWith("def") && !line.startsWith("//"):
                    this_1.warn("Error: Invalid Syntax");
                    break;
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.code; _i < _a.length; _i++) {
            var line = _a[_i];
            _loop_1(line);
        }
        return output;
    };
    Compiler.prototype.run = function () {
        this.warn("GScript is currently in beta! Not suitable for production. Use at your own risk!");
        var output = this.compile();
        for (var _i = 0, output_1 = output; _i < output_1.length; _i++) {
            var line = output_1[_i];
            console.log(line);
        }
    };
    return Compiler;
}());
exports.Compiler = Compiler;
