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

console.log('Done! Generated city pages in CO/EC folders and Global index.');
