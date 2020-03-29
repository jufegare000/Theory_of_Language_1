let Or = require('./Or');
let And = require('./Concat');
let Star = require('./Star');
let Plus = require('./Plus');
let DNode = require('../../model/DoubleNode');
let LDL = require('../../model/LDL');
let Utils = require('./utils/ThompsonUtils');

class Unify {
    constructor(){
        this.utils = new Utils();
    }

    orStar(){

        //(r|s)*
        let or = new Or("r", "s");
        let star = new Star("aux");

        let firstOr = or.list.returnFirst();
        let firStar = star.list.returnFirst();
        let lastOr = or.list.returnLast();
        let lastStar = star.list.returnLast();
        lastOr.assignData("λ");
        firStar.assignRight(firstOr);

        lastOr.assignRight(lastStar);
        lastOr.assignLeft(firstOr);
        
        console.log("\n\n\n")

        this.utils.reAssignIndexes(star.list.returnFirst());

        console.log("\n\n\n")
        star.list.runByRight();
        console.log(star.list.returnLast());
       // firStar.assignRight("prmero", firstOr);
        //console.log("aux: ",nodeAux);
    }


    orPlus(){

        //(r|s)+
        let or = new Or("r", "s");
        let plus = new Plus("aux");

        let firstOr = or.list.returnFirst();
        let firsrPlus = plus.list.returnFirst();
        let lastOr = or.list.returnLast();
        let lastPlus = plus.list.returnLast();
        lastOr.assignData("λ");
        firsrPlus.assignRight(firstOr);

        lastOr.assignRight(lastPlus);
        lastOr.assignLeft(firstOr);
        
        console.log("\n\n\n")

        this.utils.reAssignIndexes(plus.list.returnFirst());

        console.log("\n\n\n")
        plus.list.runByRight();
        console.log(plus.list.returnLast());
    }

    orOrSingle(){

        //(r|s)|a
        let or1 = new Or("r", "s");
        let or2 = new Or("aux", "a");

        let firstOr1 = or1.list.returnFirst();
        let firstOr2 = or2.list.returnFirst();
        let lastOr1 = or1.list.returnLast();
        let lastOr2 = or2.list.returnLast();

        lastOr1.assignData("λ");
        firstOr2.assignRight(firstOr1);
        lastOr1.assignRight(lastOr2);

        
        console.log("\n\n\n")

        this.utils.reAssignIndexes(or2.list.returnFirst());

        console.log("\n\n\n")
        or2.list.runByRight();
        console.log(or2.list.returnLast());
    }

    orOrComposed(){
        let or1 = new Or("r", "s");
        let or2 = new Or("a", "b");
        let or3 = new Or("aux", "aux");

        let firstOr1 = or1.list.returnFirst();
        let firstOr2 = or2.list.returnFirst();
        let firstOr3 = or3.list.returnFirst();
        let lastOr1 = or1.list.returnLast();
        let lastOr2 = or2.list.returnLast();
        let lastOr3 = or3.list.returnLast();

        lastOr1.assignData("λ");
        lastOr2.assignData("λ");

        firstOr3.assignRight(firstOr1);
        firstOr3.assignLeft(firstOr2);

        
        lastOr1.assignRight(lastOr3);
        lastOr2.assignRight(lastOr3);

        
        console.log("\n\n\n")

        this.utils.runEntireGraph(or3.list.returnFirst());

        console.log("\n\n\n")
        //or3.list.runByRight();
        //console.log(or3.list.returnLast());
    }


}

let unify = new Unify();
unify.orOrComposed();