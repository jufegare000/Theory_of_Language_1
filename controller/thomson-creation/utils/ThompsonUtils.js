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
    let leftPointer = pointer;
    let rightPointer = pointer;
    if (leftPointer != null) {
      if (!this.visited.includes(leftPointer)) {
        this.visited.push(leftPointer);
        leftPointer.assignIdentifier(this.index);
        this.index++;
      }
      console.log("Left");
      this.printPointer(leftPointer);
      rightPointer = leftPointer.returnLeft();
      if (!this.visited.includes(rightPointer)) {
        this.runByLeft(leftPointer.returnLeft());
      } else if (rightPointer !== null) {
        this.printPointer(rightPointer);
      }
      this.runByRight(leftPointer.returnRight());
    }
  }

  runByRight(pointer) {
    let rightPointer = pointer;
    let leftPointer = pointer;
    if (rightPointer != null) {
      if (!this.visited.includes(rightPointer)) {
        this.visited.push(rightPointer);
        rightPointer.assignIdentifier(this.index);
        this.index++;
      }

      leftPointer = rightPointer.returnLeft();
      if (!this.visited.includes(rightPointer)) {
        this.runByLeft(leftPointer);
      }
      console.log("Right");
      this.printPointer(rightPointer);
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
