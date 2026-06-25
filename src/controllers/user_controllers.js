import { verUsuarios, crearUsuarios } from "../models/user_models.js";
import { longitud } from "../utils/longitud.js";
import { validar } from "../utils/validar.js";
import { ok, errores } from "../utils/alerts.js";

function crearUsuario() {
  const REGISTRO = document.getElementById("registro");
    if(!REGISTRO){
        return
    }

  REGISTRO.addEventListener("submit", async (e) => {
    e.preventDefault();

    const contrasena = document.getElementById("contrasena").value;
    const confirmarContraseña = document.getElementById("confirmar").value;

    const LONGITUD = longitud(8, contrasena);
    if (LONGITUD === null) {
      return;
    }
    const VALIDAR = validar(contrasena, confirmarContraseña);
    if (VALIDAR === null) {
      return;
    }
    const DATOS = {
      nombre: document.getElementById("nombre").value,
      correo: document.getElementById("correo").value,
      telefono: document.getElementById("telefono").value,
      password_hash: LONGITUD,
    };

    const RESPUESTA = await crearUsuarios(DATOS);

    await ok("registro exitoso");
    window.location.href = "/src/views/pages/login.html";
  });
}



export async function ingresar(){
    const INICIAR = document.getElementById("iniciar");

    if(!INICIAR){
        return
    }
    INICIAR.addEventListener(("submit"), async (e) =>{
        e.preventDefault();

        const USUARIOS = await verUsuarios();
        const CONTRASENA = document.getElementById("password").value
        const CORREO = document.getElementById("correo").value
        const BUSCAR_USUARIOS = USUARIOS.find(user => user.correo === CORREO && user.password_hash === CONTRASENA)

        if(!BUSCAR_USUARIOS){
            await errores("no se pudo iniciar Secion","credenciales invalidas verificar por favor")
            return
        }
        
        localStorage.setItem("usuario_nombre", BUSCAR_USUARIOS.nombre);
        localStorage.setItem("isLoggedIn", "true");
        window.location.href="/src/views/pages/dashborad.html"
      
    })
 
}

ingresar();
crearUsuario();