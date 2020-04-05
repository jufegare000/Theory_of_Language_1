/*
    Victor Cardona Vera All Rights Reserved
*/

let Or = require("../controller/thomson-creation/Or");
let Concat = require("../controller/thomson-creation/Concat");
let Star = require("../controller/thomson-creation/Star");
let Plus = require("../controller/thomson-creation/Plus");

function removeParenthesis(er) {
  if (er.indexOf("(") != -1) {
    let charz = er.split("");
    let replaces = [];
    let count = 0;

    let indexReplace = 0;
    let finalExprss = [];
    while (count < charz.length) {
      if (charz[count] == "(") {
        let innerCount = count + 1;
        let stackR = [];
        let forReplace = "";

        while (charz[innerCount] != ")" || stackR.length > 0) {
          if (charz[innerCount] == "(") {
            stackR.push(0);
          }
          if (charz[innerCount] == ")") {
            stackR.pop();
          }
          forReplace += charz[innerCount];
          innerCount++;
        }
        count = innerCount + 1;
        replaces.push(forReplace);
        //finalExprss.push(indexReplace);
        indexReplace++;
      } else {
        finalExprss.push(charz[count]);
        count++;
      }
    }
    return { replaces: replaces, er: finalExprss };
  } else {
    return { replaces: [], er: er };
  }
}

function reCreateExpression(replacements, ex) {
  for (var count = 0; i <= replacements.length; count++) {
    ex = ex.replace("aux" + i, "(" + replacements[count - 1] + ")");
  }
  return ex;
}

function createListOfAtomics(expression) {
  let arrayOfGraphs = [];
  for (let i = 0; i < expression.replaces.length; i++) {
    let current = expression.replaces[i];
    let capturedObject;
    if (current.indexOf(".") > 0) {
      //Is an AND
      capturedObject = new Concat(current[0], current[2]);
    } else if (current.indexOf("|") > 0) {
      //Is an OR
      capturedObject = new Or(current[0], current[2]);
    } else if (current.indexOf("*") > 0) {
      //Is Star
      capturedObject = new Star(current[0]);
    } else if (current.indexOf("+") > 0) {
      //Is Plus
      capturedObject = new Plus(current[0]);
    }
    arrayOfGraphs.push(capturedObject);
    console.log(arrayOfGraphs);
  }
  return arrayOfGraphs;
}

function externalExpresions(lists, externalOperators) {
  let stack = [];
  //for (let i = 0; i < exp)
  //console.log(expe);
}

let separatedExpression = removeParenthesis("(a|b)*.(b+).1");
console.log(separatedExpression);
let lists = createListOfAtomics(separatedExpression);
//let unified = createListOfAtomics(lists, separatedExpression.er);
