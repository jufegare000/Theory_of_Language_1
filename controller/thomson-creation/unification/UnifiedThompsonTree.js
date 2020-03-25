let Concat = require("../base/CreateConcat");
let Plus = require("../base/CreatePlus");
let Or = require("../base/CreateOr");
let Star = require("../base/CreateStar");

class UnifiedThomsonTree{
    
    constructor(){}

    main(){
        //Try to connect the expresion (r|a).s
        //Create an instance of CreateOr and CreateConcat
        let orThompson = new Or("r", "a");
        let concatThompson = new Concat("aux", "s");
        let firstConMode = concatThompson.List.getFirstNode();
        let nextConcat = concatThompson.List.findNext(firstConMode);
        //let nextOfnext = concatThompson.List.findNext(nextConcat); 
        console.log("next: ", nextConcat);
        let last = orThompson.List.getLastNode();
        //console.log(" last node: ",last);
        //replace first node with orThompson


    }

}

let unified = new UnifiedThomsonTree();
unified.main();
