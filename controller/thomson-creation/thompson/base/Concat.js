let List = require('../../base/LDL');
let DNode = require('../../base/DoubleNode');

class Concat{
    constructor(data1, data2){
        this.list = new List();
        this.createConcat(data1, data2)
    }

    createConcat(data1, data2){
        let first = new DNode(data1);
        let second = new DNode("λ");
        let third = new DNode(data2);
        let fourth = new DNode(null);
        this.list.insertNode(first);
        first.assignRight(second);
        second.assignRight(third);
        third.assignRight(fourth);
        this.list.insertNode(second);
        this.list.insertNode(third);
        this.list.insertNode(fourth);
        this.list.runByRight();
        //console.log(this.list);
    }
}

module.exports= Concat;
/* 
let concat = new Concat();
concat.createConcat("s", "r"); */