module.exports = {
  name: "def",
  syntax: "def: var = value",
  run: (line: any, output: any[], warn: any, variables: any) => {
    const defArray = line.slice(4).split(" = ");
    const variableName: string = defArray[0];
    variables[variableName as keyof typeof variables] = defArray[1];
  },
};
