# Sistema de diseño "Enterprise / Lujo Sobrio" — Onix Engineering Solutions

**Fecha:** 2026-07-30
**Estado:** Aprobado, pendiente de plan de implementación

## Contexto

El sitio actual (React + TanStack Start + Tailwind v4) usa un sistema corporativo estándar: paleta navy/gris/blanco con acento azul eléctrico saturado, tipografías Sora (display) + Manrope (texto), radios redondeados (0.25rem base), sombras difusas genéricas y cards planas de shadcn/ui sin personalidad. El objetivo es redefinir el sistema de diseño visual completo hacia una dirección de arte "enterprise / lujo sobrio": tipografía grotesca de alta gama con pesos muy contrastados, paleta monocromática de tonos profundos (manteniendo el azul y blanco como identidad de marca) con acento metálico sutil, y eliminación de cualquier componente que se sienta "plano" o genérico.

## Alcance

Incluye:
- Tokens base en `src/styles.css` (color, tipografía, radio, sombra/elevación, utilidades).
- Los 11 componentes de sección en `src/components/site/*`.
- Los primitivos compartidos en `src/components/ui/*` (button, card, badge, input, accordion, etc.) en la medida en que se usan dentro del sitio público.

Excluye:
- Cambios de copy/contenido textual de las secciones.
- Cambios de arquitectura de routing o de lógica de negocio.
- Dark-mode toggle para el usuario final (el sitio ya no distingue "light/dark mode" como preferencia de usuario; la alternancia ink/blanco es parte fija de la composición editorial de cada sección, no un tema conmutable).

## Fundamentos (tokens)

### Tipografía

- Se reemplazan `--font-display` (Sora) y `--font-sans` (Manrope) por una única familia: **Bricolage Grotesque** (variable, pesos 200–800, con eje óptico `opsz`), autohospedada o vía `@fontsource` para evitar dependencia de CDN externo en producción.
- Jerarquía por peso, no por familia:
  - Eyebrows / labels: peso 500, `letter-spacing: 0.26em`, uppercase, tamaño 11px.
  - Headlines (h1/h2): peso 700, `letter-spacing: -0.02em`, tamaños actuales sin cambio de escala.
  - Subheadlines (h3/h4): peso 600.
  - Cuerpo de texto: peso 300–400 según densidad (300 para párrafos largos de hero/introducción, 400 para texto funcional como FAQ o formularios).
- Se elimina la utilidad `font-display` dedicada; `h1–h4` heredan la única familia vía `body`.

### Color

Se mantiene la identidad azul + blanco de Onix, pero se profundiza el rango tonal y se introduce un acento metálico con cast azul (no un gris/plata neutro, no el azul eléctrico saturado actual):

| Token | Uso | Valor de referencia (oklch aprox.) |
|---|---|---|
| `--ink` | Fondo de secciones oscuras | azul marino casi negro, ~`oklch(0.14 0.03 261)` (≈ `#070a12`) |
| `--ink-elevated` | Superficie ligeramente elevada dentro de una sección ink (nuevo token) | ~`oklch(0.19 0.035 261)` (≈ `#101830`) |
| `--ink-foreground` | Texto sobre ink | blanco frío, ~`oklch(0.97 0.005 250)` |
| `--surface` / `--background` | Fondo de secciones claras | blanco real/frío, ~`oklch(0.99 0.002 250)` (no el gris azulado tibio actual) |
| `--foreground` | Texto sobre superficie clara | azul marino oscuro, mismo valor que `--ink` o levemente más claro |
| `--steel` (reemplaza `--accent`) | Acento metálico: filetes, eyebrows, bordes de botón, hover | azul-acero desaturado, ~`oklch(0.72 0.04 255)` (≈ `#8fa4c2`) |
| `--steel-foreground` | Texto/ícono sobre `--steel` sólido | mismo valor que `--ink` |
| `--muted-foreground` | Texto secundario | gris-azulado medio, ambas superficies |
| `--border` | Líneas divisorias | 1px, opacidad baja (~10-15%) sobre el color de superficie correspondiente |

`--accent` deja de existir como azul eléctrico saturado; todo uso actual de `--accent` migra a `--steel`. Se elimina `--gradient-ink` y `--shadow-elevated` en su forma actual (ver Elevación).

### Radio

`--radius` baja de `0.25rem` a `0.125rem` como base. Los componentes de "lujo sobrio" leen mejor con esquinas casi cuadradas; se conserva la escala `--radius-sm/md/lg/xl/2xl/3xl/4xl` derivada, solo cambia el valor base.

### Elevación

Se elimina la sombra difusa genérica (`--shadow-elevated` tipo "floating card"). Se reemplaza por un patrón de dos capas:
1. Borde de 1px de baja opacidad como separador primario.
2. Una sombra corta y oscura (`0 1px 0 0 rgba(0,0,0,.4)` aprox., ajustable), que da sensación de "grabado"/relieve sutil en vez de "flotante".

Se mantiene `--shadow-card` para casos puntuales (dropdowns, popovers de shadcn) pero con valores más contenidos.

## Principios de componente (elimina lo plano)

- **Botones:** el CTA primario (`variant="accent"` hoy) usa fondo `--steel` sólido con texto `--steel-foreground`; el secundario (`variant="outlineLight"`) es solo borde 1px + texto, sin fondo. Ambos con el nuevo radio cuadrado. Se elimina cualquier sombra en botones.
- **Cards** (Servicios, Casos, Beneficios, Mantenimiento): se elimina el patrón shadcn genérico de `bg-card` + `shadow-sm` uniforme. Cada card incorpora un filete de 2px en `--steel` (borde superior o lateral, no ambos) y, donde aplique, un índice/número tipográfico grande en peso 200 como elemento de jerarquía (ej. "01", "02"). La separación entre cards se resuelve con espacio y línea divisoria, no con sombra flotante.
- **Navbar/Footer:** fondo `--ink` sólido con una línea de 1px en `--border` (no blur/glassmorphism genérico). Refuerza sobriedad y contraste con el resto del sitio.
- **Halos/glows decorativos:** cualquier gradiente difuso decorativo existente se retira; la jerarquía visual se construye con tipografía, espaciado generoso y líneas finas, no con degradados de color.
- **Iconografía:** trazo fino (`stroke-width` bajo), color `--steel` sobre fondos ink y `--foreground`/`--muted-foreground` sobre fondos claros — nunca relleno sólido de color saturado.

## Ritmo de secciones

Alternancia editorial confirmada (no todo oscuro, no todo claro):

| Sección | Fondo |
|---|---|
| Hero | ink |
| Servicios | superficie clara |
| Beneficios | ink |
| Enfoque | superficie clara |
| Casos | superficie clara |
| Metodología | ink |
| Mantenimiento | superficie clara |
| Nosotros | ink |
| Faq | superficie clara |
| Contacto | ink |
| Footer | ink |

El acento `--steel` aparece de forma consistente en ambos modos (eyebrows, líneas, hover states) para dar continuidad visual pese a la alternancia de fondo.

## Testing / Verificación

- Revisión visual manual de cada una de las 11 secciones en viewport 375/768/1440 tras aplicar los nuevos tokens (contraste de texto sobre ambos fondos, legibilidad del acento `--steel` sobre ink y sobre blanco).
- Verificación de contraste WCAG AA para combinaciones texto/fondo nuevas (especialmente `--muted-foreground` sobre `--ink` y `--steel` como texto de botón).
- Chequeo de que ningún componente de `src/components/ui` quede con el radio/sombra antiguos por quedar fuera del alcance de un archivo tocado.

## Fuera de alcance / decisiones diferidas

- No se implementa un selector de tema para el usuario; la paleta es fija.
- No se rediseña el copy ni la estructura de contenido de ninguna sección.
- La fuente Bricolage Grotesque se auto-hospeda o se sirve vía `@fontsource/bricolage-grotesque`; la decisión final del mecanismo de carga (self-host vs paquete npm) queda para el plan de implementación, no para este spec.
