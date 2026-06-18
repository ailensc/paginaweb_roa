# Interactividad y Efectos Visuales

Todos los efectos se ejecutan del lado cliente mediante scripts TypeScript ubicados en `src/scripts/`. Se importan desde los bloques `<script>` de cada componente `.astro`.

---

## Starfield (`starfield.ts`)

Genera 60 estrellas de tamaño, posición y temporización aleatorias. Cada estrella tiene una animación CSS `twinkle` que varía su opacidad entre `--min` y `--max` con duración `--d` y retardo `--delay`.

**Componente padre:** Starfield.astro

---

## Geometría Sagrada (`sacred-geometry.ts`)

Canvas animado con partículas que reaccionan al mouse:

- **3 tipos de partículas:** hexágonos, diamantes y círculos concéntricos, cada uno con colores y comportamientos distintos.
- **Máximo 60 partículas** activas. Se generan continuamente cerca del cursor.
- **Conexiones luminosas:** líneas semitransparentes desde el cursor a partículas cercanas (radio < 200px).
- **Sigilo:** el SVG del Hero rota horizontalmente siguiendo la posición X del mouse.
- **Partículas en divisor:** escucha eventos `dividerBurst` para crear explosiones de partículas efímeras.

**Componentes padre:** SacredGeometry.astro, Divider.astro

---

## Tilt 3D (`tilt-effect.ts`)

Aplica rotación en perspectiva (eje X e Y) a cualquier elemento con el atributo `data-tilt`. La rotación se calcula a partir de la posición del cursor dentro del elemento.

**Máximo: ±12°** en ambos ejes. Se restablece a 0° al salir.

**Usado en:** Hero card, CharacterCards, GameSection, SkillsGrid.

---

## Botones Magnéticos (`magnetic-buttons.ts`)

Los botones `.btn-rose` y `.btn-ghost-v` se desplazan hacia el cursor cuando éste está a menos de 80px de distancia, con una fuerza de 0.15.

---

## model-viewer Setup (`model-viewer-setup.ts`)

Escucha el evento `load` de cada `<model-viewer>` y automáticamente:
1. Selecciona la primera animación disponible.
2. La reproduce tras 100ms.

---

## Divider Particles (`divider-particles.ts`)

Al hacer hover sobre `.divider-wrap`, dispara eventos `dividerBurst` cada 50ms. Estos eventos son capturados por `sacred-geometry.ts` que dibuja las partículas en el canvas compartido.

**Efecto:** Explosiones de hexágonos, diamantes y círculos que caen con gravedad simulada.
