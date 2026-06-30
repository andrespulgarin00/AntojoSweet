
import { cerrar } from "../utils/alerts.js";
import { errores, ok } from "../utils/alerts.js";
import { crearProducto, subirImagenProducto, verProductos } from "../models/products_models.js";

const formateadorMoneda = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    currencyDisplay: "symbol",
    maximumFractionDigits: 0
});

function formatearPrecio(valor) {
    const numero = Number(valor ?? 0);
    return formateadorMoneda.format(Number.isFinite(numero) ? numero : 0);
}

function verificarSeguridad() {
    const sesionActiva = localStorage.getItem("isLoggedIn");
    if (sesionActiva !== "true") {
        cerrar();
    }
}

function cerrarSesion() {
    const salir = document.getElementById("salir");
    if (!salir) {
        return;
    }

    salir.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("usuario_nombre");
        window.location.href = "/index.html";
    });
}

function mostrarNombreUsuario() {
    const contenedorNombre = document.getElementById("name");
    if (!contenedorNombre) return;

    const nombreUsuario = localStorage.getItem("usuario_nombre");
    contenedorNombre.innerHTML = `<p>${nombreUsuario || "Usuario"}</p>`;
}

function calcularEstadisticas(productos) {
    const total = productos.length;
    const stockBajo = productos.filter((producto) => Number(producto.stock ?? 0) > 0 && Number(producto.stock ?? 0) <= 5).length;
    const categorias = productos.reduce((acumulado, producto) => {
        const categoria = (producto.categoria || "Sin categoría").trim();
        acumulado[categoria] = (acumulado[categoria] || 0) + 1;
        return acumulado;
    }, {});
    const categoriaPrincipal = Object.entries(categorias).sort((a, b) => b[1] - a[1])[0]?.[0] || "Sin datos";

    return { total, stockBajo, categoriaPrincipal };
}

function renderizarTabla(productos) {
    const tbody = document.getElementById("productos-tbody");
    if (!tbody) return;

    if (!productos.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding: 32px;">No hay productos registrados.</td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = productos.map((producto) => {
        const imagen = producto.imagen_url || "/src/views/images/fondo.png";
        const descripcion = producto.descripcion || "Sin descripción";
        const stock = Number(producto.stock ?? 0);

        return `
            <tr data-id="${producto.id}">
                <td>
                    <div class="product-info">
                        <div class="product-img">
                            <img alt="${producto.nombre}" src="${imagen}" />
                        </div>
                        <div>
                            <p class="product-name">${producto.nombre}</p>
                            <p class="product-desc">${descripcion}</p>
                        </div>
                    </div>
                </td>
                <td><span class="badge badge-macarons">${producto.categoria || "Sin categoría"}</span></td>
                <td class="price-cell">${formatearPrecio(producto.precio)}</td>
                <td>
                    <div class="stock-status">
                        <div class="dot ${stock > 5 ? "success" : "danger"}"></div>
                        <span class="${stock > 5 ? "" : "stock-danger"}">${stock > 5 ? `En stock (${stock})` : `Stock bajo (${stock})`}</span>
                    </div>
                </td>
                <td class="actions-cell">
                    <button class="btn-action edit" type="button" data-action="edit" data-id="${producto.id}">
                        <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button class="btn-action delete" type="button" data-action="delete" data-id="${producto.id}">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </td>
            </tr>
        `;
    }).join("");
}

async function cargarProductosDashboard() {
    const productos = await verProductos();
    renderizarTabla(productos);

    const estadisticas = calcularEstadisticas(productos);
    const total = document.getElementById("dashboard-total-products");
    const bajo = document.getElementById("dashboard-low-stock");
    const categoria = document.getElementById("dashboard-top-category");
    const contador = document.getElementById("dashboard-products-count");

    if (total) total.textContent = String(estadisticas.total);
    if (bajo) bajo.textContent = String(estadisticas.stockBajo);
    if (categoria) categoria.textContent = estadisticas.categoriaPrincipal;
    if (contador) contador.textContent = `Mostrando ${estadisticas.total} productos`;
}

function prepararCargaImagen() {
    const inputImagen = document.getElementById("producto_imagen");
    const textoImagen = document.getElementById("producto_imagen_texto");
    const vistaImagen = document.getElementById("producto_imagen_preview");

    if (!inputImagen) return;

    inputImagen.addEventListener("change", () => {
        const archivo = inputImagen.files?.[0];
        if (!archivo) {
            if (textoImagen) textoImagen.textContent = "No hay imagen seleccionada";
            if (vistaImagen) vistaImagen.removeAttribute("src");
            return;
        }

        if (textoImagen) textoImagen.textContent = archivo.name;
        if (vistaImagen) {
            const urlVistaPrevia = URL.createObjectURL(archivo);
            vistaImagen.src = urlVistaPrevia;
            vistaImagen.onload = () => URL.revokeObjectURL(urlVistaPrevia);
        }
    });
}

function prepararFormularioProducto() {
    const formulario = document.getElementById("form-producto");
    const botonGuardar = document.getElementById("btn-save-product");

    if (!formulario || !botonGuardar) return;

    const limpiarFormulario = () => {
        formulario.reset();
        const textoImagen = document.getElementById("producto_imagen_texto");
        const vistaImagen = document.getElementById("producto_imagen_preview");
        if (textoImagen) textoImagen.textContent = "No hay imagen seleccionada";
        if (vistaImagen) vistaImagen.removeAttribute("src");
    };

    botonGuardar.addEventListener("click", async () => {
        const nombre = document.getElementById("producto_nombre")?.value.trim();
        const descripcion = document.getElementById("producto_descripcion")?.value.trim();
        const precio = Number(document.getElementById("producto_precio")?.value);
        const categoria = document.getElementById("producto_categoria")?.value;
        const stock = Number(document.getElementById("producto_stock")?.value ?? 0);
        const archivo = document.getElementById("producto_imagen")?.files?.[0] || null;

        if (!nombre || !categoria || Number.isNaN(precio)) {
            errores("Faltan datos", "Completa nombre, categoría y precio antes de guardar.");
            return;
        }

        let imagenUrl = null;
        if (archivo) {
            const imagen = await subirImagenProducto(archivo);
            if (imagen.error) {
                errores("No se pudo subir la imagen", "Verifica que el bucket de Supabase exista y sea público.");
                return;
            }
            imagenUrl = imagen.url;
        }

        const productoCreado = await crearProducto({
            nombre,
            descripcion: descripcion || null,
            categoria,
            precio,
            stock: Number.isNaN(stock) ? 0 : stock,
            imagen_url: imagenUrl
        });

        if (!productoCreado) {
            errores("No se pudo guardar", "Revisa la conexión con Supabase e intenta otra vez.");
            return;
        }

        ok("Producto guardado");
        limpiarFormulario();
        await cargarProductosDashboard();
    });
}

function inicializarBuscador() {
    const buscador = document.getElementById("dashboard-search");
    if (!buscador) return;

    buscador.addEventListener("input", async () => {
        const termino = buscador.value.trim().toLowerCase();
        const productos = await verProductos();
        const filtrados = productos.filter((producto) => {
            const texto = `${producto.nombre ?? ""} ${producto.descripcion ?? ""} ${producto.categoria ?? ""}`.toLowerCase();
            return texto.includes(termino);
        });
        renderizarTabla(filtrados);
    });
}

verificarSeguridad();
cerrarSesion();
mostrarNombreUsuario();
prepararCargaImagen();
prepararFormularioProducto();
inicializarBuscador();
cargarProductosDashboard();
