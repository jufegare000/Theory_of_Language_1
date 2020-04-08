let DNode = require("../../../model/thompson-nodes/DoubleNode");
class Or {
  constructor(list1, list2) {
    return this.createOr(list1, list2);
  }

  createOr(list1, list2) {
    let first = new DNode("λ");
    let last = new DNode(null);

    let firstOfList1 = list1.list.returnFirst();
    let lastOfList1 = list1.list.returnLast();
    lastOfList1.assignData("λ");

    let firstOfList2 = list2.list.returnFirst();
    let lastOfList2 = list2.list.returnLast();
    lastOfList2.assignData("λ");

    lastOfList1.assignRight(last);
    lastOfList2.assignRight(last);

    first.assignRight(firstOfList1);
    first.assignLeft(firstOfList2);

    list1.list.setFirst(first);
    list1.list.setLast(last);
    return list1;
  }
}

module.exports = Or;
