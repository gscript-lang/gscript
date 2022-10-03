"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "split",
    syntax: `value.split(" ")`,
    run: (line, warn, variables, sliceStart, sliceEnd, callback) => {
        const arr = line.slice(sliceStart, sliceEnd).split(" ");
        let res = [];
        arr.forEach((partOfString) => {
            res.push(partOfString);
        });
        callback(res);
    },
};
