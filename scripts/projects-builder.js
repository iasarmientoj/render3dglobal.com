
const fs = require('fs');
const path = require('path');
const { projectsData } = require('./projects-data.js');

const TEMPLATE_PATH = path.join(__dirname, 'project-template.html');
const OUTPUT_DIR = path.join(__dirname, '../proyectos');
const ASSETS_DIR = path.join(__dirname, '../assets/projects');

// Read Template
const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

// Function to generate gallery HTML
function generateGalleryHtml(folderName, projectTitle) {
    const projectAssetsPath = path.join(ASSETS_DIR, folderName);
    let html = '';

    if (fs.existsSync(projectAssetsPath)) {
        const files = fs.readdirSync(projectAssetsPath);
        // Filter for images (webp, jpg, png)
        const images = files.filter(file => /\.(webp|jpg|png|jpeg)$/i.test(file));

        images.forEach((image, index) => {
            const imagePath = `../assets/projects/${folderName}/${image}`;
            html += `
                <div class="rounded-xl overflow-hidden shadow-lg border border-gray-100 group">
                    <img src="${imagePath}"
                        alt="${projectTitle} - Vista ${index + 1}" 
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                </div>
            `;
        });
    } else {
        console.warn(`Warning: Assets folder not found for ${folderName}`);
        html = '<p class="text-red-500">Galería no disponible (Carpeta de assets no encontrada)</p>';
    }
    return html;
}

// Build Process
console.log('Starting Project Pages Build...');

projectsData.forEach(project => {
    let content = template;

    // Replacements
    content = content.replace(/{{TITLE}}/g, project.title);
    content = content.replace(/{{DESCRIPTION}}/g, project.seoHiddenText.substring(0, 160)); // Meta description limit
    content = content.replace(/{{KEYWORDS}}/g, project.keywords.join(', '));
    content = content.replace(/{{AI_INSTRUCTIONS}}/g, project.aiInstructions);
    content = content.replace(/{{SEO_HIDDEN_TEXT}}/g, project.seoHiddenText);

    // Blog Content
    content = content.replace(/{{BLOG_CHALLENGE}}/g, project.blogContent.challenge);
    content = content.replace(/{{BLOG_SOLUTION}}/g, project.blogContent.solution);
    content = content.replace(/{{BLOG_RESULT}}/g, project.blogContent.result);
    content = content.replace(/{{SUMMARY_PHRASE}}/g, project.summaryPhrase);


    // Gallery
    const galleryHtml = generateGalleryHtml(project.folderName, project.title);
    content = content.replace(/{{GALLERY_IMAGES}}/g, galleryHtml);

    // Write File
    const fileName = `${project.id}.html`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), content);
    console.log(`Generated: ${fileName}`);
});

console.log('Build Complete!');
