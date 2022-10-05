import * as fs from 'fs'

module.exports = {
  name: "import",
  syntax: "import <package-name>",
  run: (
    line: any,
    output: any[],
    warn: any,
    variables: any,
    imports: any[]
  ) => {
    imports.forEach((gs_module: any) => {
      warn(`Imported Package: ` + gs_module);
      const variableName: string = gs_module;
      const path = process.argv.slice(1)[0].slice(0, -9).replace(/\\/g, "/");
      variables[variableName as keyof typeof variables] = path + '/gs_modules/' + gs_module + '/' + fs.readdirSync(`${path}/gs_modules/${gs_module}`);
    });
  },
};
