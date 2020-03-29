
const admitedSymbols = ['(', ')', '*', '+', '|', '.'];
const admitedChars =  /^([A-Za-z0-9])+$|\s+/;
let stack = [];
let numPa = 0;
let numCe = 0;

const validateSymbols = regEx => {
    console.log(regEx)
    // Stack for push all the symbols of the RegEx and verify his validity.
    
    let current;
    let evaluate = false;
    for (i = 0; i < regEx.length; i++){
        current = regEx.slice(i, i + 1);
        console.log(current);
        evaluate = evaluateStack(current, stack);
        if(!evaluate){
            console.log("Expresión malformada");
            return new SyntaxError("Expresión malformada");
        }
    } 
    console.log(stack);
    return evaluate;
}

const main = () => {
    // get Regular expression as a String
    let regEx = "((ac|d*b*c*c*))a+";
    let validity = validateSymbols(regEx);
}

const evaluateStack = (aChar, stack) => {

    if(admitedSymbols.includes(aChar) || admitedChars.test(aChar)){
        // go through the stack

        switch(aChar){
            case '(': 
            if (stack[stack.length - 1] == ')' || admitedChars.test(stack[stack.length - 1]) ||
            stack[stack.length - 1] == '(' ){
                stack.push(aChar);
                console.log(numPa);
            }else{
                console.log("error en (");
                return false;
            }
            numPa++
            break;
            case ')':
                numCe++;
                console.log(numCe);
                console.log(numPa);
                if(numPa < numCe){
                    console.log("error");
                    return false;
                }else{
                    stack.push(aChar);
                }
            break;
            case '*' || '+' || '.' || '|':
                if(admitedChars.test(stack[stack.length - 1]) || stack[stack.length - 1]== ')'){
                    console.log(stack[stack.length - 1]);
                    console.log("si c:");
                    stack.push(aChar);
                }else{
                    console.log("Error");
                    return false;
                }
            break;
            default:
                stack.push(aChar);
        }
    }else{
        console.log("Error");
        return false;
    }
    return true;
}

main();