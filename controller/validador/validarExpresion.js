function validadorExpresion(expresion) {
  var caracteres = expresion.split("");
  var parentecisAbiertos = [];
  for (var i = 0; i < caracteres.length; i++) {
    if (caracteres[i] == "(") {
      parentecisAbiertos.push("(");
    }
    if (caracteres[i] == ")") {
      if (parentecisAbiertos.length > 0) {
        parentecisAbiertos.pop();
      } else {
        return {
          valida: false,
          mensaje: "Hay más paréntesis cerrados que abiertos.",
        };
      }
    }
  }
  if (parentecisAbiertos.length == 0) {
    return { valida: true, mensaje: "" };
  } else {
    return {
      valida: false,
      mensaje: "Hay más paréntesis abiertos que cerrados.",
    };
  }
}
