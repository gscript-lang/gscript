import * as fs from 'fs'

module.exports = {
  name: "export",
  syntax: "export <module-name>",
  run: function (
    line: any,
    output: any[],
    warn: any,
    variables: any,
    imports: any[],
    message: any
  ) {
    const module = line.slice(this.name.length + 1);
    message(`Exported GScript Module: ${module} ✨`);
    const variableName: string = module;
      const path = process.argv.slice(1)[0].slice(0, -9).replace(/\\/g, "/");
      try {
        const moduleFiles = fs.readdirSync(`${path}/gs_modules/${module}`);
        variables[variableName as keyof typeof variables] = path + '/gs_modules/' + module + '/' + moduleFiles;
      } catch (err) {
        warn(`Module Error: ${module} Not Found (/gs_modules)`)
      }
  },
};
