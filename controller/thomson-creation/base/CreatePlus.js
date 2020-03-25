let NodeGraph = require("../../../model/NodeGraph");
let NodeT = require("../../../model/NodeT");
class CreatePlus {
  constructor(data) {
    this.List = new NodeGraph();
    this.createPlus(data);
  }

  createPlus(data) {
    let initial = this.addNode("λ");
    let second = this.addNode(data);
    let third = this.addNode("λ");
    let fourth = this.addNode(null);
    this.connectNode(initial, second);
    this.connectNode(second, third);
    this.connectNode(third, second);
    this.connectNode(initial, fourth);
    console.log("Star character: \n",this.List);
  }

  addNode(data) {
    let node = new NodeT();
    node.identifier = this.List.noOfVertex + "plus";
    node.data = data;
    this.List.addVertex(node);
    return node;
  }
  connectNode(a, b) {
    this.List.addEdge(a, b);
  }
}

module.exports=CreatePlus;