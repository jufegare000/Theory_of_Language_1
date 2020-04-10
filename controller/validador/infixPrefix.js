//let InfixToPreFix = require("../thomson-creation/utils/InfixToPreFix");

function infixToPrefix(expresion){
    expresion=agregarPuntosFaltantes(expresion);
    let infix = new InfixToPreFix();
    let prefix = infix.infixToPrez(expresion);
    return prefix;
}
function agregarPuntosFaltantes(er){
    var resultado="";
    var caracteres=er.split("");
    resultado=caracteres[0];
    for(var i=1; i<er.length; i++){
        if(caracteres[i-1]!="." &&caracteres[i-1]!="|" && caracteres[i-1]!="(" && !escaracterEspecial(caracteres[i])){
            resultado+="."+caracteres[i];
        }
        else{
            resultado+=caracteres[i];
        }
    }
    return resultado;
}
function escaracterEspecial(caracter){
    return caracter=="." || caracter=="|" || caracter=="+"|| caracter=="*" || caracter==")"
}