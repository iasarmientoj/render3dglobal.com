# Render 3D Global - Sitio Web

Este proyecto utiliza un sistema de generación estática basado en plantillas HTML y scripts de Node.js para mantener la consistencia en todas las páginas de portafolio y landing pages por ciudad.

## Estructura de Archivos

- `/scripts`: Contiene la lógica de construcción y los datos.
  - `template.html`: La plantilla base para todas las ciudades y el index global.
  - `project-template.html`: La plantilla para las páginas de detalle de proyecto.
  - `cities-data.js`: Base de datos de ciudades, países, moneda y contenido SEO.
  - `projects-data.js`: Listado de proyectos realizados con sus descripciones y palabras clave.
  - `builder.js`: El script que genera el index y las páginas por país (`/co`, `/ec`).
  - `projects-builder.js`: El script que genera las páginas individuales de proyectos en `/proyectos`.

## Cómo actualizar la Web

Para aplicar cambios realizados en las plantillas o en los datos a todas las páginas HTML, debes ejecutar los siguientes comandos desde la raíz del proyecto:

### 1. Actualizar Páginas de Ciudades e Index Global
Este comando lee `template.html` y `cities-data.js` para generar el `index.html` principal y las landings en las carpetas `/co` (Colombia) y `/ec` (Ecuador).

```powershell
node scripts/builder.js
```

### 2. Actualizar Portafolio (Proyectos)
Este comando lee `project-template.html` y `projects-data.js` para generar las páginas individuales dentro de la carpeta `/proyectos`. También escanea automáticamente las carpetas de imágenes en `assets/projects`.

```powershell
node scripts/projects-builder.js
```

### 3. Página de Servicios (Carpeta `/servicios`)
A diferencia de las ciudades y los proyectos, la carpeta `/servicios` **no utiliza un generador automático**. Estas páginas son archivos HTML estáticos individuales que deben ser editados directamente si se requiere un cambio manual.

- **Index de Servicios**: `servicios/index.html` (Contiene la cuadrícula de servicios).
- **Detalles de Servicio**: Cada archivo `.html` dentro de `/servicios` es una página independiente diseñada específicamente para un nicho (ej: `render-cocinas-bogota.html`).

**Importante**: Si realizas cambios en el menú de navegación o el footer en las plantillas (`template.html` o `project-template.html`), estos cambios **no se reflejarán automáticamente** en la carpeta `/servicios`. Deberás copiar y pegar esos bloques de código manualmente o utilizar una herramienta de reemplazo masivo.

---

## Recomendaciones Técnicas Aplicadas

### Optimización de Rendimiento
- **Lazy Loading**: Todas las imágenes (excepto las críticas de la cabecera) tienen el atributo `loading="lazy"`. Esto mejora la velocidad de carga al descargar solo lo que el usuario ve en pantalla.
- **Miniaturas (Thumbnails)**: En las listas de proyectos y servicios se utilizan imágenes redimensionadas ubicadas en `assets/projects-thumbnails/` para ahorrar ancho de banda. Los pop-ups y detalles de proyecto siguen usando las versiones de alta resolución.

### Actualización de Contenido
Si deseas agregar una nueva ciudad o modificar el texto SEO de una ubicación existente, edita `scripts/cities-data.js` y luego vuelve a ejecutar `node scripts/builder.js`.