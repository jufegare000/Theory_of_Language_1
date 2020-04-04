let List = require('../../model/LDL');
let DNode = require('../../model/DoubleNode');


class Unique{
    constructor(data1){
        this.list = new List();
        this.createUnique(data1)
    }

    createUnique(data1, data2){
        let first = new DNode(data1);
        let last = new DNode(null);
        this.list.insertNode(first);
        this.list.insertNode(last);
        first.assignRight(last);
        this.list.runByRight();
        //console.log(this.list);
    }
}

module.exports= Concat;