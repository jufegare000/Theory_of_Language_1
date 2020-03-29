let List = require('../../model/LDL');
let DNode = require('../../model/DoubleNode');

class Star{
    constructor(data){
        this.list = new List();
        this.createStar(data);
    }

    createStar(data){
        let first = new DNode("λ");
        let second = new DNode(data);
        let third = new DNode("λ");
        let fourth = new DNode(null);
        this.list.insertNode(first);
        first.assignRight(second);
        first.assignLeft(fourth);
        second.assignRight(third);
        third.assignLeft(second);
        third.assignRight(fourth);
        this.list.insertNode(second);
        this.list.insertNode(third);
        this.list.insertNode(fourth);
        this.list.runByRight();
        console.log(this.list);
    }
}

module.exports= Star;

// let star = new Star("x", "s");
