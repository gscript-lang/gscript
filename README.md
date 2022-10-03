# gScript

A new programming language built on TypeScript ✨

> Note: This is the interpreter/"compiler" lib, the CLI tool is used in the given examples.

## IN EARLY DEVELOPMENT STAGES

## Install

Prerequisites:

- Node JS
- NPM

### Using NPM

`npm install gscript-cli -g`

### Using Yarn

`yarn global add gscript-cli`

## Running A File

`gs run ./path/to/file.gs`
<br>
or
<br>

`gscript run ./path/to/file.gs`

## Syntax

At the moment, there are only two keywords, `def`, and `log`.
<br/>
`def` defines a variable and it's corresponding value.
<br/>
`log` logs something in the console
<br/>
`//` at the start of a line means that it is a comment.
<br/>

## Examples:

```gs
def HW = "Hello World"
log HW
// returns Hello World
```

<br/>

```gs
def MyArr = ["MyArray"]
log MyArr
// returns ["MyArray"]
```

<br>

```gs
// log a string
log "This is a string"
// returns This is a string
```

<br>

```gs
// split a string and log it.
log "This is a string".split(" ")
// returns ["This", "is", "a", "string"]
```
