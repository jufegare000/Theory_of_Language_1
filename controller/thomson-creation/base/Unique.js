let DNode = require("../../../model/DoubleNode");
let List = require("../../../model/LDL");

class Unique {
  constructor(data) {
    this.list = new List();
    this.createUnique(data);
  }

  createUnique(data1) {
    let first = new DNode(data1);
    let last = new DNode(null);
    this.list.insertNode(first);
    this.list.insertNode(last);
    first.assignRight(last);
    this.list.setLast(last);
    return this.list;
  }
}

module.exports = Unique;
