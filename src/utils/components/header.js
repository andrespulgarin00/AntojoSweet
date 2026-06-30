export default function header() {
    const headerElement = document.getElementById("header");
    if (!headerElement) return;

    const path = window.location.pathname;
    const isHome = path === "/" || path.endsWith("/index.html");
    const isCatalog = path.includes("/product.html");
    const isContact = path.includes("/contact.html");

    headerElement.innerHTML = `
<style>
    .btn-text {
        background: none;
        border: none;
        color: var(--secondary);
        font-weight: 600;
        cursor: pointer;
        padding: 8px 16px;
    }

    .btn-primary {
        background-color: var(--primary);
        color: var(--on-primary);
        border: none;
        padding: 10px 24px;
        border-radius: 9999px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(176, 0, 74, 0.1);
        transition: var(--transition);
    }

    .btn-primary:hover {
        transform: scale(1.05);
    }

    .container {
        max-width: var(--container-max);
        margin: 0 auto;
        padding: 0 var(--margin-mobile);
    }

    @media (min-width: 768px) {
        .container {
            padding: 0 var(--margin-desktop);
        }
    }

    nav {
        position: fixed;
        top: 0;
        width: 100%;
        background-color: rgba(255, 248, 246, 0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        z-index: 1000;
        border-bottom: 1px solid var(--surface-container-high);
    }

    .nav-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 80px;
        gap: 16px;
    }

    .logo {
        font-size: 28px;
        font-weight: 700;
        color: var(--primary);
        text-decoration: none;
        font-family: 'Playfair Display', serif;
        white-space: nowrap;
    }

    .nav-links {
        display: none;
        gap: var(--gutter);
    }

    .nav-links a {
        text-decoration: none;
        color: var(--secondary);
        font-size: 14px;
        font-weight: 600;
        transition: var(--transition);
    }

    .nav-links a.active {
        color: var(--primary);
        border-bottom: 2px solid var(--primary);
        padding-bottom: 4px;
    }

    .nav-actions {
        display: none;
        gap: 12px;
        align-items: center;
    }

    .nav-toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border: 1px solid rgba(176, 0, 74, 0.15);
        border-radius: 9999px;
        background: var(--surface-container-lowest);
        cursor: pointer;
        padding: 0;
    }

    .nav-toggle span {
        display: block;
        width: 20px;
        height: 2px;
        background: var(--primary);
        border-radius: 9999px;
        transition: transform 0.25s ease, opacity 0.25s ease;
        position: relative;
    }

    .nav-toggle span::before,
    .nav-toggle span::after {
        content: "";
        position: absolute;
        left: 0;
        width: 20px;
        height: 2px;
        background: var(--primary);
        border-radius: 9999px;
        transition: transform 0.25s ease, top 0.25s ease, opacity 0.25s ease;
    }

    .nav-toggle span::before {
        top: -6px;
    }

    .nav-toggle span::after {
        top: 6px;
    }

    .site-nav.is-open .nav-toggle span {
        background: transparent;
    }

    .site-nav.is-open .nav-toggle span::before {
        top: 0;
        transform: rotate(45deg);
    }

    .site-nav.is-open .nav-toggle span::after {
        top: 0;
        transform: rotate(-45deg);
    }

    .nav-mobile-panel {
        display: none;
        border-top: 1px solid var(--surface-container-high);
        background-color: rgba(255, 248, 246, 0.92);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
    }

    .nav-mobile-panel .nav-links,
    .nav-mobile-panel .nav-actions {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .nav-mobile-panel .nav-links {
        padding: 20px 0 12px;
    }

    .nav-mobile-panel .nav-links a {
        padding: 8px 0;
        border-bottom: 1px solid rgba(227, 189, 195, 0.35);
    }

    .nav-mobile-panel .nav-actions {
        padding-bottom: 20px;
        align-items: stretch;
    }

    @media (max-width: 767px) {
        .nav-toggle {
            display: inline-flex;
        }

        .site-nav.is-open .nav-mobile-panel {
            display: block;
        }
    }

    @media (min-width: 768px) {
        .nav-toggle {
            display: none;
        }

        .nav-links {
            display: flex;
        }

        .nav-actions {
            display: flex;
        }

        .nav-mobile-panel {
            display: none !important;
        }
    }
</style>

<nav class="site-nav" id="site-nav">
    <div class="container nav-content">
        <a class="logo" href="/index.html">Antojo Sweet</a>

        <div class="nav-links">
            <a class="${isHome ? "active" : ""}" href="/index.html">Inicio</a>
            <a class="${isCatalog ? "active" : ""}" href="/src/views/pages/product.html">Catálogo</a>
            <a class="${isContact ? "active" : ""}" href="/src/views/pages/contact.html">Contacto</a>
        </div>

        <div class="nav-actions">
            <button id="btn_login" class="btn-text" type="button">Iniciar Sesión</button>
            <button id="btn_registro" class="btn-primary" type="button">Registrarse</button>
        </div>

        <button id="nav-toggle" class="nav-toggle" type="button" aria-label="Abrir menú" aria-expanded="false">
            <span></span>
        </button>
    </div>

    <div class="nav-mobile-panel">
        <div class="container">
            <div class="nav-links">
                <a class="${isHome ? "active" : ""}" href="/index.html">Inicio</a>
                <a class="${isCatalog ? "active" : ""}" href="/src/views/pages/product.html">Catálogo</a>
                <a class="${isContact ? "active" : ""}" href="/src/views/pages/contact.html">Contacto</a>
            </div>
            <div class="nav-actions">
                <button id="btn_login_mobile" class="btn-text" type="button">Iniciar Sesión</button>
                <button id="btn_registro_mobile" class="btn-primary" type="button">Registrarse</button>
            </div>
        </div>
    </div>
</nav>
`;

    const siteNav = document.getElementById("site-nav");
    const navToggle = document.getElementById("nav-toggle");
    const btnLogin = document.getElementById("btn_login");
    const btnRegister = document.getElementById("btn_registro");
    const btnLoginMobile = document.getElementById("btn_login_mobile");
    const btnRegisterMobile = document.getElementById("btn_registro_mobile");

    if (navToggle && siteNav) {
        navToggle.addEventListener("click", () => {
            const isOpen = siteNav.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
            navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
        });
    }

    const goLogin = () => {
        window.location.href = "/src/views/pages/login.html";
    };

    const goRegister = () => {
        window.location.href = "/src/views/pages/register.html";
    };

    if (btnLogin) btnLogin.addEventListener("click", goLogin);
    if (btnRegister) btnRegister.addEventListener("click", goRegister);
    if (btnLoginMobile) btnLoginMobile.addEventListener("click", goLogin);
    if (btnRegisterMobile) btnRegisterMobile.addEventListener("click", goRegister);
}
