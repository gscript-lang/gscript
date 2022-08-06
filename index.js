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
                    if(line.includes('"')) {
                        const printLine = line.trim().slice(8, -1);
                        output.push(printLine);
                    } else {
                        const printLine = line.trim().slice(7);
                        const variableValue = variables[printLine];
                        console.log(variableValue.slice(1, -2));
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
            /**
             * if (line.startsWith("print")) {
                const compiledLine = line.slice(7, -1);
                output.push(compiledLine);
            } else {
                output.push("Error: Invalid syntax.");
            }
             */
        }

        return output;
    }

    run() {
        const output = this.compile();
        console.log(output.join("\n"));
    }
}

const compiler = new Compiler("tests/test.gs");
compiler.run();
