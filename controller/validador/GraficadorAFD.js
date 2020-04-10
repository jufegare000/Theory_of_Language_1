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
  $("#estado-" + stateName[0]).html(
    '<i class="material-icons">arrow_forward</i>'
  );
};
GraficadorAFD.prototype.graficarAFD = function () {
  var symbols = this.obtenerEntradasAFD();
  var stateName = this.nameState();
  var html =
    "<table class='tbl-afd' cellspacing='0' border='1'>" +
    "<tr class='tr-entradas'><td class='celda-pequena'></td><td></td>";
  for (var i = 0; i < symbols.length; i++) {
    html += "<td>" + symbols[i] + "</td>";
  }
  html += "<td></td></tr>";
  var variable;
  for (var i = 0; i < this.states.length; i++) {
    variable = this.states[i];
    var estadoTransicion = variable.getTransitions();
    html +=
      "<tr class='tr-estado'><td class='indicador-estado' id='estado-" +
      stateName[i] +
      "'></td><td class='celda-pequena'>" +
      stateName[i] +
      "</td>";
    for (var j = 0; j < symbols.length; j++) {
      html +=
        "<td class='td-transicion'>" +
        this.getStateToAFD(variable, symbols[j]) +
        "</td>";
    }

    html +=
      "<td class='celda-pequena'>" +
      (variable.getAcceptation() ? 1 : 0) +
      "</td></tr>";
  }
  html += "</table>";
  $("#" + this.contenedor).html(html);
};

GraficadorAFD.prototype.obtenerEntradasAFD = function () {
  let symbols = [];
  let visited = [];
  let operators = ["|", "+", ".", "*"];
  for (var i = 0; i < this.expr.length; i++) {
    let caracter = this.expr[i];
    if (!operators.includes(caracter)) {
      if (!visited.includes(caracter)) symbols.push(caracter);
      visited.push(caracter);
    }
  }
  return symbols;
};

GraficadorAFD.prototype.nameState = function () {
  var nameState = [];
  for (var i = 0; i < this.states.length; i++) {
    this.states[i].setName(i);
    nameState.push(i);
  }
  return nameState;
};

GraficadorAFD.prototype.getStateToAFD = function (currentState, symbol) {
  let transitions = currentState.getTransitions();
  for (let i = 0; i < transitions.length; i++) {
    if (transitions[i].getSymbol() === symbol) {
      return transitions[i].getStateTo().getName();
    }
  }
  return "";
};

GraficadorAFD.prototype.stringHasInvalidChars = function (stringIn) {
  return this.getInvalidChars(stringIn).length > 0;
};

GraficadorAFD.prototype.getInvalidChars = function (stringIn) {
  var chars = stringIn.split("");
  var invalidChars = [];
  for (var i = 0; i < chars.length; i++) {
    if (
      !this.hasEntries(chars[i]) &&
      invalidChars.indexOf("'" + chars[i] + "'") == -1
    ) {
      invalidChars.push("'" + chars[i] + "'");
    }
  }
  return invalidChars;
};

GraficadorAFD.prototype.hasEntries = function (input) {
  let initialState = this.states[0];
  let transisitons = initialState.getTransitions();
  for (var j = 0; j < transisitons.length; j++) {
    if (transisitons[j].getSymbol() == input) {
      return true;
    }
  }
  return false;
};

GraficadorAFD.prototype.evaluateString = function (string) {
  var caracteres = string.split("");
  var estado = this.states[0];
  for (var i = 0; i < caracteres.length; i++) {
    estado = this.getStateFromEntry(estado, caracteres[i]);
  }
  return estado;
};

GraficadorAFD.prototype.getStateFromEntry = function (currentState, entry) {
  if (currentState !== null) {
    let transitions = currentState.getTransitions();
    for (var i = 0; i < transitions.length; i++) {
      if (transitions[i].getSymbol() == entry) {
        return transitions[i].getStateTo();
      }
    }
  }
  return null;
};
