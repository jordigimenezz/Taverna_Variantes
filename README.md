# Taberna Variantes

Web de restauración con vídeo de portada, carta por categorías, secciones breves y temas claro y oscuro. Sin dependencias en el navegador.

## Archivos

- dist/: versión lista para subir a un alojamiento estático.
- src/instagram-posts.json: publicaciones mostradas en la sección de Instagram.
- dist/app.js: navegación, carta y ventanas.
- dist/hero-video.js: carga diferida del vídeo, solo en pantallas anchas.
- dist/style.css: estilos y adaptación a móvil, tableta y escritorio.
- dist/assets/: vídeo, fotografías, logotipo, fuentes e iconos, con sus licencias.
- build.mjs: genera los iconos y ejecuta prepare-pages.mjs.
- prepare-pages.mjs: genera carta, páginas legales, metadatos, pie legal y sección de Instagram.
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

Reconstruir después de modificar site-config.json, src/instagram-posts.json, la carta en dist/app.js o los generadores. Los cambios en CSS y scripts de dist/ se aplican directamente. Pruebas: npm test.

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

El sitio no instala analítica, publicidad ni contenido de terceros, por lo que no muestra aviso de cookies. El tema claro es el predeterminado. El tema oscuro se guarda en el navegador solo cuando el visitante lo elige desde el pie de página y se borra al volver al claro. Este criterio debe validarlo el titular; ver NOTAS-PRIVACIDAD.md.

ESTUDIO-SEO.md contiene la auditoría y el plan de acción. Las páginas legales con datos pendientes incluyen noindex.

## Instagram

La sección #instagram muestra cuatro publicaciones reales de https://www.instagram.com/tavernavariantes/, con miniaturas locales que enlazan a la publicación original en una pestaña nueva. Se configuran en src/instagram-posts.json. No se cargan inserciones ni scripts de Meta.

## Imágenes

Las fotografías de ambiente se sirven en WebP a 900 y 1600 px con srcset, con JPEG de respaldo. Al sustituir una fotografía hay que generar las tres versiones con los mismos nombres.
