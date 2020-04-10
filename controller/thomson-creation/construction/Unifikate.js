//let InfixToPreFix = require("../utils/InfixToPreFix");
/* let Star = require("../base/Star");
let Plus = require("../base/Plus");
let Concat = require("../base/Concat");
let Or = require("../base/Or");
let Node = require("../base/Unique");
let Utils = require("../utils/ThompsonUtils");
let RoutesConstruction = require("./StoreNodesAndRoutes");
let CreateStates = require("./CreateStates"); */

class Unifikate {
  constructor() {
    this.operators = ["*", "+", "|", "."];
    this.finalList = [];
    this.CreateStates = new CreateStates();
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
          while (
            !this.operators.includes(stackTrace[stackTrace.length - 1]) &&
            stackTrace.length !== 0
          ) {
            firstExpression = stackTrace.pop();
            operator = stackTrace.pop();
            this.singleCharToAdd(firstExpression, operator);
          }
          if (
            stackTrace[stackTrace.length - 1] == "*" ||
            stackTrace[stackTrace.length - 1] === "+"
          ) {
            thompsonaux = this.createStarOrPlus(
              this.finalList.pop(),
              stackTrace.pop()
            );
            this.finalList.push(thompsonaux);
          }
        } else {
          thompsonaux = this.createStarOrPlus(firstExpression, operator);
          this.finalList.push(thompsonaux);
          stackTrace.push(secondExpression);
        }
      }
    }
    let finalAutomata;
    if (stackTrace.length === 0) {
      let lastExpression = this.finalList.pop();
      finalAutomata = this.reAssignIndexes(lastExpression);
    } else finalAutomata = this.completeThompson(stackTrace);
    return finalAutomata;
  }

  completeThompson(stackTrace) {
    while (stackTrace.length !== 0) {
      let topOfStack = stackTrace.pop();
      let operator;
      let thompsonAux;
      if (!this.operators.includes(topOfStack)) {
        operator = stackTrace.pop();

        let newNode = new Unique(topOfStack);
        console.log("Se creó el nodo con el dato: ", topOfStack);
        if (operator == "*" || operator == "+") {
          thompsonAux = this.createStarOrPlus(newNode, operator);
          this.finalList.push(thompsonAux);
        } else {
          thompsonAux = this.finalList.pop();
          thompsonAux = this.createOrOrAnd(operator, thompsonAux, newNode);
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
    let finalAutomata = this.reAssignIndexes(lastExpression);
    return finalAutomata;
  }

  reAssignIndexes(lastExpression) {
    let utils = new ThompsonUtils();
    let routesClass = new StoreNodesAndRoutes();

    let firstNode = lastExpression.list.returnFirst();
    utils.setIdentifiers(firstNode, 0);
    let routes = routesClass.convertToDeterministic(firstNode);
    let readyStates = this.CreateStates.createStates(routes);
    return readyStates;
  }

  evaluateInStack(firstExpression, secondExpression, operator, stackTrace) {
    let operatorAux;
    let thompsonAux;
    let charAux;

    if (operator === "|" || operator === ".") {
      thompsonAux = this.createOrOrAnd(
        operator,
        firstExpression,
        secondExpression
      );
      this.finalList.push(thompsonAux);
    }
    operatorAux = stackTrace.pop();
    if (
      this.finalList.length !== 0 &&
      (operatorAux == "*" || operatorAux === "+")
    ) {
      thompsonAux = this.finalList.pop();
      thompsonAux = this.createStarOrPlus(thompsonAux, operatorAux);
      this.finalList.push(thompsonAux);
    } else if (this.finalList.length === 0) {
      thompsonAux = this.createStarOrPlus(firstExpression, operator);
      this.finalList.push(thompsonAux);
      stackTrace.push(secondExpression);
    } else {
      charAux = operatorAux;
      if (this.operators.includes(charAux)) {
        stackTrace.push(charAux);
      } else {
        operatorAux = stackTrace.pop();
        this.singleCharToAdd(charAux, operatorAux);
      }
    }
  }

  singleCharToAdd(char, operator) {
    let newNode = new Unique(char);
    let firstExpression = this.finalList.pop();
    let finalaux = this.createOrOrAnd(operator, firstExpression, newNode);
    this.finalList.push(finalaux);
  }

  createStarOrPlus(firsExpression, topOfStack) {
    let thompsonAux;

    if (!!firsExpression.length) {
      //is a char
      let listOfUnique = new Unique(firsExpression);
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
      let listForFirst = new Unique(firsExpression);
      let listForSecond = new Unique(secondExpression);
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

//module.exports = Unifikate;
