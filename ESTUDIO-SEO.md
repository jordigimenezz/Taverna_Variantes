# Estudio SEO · Taberna Variantes

Fecha: 28 de octubre de 2026. Ámbito: archivos de la última versión y configuración de acceso de la web. Titular, ciudad y dirección figuran como «X», por indicación del propietario.

## Conclusión

La prioridad es permitir que el buscador acceda al sitio cuando el negocio esté listo para publicarlo. La configuración actual es privada, con acceso reservado al propietario. No se ha cambiado esta audiencia. Una página que exige inicio de sesión no es rastreable por Google; las etiquetas y el sitemap no eliminan ese impedimento. [Requisitos técnicos de Google](https://developers.google.com/search/docs/essentials/technical).

No se han consultado Search Console, Google Business Profile ni herramientas de volumen de búsqueda. Por tanto, este informe no atribuye tráfico, posiciones, búsquedas mensuales, competencia cuantificada ni resultados comerciales. Tampoco se presentan puntuaciones Lighthouse o métricas de campo que no se han medido.

## Auditoría y mejoras aplicadas

| Área | Situación encontrada | Cambio o decisión |
|---|---|---|
| Acceso | Sitio privado | Se mantiene el acceso. Pendiente de decidir la apertura pública. |
| Título | Marca y lema, con poca descripción del contenido | Título: «Taberna Variantes / Aperitivos y platos para compartir», usando separador vertical en el HTML. |
| Descripción | Texto editorial general | Descripción más concreta sobre aperitivos, mesa y carta. |
| Marca visible | Principalmente en el logotipo | Nombre del negocio visible también junto al titular de portada. |
| Canonical | No estaba declarado | URL canónica para inicio, carta y políticas. |
| Compartir enlaces | Sin metadatos sociales específicos | Open Graph, idioma, imagen y tarjeta social. La imagen de ambiente no se presenta como fotografía real del local. |
| Carta | Disponible en una ventana tras interacción | Nueva página `carta.html`, con platos en HTML y enlaces desde todos los pies de página. Se conserva el acceso rápido en ventana. |
| Rastreo | Sin sitemap ni robots propios | `sitemap.xml` con inicio y carta; `robots.txt` con referencia al sitemap. No garantiza indexación. |
| Datos estructurados | Sin marcado | `WebSite` con nombre, idioma y URL conocidos. No se publica una dirección ficticia ni un `Restaurant` incompleto. |
| Legal | Sin políticas ni gestión de preferencias | Páginas de privacidad y cookies, panel para aceptar/rechazar/configurar y reapertura desde el pie de página. |
| Navegación | Texto pequeño y control de tema oculto en ciertas anchuras | Letras ampliadas y selector de tema visible en móvil y escritorio. |
| Recursos | Vídeo local y fuentes locales | Se mantienen el póster, la pausa fuera de pantalla y las fuentes alojadas localmente. |

Los títulos y descripciones deben describir el contenido real de cada página. Su incorporación puede ayudar a interpretar el sitio, pero Google decide el resultado mostrado. [Guía de inicio SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## Estrategia de búsquedas

Estas propuestas son hipótesis de intención, sin estimación de volumen:

| Intención | Términos de trabajo | Destino recomendado |
|---|---|---|
| Marca | Taberna Variantes, carta Taberna Variantes | Inicio y carta |
| Descubrimiento local | taberna en [ciudad real], aperitivo en [barrio real] | Inicio, cuando se confirme ubicación |
| Oferta gastronómica | platos para compartir en [ciudad], vermut en [barrio] | Carta con producto y precios definitivos |
| Visita | horario, cómo llegar, reservar Taberna Variantes | Página de contacto/reservas cuando existan datos y servicio |

No debe utilizarse «X» como localidad en títulos, textos comerciales, mapas o datos estructurados. Dishoom y El Nacional son referencias de diseño aportadas durante el proyecto, no competidores locales acreditados para este estudio. La selección de competidores reales necesita ciudad, barrio, tipo de cocina y rango de precio confirmados.

## Plan de trabajo

### Prioridad 0 · Antes de abrir al público

- Sustituir los «X» del titular y los proveedores por información real y revisar las políticas conforme al tratamiento efectivo.
- Confirmar ciudad, dirección, teléfono, horarios, carta y disponibilidad de reservas.
- Elegir dominio definitivo y decidir expresamente la audiencia pública. La privacidad actual se ha conservado.
- Cambiar `origin` en `site-config.json` y reconstruir al migrar de dominio. Así se actualizan canonical, enlaces sociales y sitemap.

### Prioridad 1 · SEO local

- Preparar una ficha veraz de Google Business Profile cuando el negocio sea elegible.
- Mantener consistencia entre nombre, dirección, teléfono y horarios en web y ficha.
- Añadir marcado `Restaurant` solo con información confirmada y contrastarlo con la prueba de resultados enriquecidos. No inventar reseñas, puntuaciones, aforo ni precios.
- Incorporar fotografías propias, indicaciones para llegar y una página de reservas que complete realmente la acción.

El marcado de negocio local sirve para describir información verificada del establecimiento; la documentación detalla propiedades necesarias y validación. [Google: negocios locales](https://developers.google.com/search/docs/appearance/structured-data/local-business).

### Prioridad 2 · Rendimiento y seguimiento

- Medir LCP, INP y CLS en la URL pública definitiva con PageSpeed Insights y, cuando haya datos, Search Console.
- Reducir peso de fotos y servir variantes adaptadas a móvil si las mediciones señalan un problema. No modificar la identidad del logotipo para ello.
- Valorar el coste de descarga del vídeo en conexiones lentas; el reproductor ya respeta ahorro de datos cuando el navegador lo expone.
- Verificar el dominio en Search Console, enviar el sitemap y revisar cobertura e inspección de URLs tras abrirlo.
- Si se añade analítica, actualizar el inventario y bloquearla hasta obtener la elección correspondiente. Actualmente no hay ninguna instalada.

## Criterios de aceptación

Inicio y carta responden con 200 sin autenticación cuando se autorice la apertura; canonical apunta al dominio final; sitemap es accesible; no quedan «X» legales; el negocio tiene datos reales coherentes; la carta coincide con la oferta; las reservas funcionan; y se cuenta con una medición de rendimiento reproducible. Hasta entonces, la versión es útil para revisión y preparación, pero no equivale a un lanzamiento SEO terminado.
