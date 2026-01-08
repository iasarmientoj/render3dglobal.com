/**
 * Render 3D Global - Google Analytics Intelligent Event Tracking
 * Automatically detects and tracks key user interactions without manual HTML IDs.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Delegate all click events on the body
    document.body.addEventListener('click', function (e) {
        // Find closest anchor tag or button
        const target = e.target.closest('a, button');
        if (!target) return;

        const href = target.getAttribute('href') || '';
        const text = (target.innerText || target.textContent || '').trim();
        const id = target.id || '';
        const classes = target.className || '';

        // ---------------------------------------------------------
        // 1. WhatsApp Tracking (High Priority)
        // ---------------------------------------------------------
        if (href.includes('wa.me') || href.includes('whatsapp.com')) {
            gtag('event', 'generate_lead', {
                'event_category': 'Contact',
                'event_label': 'WhatsApp',
                'method': 'WhatsApp',
                'link_text': text,
                'link_url': href
            });
            console.log('UA Event: WhatsApp Click', text);
            return; // Exit to avoid double counting if it matches other patterns
        }

        // ---------------------------------------------------------
        // 2. Email Tracking
        // ---------------------------------------------------------
        if (href.startsWith('mailto:')) {
            gtag('event', 'generate_lead', {
                'event_category': 'Contact',
                'event_label': 'Email',
                'method': 'Email',
                'link_text': text
            });
            console.log('UA Event: Email Click', text);
            return;
        }

        // ---------------------------------------------------------
        // 3. "Cotizar" / Contact Page Tracking
        // ---------------------------------------------------------
        // Detects links to contacto.html. 
        // We distinguish between the main nav menu and explicit "Call to Action" buttons.
        if (href.includes('contacto.html')) {
            let label = 'Cotizar';
            let value = 1.0;

            // If it's a "Cotizar" button (usually has explicit text or class)
            if (text.toLowerCase().includes('cotiz') || classes.includes('btn') || classes.includes('button') || classes.includes('cta')) {
                label = text || 'Cotizar Button';
                value = 2.0; // Higher value for explicit buttons
            } else {
                // Likely a menu link
                label = 'Menu Contacto';
                value = 0.5;
            }

            gtag('event', 'view_country_selector_wa', {
                'event_category': 'Contact',
                'event_label': label,
                'value': value,
                'link_url': href
            });
            console.log('UA Event: Cotizar Click', label);
            return;
        }

        // ---------------------------------------------------------
        // 4. Service Selection
        // ---------------------------------------------------------
        if (href.includes('servicios/') && !href.includes('index.html')) {
            gtag('event', 'select_content', {
                'content_type': 'service',
                'item_id': href.split('/').pop().replace('.html', ''),
                'event_category': 'Engagement',
                'event_label': text
            });
            console.log('UA Event: Service Click', text);
        }

        // ---------------------------------------------------------
        // 5. Project/Portfolio Selection
        // ---------------------------------------------------------
        if (href.includes('proyectos/') && !href.includes('index.html')) {
            gtag('event', 'view_item', {
                'content_type': 'project',
                'item_id': href.split('/').pop().replace('.html', ''),
                'event_category': 'Engagement',
                'event_label': text
            });
            console.log('UA Event: Project Click', text);
        }
    });
});
