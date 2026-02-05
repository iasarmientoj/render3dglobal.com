import os

# Mapping of corrupt UTF-8 sequences to correct characters
replacements = {
    'Ã¡': 'á',
    'Ã©': 'é',
    'Ã­': 'í',
    'Ã³': 'ó',
    'Ãº': 'ú',
    'Ã±': 'ñ',
    'Ã\xad': 'í',
    'Ã\x81': 'Á',
    'Ã\x89': 'É',
    'Ã\x8d': 'Í',
    'Ã\x93': 'Ó',
    'Ã\x9a': 'Ú',
    'Ã\x91': 'Ñ',
    'Â¿': '¿',
    'Â¡': '¡',
    'Â©': '©',
    'Ã¼': 'ü',
    'Ãœ': 'Ü',
    'ðŸ‡¨ðŸ‡´': '🇨🇴',
    'ðŸ‡ªðŸ‡¨': '🇪🇨',
    'Ã' : 'í' # Fallback for some common cases where it's cut off
}

# Specific cleanup for recurring patterns that might be missed by simple map
def clean_content(content):
    # Order matters: longer sequences first
    order = [
        ('Ã¡', 'á'), ('Ã©', 'é'), ('Ã­', 'í'), ('Ã³', 'ó'), ('Ãº', 'ú'),
        ('Ã±', 'ñ'), ('Ã\x81', 'Á'), ('Ã\x89', 'É'), ('Ã\x8d', 'Í'),
        ('Ã\x93', 'Ó'), ('Ã\x9a', 'Ú'), ('Ã\x91', 'Ñ'), ('Â¿', '¿'),
        ('Â¡', '¡'), ('Â©', '©'), ('Ã¼', 'ü'), ('Ãœ', 'Ü'),
        ('ðŸ‡¨ðŸ‡´', '🇨🇴'), ('ðŸ‡ªðŸ‡¨', '🇪🇨')
    ]
    for corrupt, correct in order:
        content = content.replace(corrupt, correct)
    
    # Handle the isolated 'Ã' that often appears next to a space or tag if 'í' was broken
    # But only if it's not part of another valid sequence (though we replaced those already)
    # content = content.replace('Ã', 'í') # Use with caution
    
    return content

directory = r'c:\ProyIS\25.06.20 G web Render 3D Global\render3dglobal.com\servicios'

for filename in os.listdir(directory):
    if filename.endswith('.html'):
        filepath = os.path.join(directory, filename)
        print(f"Cleaning: {filename}")
        
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        cleaned = clean_content(content)
        
        # Additional common ones seen in the view_file output
        cleaned = cleaned.replace('UbicaciÃ³n', 'Ubicación')
        cleaned = cleaned.replace('MenÃº', 'Menú')
        cleaned = cleaned.replace('MÃ³vil', 'Móvil')
        cleaned = cleaned.replace('BotÃ³n', 'Botón')
        cleaned = cleaned.replace('BogotÃ¡', 'Bogotá')
        cleaned = cleaned.replace('MedellÃ­n', 'Medellín')
        cleaned = cleaned.replace('situaciÃ³n', 'situación')
        cleaned = cleaned.replace('arquitectÃ³nico', 'arquitectónico')
        cleaned = cleaned.replace('superposiciÃ³n', 'superposición')
        cleaned = cleaned.replace('renovaciÃ³n', 'renovación')
        cleaned = cleaned.replace('urbanismo tÃ¡ctico', 'urbanismo táctico')
        cleaned = cleaned.replace('despuÃ©s', 'después')
        cleaned = cleaned.replace('VisualizaciÃ³n', 'Visualización')
        cleaned = cleaned.replace('rÃ¡pida', 'rápida')
        cleaned = cleaned.replace('DiseÃ±o', 'Diseño')
        cleaned = cleaned.replace('ProyecciÃ³n', 'Proyección')
        cleaned = cleaned.replace('fotografÃ­a', 'fotografía')
        
        if cleaned != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(cleaned)
            print(f"  Fixed: {filename}")
        else:
            print(f"  No changes needed for: {filename}")

print("Done!")
