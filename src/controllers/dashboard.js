
import { cerrar } from "../utils/alerts.js";



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
    localStorage.removeItem("usuario_nombre");
    window.location.href="/index.html"
 })

}
function mostrarNombreUsuario() {
    const contenedorNombre = document.getElementById("name");
    
    if (!contenedorNombre) return;


    const nombreUsuario = localStorage.getItem("usuario_nombre");

    if (nombreUsuario) {
        contenedorNombre.innerHTML = `<p>${nombreUsuario}</p>`;
    } else {
        contenedorNombre.innerHTML = `<p>Usuario</p>`;
    }
}

verificarSeguridad()
cerrarSesioon()
mostrarNombreUsuario()
