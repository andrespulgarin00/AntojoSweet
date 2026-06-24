export function validar (palabra,palabra2){
    if (palabra === palabra2){
        return palabra
    }else{
        alert("la confirmacion d contraseña es incorecta")
        return null;
    }
}