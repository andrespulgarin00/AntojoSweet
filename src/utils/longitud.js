export function longitud (cantidad, palabra){
const tieneLongitud = palabra.length > cantidad;
  const tieneMayuscula = /[A-Z]/.test(palabra);
  const tieneNumero = /[0-9]/.test(palabra);

  if (tieneLongitud && tieneMayuscula && tieneNumero) {
    return palabra;
  } else {
    alert("La contraseña debe tener más de " + cantidad + " caracteres, una mayúscula y un número");
    return null;
  }
}


