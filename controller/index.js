var graficadorAFD;
var arbolAutomataFinito;
window.onload = function () {
  $(".sidenav").sidenav();
  $(".tabs").tabs();
  $(".tooltipped").tooltip();
  $("#test-swipe-1,#p5").css("min-height", window.innerHeight - 200 + "px");
};

function backToEXInput() {
  $(".tabs .active").removeClass("active");
  $("#tab-swipe-1 a").addClass("active");
  $(".tabs").tabs();
  $("#title-without-afd").show();
  $("#title-with-afd").hide();
  $("#content-input").show();
  $("#results").hide();
  $("#hilera-valida").hide();
  $("#hilera-invalida").hide();
  $("#txtHilera").val("");
}

function validarExpresionVacia() {
  var expresion = document.getElementById("txtExpresion").value;
  $("#btnProcesarExpresion").prop("disabled", expresion.length == 0);
}

function procesarExpresion() {
  var expresion = document.getElementById("txtExpresion").value;
  var resultadoValidacion = validadorExpresion(expresion);
  if (resultadoValidacion.valida) {
    console.log("Buenas tardes");
    let prefix = infixToPrefix(expresion);
    console.log("Buenas tardes" + prefix);
    let states = AF(prefix);
    this.states = states;
    console.log("sisas" + states);
    tablaAFD = new GraficadorAFD(prefix, states, "c2");
    this.tablaAFD = tablaAFD;
  } else {
    alert(resultadoValidacion.mensaje);
  }
}

function reconocerHilera() {
  $("#errror-hilera").html("");
  $("#hilera-valida").hide();
  $("#hilera-invalida").hide();
  var hilera = $("#txtHilera").val();

  if (this.tablaAFD.stringHasInvalidChars(hilera)) {
    var invalidChars = this.tablaAFD.getInvalidChars(hilera);
    $("#errror-hilera").html(
      "La hilera tiene caracteres inválidos (<b>" +
        invalidChars.join() +
        "</b>)"
    );
  } else {
    var finalState = this.tablaAFD.evaluateString(hilera);
    if (finalState !== null && finalState.getAcceptation()) {
      $("#hilera-valida").show();
    } else {
      $("#hilera-invalida").show();
    }
  }
}

function getValidChatsFromString(stringIn) {
  var chars = stringIn.split("");
  var validChars = [];
  for (var i = 0; i < stringIn.length; i++) {
    if (
      !this.hasEntries(chars[i]) &&
      validChars.indexOf("'" + chars[i] + "'") == -1
    ) {
      validChars.push("'" + chars[i] + "'");
    }
  }
  return validChars;
}
