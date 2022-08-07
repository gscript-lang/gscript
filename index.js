#!/usr/bin/node
"use strict";
exports.__esModule = true;
/**
 * Syntax: No Tabs Or Spaces Other Than Between Keywords.
 */
var fs = require("fs");
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
                    if (line.includes('print: "')) {
                        var printLine = line.trim().slice(8, -1);
                        output.push(printLine);
                    }
                    else if (line.includes("operation")) {
                        var printLine = line.trim().slice(7).split(" ");
                        var numbers = printLine.slice(1);
                        if (!numbers.includes("+") && !numbers.includes("-") && !numbers.includes("*") && !numbers.includes("/")) {
                            output.push("Incorrect Syntax");
                        }
                        else if (numbers[1] === "+") {
                            output.push(Number(numbers[0]) + Number(numbers[2]));
                        }
                        else if (numbers[1] === "-") {
                            output.push(Number(numbers[0]) - Number(numbers[2]));
                        }
                        else if (numbers[1] === "*") {
                            output.push(Number(numbers[0]) * Number(numbers[2]));
                        }
                        else if (numbers[1] === "/") {
                            output.push(Number(numbers[0]) / Number(numbers[2]));
                        }
                    }
                    else {
                        var printLine = line.trim().slice(7);
                        var variableValue = variables[printLine];
                        if (!variableValue.includes("operation")) {
                            output.push(variableValue.slice(1, -1));
                        }
                        else if (variableValue.includes("operation")) {
                            var numbers = variableValue.split(" ").slice(1);
                            if (!numbers.includes("+") && !numbers.includes("-") && !numbers.includes("*") && !numbers.includes("/")) {
                                output.push("Incorrect Syntax");
                            }
                            else if (numbers[1] === "+") {
                                output.push(Number(numbers[0]) + Number(numbers[2]));
                            }
                            else if (numbers[1] === "-") {
                                output.push(Number(numbers[0]) - Number(numbers[2]));
                            }
                            else if (numbers[1] === "*") {
                                output.push(Number(numbers[0]) * Number(numbers[2]));
                            }
                            else if (numbers[1] === "/") {
                                output.push(Number(numbers[0]) / Number(numbers[2]));
                            }
                        }
                    }
                    break;
                case line.startsWith("operation"):
                    var line2 = line.slice(5).split(" ");
                    console.log(line2);
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
var filePath = process.argv.slice(2);
var compiler = new Compiler(filePath[0]);
compiler.run();
