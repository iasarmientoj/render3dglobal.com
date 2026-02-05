import os
from PIL import Image

def generate_thumbnails(src_dir, dest_dir, target_width=480):
    """
    Recorre el directorio de origen, redimensiona las imágenes a un ancho específico
    y las guarda en el directorio de destino manteniendo la estructura de carpetas.
    """
    # Extensiones de imagen soportadas
    valid_extensions = ('.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff')
    
    print(f"--- Iniciando generación de miniaturas ---")
    print(f"Origen: {src_dir}")
    print(f"Destino: {dest_dir}")
    print(f"Ancho objetivo: {target_width}px\n")

    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)
        print(f"[NUEVO] Directorio de destino creado: {dest_dir}")

    total_processed = 0
    
    # Recorrer el directorio de origen
    for root, dirs, files in os.walk(src_dir):
        # Evitar procesar el propio directorio de destino si está dentro del de origen
        if os.path.abspath(dest_dir).lower() in os.path.abspath(root).lower():
            continue
            
        for file in files:
            if file.lower().endswith(valid_extensions):
                src_path = os.path.join(root, file)
                
                # Crear la ruta relativa para replicar la estructura de carpetas
                relative_path = os.path.relpath(root, src_dir)
                target_folder = os.path.join(dest_dir, relative_path)
                
                if not os.path.exists(target_folder):
                    os.makedirs(target_folder)
                    print(f"  Carpeta creada: {relative_path}")
                
                dest_path = os.path.join(target_folder, file)
                
                # Opcional: Podrías forzar la salida a .webp para mejores miniaturas
                # nombre_sin_ext = os.path.splitext(file)[0]
                # dest_path = os.path.join(target_folder, f"{nombre_sin_ext}.webp")

                try:
                    with Image.open(src_path) as img:
                        # Si la imagen ya es más pequeña que el target, podemos copiarla o no hacer nada
                        # Pero redimensionar asegura uniformidad
                        
                        # Calcular nueva altura manteniendo la relación de aspecto
                        width_percent = (target_width / float(img.size[0]))
                        h_size = int((float(img.size[1]) * float(width_percent)))
                        
                        # Redimensionar usando LANCZOS para alta calidad
                        img_resized = img.resize((target_width, h_size), Image.Resampling.LANCZOS)
                        
                        # Convertir a RGB si es necesario (para formatos como RGBA a JPEG)
                        # Si mantenemos la extensión original, esto es importante
                        if file.lower().endswith(('.jpg', '.jpeg')) and img_resized.mode != 'RGB':
                            img_resized = img_resized.convert('RGB')

                        # Guardar la imagen optimizada
                        img_resized.save(dest_path, optimize=True, quality=80)
                        
                    print(f"[OK] {file} -> {target_width}px")
                    total_processed += 1
                except Exception as e:
                    print(f"[ERROR] en {file}: {e}")

    print(f"\n--- Proceso finalizado ---")
    print(f"Total de imágenes procesadas: {total_processed}")
    print(f"Las miniaturas se encuentran en: {dest_dir}")

if __name__ == "__main__":
    # Obtener el directorio base de forma dinámica o usar rutas absolutas
    # En este caso, usamos la estructura solicitada
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir) # Sube un nivel desde 'scripts'
    
    source = os.path.join(project_root, "assets", "projects")
    destination = os.path.join(project_root, "assets", "projects-thumbnails")
    
    generate_thumbnails(source, destination)
