/**
 * Syntax: No Tabs Or Spaces Other Than Between Keywords.
*/
const fs = require('fs');

class Compiler {
    constructor(file) {
        this.code = fs.readFileSync(file).toString();
    }

    compile() {
        if(this.code.startsWith('print')) {
            return this.code.slice(7, -1);
        } else return this.code;
    }

    run() {
        const compiledCode = this.compile();
        console.log(compiledCode)
        
    }
}

const compiler = new Compiler('tests/test.gs');
compiler.run();