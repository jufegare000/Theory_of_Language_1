
var graficadorAFD;
var arbolAutomataFinito;
window.onload = function () {
    $('.sidenav').sidenav();
    $('.tabs').tabs();
    $('.tooltipped').tooltip();
    $("#test-swipe-1,#p5").css("min-height", (window.innerHeight - 200) + "px")
}

function backToEXInput() {
    $('.tabs .active').removeClass("active");
    $("#tab-swipe-1 a").addClass("active");
    $('.tabs').tabs();
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
    $("#btnProcesarExpresion").prop("disabled", (expresion.length == 0));

}

function procesarExpresion() {
    var expresion = document.getElementById("txtExpresion").value;
    var resultadoValidacion = validadorExpresion(expresion);
    if (resultadoValidacion.valida) {
        console.log("Buenas tardes");
        let prefix = infixToPrefix(expresion);
        console.log("Buenas tardes"+ prefix);
        let states = AF(prefix);
        console.log("sisas" + states);
        tablaAFD = new GraficadorAFD(prefix, states, "c2");
    }
    else {
        alert(resultadoValidacion.mensaje);
    }
}


function reconocerHilera() {
    $("#errror-hilera").html("");
    $("#hilera-valida").hide();
    $("#hilera-invalida").hide();
    var hilera = $("#txtHilera").val();
    if (graficadorAFD.AFD.hileraTieneCaracteresInvalidos(hilera)) {
        var caracteresInvalidos = graficadorAFD.AFD.obtenerCaracteresHileraInvalidos(hilera);
        $("#errror-hilera").html("La hilera tiene caracteres inválidos (<b>" + caracteresInvalidos.join() + "</b>)");
    }
    else {
        var estadoFinal = this.graficadorAFD.AFD.evaluarHilera(hilera);
        graficadorAFD.setEstadoActual(estadoFinal);
        if (estadoFinal.esAceptable) {
            $("#hilera-valida").show();
        }
        else {
            $("#hilera-invalida").show();
        }
    }
}
function genera_tabla() {
    // Obtener la referencia del elemento body
    var body = document.getElementsByTagName("body")[0];
   
    // Crea un elemento <table> y un elemento <tbody>
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");
   
    // Crea las celdas
    for (var i = 0; i < 2; i++) {
      // Crea las hileras de la tabla
      var hilera = document.createElement("tr");
   
      for (var j = 0; j < 2; j++) {
        // Crea un elemento <td> y un nodo de texto, haz que el nodo de
        // texto sea el contenido de <td>, ubica el elemento <td> al final
        // de la hilera de la tabla
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode("celda en la hilera "+i+", columna "+j);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      }
   
      // agrega la hilera al final de la tabla (al final del elemento tblbody)
      tblBody.appendChild(hilera);
    }
   
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}