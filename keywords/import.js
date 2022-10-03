"use strict";
module.exports = {
    name: "import",
    syntax: "import <package-name>",
    run: (line, output, warn, variables, imports) => {
        imports.forEach((importFN) => {
            console.log(importFN);
        });
    },
};
