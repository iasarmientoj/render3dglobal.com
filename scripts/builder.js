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

cities.forEach(city => {
    let content = template;

    // Replace Placeholders
    // Basic Info
    content = replaceAll(content, '{{CITY}}', city.city);
    content = replaceAll(content, '{{COUNTRY}}', city.country);
    content = replaceAll(content, '{{SLUG}}', city.slug);

    // SEO & Meta
    content = replaceAll(content, '{{TITLE}}', `Renders 3D en ${city.city} | Visualización Arquitectónica`);
    content = replaceAll(content, '{{DESCRIPTION}}', `Servicio de renderizado 3D en ${city.city}, ${city.country}. Visualiza tus proyectos en ${city.terminos.material} antes de construir. Cotización rápida.`);

    // Content Customization
    content = replaceAll(content, '{{CURRENCY}}', city.currency);
    content = replaceAll(content, '{{MATERIAL}}', city.terminos.material);
    content = replaceAll(content, '{{CONSTRUCTION}}', city.terminos.construccion);

    // Hero & Images
    // Note: We use the slider logic, but maybe we want to force the first image to be specific?
    // For now, we will leave the slider as is, or maybe inject a specific HERO_BG if needed.

    // Maps
    content = replaceAll(content, '{{MAP_EMBED}}', city.mapEmbed);

    // Navbar Flag
    // content = replaceAll(content, '{{FLAG}}', city.flag); // If we decide to show current flag in nav

    // Write File
    const outputPath = path.join(outputDir, `${city.slug}.html`);
    fs.writeFileSync(outputPath, content);
    console.log(`Generated: ${city.slug}.html`);
});

console.log('Done! Generated all city pages.');
