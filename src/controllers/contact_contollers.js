import { enviarContacto } from "../models/contact_models.js";

export function initContactForm() {
    const form = document.getElementById("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const datos = {
            nombre: document.getElementById("nombre").value,
            apellidos: document.getElementById("apellido").value,
            correo: document.getElementById("correo").value,
            asunto: document.getElementById("asunto").value,
            mensaje: document.getElementById("mensaje").value
        };

        const res = await enviarContacto(datos);

        console.log("Enviado:", res);
    });
}
 initContactForm();
