let NodeGraph = require("../../model/NodeGraph");
let NodeT = require("../../model/NodeT");
class CreatePlus {
  constructor() {
    this.List = new NodeGraph();
  }

  createPlus() {
    let initial = this.addNode("λ");
    let second = this.addNode("r");
    let third = this.addNode("λ");
    let fourth = this.addNode(null);
    this.connectNode(initial, second);
    this.connectNode(second, third);
    this.connectNode(third, second);
    this.connectNode(initial, fourth);
    console.log(this.List);
  }

  addNode(data) {
    let node = new NodeT();
    node.identifier = this.List.noOfVertex;
    node.data = data;
    this.List.addVertex(node);
    return node;
  }
  connectNode(a, b) {
    this.List.addEdge(a, b);
  }
}
let plus = new CreatePlus();
plus.createPlus();