import { verUsuarios, crearUsuarios } from "../models/user_models.js";
import { longitud } from "../utils/longitud.js";
import { validar } from "../utils/validar.js";


export function crearUsuario(){
    const REGISTRO = document.getElementById("registro")
    REGISTRO.addEventListener(("submit"),async(e)=>{
        e.preventDefault();

        const contrasena = document.getElementById("contrasena").value
        const confirmarContraseña = document.getElementById("confirmar").value

        const LONGITUD = longitud(8,contrasena)
        const VALIDAR = validar(contrasena,confirmarContraseña)

        if (LONGITUD === null || VALIDAR === null ) {
             return;
  }
        const DATOS = {
            nombre: document.getElementById("nombre").value,
            correo: document.getElementById("correo").value,
            telefono: document.getElementById("telefono").value,
            nombre: document.getElementById("nombre").value,
            password_hash: LONGITUD
        }

        const RESPUESTA = await crearUsuarios(DATOS);

        console.log("respuesta", DATOS)
    })
 
}

crearUsuario()