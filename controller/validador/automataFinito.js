//let Unifikate = require("./thomson-creation/construction/Unifikate.js");

function AF(expresion){
    let unifyK = new Unifikate();
    let unifykate = unifyK.unify(expresion);
    return unifykate;
}