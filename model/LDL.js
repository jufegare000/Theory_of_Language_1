let DoubleNode = require("./DoubleNode");

class LDL {
  constructor() {
    this.noOfNodes = 0;
    this.first = null;
    this.last = null;
  }

  returnFirst() {
    return this.first;
  }

  returnLast() {
    return this.last;
  }

  endOfList(node) {
    return node === null;
  }

  isEmpty() {
    return this.first === null;
  }

  rerturnNodeByData(data) {

    let pointer = null;
    pointer = this.returnFirst();
    while (!this.endOfList(pointer)) {
      if (data === pointer.returnData()) {
        console.log("data", pointer);
        return pointer;
      }
      pointer = pointer.returnRight();
    }
    console.log("por la derecha")
    if (pointer == null) {
      pointer = pointer.returnFirst().returnLeft();
      while (!this.endOfList(pointer)) {
        if (data === pointer.returnData()) {
          return pointer;
        }
      }
      console.log("not found");
    }
  }

  runByRight() {
    let pointer = null;
    pointer = this.returnFirst();
    while (!this.endOfList(pointer)) {
      console.log("Right");
      console.log("Identifier: ", pointer.returnIdentifier());
      console.log("Data: ", pointer.returnData(), "\n");
      let leftPointer = pointer.returnLeft();
      while (leftPointer != null) {
        console.log("Left");
        console.log("Identifier: ", leftPointer.returnIdentifier());
        console.log("Data: ", leftPointer.returnData(), "\n");
        leftPointer = leftPointer.returnRight();
      }
      pointer = pointer.returnRight();
    }
  }

  insertNode(nodeX) {
    nodeX.assignIdentifier(this.noOfNodes);
    if (this.first === null) {
      this.first = nodeX;
      this.last = nodeX;
    } else {
      this.last = nodeX;
    }
    this.noOfNodes++;
  }

  connectNodeByRight(nodeX, nodeY) {
    nodeX.assignRight(nodeY);
  }

  connectNodeByLeft(nodeX, nodeY) {
    nodeX.assignLeft(nodeY);
  }

  //Coupled for this practice
  runByLeft() {
    let pointer = null;
    pointer = this.returnFirst();
    while (!this.endOfList(pointer)) {
      console.log(pointer.returnData);
      pointer = pointer.returnRight();
    }
  }
}
module.exports = LDL;
