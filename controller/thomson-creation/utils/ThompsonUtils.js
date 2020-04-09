class ThompsonUtils {
  constructor() {
    this.visited = [];
    this.index = 0;
  }

  printPointer(pointer) {
    console.log("Identifier: ", pointer.returnIdentifier());
    console.log("Data: ", pointer.returnData(), "\n");
  }

  setIdentifiers(node, Identifier) {
    if (node.returnIdentifier() == 0) {
      node.assignIdentifier(Identifier.toString() + ".");
      this.visited.push(node);
      if (node.returnLeft() !== null) {
        Identifier++;
        this.printPointer(node);
        console.log("left\n");
        Identifier = this.setIdentifiers(
          node.returnLeft(),
          Identifier.toString()
        );
      }
      if (node.returnRight() != null) {
        Identifier++;
        this.printPointer(node);
        console.log("right\n");
        Identifier = this.setIdentifiers(
          node.returnRight(),
          Identifier.toString()
        );
      }
    } else {
      Identifier--;
    }
    return Identifier;
  }
}

module.exports = ThompsonUtils;
