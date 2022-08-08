"use strict";
exports.__esModule = true;
exports.Compiler = void 0;
/**
 * Syntax: No Tabs Or Spaces Other Than Between Keywords.
 */
var fs = require("fs");
var axios_1 = require("axios");
var Compiler = /** @class */ (function () {
    function Compiler(file) {
        this.code = fs.readFileSync(file, "utf-8").split("\n");
    }
    Compiler.prototype.compile = function () {
        var output = [];
        var variables = {};
        for (var _i = 0, _a = this.code; _i < _a.length; _i++) {
            var line = _a[_i];
            switch (true) {
                case line.startsWith("//"):
                    break;
                case line.startsWith("print"):
                    if (line.startsWith('print: "')) {
                        var printLine = line.trim().slice(8, -1);
                        output.push(printLine);
                    }
                    else if (line.includes("operation")) {
                        var printLine = line.trim().slice(7).split(" ");
                        var operationData = printLine.slice(1);
                        if (!operationData.includes("+") &&
                            !operationData.includes("-") &&
                            !operationData.includes("*") &&
                            !operationData.includes("/")) {
                            output.push("Incorrect Syntax");
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
                                output.push("Incorrect Syntax");
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
                    output.push("Invalid Syntax");
                    break;
                case line.startsWith("def"):
                    var defArray = line.slice(5).split(" = ");
                    var variableName = defArray[0];
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
    };
    Compiler.prototype.run = function () {
        var output = this.compile();
        console.log(output.join("\n"));
    };
    return Compiler;
}());
exports.Compiler = Compiler;
if (process.argv[2] == "--version") {
    axios_1["default"].get("https:\/\/raw.githubusercontent.com/gscript-lang/gscript/v1/package.json").then(function (res) {
        console.log(res.data.version);
    });
}
