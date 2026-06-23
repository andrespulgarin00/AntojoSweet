import { getProductos } from "../models/products_models.js";

export async function cargarProductos() {
    const productos = await getProductos();

    const contenedor = document.getElementById("productos");

    contenedor.innerHTML = productos.map(p => `
        <div>
            <h3>${p.nombre}</h3>
            <p>${p.precio}</p>
        </div>
    `).join("");
}
cargarProductos();