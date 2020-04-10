class List {
  constructor() {
    this.noOfNodes = 0;
    this.first = null;
    this.last = null;
    5;
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

  insertNode(nodeX) {
    //nodeX.assignIdentifier(this.noOfNodes);
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

  setLast(node) {
    this.last = node;
  }
  setFirst(node) {
    this.first = node;
  }

  setNoOfNodes(noOfNodes) {
    this.noOfNodes = noOfNodes;
  }
}

//module.exports = List;
