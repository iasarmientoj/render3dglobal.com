const fs = require('fs');
const path = require('path');

// Configuration
const projectsDir = path.join(__dirname, '../proyectos');
const servicePagePath = path.join(__dirname, '../servicios/visualizacion-para-disenadores-interiores.html');

// Read the Template Source (Service Page)
const serviceHtml = fs.readFileSync(servicePagePath, 'utf8');

// Split the Service Page to extract Header and Footer
// We will define the "Header" as everything before the specific content starts.
// Looking at the file, the specific content starts around line 149 with the <h1>.
// However, to be cleaner, we should keep the <main> layout wrapper.

// Let's find the start of the specific content
const mainContentStartMarker = '<h1 class="text-4xl font-bold text-brand-dark mb-4">';
const mainContentEndMarker = '</main>';

const headerEndIndex = serviceHtml.indexOf(mainContentStartMarker);
const footerStartIndex = serviceHtml.lastIndexOf(mainContentEndMarker);

if (headerEndIndex === -1 || footerStartIndex === -1) {
    console.error("Could not parse service page structure.");
    process.exit(1);
}

const templateHeader = serviceHtml.substring(0, headerEndIndex);
const templateFooter = serviceHtml.substring(footerStartIndex);

// Process each project file
fs.readdirSync(projectsDir).forEach(file => {
    if (!file.endsWith('.html') || file === 'index.html') return;

    const filePath = path.join(projectsDir, file);
    let originalContent = fs.readFileSync(filePath, 'utf8');

    console.log(`Processing ${file}...`);

    // --- EXTRACTION ---
    // 1. Title Tag
    const titleMatch = originalContent.match(/<title>(.*?)<\/title>/);
    const pageTitle = titleMatch ? titleMatch[1] : 'Proyecto Render 3D Global';

    // 2. Meta Description
    const metaMatch = originalContent.match(/<meta name="description"\s+content="(.*?)">/);
    const metaDesc = metaMatch ? metaMatch[1] : '';

    // 3. H1
    const h1Match = originalContent.match(/<h1.*?>(.*?)<\/h1>/);
    const h1Text = h1Match ? h1Match[1] : 'Proyecto';

    // 4. Subtitle (first p after h1, likely class text-xl or gray-400)
    // We look for the header section
    const headerSectionMatch = originalContent.match(/<header.*?>(.*?)<\/header>/s);
    let subtitle = '';
    let extraDesc = '';

    if (headerSectionMatch) {
        const headerInner = headerSectionMatch[1];
        // Find p tags
        const pTags = [...headerInner.matchAll(/<p.*?>(.*?)<\/p>/g)];
        if (pTags.length > 0) subtitle = pTags[0][1];
        if (pTags.length > 1) extraDesc = pTags[1][1];
    }

    // 5. Images
    // We want to capture src and alt.
    // The current files have images in divs.
    const imageMatches = [...originalContent.matchAll(/<img src="(.*?)"\s+alt="(.*?)"/g)];
    const images = imageMatches.map(m => ({ src: m[1], alt: m[2] }));

    // --- RECONSTRUCTION ---

    // clean up title tag in header
    let newHeader = templateHeader.replace(/<title>.*?<\/title>/, `<title>${pageTitle}</title>`);
    newHeader = newHeader.replace(/<meta name="description"\s+content=".*?">/, `<meta name="description" content="${metaDesc}">`);

    // ensure text colors are correct (Service page is Light/Dark text, Project page was Dark/White)
    // The template header sets a white background, so we just need to ensure our inserted content uses dark text classes.

    let innerContent = `
            <h1 class="text-4xl font-bold text-brand-dark mb-4">${h1Text}</h1>
            <p class="text-xl text-gray-600 mb-8 max-w-3xl">${subtitle}</p>

            <div class="bg-gray-50 p-6 rounded-lg mb-10 border-l-4 border-brand-cyan">
                <p class="text-lg text-gray-700">${extraDesc || metaDesc || 'Explora los detalles de este proyecto de visualización 3D.'}</p>
            </div>
    `;

    // Images
    if (images.length > 0) {
        // Main Image (First one)
        const mainImg = images[0];
        // Fix relative path if needed. 
        // Service page uses "../assets", Project page uses "../assets". So paths should be compatible.
        // However, extracted path might contain quotes or spaces? Regex m[1] should be clean.

        innerContent += `
            <div class="mb-12 rounded-xl overflow-hidden shadow-2xl">
                <img src="${mainImg.src}"
                    alt="${mainImg.alt}" class="w-full h-auto object-cover max-h-[600px]">
            </div>
        `;

        // Grid for remaining images
        if (images.length > 1) {
            innerContent += `<div class="grid md:grid-cols-2 gap-12 mb-12">`;

            for (let i = 1; i < images.length; i++) {
                innerContent += `
                <div class="rounded-xl overflow-hidden shadow-lg border border-gray-100">
                    <img src="${images[i].src}"
                        alt="${images[i].alt}" class="w-full h-full object-cover">
                </div>
                `;
            }
            // If odd number of secondary images, maybe add a CTA card?
            // The service template had a CTA card in the grid.
            innerContent += `
                <div class="bg-brand-gray/50 p-8 rounded-xl border border-gray-100 flex flex-col justify-center text-center">
                    <h2 class="text-2xl font-bold text-brand-dark mb-4">¿Tienes un proyecto similar?</h2>
                    <p class="mb-6 text-gray-600">Convierte tus planos en imágenes que venden.</p>
                    <a href="../contacto.html"
                        class="inline-block bg-brand-cyan text-white font-bold py-4 px-8 rounded hover:bg-brand-dark transition-colors shadow-lg">
                        Cotizar Este Proyecto
                    </a>
                </div>
            `;

            innerContent += `</div>`;
        }
    }

    // Combine
    const finalHtml = newHeader + innerContent + templateFooter;

    // Write back
    fs.writeFileSync(filePath, finalHtml);
    console.log(`Updated ${file}`);
});
