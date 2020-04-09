class StoreNodesAndRoutes {
  constructor() {
    this.visited = [];
    this.bigVisited = [];
    this.currentNode;
    this.arrayLamda = new Map();
  }

  addNodeToList(node) {
    this.arrayLamda.set(node, []);
  }

  addEdge(node, data) {
    this.arrayLamda.get(node).push(data);
  }

  convertToDeterministic(firstNode) {
    this.runBigGraph(firstNode);
    return this.arrayLamda;
  }

  runBigGraph(initialNode) {
    if (!this.bigVisited.includes(initialNode)) {
      this.addNodeToList(initialNode);
      this.currentNode = initialNode;
      this.runSubGraph(initialNode);
      this.bigVisited.push(initialNode);
    }

    let leftPointer = initialNode.returnLeft();
    let rightPointer = initialNode.returnRight();

    if (leftPointer !== null && !this.bigVisited.includes(leftPointer)) {
      this.bigVisited.push(leftPointer);
      this.currentNode = leftPointer;
      this.addNodeToList(leftPointer);
      if (this.currentNode.returnData() === "λ") {
        this.runSubGraph(leftPointer);
      } else {
        this.setAcceptationOrNot(
          this.currentNode.returnData(),
          this.currentNode
        );
      }
      this.runBigGraph(leftPointer);
    }
    if (rightPointer !== null && !this.bigVisited.includes(rightPointer)) {
      this.bigVisited.push(rightPointer);
      this.currentNode = rightPointer;
      this.addNodeToList(rightPointer);
      if (this.currentNode.returnData() === "λ") {
        this.runSubGraph(rightPointer);
      } else {
        this.setAcceptationOrNot(
          this.currentNode.returnData(),
          this.currentNode
        );
      }
      this.runBigGraph(rightPointer);
    }
  }

  runSubGraph(node) {
    if (!this.visited.includes(node)) {
      this.visited.push(node);
      this.setAcceptationOrNot(node.returnData(), node);
    }
    let leftPointer = node.returnLeft();
    let rightPointer = node.returnRight();
    let data;
    if (
      leftPointer !== null &&
      !this.visited.includes(leftPointer) &&
      node.returnData()
    ) {
      console.log("left\n");

      data = leftPointer.returnData();

      if (data === "λ") {
        this.runSubGraph(leftPointer);
      } else {
        this.setAcceptationOrNot(data, leftPointer);
      }
    }
    if (rightPointer != null && !this.visited.includes(rightPointer)) {
      console.log("right\n");
      data = rightPointer.returnData();

      if (data === "λ") {
        this.runSubGraph(rightPointer);
      } else {
        this.setAcceptationOrNot(data, rightPointer);
      }
    }
    this.visited = [];
  }

  setAcceptationOrNot(data, node) {
    if (this.currentNode === node && this.currentNode.returnData() !== "λ") {
      if (data === null) {
        this.addEdge(this.currentNode, node);
      } else {
        this.addEdge(this.currentNode, node);
      }
    } else if (this.currentNode.returnData() !== "λ") {
      return;
    } else if (data === null) {
      this.addEdge(this.currentNode, node);
    } else {
      this.addEdge(this.currentNode, node);
    }
  }
}

module.exports = StoreNodesAndRoutes;
