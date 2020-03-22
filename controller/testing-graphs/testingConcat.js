let CreateConcat = require("../thomson-creation/CreateConcat")

class Testing {
    constructor(){}

    main(){
        let concatClass = new CreateConcat();
        let mapTreeConcat = concatClass.createConcat("x", "y");
        console.log(mapTreeConcat);
    }

}

let testing = new Testing();
testing.main();