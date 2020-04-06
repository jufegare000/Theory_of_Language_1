class ThompsonUtils {
  constructor() {
    this.visited = [];
    this.index = 0;
  }

  runEntireGraph(listOfNodes) {
    let pointer = listOfNodes.list.returnFirst();
    this.runByLeft(pointer);
    listOfNodes.list.setNoOfNodes(this.index);
    //this.runByRight(pointer);
  }

  runByLeft(pointer) {
    let leftPointer;
    let rightPointer;
    if (pointer !== null) {
      if (!this.visited.includes(pointer)) {
        this.visited.push(pointer);
        pointer.assignIdentifier(this.index);
        this.index++;
        this.printPointer(pointer);
      }
      console.log("Left");
      leftPointer = pointer.returnLeft();
      rightPointer = pointer.returnRight();
      if (!this.visited.includes(leftPointer)) {
        this.runByLeft(leftPointer);
      }
      if (!this.visited.includes(rightPointer)) {
        this.runByRight(rightPointer);
      }
    }
  }

  runByRight(pointer) {
    let leftPointer;
    let rightPointer;
    if (pointer != null) {
      console.log("Right");

      if (!this.visited.includes(pointer)) {
        this.visited.push(pointer);
        pointer.assignIdentifier(this.index);
        this.index++;
        this.printPointer(pointer);
      }

      leftPointer = pointer.returnLeft();
      if (!this.visited.includes(rightPointer)) {
        this.runByLeft(leftPointer);
      }

      rightPointer = rightPointer.returnRight();
      this.runByRight(rightPointer);
    }
  }

  printPointer(pointer) {
    console.log("Identifier: ", pointer.returnIdentifier());
    console.log("Data: ", pointer.returnData(), "\n");
  }
}

module.exports = ThompsonUtils;
