const blogPosts = [
    {
        id: "crear-objetos-3d-ia",
        title: "¡Crea Modelos 3D Gratuitos con IA y Véndelos por Miles de Pesos!",
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
                title: "Realizar la retopología automática con IA",
                text: "Las mallas iniciales generadas por IA suelen ser desorganizadas y sumamente pesadas (hasta 1.5M polígonos). Para solucionarlo, ve al panel de 'Retopology' en Hunyuan 3D Studio (https://3d.hunyuanglobal.com/studio/creation/role/poly). Selecciona topología de cuadriláteros ('Quads') o triángulos, elige la densidad deseada (por ejemplo, 'Medium' de 50k polígonos) y haz clic en 'Generate Now' para que la IA realice la retopología automáticamente en segundos.",
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
        ],
        seoRichContent: `
            <h2 class="text-3xl font-extrabold text-brand-dark mt-12 mb-6">El Impacto de la Inteligencia Artificial en la Creación de Modelos 3D Gratuitos</h2>
            <p class="mb-6">El ecosistema de la visualización arquitectónica y el diseño de videojuegos está experimentando una revolución sin precedentes impulsada por la <strong>Inteligencia Artificial 3D</strong>. Anteriormente, modelar un objeto con un nivel de detalle medio o alto requería horas de trabajo manual, desde la creación de geometrías básicas hasta el mapeado UV detallado. Hoy en día, gracias a herramientas avanzadas de generación a partir de imágenes como <strong>Hunyuan 3D Studio</strong>, es posible obtener <strong>modelos 3D gratis</strong> en cuestión de segundos, listos para ser pulidos y comercializados.</p>

            <h3 class="text-2xl font-bold text-brand-dark mt-10 mb-4">¿Cómo funciona el flujo de trabajo ágil con IA?</h3>
            <p class="mb-6">El secreto para pasar de una simple imagen bidimensional a un archivo tridimensional apto para motores de renderizado profesional reside en la combinación estratégica de herramientas. El primer paso crucial es el aislamiento de la imagen. La IA generativa de modelado necesita comprender perfectamente los límites del objeto, por lo que utilizar asistentes como <strong>Gemini</strong> o sistemas dedicados para eliminar el fondo resulta fundamental. Una vez limpio el contorno, plataformas como Hunyuan 3D analizan la profundidad, generan la malla inicial (normalmente con una densidad de hasta 1.5M polígonos) y aplican texturas automáticas de alta fidelidad.</p>

            <div class="my-8 bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-brand-cyan p-6 rounded-r-2xl">
                <h4 class="font-bold text-brand-dark mb-2 text-lg">💡 Consejo de Monetización 3D</h4>
                <p class="text-sm text-gray-700">El mercado de los assets tridimensionales tiene una demanda masiva. Diseñadores de interiores, desarrolladores de videojuegos y arquitectos buscan constantemente elementos decorativos únicos, mobiliario específico y accesorios realistas. Al dominar este flujo ágil de creación asistida por IA, puedes generar catálogos de cientos de objetos optimizados en tiempo récord y venderlos en plataformas líderes de stock 3D, cobrando en dólares o miles de pesos por pack o por descarga individual.</p>
            </div>

            <h3 class="text-2xl font-bold text-brand-dark mt-10 mb-4">La importancia crítica de la Retopología con IA y la Aplicación de Texturas</h3>
            <p class="mb-6">Cualquier profesional del sector sabe que una malla generada por IA sin procesar (que suele tener hasta 1.5 millones de polígonos) es completamente inutilizable en proyectos arquitectónicos o de diseño. Saturaría por completo la memoria de programas como SketchUp, Revit o Blender. Por suerte, plataformas avanzadas como <strong>Hunyuan 3D Studio</strong> ahora integran un módulo de <strong>retopología automática con IA</strong>. Este módulo simplifica y ordena la estructura de la malla en segundos, permitiendo elegir una topología basada en cuadriláteros (Quads) o triángulos, y ajustar la densidad a niveles óptimos (como 50k polígonos en calidad media). De esta manera, el proceso se automatiza por completo con inteligencia artificial, logrando un modelo extremadamente ligero, limpio y listo para recibir texturas impecables sin necesidad de modelado manual.</p>

            <h3 class="text-2xl font-bold text-brand-dark mt-10 mb-4">¿Por qué exportar en formatos GLB y FBX?</h3>
            <ul class="list-disc pl-6 mb-8 space-y-3">
                <li><strong>GLB (gITF Binary):</strong> Ideal para la visualización en la web, previsualizaciones móviles y entornos interactivos de realidad aumentada. Almacena geometría, texturas y luces en un solo archivo altamente comprimido.</li>
                <li><strong>FBX (Filmbox):</strong> El formato estándar de la industria para el intercambio de datos en 3D. Mantiene la jerarquía de los materiales y es perfecto para exportar a SketchUp o preparar proxies optimizados para motores de renderizado como Enscape, Lumion o V-Ray.</li>
            </ul>

            <p class="mb-6">Integrar la <strong>Inteligencia Artificial</strong> en tu flujo diario no reemplaza tu talento; multiplica tu velocidad y capacidad de entrega, permitiéndote tomar más clientes simultáneamente y elevar las ganancias de tu estudio de visualización.</p>
        `
    },
    {
        id: "crear-proxies-enscape",
        title: "¡Mi SketchUp era extremadamente lento hasta que usé los Proxies de Enscape!",
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
        ],
        seoRichContent: `
            <h2 class="text-3xl font-extrabold text-brand-dark mt-12 mb-6">Optimización Extrema: ¿Por qué los Proxies de Enscape son la solución definitiva a tu SketchUp lento?</h2>
            <p class="mb-6">Si eres arquitecto, diseñador de interiores o visualizador 3D, seguro que te has enfrentado al frustrante problema de un <strong>SketchUp lento</strong>. Al incorporar mobiliario hiperrealista, árboles con miles de hojas, sillería detallada o elementos decorativos complejos, la memoria RAM se satura y la pantalla comienza a trabarse. La solución no es recortar el realismo de tus escenas, sino implementar un flujo de trabajo inteligente mediante la creación de <strong>proxies en Enscape</strong>.</p>

            <h3 class="text-2xl font-bold text-brand-dark mt-10 mb-4">El Secreto detrás de los Proxies de Enscape 3D v4</h3>
            <p class="mb-6">Un proxy (o marcador de posición) es, en esencia, un componente extremadamente liviano en SketchUp que actúa como un contenedor para un archivo de geometría de altísima calidad guardado en tu disco duro (usualmente un archivo FBX u OBJ). Cuando estás modelando en la interfaz de SketchUp, solo ves una caja simple o un objeto de muy pocos polígonos, lo que permite moverte por la escena en 60 FPS sin ningún tipo de retraso. Sin embargo, al iniciar el motor de renderizado de <strong>Enscape 3D</strong>, este reemplaza dinámicamente el marcador liviano por el modelo hiperrealista con todas sus texturas PBR de alta definición. ¡El resultado es un render fotorrealista perfecto y un espacio de trabajo sumamente fluido!</p>

            <div class="my-8 bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-brand-cyan p-6 rounded-r-2xl">
                <h4 class="font-bold text-brand-dark mb-2 text-lg">💡 ¿Cómo estructurar tus Custom Assets locales?</h4>
                <p class="text-sm text-gray-700">Para garantizar que Enscape nunca pierda la vinculación de tus texturas ni la geometría al renderizar, organiza tu biblioteca en carpetas locales dedicadas e inmutables. Lo más recomendable es centralizarlas en una ruta de almacenamiento externa o en una partición de tu disco principal, por ejemplo: <code>C:\\Enscape 3D v4 Offline Assets\\</code>. Divide esta carpeta principal en dos secciones claras: una para los archivos fuente (modelos FBX y texturas de alta resolución) y otra para los metadatos exportados por el Custom Asset Editor.</p>
            </div>

            <h3 class="text-2xl font-bold text-brand-dark mt-10 mb-4">Ventajas clave de usar Proxies en tus proyectos arquitectónicos</h3>
            <ul class="list-disc pl-6 mb-8 space-y-3">
                <li><strong>Optimización de memoria RAM:</strong> Reduce drásticamente el peso de tu archivo .skp (de 500MB a menos de 20MB), evitando molestos cierres inesperados y \"pantallazos azules\" de memoria.</li>
                <li><strong>Rendimiento impecable en el viewport:</strong> Realiza modificaciones en tiempo real, rota cámaras y edita muros en SketchUp sin lidiar con tiempos de carga agotadores.</li>
                <li><strong>Organización y reutilización:</strong> Crea tu propio catálogo personalizado de marcas comerciales locales de mobiliario o decoración, lo que le aportará una capa extra de exclusividad y realismo a tus renders.</li>
                <li><strong>Renders más rápidos:</strong> Enscape carga los assets directamente en la tarjeta de video únicamente al renderizar, lo que agiliza el cálculo del trazado de rayos (Ray Tracing) y la iluminación global.</li>
            </ul>

            <p class="mb-6">Dejar atrás el viewport trabado y el flujo ineficiente está a solo unos pasos de distancia. Integrando la técnica de <strong>creación de proxies en Enscape</strong> junto con modelados optimizados, llevarás tu productividad y la calidad visual de tus renders de arquitectura al siguiente nivel profesional.</p>
        `
    }
];

module.exports = { blogPosts };
