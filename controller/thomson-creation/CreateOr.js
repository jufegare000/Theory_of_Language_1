let NodeGraph = require("../../model/NodeGraph");
let NodeT = require("../../model/NodeT");
class CreateOr {
  constructor() {
    this.List = new NodeGraph();
  }

  createOr() {
    let initial = this.addNode("λ");
    let second = this.addNode("r");
    let third = this.addNode("λ");
    let fourth = this.addNode("s"); 
    let fifth = this.addNode("λ");
    let sixth = this.addNode(null);

    this.connectNode(initial, second);
    this.connectNode(second, third);
    this.connectNode(initial, fourth);
    this.connectNode(fourth, fifth);
    this.connectNode(fifth, sixth);
    this.connectNode(third, sixth);
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
let cor = new CreateOr();
cor.createOr();
