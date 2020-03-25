class NodeGraph {

  constructor() {
    this.noOfVertex = 0;
    this.AdjacencyList = new Map();
    this.headNode = null;
    this.lastNode = null
  }

  addEdge(v, w) {
    this.AdjacencyList.get(v).push(w);
  }

  addVertex(v) {
    this.AdjacencyList.set(v, []);
    if(this.noOfVertex === 0){
      this.headNode = v;
      this.lastNode = v;
    }else{
      this.lastNode = v;
    }
    this.noOfVertex++;
  }

  getFirstNode(){
   return this.headNode;
  }

  getLastNode(){
    return this.lastNode;
  }

  replaceNode(keyNode, data){
      this.AdjacencyList.set(keyNode, data);
  }

  findDataFromNode(v){
    var data = this.AdjacencyList.get(v);
    return data;
  }

  findNext(v){
    let iterator = this.AdjacencyList.values();
    let keys = this.AdjacencyList.keys();
    console.log("v is: ",v);
    for(var i of keys){
      console.log("i is: ", i);
      
      console.log("node is: ", i.identifier);
      if(i===v){
        return iterator.next().value;
      }
      iterator.next();
    }
  }
}

module.exports = NodeGraph;
