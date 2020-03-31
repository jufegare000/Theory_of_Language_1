function convertRecursive(er){

    var ERSinParentesis=suprimirParentesis(er);
    if(ERSinParentesis.er.indexOf("|")!=-1){
       
        return obtenerNodosUnion(ERSinParentesis);
    }
    else{
        if(ERSinParentesis.er.indexOf(".")!=-1){
            return obtenerNodosConcatenacion(ERSinParentesis);
        }
        else{
            if(er[er.length-1]=="*" || er[er.length-1]=="+"){
                return obtenerNodoClausura(er);
            }
            else{
                if(er[0]=="(" && er[er.length-1]==")"){
                    var erSinParentesis=er.substr(1,er.length-2);
                    return convertRecursive(erSinParentesis);
                }
            }
        }
    }
    return er;
}