const blogPosts = [
    {
        id: "crear-objetos-3d-ia",
        title: "¡Crea Modelos 3D Gratuitos con IA y Véndelos por Miles de Pesos!",
        seoDescription: "Aprende el flujo de trabajo ágil y las mejores prácticas para generar modelos 3D optimizados desde imágenes usando Inteligencia Artificial.",
        category: "IA & Modelado",
        date: "1 de Junio, 2026",
        readTime: "5 min lectura",
        heroImage: "assets/blog/crear-objetos-3d-ia/min.jpg",
        intro: "Modelar desde cero puede ser un proceso lento cuando se necesitan decenas de elementos complementarios para una escena. En esta guía rápida aprenderás un flujo de trabajo ágil y profesional para convertir una imagen en un modelo 3D optimizado utilizando herramientas de Inteligencia Artificial de última generación.",
        steps: [
            {
                stepNumber: 1,
                title: "Conseguir la imagen de referencia",
                text: "Busca o genera una imagen clara y bien iluminada del objeto que deseas crear en 3D. Por ejemplo, puedes seleccionar un diseño desde un catálogo en línea como el Catálogo de Mesas de Alcira Guevara (https://alciraguevara.com/catalogo/catalogo-mesas/).",
                image: "assets/blog/crear-objetos-3d-ia/1.jpg"
            },
            {
                stepNumber: 2,
                title: "Aislar y mejorar la imagen con IA",
                text: "Si el objeto no está aislado de su fondo o la imagen tiene baja resolución, utiliza Inteligencia Artificial para prepararla. Puedes subir la imagen a Gemini (https://gemini.google.com/app) y usar los siguientes prompts:\n\n• Para mejorar la calidad: \"Aumenta la calidad de esta imagen de una mesa, manteniendo su estructura y detalles\"\n\n• Para aislar el objeto: \"Aisla esta mesa de su contexto y generala sobre fondo blanco, manteniendo su estructura y detalles\"",
                image: "assets/blog/crear-objetos-3d-ia/2.jpg"
            },
            {
                stepNumber: 3,
                title: "Subir a Hunyuan 3D Studio",
                text: "Ingresa a la plataforma de generación 3D Hunyuan (https://3d.hunyuanglobal.com/studio/creation/role/geo) y sube tu imagen aislada. Ajusta el recuento de caras base a un mínimo de 50,000 polígonos para asegurar que capture todos los relieves y la estructura principal del objeto.",
                image: "assets/blog/crear-objetos-3d-ia/3.jpg"
            },
            {
                stepNumber: 4,
                title: "Realizar la retopología automática con IA",
                text: "Las mallas generadas por IA suelen ser desorganizadas y pesadas. Dirígete a la pestaña 'Retopology' en Hunyuan 3D Studio. Elige topología de cuadriláteros ('Quads') o triángulos, define la densidad (como calidad 'Medium' de 50k polígonos) y haz clic en 'Generate Now' para que la IA ordene la malla automáticamente en segundos.",
                image: "assets/blog/crear-objetos-3d-ia/4.jpg"
            },
            {
                stepNumber: 5,
                title: "Proyección de texturas (Original vs Retopología)",
                text: "Si la retopología de la IA quedó perfectamente limpia, proyecta la textura sobre ella. Si necesitas el máximo detalle porque el objeto es protagonista o muy importante en tu escena, regresa al objeto original sin retopología para generarle la textura con la máxima fidelidad.",
                image: "assets/blog/crear-objetos-3d-ia/5.jpg"
            },
            {
                stepNumber: 6,
                title: "Descargar el archivo en formato GLB",
                text: "Una vez finalizada la generación de la textura y conforme con el resultado, procede a descargar el modelo 3D únicamente en formato .glb para su posterior importación.",
                image: "assets/blog/crear-objetos-3d-ia/6.jpg"
            },
            {
                stepNumber: 7,
                title: "Importación directa a SketchUp",
                text: "Si vas a utilizar pocos objetos de este tipo en la escena o tienes mucho afán porque aparecen en segundo plano, importa el archivo (.glb) directamente a tu modelo de SketchUp.",
                images: [
                    "assets/blog/crear-objetos-3d-ia/7.jpg",
                    "assets/blog/crear-objetos-3d-ia/7a.jpg"
                ]
            },
            {
                stepNumber: 8,
                title: "Escalar a dimensiones reales",
                text: "Crea un cubo de referencia con las dimensiones reales en SketchUp y escala tu objeto importado de acuerdo con él. En este caso, al conocer únicamente la altura estándar de la mesa (0.75m), escalamos el modelo importado en función de esa altura exacta.",
                images: [
                    "assets/blog/crear-objetos-3d-ia/8.jpg",
                    "assets/blog/crear-objetos-3d-ia/8a.jpg",
                    "assets/blog/crear-objetos-3d-ia/8b.jpg"
                ]
            },
            {
                stepNumber: 9,
                title: "Creación de Proxies (Escenas complejas)",
                text: "Si vas a repetir esta mesa o múltiples objetos similares muchas veces en tu escena, no los importes directamente de forma masiva. En su lugar, debes crear proxies en Enscape para mantener tu SketchUp ultra fluido (sigue los pasos en el tutorial: https://render3dglobal.com/blog/crear-proxies-enscape.html).",
                image: ""
            }
        ],
        seoRichContent: `
            <h2 class="text-3xl font-extrabold text-brand-dark mt-12 mb-6">El Impacto de la Inteligencia Artificial en la Creación de Modelos 3D Gratuitos</h2>
            <p class="mb-6">El ecosistema de la visualización arquitectónica y el diseño está experimentando una revolución sin precedentes impulsada por la <strong>Inteligencia Artificial 3D</strong>. Anteriormente, modelar un objeto con un nivel de detalle medio o alto requería horas de trabajo manual, desde la creación de geometrías básicas hasta el mapeado UV detallado. Hoy en día, gracias a herramientas avanzadas de generación a partir de imágenes como <strong>Hunyuan 3D Studio</strong>, es posible obtener <strong>modelos 3D gratis</strong> en cuestión de segundos, listos para ser pulidos y comercializados.</p>

            <h3 class="text-2xl font-bold text-brand-dark mt-10 mb-4">¿Cómo funciona el flujo de trabajo ágil con IA?</h3>
            <p class="mb-6">El secreto para pasar de una simple imagen de catálogo (como las mesas de Alcira Guevara) a un archivo tridimensional apto para motores de renderizado profesional reside en la combinación estratégica de herramientas. El primer paso crucial es la mejora y aislamiento de la imagen. La IA generativa de modelado necesita comprender perfectamente los límites y detalles del objeto. Utilizar asistentes conversacionales avanzados como <strong>Gemini</strong> con instrucciones precisas de prompts permite aumentar la resolución y aislar el fondo en un color blanco puro, reduciendo el ruido visual para optimizar el procesamiento en Hunyuan 3D.</p>

            <div class="my-8 bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-brand-cyan p-6 rounded-r-2xl">
                <h4 class="font-bold text-brand-dark mb-2 text-lg">💡 Consejo de Monetización 3D</h4>
                <p class="text-sm text-gray-700">El mercado de los assets tridimensionales tiene una demanda masiva. Diseñadores de interiores, desarrolladores de videojuegos y arquitectos buscan constantemente elementos decorativos únicos, mobiliario específico y accesorios realistas. Al dominar este flujo ágil de creación asistida por IA, puedes generar catálogos de cientos de objetos optimizados en tiempo récord y venderlos en plataformas líderes de stock 3D, cobrando en dólares o miles de pesos por pack o por descarga individual.</p>
            </div>

            <h3 class="text-2xl font-bold text-brand-dark mt-10 mb-4">La importancia crítica de la Retopología con IA y la Aplicación de Texturas</h3>
            <p class="mb-6">Cualquier profesional del sector sabe que una malla generada por IA sin procesar (que suele tener hasta 1.5 millones de polígonos) es completamente inutilizable en proyectos arquitectónicos o de diseño. Saturaría por completo la memoria de programas como SketchUp, Revit o Blender. Por suerte, plataformas avanzadas como <strong>Hunyuan 3D Studio</strong> ahora integran un módulo de <strong>retopología automática con IA</strong>. Este módulo simplifica y ordena la estructura de la malla en segundos, permitiendo elegir una topología basada en cuadriláteros (Quads) o triángulos, y ajustar la densidad a niveles óptimos (como 50k polígonos en calidad media). De esta manera, el proceso se automatiza por completo con inteligencia artificial, logrando un modelo extremadamente ligero, limpio y listo para recibir texturas impecables sin necesidad de modelado manual.</p>

            <h3 class="text-2xl font-bold text-brand-dark mt-10 mb-4">¿Por qué exportar y trabajar en formato GLB?</h3>
            <p class="mb-6">El formato <strong>GLB (gITF Binary)</strong> se ha convertido en el estándar indiscutible para la transferencia rápida de assets 3D en la web y aplicaciones interactivas. Almacena la geometría, las texturas PBR y las propiedades de materiales en un único archivo binario altamente optimizado. Esto facilita una importación fluida a SketchUp y asegura que las coordenadas de textura se mantengan intactas, permitiendo escalar el modelo según referencias de dimensiones reales (como un cubo de 0.75m de altura) con total precisión y rapidez.</p>

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
        heroImage: "assets/blog/crear-proxies-enscape/min.jpg",
        intro: "Trabajar con geometría de alta densidad en SketchUp puede ralentizar tu flujo de trabajo de forma drástica. Utilizar proxies de Enscape te permite tener representaciones livianas en tu modelo de SketchUp mientras que a la hora de renderizar se cargan los modelos FBX fotorrealistas originales.",
        steps: [
            {
                stepNumber: 1,
                title: "Ajustar dimensiones y limpiar el archivo",
                text: "Abre el archivo del objeto generado con IA en tu software de modelado 3D (como SketchUp), ajusta su tamaño de acuerdo a las dimensiones reales y elimina cualquier geometría residual u otros objetos secundarios para dejar la escena completamente limpia.",
                image: "assets/blog/crear-proxies-enscape/1.jpg"
            },
            {
                stepNumber: 2,
                title: "Exportar en formato FBX",
                text: "Exporta el objeto limpio y escalado a dimensiones reales como un archivo .fbx. Este formato es ideal porque empaqueta de forma ordenada la malla poligonal y preserva las coordenadas del mapeado de materiales.",
                image: "assets/blog/crear-proxies-enscape/2.jpg"
            },
            {
                stepNumber: 3,
                title: "Configurar almacenamiento local en SketchUp",
                text: "Abre el archivo del proyecto principal o un nuevo modelo en SketchUp. Configura la ruta de guardado en el panel de Enscape Custom Asset Editor seleccionando carpetas locales organizadas, tales como: 'Enscape 3D v4 Offline Assets' con las subcarpetas '/assets' y '/exported'.",
                image: "assets/blog/crear-proxies-enscape/3.jpg"
            },
            {
                stepNumber: 4,
                title: "Crear un nuevo Custom Asset",
                text: "Haz clic en el botón de agregar (+) en el Custom Asset Editor de Enscape para iniciar el asistente de creación de tu marcador o proxy personalizado.",
                image: "assets/blog/crear-proxies-enscape/4.jpg"
            },
            {
                stepNumber: 5,
                title: "Definir metadatos e importar geometría",
                text: "Asigna un título y una categoría temática a tu nuevo asset para mantenerlo organizado. Luego, haz clic en el botón 'Import Geometry' y selecciona el archivo .fbx de alta fidelidad que exportaste previamente en el Paso 2.",
                image: "assets/blog/crear-proxies-enscape/5.jpg"
            },
            {
                stepNumber: 6,
                title: "Optimizar texturas y propiedades de materiales",
                text: "Configura minuciosamente el aspecto y realismo de los materiales de tu asset en el editor. Ajusta el tono del albedo, el relieve (Bump map), la rugosidad (Roughness) y la reflexión (Specular) para lograr un acabado fotorrealista excelente.",
                images: [
                    "assets/blog/crear-proxies-enscape/6.jpg",
                    "assets/blog/crear-proxies-enscape/6a.jpg",
                    "assets/blog/crear-proxies-enscape/6b.jpg"
                ]
            },
            {
                stepNumber: 7,
                title: "Capturar miniatura del Asset",
                text: "Utiliza la herramienta de captura integrada en el creador de assets de Enscape para tomar una miniatura (thumbnail) de tu modelo, o sube una imagen personalizada que sirva como previsualización visual en la biblioteca local de SketchUp.",
                image: "assets/blog/crear-proxies-enscape/7.jpg"
            },
            {
                stepNumber: 8,
                title: "Guardar y exportar el Proxy",
                text: "Haz clic en el botón 'Save changes and export' para procesar el asset y exportar el componente proxy liviano. Una vez finalizado el proceso de exportación, puedes cerrar el asistente de Enscape.",
                image: "assets/blog/crear-proxies-enscape/8.jpg"
            },
            {
                stepNumber: 9,
                title: "Importar a la escena principal de SketchUp",
                text: "Haz clic en el botón verde de tu asset personalizado recién creado para colocarlo en tu escena de SketchUp. Notarás que se carga un modelo proxy ultra liviano para mantener el viewport fluido, el cual se renderizará automáticamente en tiempo real con la máxima geometría detallada del FBX.",
                images: [
                    "assets/blog/crear-proxies-enscape/9.jpg",
                    "assets/blog/crear-proxies-enscape/9a.jpg",
                    "assets/blog/crear-proxies-enscape/9b.jpg"
                ]
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
