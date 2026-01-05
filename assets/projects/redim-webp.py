import os
from PIL import Image

def optimizar_a_webp(directorio_base, calidad=80):
    # Extensiones que vamos a buscar
    extensiones_validas = ('.jpg', '.jpeg', '.png', '.bmp', '.tiff')
    
    print(f"--- Iniciando optimización en: {directorio_base} ---")

    # Caminar por todas las subcarpetas
    for root, dirs, files in os.walk(directorio_base):
        for filename in files:
            if filename.lower().endswith(extensiones_validas):
                try:
                    # Ruta completa del archivo original
                    ruta_original = os.path.join(root, filename)
                    
                    # Definir nombre del nuevo archivo .webp
                    nombre_sin_ext = os.path.splitext(filename)[0]
                    ruta_salida = os.path.join(root, f"{nombre_sin_ext}.webp")

                    # Abrir y convertir
                    with Image.open(ruta_original) as img:
                        # Convertir a RGB (necesario para PNGs con transparencia o formatos CMYK)
                        if img.mode in ("RGBA", "P"):
                            img = img.convert("RGB")
                        
                        # Guardar como WebP
                        # lossless=False permite que la compresión sea eficiente
                        img.save(ruta_salida, "WEBP", quality=calidad, optimize=True)
                        
                    print(f"✔ Convertido: {filename} -> {nombre_sin_ext}.webp")
                    
                    # Opcional: Descomenta la siguiente línea si quieres borrar el original tras convertir
                    # os.remove(ruta_original)

                except Exception as e:
                    print(f"✘ Error procesando {filename}: {e}")

    print("\n--- Proceso finalizado con éxito ---")

if __name__ == "__main__":
    # Usa "." si el script está en la misma carpeta que las carpetas de proyectos
    # O pega la ruta completa aquí
    ruta_proyectos = "./" 
    optimizar_a_webp(ruta_proyectos)