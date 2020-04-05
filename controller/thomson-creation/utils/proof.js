let InfixToPreFix = require("./InfixToPreFix");
let Star = require("../Star");
let Plus = require("../Plus");
let Concat = require("../Concat");
let Or = require("../Or");
let Node = require("../Unique");
class Unifikate {
  constructor() {
    this.operators = ["*", "+", "|", "."];
    this.finalList = [];
  }

  unify(regex) {
    let stackTrace = [];
    let i = 0;
    for (i = 0; i < regex.length; i++) {
      let currentChar = regex.charAt(i);
      if (this.operators.includes(currentChar)) {
        stackTrace.push(currentChar);
      } else if (this.operators.includes(stackTrace[stackTrace.length - 1])) {
        stackTrace.push(currentChar);
      } else {
        //Evaluate
        let secondExpression = stackTrace.pop();
        this.evaluateInStack(stackTrace, secondExpression);
      }
    }
    return stackTrace;
  }

  evaluateInStack(stackTrace, secondExpression) {
    let operator = "";
    let thompsonAux;
    while (
      stackTrace[stackTrace.length - 1] !== "|" ||
      stackTrace[stackTrace.length - 1] !== "."
    ) {
      let firsExpression = stackTrace.pop();
      let topOfStack = stackTrace[length - 1];
      if (topOfStack === "*" || topOfStack === "+") {
        thompsonAux = this.createStarOrPlus(firsExpression, topOfStack);
        stackTrace.pop();
      } else {
        operator = stackTrace.pop();
        thompsonAux = this.createOrOrAnd(
          operator,
          firsExpression,
          secondExpression
        );
      }
      this.finalList.push(thompsonAux);
    }
  }

  createStarOrPlus(firsExpression, topOfStack) {
    let expression;
    let listOfUnique = new Node(firsExpression);
    if (topOfStack === "*") {
      expression = new Star(listOfUnique);
    } else {
      expression = new Plus(listOfUnique);
    }
    return expression;
  }

  createOrOrAnd(operator, firsExpression, secondExpression) {
    let expression;
    if (operator === ".") {
      expression = new Concat(firsExpression, secondExpression);
    } else {
      expression = new Or(firsExpression, secondExpression);
    }
    return expression;
  }

  evaluateStack(stackTrace) {
    let listNodeAux;
    let finalList;
    while (!(stackTrace.length === 0)) {
      let firstExp = stackTrace.pop();
      let secondExpression = stackTrace.pop();
      if (secondExpression === "*") {
        listNodeAux = new Node(firstExp);
        finalList = new Star(listNodeAux);
        console.log(listNodeAux);
      }
    }
  }
}

let Infx = new InfixToPreFix();
let infixExpre = Infx.infixToPrez("c*");
let Proof = new Unifikate();
let thomp = Proof.unify(infixExpre);
Proof.evaluateStack(thomp);
console.log(thomp);
