class ThompsonUtils {
  constructor() {
    this.visited = [];
    this.index = 0;
  }

  runEntireGraph(node){
    let pointer = node;
      this.runByLeft(pointer);
      //this.runByRight(pointer);
  }

  runByLeft(pointer){
    let leftPointer = pointer;
    let rightPointer = pointer;
    if(leftPointer != null){
      if(!this.visited.includes(leftPointer)) {
        this.visited.push(leftPointer);
        leftPointer.assignIdentifier(this.index);
        this.index++;
      }
      console.log("Left");
      this.printPointer(leftPointer);

      this.runByLeft(leftPointer.returnLeft());
      this.runByRight(leftPointer.returnRight());
    }
    
  }

  runByRight(pointer){
    let rightPointer = pointer;
    let leftPointer = pointer;
    if(rightPointer != null){
      if(!this.visited.includes(rightPointer)) {
        this.visited.push(rightPointer);
        rightPointer.assignIdentifier(this.index);
        this.index++;
      }
      
      leftPointer = rightPointer.returnLeft();
      this.runByLeft(leftPointer);
      console.log("Right");
      this.printPointer(rightPointer);
      rightPointer = rightPointer.returnRight();
      this.runByRight(rightPointer);
    }
  }

  printPointer(pointer){
    console.log("Identifier: ", pointer.returnIdentifier());
    console.log("Data: ", pointer.returnData(),  "\n");
  }


}

module.exports = ThompsonUtils;
