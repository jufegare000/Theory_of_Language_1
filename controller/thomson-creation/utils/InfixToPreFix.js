class InfixToPreFix {
  constructor() {
    this.operators = [".", "*", "+", "|", ")"];

    this.expressionIn = "";
    this.expressionPre = "";
  }

  inToPre(infix) {
    let stackIn = [],
      stackTra = [],
      stackPre = [];
    let x, y;
    //convert expression to stack
    stackIn = Array.from(infix);
    while (!(stackIn.length === 0)) {
      x = stackIn.pop();
      if (this.operators.includes(x)) {
        while (
          !(stackTra === 0) &&
          this.priorityInStack(stackTra[stackTra.length - 1]) >
            this.priorityOutStack(x)
        ) {
          y = stackTra.pop();
          stackPre.push(y);
        }
        stackTra.push(x);
      } else if (x === "(") {
          console.log("kepaso?", stackTra);
        while (
          (stackTra.length > 0) &&
         ( stackTra[stackTra.length - 1] != ")")
        ) {
          y = stackTra.pop();
          console.log("a ver: ", y);
          stackPre.push(y);
        }
        y = stackTra.pop();
      } else {
        stackPre.push(x);
      }
      while (!(stackTra.length === 0)) {
        y = stackTra.pop();
        stackPre.push(y);
      }
      while (!(stackPre.length === 0)) {
        y = stackPre.pop();
        console.log(y);
      }
    }
  }

  priorityInStack(val) {
    switch (val) {
      case "*":
        return 2;
        break;
      case "+":
        return 1;
        break;
      case "|":
        return 1;
        break;
      case ".":
        return 1;
      case ")":
        return 0;
        break;
    }
  }

  priorityOutStack(val) {
    switch (val) {
      case "*":
        return 2;
        break;
      case "+":
        return 1;
        break;
      case "|":
        return 1;
        break;
      case ".":
        return 1;
      case ")":
        return 4;
        break;
    }
  }
}

let Infx = new InfixToPreFix();
Infx.inToPre("(a+b)");
