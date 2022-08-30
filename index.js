"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
/**
 * Syntax: No Tabs Or Spaces Other Than Between Keywords.
**/
require('module-alias/register');
const fs = __importStar(require("fs"));
const chalk = require('chalk');
const registerKeywords = __importStar(require("./functions/registerKeywords"));
class Compiler {
    constructor(file) {
        this.code = fs.readFileSync(file, "utf-8").split("\n");
    }
    warn(text) {
        return console.log(chalk.red(`${text}\n`));
    }
    compile() {
        const output = [];
        const variables = {};
        for (const line of this.code) {
            registerKeywords.run(line, output, this.warn, variables);
        }
        return output;
    }
    run() {
        this.warn("GScript is currently in beta! Not suitable for production. Use at your own risk!");
        const output = this.compile();
        for (const line of output) {
            console.log(line);
        }
    }
}
exports.Compiler = Compiler;
