#!/usr/bin/env node

/**
 * Syntax: No Tabs Or Spaces Other Than Between Keywords.
 */
const fs = require("fs");

class Compiler {
    constructor(file) {
        this.code = fs.readFileSync(file, "utf-8").split("\n");
    }

    compile() {
        const output = [];
        const variables = {};

        for (const line of this.code) {
            switch(true) {
                case line.startsWith("//"):
                    break;
                case line.startsWith("print"): 
                    if(line.includes('print: "')) {
                        const printLine = line.trim().slice(8, -1);
                        output.push(printLine);
                    } else if(line.includes("sum")) {
                        const printLine = line.trim().slice(7).split(" ");
                        const numbers = printLine.slice(1);
                        if(!numbers.includes("+") && !numbers.includes("-") && !numbers.includes("*") && !numbers.includes("/")) {
                            output.push("Incorrect Syntax");
                        } else if(numbers[1] === "+") {
                            output.push(Number(numbers[0]) + Number(numbers[2]))
                        } else if(numbers[1] === "-") {
                            output.push(Number(numbers[0]) - Number(numbers[2]))
                        } else if(numbers[1] === "*") {
                            output.push(Number(numbers[0]) * Number(numbers[2]))
                        } else if(numbers[1] === "/") {
                            output.push(Number(numbers[0]) / Number(numbers[2]))
                        }
                    } else {
                        const printLine = line.trim().slice(7);
                        const variableValue = variables[printLine];
                        if(!variableValue.includes("sum")) {
                            output.push(variableValue.slice(1, -1));
                        } else if(variableValue.includes("sum")) {
                            const numbers = variableValue.split(" ").slice(1);
                            if(!numbers.includes("+") && !numbers.includes("-") && !numbers.includes("*") && !numbers.includes("/")) {
                                output.push("Incorrect Syntax");
                            } else if(numbers[1] === "+") {
                                output.push(Number(numbers[0]) + Number(numbers[2]))
                            } else if(numbers[1] === "-") {
                                output.push(Number(numbers[0]) - Number(numbers[2]))
                            } else if(numbers[1] === "*") {
                                output.push(Number(numbers[0]) * Number(numbers[2]))
                            } else if(numbers[1] === "/") {
                                output.push(Number(numbers[0]) / Number(numbers[2]))
                            }
                        }
                    }

                    break;
                case line.startsWith("sum"):
                    const line2 = line.slice(5).split(" ");
                    console.log(line2);
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

const filePath = process.argv.slice(2);

const compiler = new Compiler(filePath[0]);
compiler.run();
