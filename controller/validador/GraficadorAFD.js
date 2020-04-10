

function GraficadorAFD(expr, states, contenedor) {
    this.states = states;
    this.contenedor = contenedor;
    this.expr = expr;
    $("#" + contenedor).html("");
    this.graficarAFD();
    this.setEstadoActual(this.states[0]);
}

GraficadorAFD.prototype.setEstadoActual = function (state) {
    var stateName = this.nameState();
    $(".indicador-estado").html("");
    $("#estado-" + stateName[0]).html('<i class="material-icons">arrow_forward</i>')
}
GraficadorAFD.prototype.graficarAFD = function (){
    var symbols = this.obtenerEntradasAFD();
    var stateName = this.nameState();
    var html = "<table class='tbl-afd' cellspacing='0' border='1'>" +
        "<tr class='tr-entradas'><td class='celda-pequena'></td><td></td>";
    for (var i = 0; i < symbols.length; i++) {
        html += "<td>" + symbols[i] + "</td>";

    }
    html += "<td></td></tr>"
    var variable;  
    for (var i = 0; i < this.states.length; i++) {
        variable = this.states[i];
        var estadoTransicion = variable.getTransitions();
        html += "<tr class='tr-estado'><td class='indicador-estado' id='estado-" + stateName[i] + "'></td><td class='celda-pequena'>" + stateName[i] + "</td>";
        for (var j = 0; j < estadoTransicion.length; j++) {
            
            var stateTo = estadoTransicion[j].getStateTo();
            html += "<td class='td-transicion'>" + stateTo.getName() + "</td>";
        }
        if (estadoTransicion.length === 0){
            html += "<td class='td-transicion'>" + "E" + "</td>";
        }
        html += "<td class='celda-pequena'>" + ((variable.getAcceptation()) ? 1 : 0) + "</td></tr>";
    }
    html += "</table>";
    $("#" + this.contenedor).html(html);
}

GraficadorAFD.prototype.obtenerEntradasAFD = function (){
    let symbols = [];
    let visited = [];
    let operators = ["|", "+",".","*"];
    for(var i=0;i < this.expr.length; i++){
        let caracter = this.expr[i];
        if (!operators.includes(caracter)){
            if(!visited.includes(caracter))symbols.push(caracter);
            visited.push(caracter);
        }
    }
    return symbols;    
}

GraficadorAFD.prototype.nameState = function (){
    var nameState = [];
    for(var i=0;i<this.states.length;i++){
        this.states[i].setName(i);
        nameState.push(i);
    }
    return nameState;
}
