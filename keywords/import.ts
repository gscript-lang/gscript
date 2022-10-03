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
    imports.forEach((importFN) => {
      console.log(importFN);
    });
  },
};
