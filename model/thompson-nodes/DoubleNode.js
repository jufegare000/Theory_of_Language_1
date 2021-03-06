class DNode {
  constructor(data) {
    this.rightNode = null;
    this.leftNode = null;
    this.data = data;
    this.identifier = 0;
  }

  assignData(data) {
    this.data = data;
  }

  assignIdentifier(value) {
    this.identifier = value;
  }

  assignRight(node) {
    this.rightNode = node;
  }
  assignLeft(node) {
    this.leftNode = node;
  }

  returnData() {
    return this.data;
  }

  returnRight() {
    return this.rightNode;
  }

  returnLeft() {
    return this.leftNode;
  }

  returnIdentifier() {
    return this.identifier;
  }
}

//module.exports = DNode;
