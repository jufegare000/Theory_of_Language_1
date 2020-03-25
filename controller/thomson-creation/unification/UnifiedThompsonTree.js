let Concat = require("../base/CreateConcat");
let Plus = require("../base/CreatePlus");
let Or = require("../base/CreateOr");
let Star = require("../base/CreateStar");
let NodeGraph = require('../../../model/NodeGraph');
let NodeT = require('../../../model/NodeT');

class UnifiedThomsonTree{
    
    constructor(){}

    main(){
        //Try to connect the expresion (r|a).s
        //Create an instance of CreateOr and CreateConcat
        let orThompson = new Or("r", "a");
        let concatThompson = new Concat("aux", "s");
        this.unifyThree(orThompson, concatThompson);
        /* let firstConMode = concatThompson.List.getFirstNode();
        let nextConcat = concatThompson.List.findNext(firstConMode);
        let firsOrNode = orThompson.List.getFirstNode();
        //let nextOfnext = concatThompson.List.findNext(nextConcat); 
        let lastOr = orThompson.List.getLastNode();
        let dataFirstOr = orThompson.List.findDataFromNode(firsOrNode)
        let dataNextConc = concatThompson.List.findDataFromNode(nextConcat);
        console.log("retrieved data: ", dataFirstOr);
        concatThompson.List.replaceNode(firstConMode, dataFirstOr);
        orThompson.List.replaceNode(lastOr, dataNextConc)
        console.log("result of insertion",concatThompson.List);
        console.log("result of concat", orThompson.List)
        console.log("next: ", nextConcat); */
        //must unify 
    }

    unifyThree(or, and){
        let newTree = this.unify(or.List, and.List); 
        console.log("newTree", newTree);

        /*
        console.log("lsit: ",newTree);
        for(let i in or.List.AdjacencyList){
            console.log("i", i);
        } */
        /* 
        let firstNode = or.List.getFirstNode();
        newTree.addData(firstNode, or.List.findDataFromNode(firstNode));
        console.log(newTree);
 */
    }

    unify(orList, andList){

        console.log("orlist: ",orList);
        let iterator1 = orList.AdjacencyList;
        let keys1 = orList.AdjacencyList.keys();
        let newList = new NodeGraph();
        console.log("nuevo: ", newList);
        let j = 0;
        for (var i of keys1){
          console.log("i: ", i.data);
          let newNode = new NodeT(j, i.data);
          newList.addData(newNode, orList.findDataFromNode(i));
          //orList.findDataFromNode(i)
          j++;
          console.log("nuevo nodo",newList);
        }
        return newList;
      }

}

let unified = new UnifiedThomsonTree();
unified.main();
