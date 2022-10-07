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
const fs = __importStar(require("fs"));
module.exports = {
    name: "import",
    syntax: "import <package-name>",
    run: (line, output, warn, variables, imports, message) => {
        imports.forEach((gs_module) => {
            message(`Imported GScript Module: ` + gs_module + " ✨");
            const variableName = gs_module;
            const path = process.argv.slice(1)[0].slice(0, -9).replace(/\\/g, "/");
            try {
                const moduleFiles = fs.readdirSync(`${path}/gs_modules/${gs_module}`);
                variables[variableName] = path + '/gs_modules/' + gs_module + '/' + moduleFiles;
            }
            catch (err) {
                warn(`Module Error: ${gs_module} Not Found (/gs_modules)`);
            }
        });
    },
};
