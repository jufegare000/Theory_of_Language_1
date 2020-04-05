let DNode = require("../../model/DoubleNode");

class Unique {
  constructor(data) {
    this.createUnique(data);
  }

  createUnique(data1) {
    let first = new DNode(data1);
    let last = new DNode(null);
    this.list.insertNode(first);
    this.list.insertNode(last);
    first.assignRight(last);
  }
}

module.exports = Unique;
