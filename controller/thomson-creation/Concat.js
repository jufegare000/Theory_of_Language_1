class Concat {
  constructor(data1, data2) {
    this.createConcat(data1, data2);
  }

  createConcat(list1, list2) {
    let lastOfList1 = list1.list.returnLast();
    let firstOfList2 = list2.list.returnFirst();
    let lastOfList2 = list2.list.returnLast();
    lastOfList1.assignData("λ");
    lastOfList1.assignRight(firstOfList2);
    this.list.setLast(lastOfList2);
  }
}

module.exports = Concat;
