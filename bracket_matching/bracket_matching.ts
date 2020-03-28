
function is_valid_text(text:string) {

    let closingBracketMap : Map<string, string> = new Map([["}", "{"], ["]", "["], [")", "("]]); 

    let stack:Array<string> = [];
    let openingBracket:Set<string> = new Set(["[", "{", "("]);

    for(let t of text) {
        if(openingBracket.has(t)) {
            stack.push(t);
        } else {
            let opening:string = closingBracketMap.get(t);
            if(opening === stack[stack.length -1]) {
                stack.pop();
            } else {
                return false 
            }
        }
    }
    return true
}

console.log(is_valid_text("[][]"))
console.log(is_valid_text("[][]{{([{}])()}{}}"))
console.log(is_valid_text("[][]{{([{]])()}{}}"))