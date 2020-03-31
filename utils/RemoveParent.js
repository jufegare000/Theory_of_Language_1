/*
    Victor Cardona Vera All Rights Reserved
*/



function removeParenthesis(er){
    if(er.indexOf("(")!=-1){
        let charz=er.split("");
        let replaces=[];
        let count=0;
        
        let indexReplace=1;
        let finalExprss="";
        while (count<charz.length){
            if(charz[count]=="("){
                let innerCount=count+1;
                let stackR=[];
                let forReplace="";
                
                while (charz[innerCount]!=")" || stackR.length>0){
                    if(charz[innerCount]=="("){
                        stackR.push(0);
                    }
                    if(charz[innerCount]==")"){
                        stackR.pop();
                    }
                    forReplace+=charz[innerCount];
                    innerCount++;
                }
                count=innerCount+1;
                replaces.push(forReplace);
                finalExprss+="aux"+indexReplace;
                indexReplace++;
            }
            else{
                finalExprss+=charz[count];
                count++;
            }
        }
        return {replaces:replaces,er:finalExprss};
    }
    else{
        return {replaces:[],er:er};
    }
   
}

function reCreateExpression(replacements, ex){
    for (var count=1; i<=replacements.length; count++){
        ex=ex.replace("aux"+i,"("+replacements[count-1]+")")
    }
    return ex;
}

let x = removeParenthesis("(a|b)+c.d|(a|a)|(a|a).(a|a)");
console.log(x);