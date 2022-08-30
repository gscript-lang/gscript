export default {
    name: "split",
    syntax: `value.split(" ")`,
    run: (line: any, warn: any, variables: any, sliceStart: number, sliceEnd: number,  callback: any) => {
        const arr = line.slice(sliceStart, sliceEnd).split(" ");
        let res: any[] = [];

        arr.forEach((partOfString: string) => {
            res.push(partOfString);
        });
        
        callback(res)
    }
}