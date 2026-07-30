# Sistema de micro-interacciones y scroll interactivo — Onix Engineering Solutions

**Fecha:** 2026-07-30
**Estado:** Aprobado, implementación directa (sin plan formal, a pedido del usuario)

## Contexto

Sobre el sistema de diseño "enterprise / lujo sobrio" ya implementado ([2026-07-30-enterprise-design-system-design.md](2026-07-30-enterprise-design-system-design.md)), se agrega una capa de micro-interacciones: entrada escalonada en el Hero, profundidad/glow en hover sobre botones y tarjetas de Servicios, y un revelado más orgánico de las secciones al hacer scroll — todo sin sacrificar 60 FPS estables.

## Alcance

Incluye:
- `src/hooks/use-tilt-glow.ts` (nuevo).
- `src/components/site/Reveal.tsx` (nuevo prop `trigger`).
- `src/components/site/Hero.tsx` (stagger de entrada).
- `src/components/ui/button.tsx` (glow + lift en hover).
- `src/components/site/Servicios.tsx` (tilt 3D + glow en las cards).
- `src/styles.css` (utilidades `tilt-card`, `cursor-glow`, refinamiento de `reveal`).

Excluye:
- Tarjetas de Casos (no se pidieron; quedan con su comportamiento actual).
- Cualquier librería de animación externa (Framer Motion, GSAP): se descartaron explícitamente a favor de CSS + IntersectionObserver, sin dependencias nuevas.
- Medición automatizada de FPS: no hay navegador real disponible en este entorno; se documenta como verificación manual pendiente (DevTools Performance panel).

## Diseño

### `useTiltGlow` (hook)

```
function useTiltGlow<T extends HTMLElement>(options?: {
  maxTiltDeg?: number; // default 6, 0 = solo glow sin rotación
}): RefObject<T>
```

- En `pointermove` sobre el elemento, calcula la posición relativa del cursor (0–1 en x/y) y escribe `--tilt-x`, `--tilt-y` (grados) y `--glow-x`, `--glow-y` (posición del glow) como CSS custom properties directamente sobre `ref.current.style`, coalescido con `requestAnimationFrame` (máximo una escritura por frame).
- En `pointerleave`, resetea las variables a su valor neutro con una transición suave (manejada por CSS, no por el hook).
- No usa `useState`/`setState` para el tracking — evita re-renders de React en cada movimiento de mouse.
- Guard de entrada: si `window.matchMedia("(prefers-reduced-motion: reduce)").matches` o `!window.matchMedia("(hover: hover) and (pointer: fine)").matches`, el hook no agrega listeners y el elemento queda con las variables en su valor neutro (sin tilt, sin glow animado).
- `maxTiltDeg: 0` es el modo usado por los botones (glow + lift, sin rotación); Servicios usa el default (6°).

### CSS (`styles.css`)

- `@utility tilt-card`: `transform: perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateY(var(--tilt-lift, 0px)); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);` — la transición solo aplica al volver al reposo (el tracking en vivo no pasa por transition para no introducir lag).
- `@utility cursor-glow`: overlay absoluto con `background: radial-gradient(160px circle at var(--glow-x,50%) var(--glow-y,50%), color-mix(in oklab, var(--steel) 35%, transparent), transparent 70%); opacity: 0; transition: opacity 0.3s;` que pasa a `opacity:1` en `:hover`/`:focus-visible`.
- `@utility reveal` (refinamiento, aplica a las 11 secciones existentes sin tocarlas): se agrega `scale(0.97)` al estado inicial junto al `translateY(28px)` ya existente, ambos animando a `none`/`scale(1)`. Sigue siendo solo `transform`+`opacity` — sin `filter`/`blur` animado (costoso con múltiples elementos revelando a la vez).

### `Reveal.tsx`

- Nuevo prop `trigger?: "scroll" | "mount"` (default `"scroll"`, preserva el comportamiento actual).
- En modo `"mount"`, se salta el `IntersectionObserver` y llama `setVisible(true)` dentro de un `requestAnimationFrame` en el primer render (para asegurar que el navegador pinte el estado inicial antes de animar), respetando el `delay` recibido.

### Hero — entrada escalonada

El único wrapper `animate-fade-in` se reemplaza por 5 `<Reveal trigger="mount" delay={n}>` independientes, con incrementos de ~90ms: fila eyebrow+filete → headline → párrafo → fila de botones → fila de métricas.

### Botones

`Button` incorpora el `ref` de `useTiltGlow({ maxTiltDeg: 0 })` y un `<span className="cursor-glow" />` interno; el componente base gana `hover:-translate-y-0.5 hover:scale-[1.01]` (transform-only, barato).

### Tarjetas de Servicios

Cada card de `Servicios.tsx` usa `useTiltGlow()` (tilt default 6°) sobre su contenedor y el mismo overlay `cursor-glow`, más `tilt-card` en el className.

## Testing / Verificación

- Chequeo manual de que ningún elemento anima propiedades fuera de `transform`/`opacity` (revisión de las clases nuevas en `styles.css`).
- Verificación de `prefers-reduced-motion` y `pointer: coarse` deshabilitando tilt/glow (revisión de código del hook, sin navegador real disponible para grabar el comportamiento).
- **Pendiente de verificación manual del usuario:** medición de FPS real en Chrome DevTools (Performance panel) hacienda scroll y hover sobre las cards de Servicios, dado que este entorno no tiene un navegador disponible para automatizarlo.

## Fuera de alcance / decisiones diferidas

- Tilt 3D en botones: evaluado y descartado a favor de solo glow+lift (acordado con el usuario) porque un tilt completo en una superficie angosta como un botón tiende a verse inestable en vez de premium.
- Extender tilt+glow a las tarjetas de Casos queda como posible follow-up, no incluido aquí.
