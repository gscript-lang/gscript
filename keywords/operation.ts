module.exports = {
    name: "operation",
    syntax: "This leads to a syntax error, this is here just to provide a warning.",
    run: (line: any, output: any[], warn: any, variables: any) => {
        warn("Error: Invalid Syntax")
    }
}