class ToDeterministic {
  constructor() {
    this.visited = [];
    this.index = 0;
    this.arrayLamda = [];
  }

  convertToDeterministic() {}
  setIdentifiersLambda(node, Identifier) {
    if (node.returnIdentifier() == 0) {
      node.assignIdentifier(Identifier);
      while (Identifier == this.index) {
        console.log(this.index);
        console.log(this.arrayLamda);
        this.visited.push(node);
        console.log(this.visited);
        if (
          node.returnLeft() !== null &&
          node.returnLeft().returnData() === "λ"
        ) {
          Identifier++;
          this.arrayLamda.push[this.index++];
          console.log(this.arrayLamda);
          Identifier = this.setIdentifiersLambda(node.returnLeft(), Identifier);
        }
        if (
          node.returnRight() !== null &&
          node.returnRight().returnData() === "λ"
        ) {
          Identifier++;
          this.arrayLamda.push[this.index++];
          console.log(this.arrayLamda);
          Identifier = this.setIdentifiersLambda(
            node.returnRight(),
            Identifier
          );
        }
      }
      if (node.returnRight() === null) {
        Identifier--;
        this.index--;
      }
    }
    return Identifier;
  }
}

module.exports = ToDeterministic;
