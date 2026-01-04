const fs = require('fs');
const path = require('path');
const cities = require('./cities-data');

const templatePath = path.join(__dirname, 'template.html');
const outputDir = path.join(__dirname, '../');

// Read Template
if (!fs.existsSync(templatePath)) {
    console.error('Template not found:', templatePath);
    process.exit(1);
}
let template = fs.readFileSync(templatePath, 'utf8');

// Helper to replace all occurrences
const replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(find, 'g'), replace);
};

// --- HELPER FUNCTIONS ---

const generateSchema = (data) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Render 3D Global",
        "image": "https://render3dglobal.com/assets/branding/render-3d-global-logo-color.png",
        "telephone": data.phone || "+57 313 2060072",
        "email": "render3dglobal.com@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": data.city,
            "addressCountry": data.countryCode
        },
        "url": `https://render3dglobal.com/${data.slug}.html`,
        "priceRange": "$$",
        "description": data.Meta_Description,
        "areaServed": {
            "@type": "City",
            "name": data.city
        }
    };

    // Add FAQ Schema if FAQs exist
    if (data.FAQs) {
        schema.mainEntity = {
            "@type": "FAQPage",
            "mainEntity": data.FAQs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
    }

    return JSON.stringify(schema, null, 4);
};

const generateFAQHtml = (faqs) => {
    if (!faqs || faqs.length === 0) return '';

    let html = `
    <section class="py-16 bg-gray-50 border-t border-gray-100" id="faqs">
        <div class="max-w-4xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-brand-dark mb-10">Preguntas Frecuentes</h2>
            <div class="space-y-4">
    `;

    faqs.forEach(faq => {
        html += `
            <details class="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden text-left">
                <summary class="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-gray-800 hover:text-brand-cyan transition-colors">
                    <span>${faq.question}</span>
                    <span class="transition group-open:rotate-180">
                        <i class="fas fa-chevron-down text-brand-cyan"></i>
                    </span>
                </summary>
                <div class="text-gray-600 font-light p-5 pt-0 leading-relaxed border-t border-gray-50 group-open:mt-2">
                    ${faq.answer}
                </div>
            </details>
        `;
    });

    html += `
            </div>
        </div>
    </section>
    `;
    return html;
};

const generateFloatingCTA = (data) => {
    const phoneClean = (data.phone || '573132060072').replace(/\D/g, '');
    return `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <!-- WhatsApp Button -->
        <a href="https://wa.me/${phoneClean}?text=Hola,%20me%20interesa%20un%20render%20en%20${data.city}" target="_blank"
           class="bg-green-500 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-bounce-slow"
           title="Chatear por WhatsApp">
            <i class="fab fa-whatsapp text-3xl"></i>
        </a>
    </div>
    <style>
        .animate-bounce-slow { animation: bounce 3s infinite; }
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-10px);}
            60% {transform: translateY(-5px);}
        }
    </style>
    `;
};


const generateRedirectScript = (citiesData) => {
    // 1. Build a map of "City Name" -> "URL path"
    // We only care about specific cities, not Global.
    // Example: "Bogotá" -> "co/render-3d-bogota.html"

    let mapping = {};
    citiesData.forEach(c => {
        if (c.id === 'global') return;

        let subFolder = '';
        if (c.countryCode === 'CO') subFolder = 'co/';
        else if (c.countryCode === 'EC') subFolder = 'ec/';

        // Normalize city name for safer matching (uppercase)
        const normalizedCity = c.city.toUpperCase();
        mapping[normalizedCity] = `${subFolder}${c.slug}.html`;
    });

    const mappingJson = JSON.stringify(mapping);

    // 2. Return the script string
    // Uses ipapi.co to get city/country.
    // Fallback logic could be added, but keeping it simple as per request.
    return `
    <script>
        (function() {
            // Check if we have already redirected or user manually selected "Global" (optional safety)
            // For now, just run on load.
            
            const cityMapping = ${mappingJson};
            
            fetch('https://ipapi.co/json/')
                .then(response => response.json())
                .then(data => {
                    if (data && data.city) {
                        const userCity = data.city.toUpperCase();
                        // Direct City Match
                        if (cityMapping[userCity]) {
                            console.log('Redirecting to city page:', cityMapping[userCity]);
                            window.location.href = cityMapping[userCity];
                        } 
                        // Country Fallback could go here if we had country index pages
                        // else if (data.country_code === 'CO') { ... } 
                    }
                })
                .catch(error => {
                    console.log('Geo-redirect skipped:', error);
                });
        })();
    </script>
    `;
};

// --- END HELPERS ---

const generatePage = (data, isGlobal = false) => {
    let content = template;

    // Determine Output Path & Relative Prefix
    let subFolder = '';
    if (!isGlobal) {
        if (data.countryCode === 'CO') subFolder = 'co';
        else if (data.countryCode === 'EC') subFolder = 'ec';
    }

    const targetDir = path.join(outputDir, subFolder);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    // Calculate relative path for assets/links (if in subfolder, go up one level)
    const relativePath = subFolder ? '../' : '';

    // Fix Assets and Links with Relative Path
    // Assets
    content = replaceAll(content, 'assets/', relativePath + 'assets/');
    content = replaceAll(content, 'proyectos/', relativePath + 'proyectos/');
    content = replaceAll(content, 'servicios/', relativePath + 'servicios/');
    content = replaceAll(content, 'nosotros.html', relativePath + 'nosotros.html');
    content = replaceAll(content, 'contacto.html', relativePath + 'contacto.html');
    content = replaceAll(content, 'href="index.html"', 'href="' + relativePath + 'index.html"');
    // Note: 'href="index.html"' prevents replacing just 'index.html' text if it appeared elsewhere, though unlikely.
    // Navigation Links
    content = replaceAll(content, 'href="index.html"', 'href="' + relativePath + 'index.html"');
    content = replaceAll(content, 'href="proyectos/"', 'href="' + relativePath + 'proyectos/"');
    content = replaceAll(content, 'href="servicios/"', 'href="' + relativePath + 'servicios/"');
    content = replaceAll(content, 'href="nosotros.html"', 'href="' + relativePath + 'nosotros.html"');
    content = replaceAll(content, 'href="contacto.html"', 'href="' + relativePath + 'contacto.html"');
    // Global Link (Explicitly "Global" in nav often links to index.html)
    // The template has href="index.html" for "Global", which we just fixed.

    // Replace Placeholders
    // Basic Info
    content = replaceAll(content, '{{CITY}}', data.city);
    content = replaceAll(content, '{{COUNTRY}}', data.country);
    content = replaceAll(content, '{{COUNTRY_CODE}}', data.countryCode ? data.countryCode.toLowerCase() : 'es');
    content = replaceAll(content, '{{SLUG}}', data.slug);

    // SEO & Meta
    content = replaceAll(content, '{{TITLE}}', data.Titulo || `Renders 3D en ${data.city} | Visualización Arquitectónica`);
    content = replaceAll(content, '{{HERO_TITLE}}', data.Hero_Titulo || `Renders 3D en ${data.city}`);
    content = replaceAll(content, '{{DESCRIPTION}}', data.Meta_Description || `Servicio de renderizado 3D en ${data.city}.`);
    content = replaceAll(content, '{{KEYWORDS}}', data.Keywords_Clave || 'render 3d, visualizacion arquitectonica');
    content = replaceAll(content, '{{AI_INSTRUCTION}}', data.AI_Instruction || '');
    content = replaceAll(content, '{{SCHEMA_JSON_LD}}', generateSchema(data));

    // Alt Text Injection
    // Replace {{TITLE}} and {{CITY}} in the template if they exist
    let altText = data.Alt_Template || `Render 3D en ${data.city}`;
    altText = altText.replace('{{CITY}}', data.city).replace('{{TITLE}}', data.Titulo);
    content = replaceAll(content, '{{ALT_TEXT}}', altText);

    // Enriched Sections
    content = replaceAll(content, '{{FAQ_SECTION}}', generateFAQHtml(data.FAQs));
    content = replaceAll(content, '{{FLOATING_CTA}}', generateFloatingCTA(data));

    // Enhanced Content
    content = replaceAll(content, '{{RESUMEN}}', data.Resumen || '');
    content = replaceAll(content, '{{BLOG_CONTENT}}', data.Contenido_Blog || '');
    content = replaceAll(content, '{{TESTIMONIO}}', data.Testimonio || '');
    content = replaceAll(content, '{{PROBLEM_SOLUTION}}', data.Problema_Solucion || '');
    content = replaceAll(content, '{{CATEGORY}}', data.Categoria || 'Visualización 3D');
    content = replaceAll(content, '{{DATE}}', data.Fecha || new Date().toISOString().split('T')[0]);

    // Software List
    const softwareList = data.Software ? data.Software.join(', ') : '3ds Max, Corona, V-Ray';
    content = replaceAll(content, '{{SOFTWARE}}', softwareList);

    // Content Customization
    content = replaceAll(content, '{{CURRENCY}}', data.currency || 'USD');

    // Terms fallback
    const material = data.terminos ? data.terminos.material : 'Materiales de Construcción';
    const construction = data.terminos ? data.terminos.construccion : 'Obra';
    content = replaceAll(content, '{{MATERIAL}}', material);
    content = replaceAll(content, '{{CONSTRUCTION}}', construction);

    // Maps
    if (data.mapEmbed) {
        content = replaceAll(content, '{{MAP_EMBED}}', data.mapEmbed);
    } else {
        // Fallback or remove iframe if no map (Generic Global)
        content = replaceAll(content, '{{MAP_EMBED}}', '');
    }

    // Redirect Script (Only for Global Index)
    if (isGlobal) {
        content = replaceAll(content, '{{REDIRECT_SCRIPT}}', generateRedirectScript(cities));
    } else {
        content = replaceAll(content, '{{REDIRECT_SCRIPT}}', '');
    }

    // Generate Location Menu HTML
    let menuHtml = `
    <div class="hidden md:flex relative group">
        <button class="flex items-center text-gray-500 hover:text-brand-cyan font-medium transition-colors text-sm focus:outline-none">
            <i class="fas fa-map-marker-alt mr-2 text-brand-cyan"></i> Ubicación <i class="fas fa-chevron-down ml-1 text-xs opacity-70"></i>
        </button>
        <div class="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50 overflow-hidden">
    `;

    // Group by Country
    const countries = { 'CO': 'Colombia 🇨🇴', 'EC': 'Ecuador 🇪🇨' };
    const citiesByCountry = {};
    cities.forEach(c => {
        if (c.id === 'global') return;
        if (!citiesByCountry[c.countryCode]) citiesByCountry[c.countryCode] = [];
        citiesByCountry[c.countryCode].push(c);
    });

    for (const [code, name] of Object.entries(countries)) {
        if (citiesByCountry[code]) {
            menuHtml += `<div class="px-5 py-3 border-b border-gray-50 last:border-0 bg-white">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">${name}</span>
                <ul class="space-y-1">`;

            citiesByCountry[code].forEach(c => {
                const linkFolder = code.toLowerCase(); // co or ec
                const linkFile = `${c.slug}.html`;
                const href = `${relativePath}${linkFolder}/${linkFile}`;
                menuHtml += `<li><a href="${href}" class="block text-sm text-gray-600 hover:text-brand-cyan hover:bg-gray-50 rounded px-2 py-1 transition-colors">${c.city}</a></li>`;
            });

            menuHtml += `</ul></div>`;
        }
    }
    menuHtml += `</div></div>`;

    content = replaceAll(content, '{{LOCATION_MENU}}', menuHtml);

    // Write File
    // If Global, force index.html, else use slug
    const filename = isGlobal ? 'index.html' : `${data.slug}.html`;
    const outputPath = path.join(targetDir, filename);

    // Safety check: Don't overwrite existing manually created index.html if it looks custom? 
    // The user ASKED to generate it. I will overwrite it, but I'll backup the logic if needed. 
    // Actually, the user said "que ademas se genere un index 'global'".
    // I'll proceed.
    fs.writeFileSync(outputPath, content);
    console.log(`Generated: ${path.join(subFolder, filename)}`);
};

// Generate City Pages
cities.forEach(city => {
    // Check if this is the Global entry
    const isGlobal = city.id === 'global';

    // If it's global, we might want to be careful about overwriting if it's not desired,
    // but the instruction implies we SHOULD generate it from data.
    generatePage(city, isGlobal);
});

// Generate Sitemap.xml
const generateSitemap = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    cities.forEach(city => {
        const subFolder = (city.countryCode === 'CO') ? 'co/' : (city.countryCode === 'EC' ? 'ec/' : '');
        const filename = (city.id === 'global') ? 'index.html' : `${city.slug}.html`;
        // Handle Global Index vs Subfolder Index? 
        // Global is root/index.html. Subfolder ones are root/co/slug.html.

        let pathUrl = '';
        if (city.id === 'global') {
            pathUrl = 'index.html';
        } else {
            pathUrl = `${subFolder}${filename}`;
        }

        const fullUrl = `https://render3dglobal.com/${pathUrl}`;
        const date = new Date().toISOString().split('T')[0];

        xml += `
    <url>
        <loc>${fullUrl}</loc>
        <lastmod>${date}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${city.id === 'global' ? '1.0' : '0.8'}</priority>
    </url>`;
    });

    // Add Static Project Pages
    const projectPages = [
        'proyectos/index.html',
        'proyectos/diseno-render-stand-feria-comercial.html',
        'proyectos/render-interiorismo-oficinas-modernas.html',
        'proyectos/visualizacion-arquitectonica-residencia-moderna.html'
    ];

    projectPages.forEach(page => {
        const fullUrl = `https://render3dglobal.com/${page}`;
        const date = new Date().toISOString().split('T')[0];
        xml += `
    <url>
        <loc>${fullUrl}</loc>
        <lastmod>${date}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`;
    });

    xml += `
</urlset>`;

    fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), xml);
    console.log('Generated: sitemap.xml');
};

generateSitemap();

console.log('Done! Generated city pages in CO/EC folders and Global index.');
