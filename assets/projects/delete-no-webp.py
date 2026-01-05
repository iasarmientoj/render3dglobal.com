import os

def eliminar_imagenes_no_webp(directorio_base):
    # Extensiones de imagen que queremos eliminar
    extensiones_a_borrar = ('.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.jfif')
    
    archivos_eliminados = 0
    print(f"--- Iniciando limpieza en: {directorio_base} ---")

    for root, dirs, files in os.walk(directorio_base):
        for filename in files:
            # Comprobar si el archivo es una imagen y NO es webp
            if filename.lower().endswith(extensiones_a_borrar):
                ruta_completa = os.path.join(root, filename)
                
                try:
                    os.remove(ruta_completa)
                    print(f"🗑️ Eliminado: {filename}")
                    archivos_eliminados += 1
                except Exception as e:
                    print(f"✘ No se pudo borrar {filename}: {e}")

    print(f"\n--- Limpieza completada ---")
    print(f"Total de archivos eliminados: {archivos_eliminados}")

if __name__ == "__main__":
    # Asegúrate de que esta sea la ruta correcta
    ruta_proyectos = "./" 
    
    confirmacion = input(f"¿Estás seguro de que quieres borrar todas las imágenes NO webp en '{ruta_proyectos}'? (s/n): ")
    
    if confirmacion.lower() == 's':
        eliminar_imagenes_no_webp(ruta_proyectos)
    else:
        print("Operación cancelada.")