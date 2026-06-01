const fs = require('fs');
const path = require('path');
const { servicesData } = require('./services-data.js');

const TEMPLATE_PATH = path.join(__dirname, 'service-template.html');
const OUTPUT_DIR = path.join(__dirname, '../servicios');

// Read Template
if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('Service template not found:', TEMPLATE_PATH);
    process.exit(1);
}
const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

console.log('Starting Services Pages Build...');

servicesData.forEach(service => {
    let content = template;

    // Build conditional HTML parts
    const subtitleHtml = service.subtitle 
        ? `<p class="text-xl text-gray-600 mb-8 max-w-3xl">${service.subtitle}</p>`
        : '';

    const alertHtml = (service.alertText || service.seoHiddenText)
        ? `
            <div class="bg-gray-50 p-6 rounded-lg mb-10 border-l-4 border-brand-cyan">
                ${service.alertText ? `<p class="text-lg text-gray-700">${service.alertText}</p>` : ''}
                <!-- SEO Oculto -->
                ${service.seoHiddenText ? `<div class="hidden">${service.seoHiddenText}</div>` : ''}
            </div>
          `
        : '';

    const benefitsHtml = service.benefits
        ? service.benefits.map(benefit => `
            <li class="flex items-start gap-2">
                <i class="fas fa-check text-brand-cyan mt-1"></i> ${benefit}
            </li>
          `).join('\n')
        : '';

    const canonicalUrl = `https://render3dglobal.com/servicios/${service.id}.html`;
    const encodedWaMsg = encodeURIComponent(service.whatsappMessage || 'Hola, cotización renders');

    // Replacements
    content = content.replace(/{{TITLE}}/g, service.title || `${service.h1} | Render 3D Global`);
    content = content.replace(/{{META_DESCRIPTION}}/g, service.metaDescription || '');
    content = content.replace(/{{CANONICAL_URL}}/g, canonicalUrl);
    
    content = content.replace(/{{H1}}/g, service.h1 || '');
    content = content.replace(/{{SUBTITLE_HTML}}/g, subtitleHtml);
    content = content.replace(/{{ALERT_HTML}}/g, alertHtml);
    
    content = content.replace(/{{MAIN_IMAGE_URL}}/g, service.mainImageUrl || '');
    content = content.replace(/{{MAIN_IMAGE_ALT}}/g, service.mainImageAlt || service.h1 || '');
    
    content = content.replace(/{{LEFT_TITLE}}/g, service.leftTitle || 'Beneficios');
    content = content.replace(/{{BENEFITS_HTML}}/g, benefitsHtml);
    
    content = content.replace(/{{RIGHT_TITLE}}/g, service.rightTitle || '¿Tienes un proyecto?');
    content = content.replace(/{{RIGHT_TEXT}}/g, service.rightText || 'Contáctanos hoy mismo.');
    content = content.replace(/{{CTA_TEXT}}/g, service.ctaText || 'Cotizar Renders');
    
    content = content.replace(/{{WHATSAPP_NUMBER}}/g, service.whatsappNumber || '573132060072');
    content = content.replace(/{{WHATSAPP_MESSAGE}}/g, encodedWaMsg);

    // Write File
    const fileName = `${service.id}.html`;
    const outputPath = path.join(OUTPUT_DIR, fileName);
    
    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`Generated service page: ${fileName}`);
});

console.log(`Build Complete! Successfully generated ${servicesData.length} service pages.`);
