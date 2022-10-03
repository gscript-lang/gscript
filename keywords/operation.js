"use strict";
module.exports = {
    name: "operation",
    syntax: "This leads to a syntax error, this is here just to provide a warning.",
    run: (line, output, warn, variables) => {
        warn("Error: Invalid Syntax");
    },
};
