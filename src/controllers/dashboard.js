import { ingresar } from "./user_controllers.js";
import { cerrar } from "../utils/alerts.js";
import { verUsuarios } from "../models/user_models.js";


async function verificarSeguridad(){
    const SESIONACTIVA = localStorage.getItem("isLoggedIn");
    if (SESIONACTIVA !== "true"  ){
        await cerrar()
}
}

function cerrarSesioon(){
    const SALIR = document.getElementById("salir")
 if(!SALIR){
    return
 }
 SALIR.addEventListener(("click"),(e)=>{
    e.preventDefault()
    localStorage.removeItem("isLoggedIn")
    window.location.href="/index.html"
 })

}

async function nombres () {
    const USUARIO = await verUsuarios()
    let nombre = document.getElementById("name")
   

    nombre.innerHTML= USUARIO.map(na =>
        `<p>${na.nombre}</p>    
        `
        

)
    
}

verificarSeguridad()
cerrarSesioon()
nombres()
