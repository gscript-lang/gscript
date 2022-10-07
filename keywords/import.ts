import * as fs from 'fs'

module.exports = {
  name: "import",
  syntax: "import <package-name>",
  run: (
    line: any,
    output: any[],
    warn: any,
    variables: any,
    imports: any[],
    message: any
  ) => {
    imports.forEach((gs_module: any) => {
      message(`Imported GScript Module: ` + gs_module + " ✨");
      const variableName: string = gs_module;
      const path = process.argv.slice(1)[0].slice(0, -9).replace(/\\/g, "/");
      try {
        const moduleFiles = fs.readdirSync(`${path}/gs_modules/${gs_module}`);
        variables[variableName as keyof typeof variables] = path + '/gs_modules/' + gs_module + '/' + moduleFiles;
      } catch (err) {
        warn(`Module Error: ${gs_module} Not Found (/gs_modules)`)
      }
    });
  },
};
