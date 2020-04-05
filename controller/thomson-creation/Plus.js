let DNode = require("../../model/DoubleNode");

class Plus {
  constructor(listOfNodes) {
    this.createPlus(listOfNodes);
  }

  createPlus(listOfNodes) {
    let first = new DNode("λ");
    let last = new DNode(null);

    let firstOfTheList = listOfNodes.list.returnFirst();
    let lastOfTheList = listOfNodes.list.returnLast();

    lastOfTheList.assignData("λ");

    first.assignRight(firstOfTheList);

    lastOfTheList.assignLeft(firstOfTheList);
    lastOfTheList.assignRight(last);

    listOfNodes.list.setFirst(first);
    listOfNodes.list.setLast(last);
    listOfNodes.list.listOfNodes.runByRight();
  }
}

module.exports = Plus;
