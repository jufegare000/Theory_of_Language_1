let InfixToPreFix = require("../utils/InfixToPreFix");
let Star = require("../base/Star");
let Plus = require("../base/Plus");
let Concat = require("../base/Concat");
let Or = require("../base/Or");
let Node = require("../base/Unique");
let Utils = require("../utils/ThompsonUtils");
let RoutesConstruction = require("../construction/ToDeterministic");
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
    if (stackTrace.length === 0) {
      let lastExpression = this.finalList.pop();
      this.reAssignIndexes(lastExpression);
    } else this.completeThompson(stackTrace);
  }

  completeThompson(stackTrace) {
    while (stackTrace.length !== 0) {
      let topOfStack = stackTrace.pop();
      let operator;
      let thompsonAux;
      if (!this.operators.includes(topOfStack)) {
        operator = stackTrace.pop();

        let newNode = new Node(topOfStack);
        console.log("Se creó el nodo con el dato: ", topOfStack);
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
    this.reAssignIndexes(lastExpression);
  }

  reAssignIndexes(lastExpression) {
    let utils = new Utils();
    let routesClass = new RoutesConstruction();

    let firstNode = lastExpression.list.returnFirst();
    utils.setIdentifiers(firstNode, 0);
    routesClass.convertToDeterministic(firstNode);
  }

  evaluateInStack(firstExpression, secondExpression, operator, stackTrace) {
    let operatorAux = stackTrace[stackTrace.length - 1];
    let thompsonAux;
    if ((stackTrace[stackTrace.length - 1] != "|", ".")) {
      if (operator === "|" || operator === ".") {
        thompsonAux = this.createOrOrAnd(
          operator,
          firstExpression,
          secondExpression
        );
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
      console.log("se creará el nodo con dato: ", firsExpression);
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
}

let Infx = new InfixToPreFix();
let infixExpre = Infx.infixToPrez("(a|b)");
let Proof = new Unifikate();
let thomp = Proof.unify(infixExpre);
//Proof.evaluateStack(thomp);
console.log(thomp);
