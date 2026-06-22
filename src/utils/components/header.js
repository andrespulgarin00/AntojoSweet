export default function header (){
document.getElementById("header").innerHTML = `
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
:root {
            /* Colors from Design System */
            --primary: #b0004a;
            --on-primary: #ffffff;
            --primary-container: #d81b60;
            --on-primary-container: #fff2f3;
            --secondary: #635e53;
            --on-secondary: #ffffff;
            --secondary-container: #e9e2d3;
            --on-secondary-container: #696458;
            --tertiary: #00671d;
            --on-tertiary: #ffffff;
            --surface: #fff8f6;
            --surface-dim: #f8d1cb;
            --surface-bright: #fff8f6;
            --surface-container-lowest: #ffffff;
            --surface-container-low: #fff0ee;
            --surface-container: #ffe9e5;
            --surface-container-high: #ffe2dd;
            --surface-container-highest: #ffdad4;
            --on-surface: #2b1613;
            --on-surface-variant: #5a4044;
            --outline: #8e6f74;
            --background: #fff8f6;
            --on-background: #2b1613;

            /* Spacing & Sizing */
            --margin-desktop: 64px;
            --margin-mobile: 20px;
            --container-max: 1200px;
            --stack-xl: 80px;
            --stack-lg: 48px;
            --stack-md: 24px;
            --stack-sm: 12px;
            --gutter: 24px;

            /* Transitions */
            --transition: 0.2s ease-in-out;
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

        /* Navigation */
        nav {
            position: fixed;
            top: 0;
            width: 100%;
            height: 80px;
            background-color: rgba(255, 248, 246, 0.8);
            backdrop-filter: blur(12px);
            z-index: 1000;
            border-bottom: 1px solid var(--surface-container-high);
        }

        .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
        }

        .logo {
            font-size: 28px;
            font-weight: 700;
            color: var(--primary);
            text-decoration: none;
            font-family: 'Playfair Display', serif;
        }

        .nav-links {
            display: none;
            gap: var(--gutter);
        }

        @media (min-width: 768px) {
            .nav-links {
                display: flex;
            }
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
            display: flex;
            gap: 12px;
            align-items: center;
        }
</style>
<nav>
        <div class="container nav-content">
            <a class="logo" href="#">Antojo Sweet</a>
            <div class="nav-links">
                <a href="/index.html">Inicio</a>
                <a href="/src/views/pages/product.html">Catálogo</a>
                <a href="/src/views/pages/contact.html">Contacto</a>
            </div>
            <div class="nav-actions">
                <button class="btn-text">Iniciar Sesión</button>
                <button class="btn-primary">Registrarse</button>
            </div>
        </div>
    </nav>

`}
