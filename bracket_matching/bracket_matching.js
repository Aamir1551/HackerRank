function is_valid_text(text) {
    let closingBracketMap = new Map([["}", "{"], ["]", "["], [")", "("]]);
    let stack = [];
    let openingBracket = new Set(["[", "{", "("]);
    for (let t of text) {
        if (openingBracket.has(t)) {
            stack.push(t);
        }
        else {
            let opening = closingBracketMap.get(t);
            if (opening === stack[stack.length - 1]) {
                stack.pop();
            }
            else {
                return false;
            }
        }
    }
    return true;
}
console.log(is_valid_text("[][]"));
console.log(is_valid_text("[][]{{([{}])()}{}}"));
console.log(is_valid_text("[][]{{([{]])()}{}}"));
