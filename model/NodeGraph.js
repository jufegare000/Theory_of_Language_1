

class NodeGraph {
  constructor() {
    this.noOfVertex = 0;
    this.AdjacencyList = new Map();
  }

  addEdge(v, w) {
    this.AdjacencyList.get(v).push(w);
  }
  addVertex(v) {
    this.AdjacencyList.set(v, []);
    this.noOfVertex++;
  }
}

module.exports= NodeGraph;
