
const fs = require('fs');
const path = require('path');
const { projectsData } = require('./projects-data.js');

const TEMPLATE_PATH = path.join(__dirname, 'project-template.html');
const OUTPUT_DIR = path.join(__dirname, '../proyectos');
const ASSETS_DIR = path.join(__dirname, '../assets/projects');

// Read Template
const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

// Function to generate gallery HTML
function generateGalleryData(folderName, projectTitle) {
    const projectAssetsPath = path.join(ASSETS_DIR, folderName);
    let mainImageUrl = '';
    let thumbnailsHtml = '';

    if (fs.existsSync(projectAssetsPath)) {
        const files = fs.readdirSync(projectAssetsPath);
        // Filter for images (webp, jpg, png)
        const images = files.filter(file => /\.(webp|jpg|png|jpeg)$/i.test(file));

        if (images.length > 0) {
            // Set Main Image (First one)
            mainImageUrl = `../assets/projects/${folderName}/${images[0]}`;

            // Generate Thumbnails
            images.forEach((image, index) => {
                const imagePath = `../assets/projects/${folderName}/${image}`;
                const thumbnailPath = `../assets/projects-thumbnails/${folderName}/${image}`;
                thumbnailsHtml += `
                     <div class="snap-start shrink-0 w-32 h-24 rounded-lg overflow-hidden border-2 border-transparent hover:border-brand-cyan cursor-pointer transition-all" 
                          onclick="updateMainImage('${imagePath}')">
                        <img src="${thumbnailPath}" alt="Thumbnail ${index + 1}" loading="lazy" class="w-full h-full object-cover hover:opacity-80 transition-opacity">
                    </div>
                `;
            });
        }
    } else {
        console.warn(`Warning: Assets folder not found for ${folderName}`);
    }

    return { mainImageUrl, thumbnailsHtml };
}

// Build Process
console.log('Starting Project Pages Build...');

projectsData.forEach(project => {
    let content = template;

    // Gallery Data
    const { mainImageUrl, thumbnailsHtml } = generateGalleryData(project.folderName, project.title);

    // Replacements
    content = content.replace(/{{TITLE}}/g, project.title);
    content = content.replace(/{{DESCRIPTION}}/g, project.seoHiddenText.substring(0, 160));
    content = content.replace(/{{KEYWORDS}}/g, project.keywords.join(', '));
    content = content.replace(/{{AI_INSTRUCTIONS}}/g, project.aiInstructions);
    content = content.replace(/{{SEO_HIDDEN_TEXT}}/g, project.seoHiddenText);
    content = content.replace(/{{SOFTWARE}}/g, project.software);

    // Canonical URL
    const canonicalUrl = `https://render3dglobal.com/proyectos/${project.id}.html`;
    content = content.replace(/{{CANONICAL_URL}}/g, canonicalUrl);

    // Blog Content
    content = content.replace(/{{BLOG_CHALLENGE}}/g, project.blogContent.challenge);
    content = content.replace(/{{BLOG_SOLUTION}}/g, project.blogContent.solution);
    content = content.replace(/{{BLOG_RESULT}}/g, project.blogContent.result);
    content = content.replace(/{{SUMMARY_PHRASE}}/g, project.summaryPhrase);

    // Gallery Replacements
    content = content.replace(/{{MAIN_IMAGE_URL}}/g, mainImageUrl);
    content = content.replace(/{{THUMBNAILS_HTML}}/g, thumbnailsHtml);

    // Write File
    const fileName = `${project.id}.html`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), content);
    console.log(`Generated: ${fileName}`);
});

console.log('Build Complete!');
