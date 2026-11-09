# Privacidad y cookies · Estado de implementación

9 de noviembre de 2026.

Titular, NIF/CIF, domicilio, ciudad, correo y datos de infraestructura figuran como «X» y deben completarse antes de la apertura pública. Esta documentación no certifica un cumplimiento legal integral.

## Funcionamiento

- No hay analítica, publicidad, formularios ni contenido de terceros. Las miniaturas de Instagram son locales y solo enlazan al perfil.
- No se muestra aviso de cookies porque no existe almacenamiento que requiera consentimiento.
- Único almacenamiento: `variantes-theme` en localStorage. Se crea solo cuando el visitante elige el tema oscuro y se elimina al volver al claro. Se trata como personalización de la interfaz solicitada por el usuario, categoría que la guía de cookies de la AEPD considera exceptuada de consentimiento.
- La versión anterior guardaba `variantes-consent-v1`. Ya no se lee ni se escribe.

## Decisión pendiente de validar por el titular

Se han retirado el banner, el panel de preferencias y las inserciones de Instagram para aligerar la web. El titular o su asesor deben confirmar este criterio. Si se añaden reservas, analítica, mapas o inserciones de terceros, hay que reintroducir un mecanismo de consentimiento antes de activarlos y actualizar ambas políticas.

## Verificaciones necesarias del titular

Identidad y contacto reales; proveedor y ubicación del alojamiento; registros y plazos de conservación; mecanismos técnicos propios del alojamiento.
