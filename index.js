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

        for (const line of this.code) {
            switch(true) {
                case line.startsWith("print"): 
                    const compiledLine = line.slice(7, -1);
                    output.push(compiledLine);
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
