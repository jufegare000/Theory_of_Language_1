let DNode = require("../../../model/thompson-nodes/DoubleNode");
class Star {
  constructor(data) {
    return this.createStar(data);
  }

  createStar(listOfNodes) {
    let first = new DNode("λ");
    let last = new DNode(null);

    let firstOfList = listOfNodes.list.returnFirst();
    listOfNodes;
    let lastOfList = listOfNodes.list.returnLast();

    lastOfList.assignData("λ");

    first.assignRight(firstOfList);
    first.assignLeft(last);

    lastOfList.assignLeft(firstOfList);
    lastOfList.assignRight(last);

    listOfNodes.list.setFirst(first);
    listOfNodes.list.setLast(last);
    return listOfNodes;
  }
}

module.exports = Star;

// let star = new Star("x", "s");
