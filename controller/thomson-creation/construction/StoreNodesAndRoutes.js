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
      this.runSubGraph(leftPointer);
      this.runBigGraph(leftPointer);
    }
    if (rightPointer !== null && !this.bigVisited.includes(rightPointer)) {
      this.bigVisited.push(rightPointer);
      this.currentNode = rightPointer;
      this.addNodeToList(rightPointer);
      this.runSubGraph(rightPointer);
      this.runBigGraph(rightPointer);
    }
  }

  runSubGraph(node) {
    this.visited.push(node);
    this.setAcceptationOrNot(this.currentNode, node);
    let leftPointer = node.returnLeft();
    let rightPointer = node.returnRight();
    let data;
    if (leftPointer !== null && !this.visited.includes(leftPointer)) {
      console.log("left\n");

      data = leftPointer.returnData();
      this.setAcceptationOrNot(data, leftPointer);
      if (data === "λ") {
        this.runSubGraph(leftPointer);
      }
    }
    if (rightPointer != null && !this.visited.includes(rightPointer)) {
      console.log("right\n");

      this.setAcceptationOrNot(data, rightPointer);
      if (data === "λ") {
        this.runSubGraph(rightPointer);
      }
    }
    this.visited = [];
  }

  setAcceptationOrNot(data, node) {
    if (this.currentNode === node && this.currentNode.returnData() !== "λ") {
      if (data === null) {
        this.addEdge(this.currentNode, { acceptation: 1, node });
      } else {
        this.addEdge(this.currentNode, { acceptation: 0, node });
      }
    } else if (this.currentNode.returnData() !== "λ") {
      return;
    } else if (data === null) {
      this.addEdge(this.currentNode, { acceptation: 1, node });
    } else {
      this.addEdge(this.currentNode, { acceptation: 0, node });
    }
  }
}

module.exports = StoreNodesAndRoutes;
