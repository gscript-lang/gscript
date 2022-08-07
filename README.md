# gScript
A new programming language built on JavaScript ✨

## IN EARLY DEVELOPMENT STAGES

## Install
### Using NPM
`npm install gscript-compiler -g`

### Using Yarn
`yarn global add gscript-compiler`

## Compiling a file
`gs ./path/to/file.gs`
<br>
or
<br>

`gscript ./path/to/file.gs`

## Syntax
At the moment, there are only two keywords, `def`, and `print`.
<br/>
`def` defines a variable and it's corresponding value.
<br/>
`print` prints something in the console
<br/>
`//` at the start of a line means that it is a comment.
<br/>
All keywords must be suffixed with `:`.
<br/>

## Examples:

```gs
def: HW = "Hello World"
print: HW 
// returns Hello World
```
<br/>

```gs
def: MyArr = ["MyArray"]
print: MyArr
// returns ["MyArray"]
```

<br>

```gs
// print a string
print: "This is a string"
// returns This is a string
```
