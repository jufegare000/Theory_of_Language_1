let NodeGraph = require("../../model/NodeGraph");
let NodeT = require("../../model/NodeT");
class CreateConcat {
  constructor() {
    this.List = new NodeGraph();
  }

  createConcat(data1, data2) {
    let initial = this.addNode("λ");
    let second = this.addNode(data1);
    let third = this.addNode(data2);
    let fourth = this.addNode(null);
    this.connectNode(initial, second);
    this.connectNode(second, third);
    this.connectNode(third, fourth);
    //console.log(this.List);

    return this.List;
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

module.exports = CreateConcat;

let conc = new CreateConcat();
conc.createConcat();
