# Demo de Instagram

Perfil utilizado: https://www.instagram.com/tavernavariantes/
Selección consultada el 28 de octubre de 2026.

## Publicaciones

- 28 de octubre: https://www.instagram.com/tavernavariantes/p/DfCcghYlwYh/
- 24 de octubre: https://www.instagram.com/tavernavariantes/p/De4o2UAkfnm/
- 22 de octubre: https://www.instagram.com/tavernavariantes/p/Dey2j_hkQMx/
- Reel del 18 de octubre: https://www.instagram.com/tavernavariantes/reel/Deoe2EShr72/

Las miniaturas se obtuvieron de la cuadrícula pública visible del perfil indicado por el propietario. Se usan para mostrar esta selección en la interfaz, con enlaces a los originales. No se reproducen estadísticas de seguidores, comentarios ni otras métricas.

## Qué funciona

Galería adaptable de cuatro publicaciones, visor dentro de la página, navegación entre miniaturas, enlaces al perfil y al original, y carga opcional de la inserción oficial de Instagram.

La galería local y la vista previa no conectan con Meta. El código de Instagram solo se solicita al pulsar la carga externa y contar con permiso específico. La aceptación previa de apariencia no concede ese permiso. La retirada del permiso impide nuevas inserciones y elimina las abiertas.

## Límite de la demo

Es una selección fija, no un feed automático ni una conexión autenticada de la cuenta. La inserción oficial depende de Meta y de los ajustes del perfil y el navegador. Durante la prueba el código de Meta creó la inserción, pero el navegador bloqueó la carga del marco externo. Por eso se conserva siempre la vista previa local, un botón para ocultar el contenido externo y el enlace al original.

Para cambiar la selección, editar src/instagram-posts.json y añadir las miniaturas correspondientes a dist/assets/instagram/. Ejecutar npm run build.

## Verificación

Vista previa, siguiente/anterior, retorno del foco, enlaces originales, diseño móvil, bloqueo de carga automática y retirada del permiso revisados. Ocho pruebas de preferencias aprobadas. No se solicitaron contraseñas ni permisos de publicación de la cuenta.
