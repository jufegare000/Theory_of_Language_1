let NodeGraph = require("../../../model/NodeGraph");
let NodeT = require("../../../model/NodeT");
class CreateConcat {
  constructor(r, s) {
    this.List = new NodeGraph();
    this.createConcat(r, s);
  }

  createConcat(r, s) {
    let initial = this.addNode(r);
    let second = this.addNode("λ");
    let third = this.addNode(s);
    let fourth = this.addNode(null);
    this.connectNode(initial, second);
    this.connectNode(second, third);
    this.connectNode(third, fourth);
    console.log("Concatenate expressions: \n", this.List);
  }

  addNode(data) {
    let node = new NodeT();
    node.identifier = this.List.noOfVertex + "conc";
    node.data = data;
    this.List.addVertex(node);
    return node;
  }
  connectNode(a, b) {
    this.List.addEdge(a, b);
  }
}

module.exports = CreateConcat;