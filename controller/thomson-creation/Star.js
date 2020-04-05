let DNode = require("../../model/DoubleNode");
let Utils = require("./utils/ThompsonUtils");

class Star {
  constructor(data) {
    this.createStar(data);
  }

  createStar(listOfNodes) {
    let first = new DNode("λ");
    let last = new DNode(null);

    let firstOfList = listOfNodes.list.returnFirst();
    let lastOfList = listOfNodes.list.returnLast();

    lastOfList.assignData("λ");

    first.assignRight(firstOfList);
    first.assignLeft(last);

    lastOfList.assignLeft(firstOfList);
    lastOfList.assignRight(last);

    listOfNodes.list.setFirst(first);
    listOfNodes.list.setLast(last);
    let utils = new Utils();
    utils.runEntireGraph(listOfNodes);
    console.log(this.list);
  }
}

module.exports = Star;

// let star = new Star("x", "s");
