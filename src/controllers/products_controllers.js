import { verProductos } from "../models/products_models.js";

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

function normalizarTexto(valor) {
    return (valor ?? "").toString().trim().toLowerCase();
}

function crearEtiquetaStock(stock) {
    const cantidad = Number(stock ?? 0);
    if (cantidad <= 0) {
        return `
            <div class="badge badge-vegan">
                <span class="dot low"></span>
                Sin stock
            </div>
        `;
    }

    return `
        <div class="badge badge-best">
            <span class="dot stock"></span>
            Disponible
        </div>
    `;
}

function crearCardProducto(producto, vista) {
    const imagen = producto.imagen_url || "/src/views/images/fondo.png";
    const categoria = producto.categoria || "Postres";
    const descripcion = producto.descripcion || "Sin descripción disponible";
    const precio = formatearPrecio(producto.precio);
    const badgeCategoria = vista === "home"
        ? `<div class="badge badge-best">${categoria}</div>`
        : `<div class="badge badge-vegan">${categoria}</div>`;

    return `
        <article class="product-card">
            <div class="product-img-wrapper">
                <img alt="${producto.nombre}" class="product-img" src="${imagen}" />
                ${badgeCategoria}
                ${vista === "catalog" ? crearEtiquetaStock(producto.stock) : ""}
            </div>
            <div class="product-info">
                <h3>${producto.nombre}</h3>
                <div class="product-meta">
                    <span class="product-desc">${descripcion}</span>
                    <span class="product-price">${precio}</span>
                </div>
            </div>
        </article>
    `;
}

function crearCardCatalogo(producto) {
    const imagen = producto.imagen_url || "/src/views/images/fondo.png";
    const descripcion = producto.descripcion || "Sin descripción disponible";
    const precio = formatearPrecio(producto.precio);
    const stock = Number(producto.stock ?? 0);
    const categoria = producto.categoria || "Postres";
    const estadoStock = stock > 0 ? `
        <div class="badge right">
            <span class="dot stock"></span>
            EN STOCK
        </div>
    ` : `
        <div class="badge right">
            <span class="dot low"></span>
            SIN STOCK
        </div>
    `;

    return `
        <article class="card" data-nombre="${normalizarTexto(producto.nombre)}" data-categoria="${normalizarTexto(categoria)}" data-descripcion="${normalizarTexto(descripcion)}">
            <div class="card-image-wrapper">
                <img alt="${producto.nombre}" class="card-image" src="${imagen}" />
                ${estadoStock}
                <div class="badge left gf-tag">${categoria}</div>
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${producto.nombre}</h3>
                    <span class="card-price">${precio}</span>
                </div>
                <p class="card-desc">${descripcion}</p>
                <button class="btn-order" type="button">
                    <span class="material-symbols-outlined" style="font-size: 20px;">lock</span>
                    Inicia sesión para ordenar
                </button>
            </div>
        </article>
    `;
}

function mostrarVacio(contenedor, mensaje) {
    contenedor.innerHTML = `
        <div class="product-empty">
            <h3>No hay productos disponibles</h3>
            <p>${mensaje}</p>
        </div>
    `;
}

export async function initHomeProducts() {
    const contenedor = document.getElementById("home-products") || document.querySelector(".products-grid.reveal");
    if (!contenedor) return;

    document.title = "Antojo Sweet - Inicio";
    contenedor.innerHTML = "";
    const productos = await verProductos();
    const destacados = productos.slice(0, 3);

    if (!destacados.length) {
        mostrarVacio(contenedor, "Agrega productos en Supabase para que aparezcan en la portada.");
        return;
    }

    contenedor.innerHTML = destacados.map((producto) => crearCardProducto(producto, "home")).join("");
}

export async function initCatalogPage() {
    const contenedor = document.getElementById("catalog-products") || document.querySelector(".product-grid");
    if (!contenedor) return;

    document.title = "Catálogo | Antojo Sweet";
    contenedor.innerHTML = "";
    const buscador = document.querySelector(".search-input");
    const filtros = [...document.querySelectorAll(".filter-pill")];
    const productos = await verProductos();
    let categoriaActiva = "Todos los productos";

    const renderizar = () => {
        const textoBusqueda = normalizarTexto(buscador?.value);
        const filtrados = productos.filter((producto) => {
            const nombre = normalizarTexto(producto.nombre);
            const descripcion = normalizarTexto(producto.descripcion);
            const categoria = normalizarTexto(producto.categoria);
            const coincideBusqueda = !textoBusqueda || nombre.includes(textoBusqueda) || descripcion.includes(textoBusqueda) || categoria.includes(textoBusqueda);
            const coincideCategoria = categoriaActiva === "Todos los productos" || categoria === normalizarTexto(categoriaActiva);
            return coincideBusqueda && coincideCategoria;
        });

        if (!filtrados.length) {
            mostrarVacio(contenedor, "No hay coincidencias con tu búsqueda o filtro.");
            return;
        }

        contenedor.innerHTML = filtrados.map((producto) => crearCardCatalogo(producto)).join("");
    };

    if (buscador) {
        buscador.addEventListener("input", renderizar);
    }

    filtros.forEach((filtro) => {
        filtro.addEventListener("click", () => {
            filtros.forEach((item) => item.classList.remove("active"));
            filtro.classList.add("active");
            categoriaActiva = filtro.textContent.trim();
            renderizar();
        });
    });

    renderizar();
}
