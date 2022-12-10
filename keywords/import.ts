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
      message(`Imported GScript Module: ${gs_module} ✨`);
      const variableName: string = gs_module;
      const path = process.argv.slice(1)[0].slice(0, -9).replace(/\\/g, "/");
      try {
        const moduleFiles: any = fs.readdirSync(`${path}/gs_modules/${gs_module}`);
        const lines: any[] = fs.readFileSync(`${path}/gs_modules/${gs_module}/${moduleFiles}`, "utf-8").trim().split("\n");

        const pkgVarDef = lines.filter((s) => s.startsWith("def "))[0].trim().slice(4);
        const pkgVarArray = pkgVarDef.split(" = ");
        const pkgVarValue = pkgVarArray[1];
        const pkgVarName = pkgVarArray[0];

        lines.forEach((l) => {
          if(l.startsWith("export default")) {
            variables[variableName as keyof typeof variables] = pkgVarValue;
          }

          if(l.startsWith("export") && !l.includes("default")) {
            variables[variableName as keyof typeof variables] = ` {${pkgVarName}: ${pkgVarValue}}  `;
          }
        });


      } catch (err) {
        warn(`Module Error {
          Module: "${gs_module}",
          Error: "${err}"
        }`);
      }
    });
  },
};
