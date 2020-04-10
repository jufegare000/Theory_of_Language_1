/* let DNode = require("../../../model/thompson-nodes/DoubleNode"); */
class Plus {
  constructor(listOfNodes) {
    return this.createPlus(listOfNodes);
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
    return listOfNodes;
  }
}

//module.exports = Plus;
