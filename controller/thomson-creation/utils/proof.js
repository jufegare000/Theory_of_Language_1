let InfixToPreFix = require("./InfixToPreFix");
let Star = require("../Star");
let Plus = require("../Plus");
let Concat = require("../Concat");
let Or = require("../Or");
let Node = require("../Unique");
let Utils = require("../utils/ThompsonUtils");
class Unifikate {
  constructor() {
    this.operators = ["*", "+", "|", "."];
    this.finalList = [];
  }

  unify(regex) {
    let stackTrace = [];
    let operator;
    let i = 0;
    let thompsonaux;
    for (i = 0; i < regex.length; i++) {
      let currentChar = regex.charAt(i);
      if (
        this.operators.includes(currentChar) ||
        this.operators.includes(stackTrace[stackTrace.length - 1])
      ) {
        stackTrace.push(currentChar);
      } else if (this.operators.includes(stackTrace[stackTrace.length - 1])) {
        stackTrace.push(currentChar);
      } else {
        //Evaluate
        let firstExpression = stackTrace.pop();
        let secondExpression = currentChar;
        operator = stackTrace.pop();

        if (operator === "|" || operator === ".") {
          this.evaluateInStack(
            firstExpression,
            secondExpression,
            operator,
            stackTrace
          );
        } else {
          thompsonaux = this.createStarOrPlus(firstExpression, operator);
          this.finalList.push(thompsonaux);
          stackTrace.push(secondExpression);
        }
      }
    }
    if (stackTrace.length === 0) return stackTrace;
    else this.completeThompson(stackTrace);
  }

  completeThompson(stackTrace) {
    while (stackTrace.length !== 0) {
      let topOfStack = stackTrace.pop();
      let operator;
      let thompsonAux;
      if (!this.operators.includes(topOfStack)) {
        operator = stackTrace.pop();
        let newNode = new Node(topOfStack);
        if (operator == "*" || operator == "+") {
          thompsonAux = this.createStarOrPlus(newNode, operator);
          this.finalList.push(thompsonAux);
        } else {
          thompsonAux = this.finalList.pop();
          thompsonAux = this.createOrOrAnd(operator, newNode, thompsonAux);
          this.finalList.push(thompsonAux);
        }
      } else {
        let firstExp = this.finalList.pop();
        if (topOfStack === "*" || topOfStack === "+") {
          thompsonAux = this.createStarOrPlus(firstExp, topOfStack);
          this.finalList.push(thompsonAux);
        } else {
          let secondExp = this.finalList.pop();
          thompsonAux = this.createOrOrAnd(topOfStack, firstExp, secondExp);
          this.finalList.push(thompsonAux);
        }
      }
    }
    let lastExpression = this.finalList.pop();
    this.runGraph(lastExpression);
  }

  runGraph(lastExpression) {
    let utils = new Utils();
    utils.runEntireGraph(lastExpression);
  }

  evaluateInStack(firstExpression, secondExpression, operator, stackTrace) {
    let operatorAux = stackTrace[stackTrace.length - 1];
    let thompsonAux;
    if ((stackTrace[stackTrace.length - 1] != "|", ".")) {
      if (operator === "|" || operator === ".") {
        thompsonAux = this.createOrOrAnd(firstExpression, secondExpression);
        this.finalList.push(thompsonAux);
      }
      operatorAux = stackTrace[stackTrace.length - 1];
      if (
        this.finalList.length !== 0 &&
        (operatorAux == "*" || operatorAux === "+")
      ) {
        thompsonAux = this.createStarOrPlus(
          this.finalList[this.finalList.length - 1],
          operatorAux
        );
        this.finalList.pop();
        this.finalList.push(thompsonAux);
        stackTrace.pop();
      }
      if (this.finalList.length === 0) {
        thompsonAux = this.createStarOrPlus(firstExpression, operator);
        this.finalList.push(thompsonAux);
        stackTrace.push(secondExpression);
      }
    }
  }

  createStarOrPlus(firsExpression, topOfStack) {
    let thompsonAux;

    if (!!firsExpression.length) {
      //is a char
      let listOfUnique = new Node(firsExpression);
      if (topOfStack === "*") {
        thompsonAux = new Star(listOfUnique);
      } else {
        thompsonAux = new Plus(listOfUnique);
      }
    } else {
      if (topOfStack === "*") {
        thompsonAux = new Star(firsExpression);
      } else {
        thompsonAux = new Plus(firsExpression);
      }
    }
    return thompsonAux;
  }

  createOrOrAnd(operator, firsExpression, secondExpression) {
    let generatedList;

    if (!!firsExpression.length) {
      let listForFirst = new Node(firsExpression);
      let listForSecond = new Node(secondExpression);
      if (operator === ".") {
        generatedList = new Concat(listForFirst, listForSecond);
      } else {
        generatedList = new Or(listForFirst, listForSecond);
      }
    } else {
      if (operator === ".") {
        generatedList = new Concat(firsExpression, secondExpression);
      } else {
        generatedList = new Or(firsExpression, secondExpression);
      }
    }
    return generatedList;
  }

  evaluateStack(stackTrace) {
    let listNodeAux;
    let finalList;
    let thompsonAux;
    let operator;
    while (stackTrace.length > 0) {
      let topOfStack = stackTrace.pop();
      if (topOfStack === "*" || topOfStack === "+") {
        thompsonAux = this.finalList.pop();
        thompsonAux = this.createStarOrPlus(thompsonAux, topOfStack);
      } else if (topOfStack === "|" || topOfStack === ".") {
        let secondExpression = this.finalList.pop();
        let firsExpression = this.finalList.pop();
        thompsonAux = this.createOrOrAnd(
          topOfStack,
          firsExpression,
          secondExpression
        );
        this.finalList.push(thompsonaux);
      } else {
        operator = stackTrace.pop();
        if (operator === "*" || operator === "+") {
          thompsonAux = this.createStarOrPlus(topOfStack);
          this.finalList.push(thompsonAux);
        } else {
          let newNode = new Node(topOfStack);
          thompsonAux = this.createOrOrAnd(
            operator,
            this.finalList.pop(),
            newNode
          );
          this.finalList.push(thompsonAux);
        }
      }
      let secondExpression = stackTrace.pop();
      if (secondExpression === "*") {
        listNodeAux = new Node(firstExp);
        finalList = new Star(listNodeAux);
      }
    }
  }
}

let Infx = new InfixToPreFix();
let infixExpre = Infx.infixToPrez("(a|b*)*");
let Proof = new Unifikate();
let thomp = Proof.unify(infixExpre);
//Proof.evaluateStack(thomp);
console.log(thomp);
