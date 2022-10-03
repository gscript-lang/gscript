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
exports.run = void 0;
const fs = __importStar(require("fs"));
const keywordFiles = fs.readdirSync("./keywords");
function run(line, output, warn, variables) {
    keywordFiles.forEach(keywordFile => {
        if (!keywordFile.endsWith('.js'))
            return;
        const keyword = require(`../keywords/${keywordFile}`);
        if (!line.startsWith("//")) {
            if (line.startsWith(keyword.name)) {
                if (keyword.name === "import") {
                    const imports = line.trim().split(" ").slice(1);
                    keyword.run(line, output, warn, variables, imports);
                }
                else {
                    keyword.run(line, output, warn, variables);
                }
                ;
            }
        }
        else
            return;
    });
}
exports.run = run;
