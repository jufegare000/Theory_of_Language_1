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
    $("#btnProcesarExpresion").prop("disabled", (expresion.length == 0))

}

function procesarExpresion() {
    var expresion = document.getElementById("txtExpresion").value;
    var resultadoValidacion = validadorExpresion(expresion);
    if (resultadoValidacion.valida) {
        $("#ex-title").text(expresion);
        $("#title-without-afd").hide();
        $("#title-with-afd").show();
        $("#content-input").hide();
        $("#results").show();
        var cabezaArbol = convertirERAArbolSintactico(expresion)
        graficarArbol("p5", cabezaArbol);
        var cabezaArbolThomson = convertirArbolsintacticoAConstruccionsDeThomson(cabezaArbol);
        var estadoIncial = convertirArbolThomsonAAFD(cabezaArbolThomson, expresion);
        arbolAutomataFinito = new AFD(estadoIncial);
        arbolAutomataFinito.renombrarEstados();
        arbolAutomataFinito.eliminarEstadosIguales();
        graficadorAFD = new GraficadorAFD(arbolAutomataFinito, "c2");
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

function descargarCodigo() {
    generarCodigoDesdeAFD(arbolAutomataFinito, $("#ex-title").text());
}
