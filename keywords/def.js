"use strict";
module.exports = {
    name: "def",
    syntax: "def: var = value",
    run: (line, output, warn, variables) => {
        const defArray = line.slice(5).split(" = ");
        const variableName = defArray[0];
        variables[variableName] = defArray[1];
    }
};
