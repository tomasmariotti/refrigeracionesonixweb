# Arquitectura de conversión B2B — Onix Engineering Solutions

**Fecha:** 2026-07-30
**Estado:** Aprobado, implementación directa (sin plan formal, a pedido del usuario)

## Contexto

Sobre el sistema de diseño "enterprise / lujo sobrio" ([2026-07-30-enterprise-design-system-design.md](2026-07-30-enterprise-design-system-design.md)) y las micro-interacciones ([2026-07-30-microinteractions-design.md](2026-07-30-microinteractions-design.md)) ya implementados, se rediseña la arquitectura de tres bloques clave con foco en psicología de conversión B2B: jerarquía asimétrica en Casos de éxito, fricción reducida en las llamadas a la acción principales vía modal, y una franja de autoridad/prueba social temprana en el recorrido de la página.

## Alcance

Incluye:
- `src/components/site/ContactForm.tsx` (nuevo, extraído de `Contacto.tsx`).
- `src/components/site/CtaModal.tsx` (nuevo, sobre `ui/dialog.tsx`).
- `src/components/site/Autoridad.tsx` (nuevo).
- `src/components/site/Hero.tsx`, `Navbar.tsx` (CTA "Solicitar asesoramiento" abre el modal).
- `src/components/site/Casos.tsx` (layout asimétrico: caso destacado + grilla secundaria).
- `src/components/site/Contacto.tsx` (usa `ContactForm` en vez de duplicar el formulario).
- `src/routes/index.tsx` (o donde se orqueste el orden de secciones) para insertar `Autoridad` entre Hero y Servicios.

Excluye:
- El modal de detalle de caso ya existente en `Casos.tsx` (no se toca; usa su propio overlay, es un patrón distinto y no fue parte del pedido).
- Cifras o estadísticas cuantitativas en la sección de autoridad (el usuario no proveyó datos reales; el contenido es cualitativo, reutilizando afirmaciones ya presentes en el sitio).
- Glassmorphism en cualquier superficie persistente del sitio (navbar, footer, cards) — el efecto translúcido se acota exclusivamente al scrim del modal, para no contradecir el principio "sin glassmorphism genérico" del sistema de diseño vigente.

## Diseño

### `ContactForm` (extracción)

Componente puro que renderiza el formulario y el estado "enviado" que hoy vive inline en `Contacto.tsx` (los mismos campos: nombre, empresa, correo, teléfono, tipo de proyecto, mensaje). No recibe props de estilo de contenedor — quien lo use decide el wrapper (card de la sección Contacto, o el panel del modal). Esto evita duplicar la lógica de envío/estado entre la sección y el modal.

### `CtaModal`

- Construido sobre `Dialog`/`DialogContent` de `ui/dialog.tsx` (Radix), que ya maneja foco, `Escape` y overlay accesibles — no se reinventa el manejo de overlay a mano.
- `DialogOverlay`: `backdrop-blur-md bg-ink/60` (translúcido, función de scrim, no decorativo).
- `DialogContent` (panel): `bg-background` sólido, borde `border-border`, radio cuadrado (`rounded-sm`, heredado del sistema de tokens), sin transparencia — mismo lenguaje visual que la card de Contacto actual. Contiene `<ContactForm />`.
- Se dispara desde un `DialogTrigger asChild` envolviendo el botón "Solicitar asesoramiento" en `Hero.tsx` y en `Navbar.tsx` (desktop y mobile). El resto de los CTAs del sitio no cambian.

### Casos — layout asimétrico

- El primer proyecto de la lista ya filtrada (`visible[0]`) se renderiza en un bloque `Reveal` separado, de ancho completo, con imagen y texto lado a lado (`grid md:grid-cols-2`), mostrando de entrada `description` completa (no solo el título) para darle más peso informativo antes de abrir el modal de detalle.
- El resto de `visible.slice(1)` se renderiza en la grilla de 3 columnas ya existente, sin cambios de estilo.
- Al cambiar el filtro, el destacado se recalcula automáticamente (siempre `visible[0]`) — no se introduce el concepto de "caso más importante" como dato separado, evitando estado adicional.
- El modal de detalle al hacer click no cambia (mismo componente, mismo comportamiento, ahora disparado tanto desde el bloque destacado como desde la grilla).

### `Autoridad` (nueva sección)

- Franja compacta entre Hero y Servicios: `py-14 md:py-16` (vs. `py-28 md:py-36` del resto de las secciones) — deliberadamente angosta para no "saturar la pantalla".
- Sin imagen, sin ícono, sin eyebrow/título de sección — cuatro columnas separadas por `border-l`/`divide-x`, mismo lenguaje tipográfico que la fila de métricas del Hero (texto grande en `font-display` + descripción chica debajo), pero con contenido distinto para no repetir el Hero:
  1. "Comercial · Industrial · Corporativo" — Sectores atendidos
  2. "Diseño · Instalación · Mantenimiento" — Ciclo completo del servicio
  3. "Cálculo propio" — Ingeniería y documentación técnica in-house
  4. "Interlocución directa" — Un responsable técnico por proyecto
- Fondo `bg-surface` (superficie clara), continuando el ritmo alternado ya establecido (Hero es ink, esta franja es clara, Servicios vuelve a ser clara — dos claras seguidas es aceptable tratándose de una franja angosta, no rompe el ritmo de forma perceptible).
- Cada columna envuelta en `Reveal` con `delay` incremental para scroll-reveal consistente con el resto del sitio.

## Testing / Verificación

- `tsc --noEmit` y `npm run build` limpios (mismo criterio de verificación usado en las dos tareas anteriores).
- Revisión manual de que `ContactForm` funciona igual dentro del modal y dentro de la sección Contacto (mismo estado `sent`, sin fugas de estado entre instancias — cada uso monta su propia instancia del componente).
- Revisión de foco/teclado del modal: `Tab` no debe escapar del diálogo, `Escape` debe cerrarlo (comportamiento provisto por Radix `Dialog`, se verifica que no se haya sobreescrito).
- Como en las tareas anteriores, no hay navegador real disponible en este entorno para grabar una verificación visual — queda como revisión manual pendiente del usuario.

## Fuera de alcance / decisiones diferidas

- Estadísticas cuantitativas reales en `Autoridad`: cuando el usuario tenga cifras verificadas (años de trayectoria, cantidad de proyectos, certificaciones), es un cambio de contenido directo sobre este mismo componente, no de arquitectura.
- Extender el modal de CTA a otros botones del sitio (Contacto, Casos, mobile menu) queda fuera de este alcance; se acordó limitarlo a Hero y Navbar.
- Refactor del modal de detalle de Casos para usar `Dialog` de Radix (hoy usa un overlay propio): no se pidió, no se toca.
