class InfixToPreFix {
  constructor() {
    this.prefixExpression = "";
  }

  infixToPrez(infixExpr) {
    let sizeOfExpression = infixExpr.length;
    let stackTrace = [];
    for (
      sizeOfExpression = sizeOfExpression - 1;
      sizeOfExpression >= 0;
      sizeOfExpression--
    ) {
      let currentCharacter = infixExpr.charAt(sizeOfExpression);
      switch (currentCharacter) {
        case "|":
          this.gotOperator(currentCharacter, 1, ")", stackTrace);
          break;
        case ".":
          this.gotOperator(currentCharacter, 1, ")", stackTrace);
          break;
        case "+":
        case "*":
          this.gotOperator(currentCharacter, 3, ")", stackTrace);
          break;
        case ")":
          stackTrace.push(currentCharacter);
          break;
        case "(":
          this.gotParenthesis(")", stackTrace);
          break;
        default:
          this.prefixExpression = currentCharacter + this.prefixExpression;
          break;
      }
    }
    while (!(stackTrace.length === 0)) {
      this.prefixExpression = stackTrace.pop() + this.prefixExpression;
    }
    let prefixExpAux = this.prefixExpression;
    this.prefixExpression = "";
    return prefixExpAux;
  }

  gotOperator(opThis, precedence, charX, stackTrace) {
    while (!(stackTrace.length === 0)) {
      let opTop = stackTrace.pop();
      if (opTop === charX) {
        stackTrace.push(opTop);
        break;
      } else {
        let precedence2;
        if (opTop === "|") {
          precedence2 = 1;
        } else if (opTop === ".") {
          precedence2 = 2;
        } else {
          precedence2 = 3;
        }
        if (precedence2 > precedence && charX === "(") {
          stackTrace.push(opTop);
          break;
        } else if (precedence2 <= precedence && charX === ")") {
          stackTrace.push(opTop);
          break;
        } else {
          if (charX === ")") {
            this.prefixExpression = opTop + this.prefixExpression;
          } else {
            this.prefixExpression = this.prefixExpression + opTop;
          }
        }
      }
    }
    stackTrace.push(opThis);
  }

  gotParenthesis(charX, stackTrace) {
    while (!(stackTrace.length === 0)) {
      let currentCharacter = stackTrace.pop();
      if (currentCharacter === charX) {
        break;
      } else {
        if (charX === ")") {
          this.prefixExpression = currentCharacter + this.prefixExpression;
        } else {
          this.prefixExpression = this.prefixExpression + currentCharacter;
        }
      }
    }
  }
}

//module.exports = InfixToPreFix;
