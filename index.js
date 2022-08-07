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
                    } else {
                        const printLine = line.trim().slice(7);
                        const variableValue = variables[printLine];
                        if(variableValue.startsWith('"')) {
                            output.push(variableValue.slice(1, -2))
                        } else if(variableValue.startsWith('[')) {
                            output.push(variableValue)
                        } else output.push(variableValue);
                    }

                    break;
                case line.startsWith("def"):  
                    const defArray = line.slice(5).split(" = ");
                    const variableName = defArray[0];
                    variables[variableName] = defArray[1];
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
