let List = require('../../model/LDL');
let DNode = require('../../model/DoubleNode');


class Or{
    constructor(data1, data2){
        this.list = new List();
        this.createOr(data1, data2);
    }

    createOr(data1, data2){
        let first = new DNode("λ");
        let second = new DNode(data1);
        let third = new DNode("λ");
        let fourth = new DNode(data2);
        let fifth = new DNode("λ");
        let sixth = new DNode(null);
        first.assignRight(second);
        second.assignRight(third);
        first.assignLeft(fourth);
        fourth.assignRight(fifth);
        fifth.assignRight(sixth);
        third.assignRight(sixth);
        this.list.insertNode(first);
        this.list.insertNode(second);
        this.list.insertNode(third);
        this.list.insertNode(fourth);
        this.list.insertNode(fifth);
        this.list.insertNode(sixth);
        //this.list.runByRight();
        //console.log(this.list);
    }
}

module.exports= Or;

 let or = new Or("s", "r");