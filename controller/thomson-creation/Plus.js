let List = require('../../base/LDL');
let DNode = require('../../base/DoubleNode');

class Plus{
    constructor(data){
        this.list = new List();
        this.createPlus(data);
    }

    createPlus(data){
        let first = new DNode("λ");
        let second = new DNode(data);
        let third = new DNode("λ");
        let fourth = new DNode(null);
        this.list.insertNode(first);
        first.assignRight(second);
        second.assignRight(third);
        third.assignLeft(second);
        third.assignRight(fourth);
        this.list.insertNode(second);
        this.list.insertNode(third);
        this.list.insertNode(fourth);
        this.list.runByRight();
        //console.log(this.list);
    }
}

module.exports= Plus;
