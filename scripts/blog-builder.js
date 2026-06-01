const fs = require('fs');
const path = require('path');
const { blogPosts } = require('./blog-data.js');

const TEMPLATE_PATH = path.join(__dirname, 'blog-template.html');
const BLOG_DIR = path.join(__dirname, '../blog');
const ASSETS_DIR = path.join(__dirname, '../assets/blog');

// Ensure blog directory exists
if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
}

// Read Template
if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('Blog template not found:', TEMPLATE_PATH);
    process.exit(1);
}
const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

// Helper to convert plain text URLs into clickable HTML links
const linkify = (text) => {
    const urlRegex = /(https?:\/\/[^\s\)]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank" class="text-brand-cyan hover:underline break-all font-medium">$1</a>');
};

console.log('Starting Blog Build...');

// 1. Build Individual Blog Pages
blogPosts.forEach(post => {
    let content = template;

    // Generate Steps HTML
    const stepsHtml = post.steps.map(step => {
        // Check if the image file exists locally
        const localImagePath = path.join(__dirname, '../', step.image);
        let imageElementHtml = '';

        if (fs.existsSync(localImagePath)) {
            // Image exists! Render normal img tag
            imageElementHtml = `
                <div class="rounded-2xl overflow-hidden shadow-lg border border-gray-100 max-h-[500px]">
                    <img src="../${step.image}" alt="${step.title}" class="w-full h-auto object-cover" loading="lazy">
                </div>
            `;
        } else {
            // Image is missing! Show a beautiful gradient card placeholder
            imageElementHtml = `
                <div class="w-full min-h-[320px] bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 border border-cyan-900/60 rounded-2xl flex flex-col items-center justify-center p-6 text-center select-none shadow-md">
                    <div class="w-12 h-12 rounded-full bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center mb-4 text-brand-cyan">
                        <i class="fas fa-image text-xl"></i>
                    </div>
                    <span class="text-xs font-bold uppercase tracking-wider text-brand-cyan mb-1">Imagen del Paso ${step.stepNumber}</span>
                    <h4 class="text-sm font-semibold text-white/95 mb-3">${step.title}</h4>
                    <p class="text-xs text-slate-400 max-w-xs leading-relaxed mb-1">
                        Sube tu captura en formato WebP, JPG o PNG a la ruta:
                    </p>
                    <code class="bg-black/40 px-3 py-1.5 rounded text-white border border-white/5 select-all mt-1 inline-block text-[10px] font-mono leading-none tracking-normal">${step.image}</code>
                </div>
            `;
        }

        return `
            <div class="flex flex-col md:flex-row gap-8 items-start relative group">
                <!-- Step Counter Badging -->
                <div class="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-cyan to-cyan-600 text-white font-bold flex items-center justify-center shadow-lg shadow-cyan-500/20 text-lg">
                    ${step.stepNumber}
                </div>
                <!-- Step Details -->
                <div class="flex-grow space-y-4">
                    <h2 class="text-2xl font-bold text-brand-dark group-hover:text-brand-cyan transition-colors duration-300">
                        ${step.title}
                    </h2>
                    <p class="text-gray-600 text-base leading-relaxed font-light">
                        ${linkify(step.text)}
                    </p>
                    ${imageElementHtml}
                </div>
            </div>
        `;
    }).join('\n');

    // Replace single post template tags
    const canonicalUrl = `https://render3dglobal.com/blog/${post.id}.html`;
    content = content.replace(/{{TITLE}}/g, post.title);
    content = content.replace(/{{SEO_DESCRIPTION}}/g, post.seoDescription);
    content = content.replace(/{{CANONICAL_URL}}/g, canonicalUrl);
    content = content.replace(/{{CATEGORY}}/g, post.category);
    content = content.replace(/{{DATE}}/g, post.date);
    content = content.replace(/{{READ_TIME}}/g, post.readTime);
    content = content.replace(/{{INTRO}}/g, post.intro);
    content = content.replace(/{{STEPS_HTML}}/g, stepsHtml);
    content = content.replace(/{{SEO_RICH_CONTENT}}/g, post.seoRichContent || '');

    // Write File
    const fileName = `${post.id}.html`;
    fs.writeFileSync(path.join(BLOG_DIR, fileName), content, 'utf8');
    console.log(`Generated blog post: blog/${fileName}`);
});


// 2. Generate Blog Index / Directory Page (blog/index.html)
const generateBlogIndex = () => {
    const postCardsHtml = blogPosts.map(post => {
        // Image or elegant visual thumbnail block
        const localHeroPath = path.join(__dirname, '../', post.heroImage);
        let thumbnailHtml = '';

        if (fs.existsSync(localHeroPath)) {
            thumbnailHtml = `
                <img src="../${post.heroImage}" alt="${post.title}" 
                     class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
            `;
        } else {
            // Elegant gradient hero placeholder if missing
            thumbnailHtml = `
                <div class="w-full h-full bg-gradient-to-br from-slate-900 to-cyan-950 flex flex-col items-center justify-center p-6 text-center select-none">
                    <div class="w-10 h-10 rounded-full bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center mb-2 text-brand-cyan">
                        <i class="fas fa-book-open"></i>
                    </div>
                    <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Guía Práctica</span>
                </div>
            `;
        }

        return `
            <a href="${post.id}.html" class="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group h-full cursor-pointer">
                <div class="h-52 bg-brand-gray overflow-hidden relative">
                    ${thumbnailHtml}
                    <span class="absolute top-4 left-4 bg-brand-cyan/90 text-white font-bold text-xs uppercase px-3.5 py-1.5 rounded-full backdrop-blur-sm tracking-wider">
                        ${post.category}
                    </span>
                </div>
                <div class="p-6 sm:p-8 flex-grow flex flex-col">
                    <span class="text-xs font-semibold text-gray-400 mb-2">${post.date} • ${post.readTime}</span>
                    <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-cyan transition-colors duration-300 line-clamp-2">
                        ${post.title}
                    </h3>
                    <p class="text-gray-500 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                        ${post.intro}
                    </p>
                    <span class="text-brand-cyan font-bold text-sm uppercase tracking-wider mt-auto inline-flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform duration-300">
                        <span>Leer Instructivo</span> <i class="fas fa-arrow-right text-xs"></i>
                    </span>
                </div>
            </a>
        `;
    }).join('\n');

    const indexHtmlContent = `<!DOCTYPE html>
<html lang="es">

<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-9JDB4H3LJ4"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-9JDB4H3LJ4');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog e Instructivos de Optimización 3D | Render 3D Global</title>
    <meta name="description" content="Aprende buenas prácticas de modelado, creación de proxies en Enscape e inteligencia artificial aplicada al modelado 3D rápido.">
    <link rel="canonical" href="https://render3dglobal.com/blog/" />

    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'brand-cyan': '#00AEEF',
                        'brand-dark': '#111111',
                        'brand-gray': '#F3F4F6',
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/styles.css">
    <link rel="shortcut icon" href="../assets/branding/render-3d-global-favicon.ico" type="image/x-icon">
</head>

<body class="bg-white text-gray-800 antialiased flex flex-col min-h-screen">

    <!-- NAV -->
    <nav class="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all duration-300"
        id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <!-- Left Group: Logo + Location -->
                <div class="flex items-center gap-6">
                    <div class="flex-shrink-0 flex items-center">
                        <a href="../index.html">
                            <img class="h-7 w-auto md:h-8" src="../assets/branding/render-3d-global-logo-color.png"
                                alt="Render 3D Global Logo">
                        </a>
                    </div>

                    <div class="hidden md:flex relative group">
                        <button
                            class="flex items-center text-gray-500 hover:text-brand-cyan font-medium transition-colors text-sm focus:outline-none">
                            <i class="fas fa-map-marker-alt mr-2 text-brand-cyan"></i> Ubicación <i
                                class="fas fa-chevron-down ml-1 text-xs opacity-70"></i>
                        </button>
                        <div
                            class="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50 overflow-hidden">
                            <div class="px-5 py-3 border-b border-gray-50 last:border-0 bg-white">
                                <span
                                    class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Colombia
                                    🇨🇴</span>
                                <ul class="space-y-1">
                                    <li><a href="../co/render-3d-bogota.html"
                                            class="block text-sm text-gray-600 hover:text-brand-cyan hover:bg-gray-50 rounded px-2 py-1 transition-colors">Bogotá</a>
                                    </li>
                                    <li><a href="../co/render-3d-medellin.html"
                                            class="block text-sm text-gray-600 hover:text-brand-cyan hover:bg-gray-50 rounded px-2 py-1 transition-colors">Medellín</a>
                                    </li>
                                    <li><a href="../co/render-3d-cali.html"
                                            class="block text-sm text-gray-600 hover:text-brand-cyan hover:bg-gray-50 rounded px-2 py-1 transition-colors">Cali</a>
                                    </li>
                                    <li><a href="../co/render-3d-barranquilla.html"
                                            class="block text-sm text-gray-600 hover:text-brand-cyan hover:bg-gray-50 rounded px-2 py-1 transition-colors">Barranquilla</a>
                                    </li>
                                    <li><a href="../co/render-3d-cartagena.html"
                                            class="block text-sm text-gray-600 hover:text-brand-cyan hover:bg-gray-50 rounded px-2 py-1 transition-colors">Cartagena</a>
                                    </li>
                                    <li><a href="../co/render-3d-santa-marta.html"
                                            class="block text-sm text-gray-600 hover:text-brand-cyan hover:bg-gray-50 rounded px-2 py-1 transition-colors">Santa
                                            Marta</a></li>
                                </ul>
                            </div>
                            <div class="px-5 py-3 border-b border-gray-50 last:border-0 bg-white">
                                <span
                                    class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Ecuador
                                    🇪🇨</span>
                                <ul class="space-y-1">
                                    <li><a href="../ec/render-3d-guayaquil.html"
                                            class="block text-sm text-gray-600 hover:text-brand-cyan hover:bg-gray-50 rounded px-2 py-1 transition-colors">Guayaquil</a>
                                    </li>
                                    <li><a href="../ec/render-3d-quito.html"
                                            class="block text-sm text-gray-600 hover:text-brand-cyan hover:bg-gray-50 rounded px-2 py-1 transition-colors">Quito</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Menú Escritorio -->
                <div class="hidden md:flex space-x-8 items-center">
                    <a href="../index.html" class="text-gray-600 hover:text-brand-cyan transition-colors">Inicio</a>
                    <a href="../proyectos/" class="text-gray-600 hover:text-brand-cyan transition-colors">Portafolio</a>
                    <a href="../servicios/" class="text-gray-600 hover:text-brand-cyan transition-colors">Servicios</a>
                    <a href="index.html" class="text-brand-cyan font-bold">Blog</a>
                    <a href="../nosotros.html"
                        class="text-gray-600 hover:text-brand-cyan transition-colors">Nosotros</a>
                    <!-- Botón CTA en Menú -->
                    <a href="../contacto.html"
                        class="bg-brand-dark text-white px-5 py-2.5 rounded hover:bg-brand-cyan transition-colors font-medium text-sm">
                        Cotizar mi Proyecto
                    </a>
                </div>

                <!-- Botón Menú Móvil -->
                <div class="flex items-center md:hidden">
                    <button id="mobile-menu-btn" class="text-gray-600 hover:text-brand-cyan focus:outline-none p-2">
                        <i class="fas fa-bars text-2xl"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Menú Móvil Desplegable -->
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100">
            <div class="px-4 pt-2 pb-6 space-y-2 shadow-lg">
                <a href="../index.html"
                    class="block px-3 py-3 text-gray-700 hover:text-brand-cyan hover:bg-gray-50 rounded">Inicio</a>
                <a href="../proyectos/"
                    class="block px-3 py-3 text-gray-700 hover:text-brand-cyan hover:bg-gray-50 rounded">Portafolio</a>
                <a href="../servicios/"
                    class="block px-3 py-3 text-gray-700 hover:text-brand-cyan hover:bg-gray-50 rounded">Servicios</a>
                <a href="index.html"
                    class="block px-3 py-3 text-brand-cyan font-bold bg-gray-50 rounded">Blog</a>
                <a href="../nosotros.html"
                    class="block px-3 py-3 text-gray-700 hover:text-brand-cyan hover:bg-gray-50 rounded">Nosotros</a>
                <a href="../contacto.html"
                    class="block w-full text-center mt-4 bg-brand-cyan text-white px-3 py-3 rounded font-bold">
                    Cotizar Ahora
                </a>
            </div>
        </div>
    </nav>

    <!-- INTRO SECTOR -->
    <header class="bg-gray-50 pt-36 pb-16 border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-4xl md:text-5xl font-bold text-brand-dark mb-4">Blog y Guías de Optimización</h1>
            <p class="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                Buenas prácticas, flujos de trabajo eficientes e instructivos paso a paso para arquitectos y diseñadores que buscan potenciar su productividad.
            </p>
        </div>
    </header>

    <!-- BLOG CARDS LIST -->
    <main class="flex-grow py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                ${postCardsHtml}
            </div>
        </div>
    </main>

    <!-- FOOTER -->
    <footer class="bg-gray-900 border-t border-gray-800 pt-16 pb-8 text-white mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-12 mb-12">
                <!-- Columna 1: Brand -->
                <div class="col-span-1 md:col-span-1">
                    <img src="../assets/branding/render-3d-global-logo-cuadrado-3d.jpg" alt="Render 3D Global Logo"
                        class="h-16 w-auto mb-6 rounded shadow-sm opacity-90" loading="lazy">
                    <p class="text-gray-400 text-sm leading-relaxed">
                        El puente entre el arquitecto, el cliente y el maestro de obra en Cualquier parte del Mundo.
                        Visualización rápida y funcional.
                    </p>
                </div>

                <!-- Columna 2: Enlaces Rápidos -->
                <div>
                    <h4 class="text-white font-bold mb-4 uppercase tracking-wider text-sm">Empresa</h4>
                    <ul class="space-y-2">
                        <li><a href="../index.html"
                                class="text-gray-400 hover:text-brand-cyan text-sm transition-colors">Inicio</a></li>
                        <li><a href="../proyectos/"
                                class="text-gray-400 hover:text-brand-cyan text-sm transition-colors">Portafolio</a>
                        </li>
                        <li><a href="../servicios/" class="text-gray-400 hover:text-brand-cyan text-sm transition-colors">Servicios</a></li>
                        <li><a href="index.html" class="text-brand-cyan text-sm transition-colors">Blog</a></li>
                        <li><a href="../nosotros.html"
                                class="text-gray-400 hover:text-brand-cyan text-sm transition-colors">Sobre Nosotros</a>
                        </li>
                    </ul>
                </div>

                <!-- Columna 3: Servicios -->
                <div>
                    <h4 class="text-white font-bold mb-4 uppercase tracking-wider text-sm">Servicios</h4>
                    <ul class="space-y-2">
                        <li><a href="../servicios/renders-express-para-stands-comerciales.html"
                                class="text-gray-400 hover:text-brand-cyan text-sm transition-colors">Renders Comerciales</a></li>
                        <li><a href="../servicios/visualizacion-para-disenadores-interiores.html"
                                class="text-gray-400 hover:text-brand-cyan text-sm transition-colors">Interiores & Oficinas</a></li>
                        <li><a href="../servicios/visualizacion-arquitectonica-para-contratistas.html"
                                class="text-gray-400 hover:text-brand-cyan text-sm transition-colors">Contratistas y Obra</a></li>
                    </ul>
                </div>

                <!-- Columna 4: Contacto -->
                <div>
                    <h4 class="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contacto</h4>
                    <ul class="space-y-4">
                        <li class="flex items-start gap-3">
                            <i class="fas fa-map-marker-alt mt-1 text-brand-cyan"></i>
                            <span class="text-gray-400 text-sm">Cualquier parte del Mundo, Global<br>Servicio Global</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <i class="fas fa-envelope text-brand-cyan"></i>
                            <a href="mailto:render3dglobal.com@gmail.com"
                                class="text-gray-400 hover:text-white text-sm transition-colors">render3dglobal.com@gmail.com</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-gray-500 text-sm">© 2026 Render 3D Global Global. Todos los derechos reservados.</p>
                <div class="flex space-x-6">
                    <a href="https://www.instagram.com/render3dglobal/" target="_blank"
                        class="text-gray-400 hover:text-white transition-colors"><i
                            class="fab fa-instagram text-xl"></i></a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');

        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        // Cambiar estilo del navbar al hacer scroll
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md');
            } else {
                navbar.classList.remove('shadow-md');
            }
        });
    </script>
</body>

</html>`;

    fs.writeFileSync(path.join(BLOG_DIR, 'index.html'), indexHtmlContent, 'utf8');
    console.log('Generated blog index page: blog/index.html');
};

generateBlogIndex();

console.log('Blog Build Complete successfully!');
