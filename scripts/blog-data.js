const blogPosts = [
    {
        id: "crear-objetos-3d-ia",
        title: "Crear Objetos 3D con Inteligencia Artificial: Instructivo y Buenas Prácticas",
        seoDescription: "Aprende el flujo de trabajo ágil y las mejores prácticas para generar modelos 3D optimizados desde imágenes usando Inteligencia Artificial.",
        category: "IA & Modelado",
        date: "1 de Junio, 2026",
        readTime: "5 min lectura",
        heroImage: "assets/blog/crear-objetos-3d-ia/hero.webp",
        intro: "Modelar desde cero puede ser un proceso lento cuando se necesitan decenas de elementos complementarios para una escena. En esta guía rápida aprenderás un flujo de trabajo ágil y profesional para convertir una imagen en un modelo 3D optimizado utilizando herramientas de Inteligencia Artificial de última generación.",
        steps: [
            {
                stepNumber: 1,
                title: "Conseguir la imagen de referencia",
                text: "Busca o genera una imagen clara, nítida y bien iluminada del objeto que deseas crear en 3D. Cuanto más definida esté la silueta y los detalles, mejor será el resultado tridimensional.",
                image: "assets/blog/crear-objetos-3d-ia/paso-1.webp"
            },
            {
                stepNumber: 2,
                title: "Aislar el fondo del objeto",
                text: "Si tu imagen de referencia tiene un fondo complejo, debes aislar el objeto. Puedes lograrlo fácilmente subiendo la imagen a Gemini (https://gemini.google.com/) o utilizando herramientas de recorte automático como Nanobanana.",
                image: "assets/blog/crear-objetos-3d-ia/paso-2.webp"
            },
            {
                stepNumber: 3,
                title: "Subir a Hunyuan 3D Studio",
                text: "Sube la imagen aislada y recortada a la plataforma de generación 3D Hunyuan (https://3d.hunyuanglobal.com/studio/creation/role/geo). Ajusta la configuración de generación a un mínimo de 50,000 polígonos para asegurar que se capturen correctamente las formas base y el relieve.",
                image: "assets/blog/crear-objetos-3d-ia/paso-3.webp"
            },
            {
                stepNumber: 4,
                title: "Realizar la retopología del modelo",
                text: "Los modelos generados por IA suelen tener mallas de polígonos desorganizadas y pesadas. Ejecuta el proceso de retopología en tu software 3D para ordenar y simplificar la estructura geométrica de la malla, haciéndola óptima para renderizar.",
                image: "assets/blog/crear-objetos-3d-ia/paso-4.webp"
            },
            {
                stepNumber: 5,
                title: "Proyección y mapeado de texturas",
                text: "Si la retopología del paso anterior quedó limpia y con un buen flujo de caras, proyecta la textura directamente sobre esta nueva malla. Si no, aplica y hornea la textura en la malla de alta densidad original.",
                image: "assets/blog/crear-objetos-3d-ia/paso-5.webp"
            },
            {
                stepNumber: 6,
                title: "Exportar formatos GLB y FBX",
                text: "Descarga el modelo final en formatos .glb y .fbx. Conservar ambos formatos es vital, ya que el .glb te servirá para previsualizaciones rápidas de texturas y el .fbx será ideal para la creación posterior del proxie de Enscape.",
                image: "assets/blog/crear-objetos-3d-ia/paso-6.webp"
            },
            {
                stepNumber: 7,
                title: "Importación directa a SketchUp (Casos rápidos)",
                text: "Si vas a colocar pocos objetos generados en tu escena o tienes mucho afán y estos objetos aparecerán en segundo plano, puedes importar directamente el archivo (.fbx o .dae) a tu modelo de SketchUp.",
                image: "assets/blog/crear-objetos-3d-ia/paso-7.webp"
            },
            {
                stepNumber: 8,
                title: "Creación de Proxies en Enscape (Recomendado)",
                text: "Si vas a repetir el objeto múltiples veces en la escena (como vegetación, sillería o decoración), no lo importes directamente. En su lugar, debes crear un proxie de Enscape para mantener el rendimiento al máximo (sigue las instrucciones en el siguiente tutorial).",
                image: "assets/blog/crear-objetos-3d-ia/paso-8.webp"
            }
        ]
    },
    {
        id: "crear-proxies-enscape",
        title: "Crear Proxies en Enscape 3D: Optimización Extrema en SketchUp",
        seoDescription: "Tutorial rápido y buenas prácticas para configurar custom assets y proxies en Enscape 3D v4 manteniendo tu archivo de SketchUp ultra liviano.",
        category: "Enscape & Render",
        date: "1 de Junio, 2026",
        readTime: "3 min lectura",
        heroImage: "assets/blog/crear-proxies-enscape/hero.webp",
        intro: "Trabajar con geometría de alta densidad en SketchUp puede ralentizar tu flujo de trabajo de forma drástica. Utilizar proxies de Enscape te permite tener representaciones livianas en tu modelo de SketchUp mientras que a la hora de renderizar se cargan los modelos FBX fotorrealistas originales.",
        steps: [
            {
                stepNumber: 1,
                title: "Configurar las carpetas de almacenamiento local",
                text: "Define y configura las carpetas en tu disco de forma organizada. Lo recomendado es establecer una ruta limpia como 'Enscape 3D v4 Offline Assets' con dos subcarpetas esenciales: '/assets' y '/exported'. Esto asegurará que el motor localice siempre las texturas sin problemas.",
                image: "assets/blog/crear-proxies-enscape/paso-1.webp"
            },
            {
                stepNumber: 2,
                title: "Iniciar el Custom Asset Creator",
                text: "Abre SketchUp, ingresa al panel de Custom Asset Editor de Enscape y haz clic en el botón de añadir (+). Esto iniciará el asistente de configuración para tu nuevo asset personalizado.",
                image: "assets/blog/crear-proxies-enscape/paso-2.webp"
            },
            {
                stepNumber: 3,
                title: "Importar geometría (FBX)",
                text: "Haz clic en la opción 'Import Geometry' y selecciona el archivo .fbx de alta densidad que exportaste en tu flujo de modelado (por ejemplo, el generado en el instructivo de IA). Enscape cargará la geometría y sus materiales asociados.",
                image: "assets/blog/crear-proxies-enscape/paso-3.webp"
            },
            {
                stepNumber: 4,
                title: "Capturar la miniatura representativa",
                text: "Usa la cámara integrada del editor para tomar una captura del objeto, o carga una imagen personalizada para el visor. Esta miniatura (thumbnail) será la que verás en tu biblioteca de assets dentro de SketchUp.",
                image: "assets/blog/crear-proxies-enscape/paso-4.webp"
            },
            {
                stepNumber: 5,
                title: "Guardar y exportar el Proxie",
                text: "Haz clic en guardar. Enscape creará un componente proxy liviano que podrás colocar ilimitadas veces en SketchUp. Al momento de presionar el botón de renderizado, Enscape reemplazará automáticamente estas cajas simples por el archivo .fbx fotorrealista de alto detalle, manteniendo tu SketchUp súper rápido.",
                image: "assets/blog/crear-proxies-enscape/paso-5.webp"
            }
        ]
    }
];

module.exports = { blogPosts };
