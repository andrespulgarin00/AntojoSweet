
document.getElementById("footer").innerHTML = `
<style>
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
         footer {
            background-color: var(--surface-container-low);
            padding-top: var(--stack-xl);
            margin-top: var(--stack-xl);
        }

        .footer-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--gutter);
            padding-bottom: var(--stack-xl);
        }

        @media (min-width: 768px) {
            .footer-grid { grid-template-columns: 2fr 1fr 1fr 2fr; }
        }

        footer h4 { color: var(--primary); font-size: 14px; margin-bottom: 24px; font-family: 'Be Vietnam Pro', sans-serif; font-weight: 700; }
        footer ul { list-style: none; }
        footer ul li { margin-bottom: 16px; }
        footer a { text-decoration: none; color: var(--secondary); font-size: 14px; transition: var(--transition); }
        footer a:hover { color: var(--primary); }
        footer .active-link { color: var(--primary); text-decoration: underline; font-weight: 600; }

        .newsletter-form {
            display: flex;
            margin-top: 16px;
        }

        .newsletter-form input {
            background: var(--surface);
            border: none;
            padding: 12px 16px;
            border-radius: 12px 0 0 12px;
            flex-grow: 1;
            font-family: inherit;
        }

        .newsletter-btn {
            background: var(--primary);
            color: white;
            border: none;
            padding: 0 16px;
            border-radius: 0 12px 12px 0;
            cursor: pointer;
            display: flex;
            align-items: center;
        }

        .footer-bottom {
            border-top: 1px solid var(--surface-container-high);
            padding: 24px 0;
            text-align: center;
            font-size: 12px;
            color: var(--secondary);
        }


</style>
<footer>
        <div class="container footer-grid">
            <div>
                <div class="logo" style="margin-bottom: 24px; display: block;">Antojo Sweet</div>
                <p style="font-size: 16px; color: var(--secondary);">Indulgence redefined through artisanal pastry and
                    joyful moments.</p>
            </div>
            <div>
                <h4>Navigation</h4>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Catalog</a></li>
                    <li><a class="active-link" href="#">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4>Policies</h4>
                <ul>
                    <li><a href="#">Shipping Policy</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
            <div>
                <h4>Newsletter</h4>
                <p style="font-size: 16px; color: var(--secondary); margin-bottom: 16px;">Join our list for exclusive
                    seasonal recipes.</p>
                <form class="newsletter-form">
                    <input placeholder="Your email" required="" type="email" />
                    <button class="newsletter-btn" type="submit">
                        <span class="material-symbols-outlined">send</span>
                    </button>
                </form>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                © 2024 Antojo Sweet. Crafted with love.
            </div>
        </div>
    </footer>
`