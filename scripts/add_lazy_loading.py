import os
import re

directory = r'c:\ProyIS\25.06.20 G web Render 3D Global\render3dglobal.com\servicios'

# Header logo pattern to skip (or just any img that shouldn't be lazy)
header_logo_pattern = r'class="h-7 w-auto md:h-8"'

for filename in os.listdir(directory):
    if filename.endswith('.html'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Function to add loading="lazy" if not present
        def add_lazy(match):
            img_tag = match.group(0)
            if 'loading="lazy"' in img_tag:
                return img_tag
            # Skip header logo
            if re.search(header_logo_pattern, img_tag):
                return img_tag
            
            # Insert loading="lazy" before the closing > or after src
            if ' ' in img_tag:
                return img_tag[:-1] + ' loading="lazy">'
            return img_tag

        # Find all <img> tags
        new_content = re.sub(r'<img[^>]+>', add_lazy, content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Added lazy loading to: {filename}")

print("Done!")
