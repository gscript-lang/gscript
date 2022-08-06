/**
 * Syntax: No Tabs Or Spaces Other Than Between Keywords.
*/
const fs = require('fs');

class Compiler {
    constructor(file) {
        this.code = fs.readFileSync(file).toString();
    }

    compile() {
        if(this.code.includes('\n')) {
            const multiLineCode = this.code.split('\n');
            const Result = [];
            const allTheOthers = multiLineCode.slice(0, 1);
            const last = multiLineCode.slice(allTheOthers.length);
            
            allTheOthers.forEach(line => {
                if(line.startsWith("print")) {
                    const compiledLine = line.slice(7, -2);
                    Result.push(compiledLine);
                } else {
                    Result.push("Error: One Of The Lines Is Not Valid Syntax Or A Keyword")
                }
            });
            last.forEach(line => {
                if(line.startsWith("print")) {
                    const compiledLine = line.slice(7, -1);
                    Result.push(compiledLine);
                } else {
                    Result.push("Error: One Of The Lines Is Not Valid Syntax Or A Keyword")
                }
            })

            return Result;
        } else {
            if(this.code.startsWith('print')) {
                return this.code.slice(7, -1);
            } else return "Only print is supported!";
        }
    }

    run() {
        const compiledCode = this.compile();
        if(compiledCode === Array) {
            console.log(compiledCode);
        } else console.log(compiledCode)
    }
}

const compiler = new Compiler('tests/test.gs');
compiler.run();