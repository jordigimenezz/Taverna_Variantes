# Taberna Variantes

Web de restauración con vídeo de portada, carta por categorías, recorrido interactivo por los momentos de la mesa y temas claro y oscuro.

## Archivos

- dist/: versión lista para subir a un alojamiento estático.
- src/experience.jsx: recorrido interactivo desarrollado con React y Motion.
- dist/app.js: navegación, carta y ventanas de información.
- dist/hero-video.js: reproducción, pausa y preferencias del vídeo.
- dist/style.css: estilos y adaptación a móvil, tableta y escritorio.
- dist/assets/: vídeo, fotografías, logotipo, fuentes e iconos, con sus licencias.
- build.mjs: compilación del componente interactivo y de los iconos.
- preview.mjs: servidor de vista previa sin dependencias adicionales.

## Vista previa

Con Node.js instalado, ejecutar desde esta carpeta:

    node preview.mjs

Abrir http://127.0.0.1:4173. Para detener la vista previa, pulsar Ctrl+C.

## Publicación

Subir el CONTENIDO de dist/ al directorio público del alojamiento. El sitio no necesita un servidor de aplicaciones ni una plataforma de publicación concreta.

## Desarrollo

    npm ci
    npm run build

Reconstruir después de modificar src/experience.jsx o build.mjs. Los cambios en HTML, CSS y los demás scripts de dist/ se aplican directamente.

## Contenido pendiente

La carta es orientativa; platos y precios están pendientes de confirmar. La dirección, los horarios y las reservas online deben configurarse antes de la apertura al público. No hay servicio de reservas ni envío de mensajes conectado.

Las fotografías y el vídeo son material de ambiente y no representan el local.

## Créditos y licencias

Vídeo: Gourmet dish and a waiter, Mixkit.
https://mixkit.co/free-stock-video/gourmet-dish-and-a-waiter-2430/

Fotografías: Unsplash.
Fuentes: Cormorant Garamond, DM Sans y Barlow Condensed, bajo SIL Open Font License.
Iconos: Phosphor, bajo licencia MIT.
Se conservan los avisos y licencias de las dependencias en los archivos correspondientes.

## Privacidad, configuración y SEO

El titular, NIF/CIF, dirección, ciudad y correo se configuran en site-config.json. Actualmente figuran como X por indicación del propietario. Cambiar también origin al usar un dominio propio. Ejecutar npm run build para actualizar políticas, carta, sitemap y metadatos. Las políticas deben verificarse y completarse antes de abrir al público.

El almacenamiento opcional de apariencia solo se permite después de una elección afirmativa. Las decisiones se pueden cambiar desde el pie de página. No se han instalado analítica ni publicidad. La privacidad no se acepta como autorización genérica de tratamientos adicionales.

ESTUDIO-SEO.md contiene la auditoría y el plan de acción. NOTAS-PRIVACIDAD.md documenta el inventario y los datos pendientes. La audiencia privada del alojamiento se conserva y bloquea el rastreo del buscador. Las páginas legales con datos pendientes incluyen noindex.

Para verificar las preferencias: node --test tests/preferences.test.mjs

## Instagram

La sección #instagram muestra una selección fija de cuatro publicaciones reales de https://www.instagram.com/tavernavariantes/, con sus miniaturas locales y enlaces originales. Las publicaciones se configuran en src/instagram-posts.json. La galería no se actualiza automáticamente ni utiliza credenciales de la cuenta.

La vista previa se abre dentro de la web sin conectar con Meta. El visitante puede solicitar la inserción oficial de Instagram, habilitando de forma específica esa finalidad. Las preferencias de apariencia no autorizan por sí solas contenido externo. La inserción puede depender de las opciones del perfil, del navegador y de los requisitos de acceso de Instagram; se conserva la miniatura y el enlace original como alternativa.
