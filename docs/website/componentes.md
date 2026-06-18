# Componentes

## BaseLayout.astro

Layout raíz. Define la estructura HTML, carga los CDNs (Google Fonts, Tabler Icons, model-viewer), enlaza `global.css` y establece el `<body>` con fondo oscuro y tipografía Space Grotesk.

**Slot:** Renderiza el contenido de cada página (en este caso `index.astro`).

---

## Navbar.astro

Barra superior sticky con:
- **Logo** — "AILEN COLAZO / 3D Artist"
- **Navegación** — Enlaces a secciones (Trabajos, Proyecto UE5, Skills, Contacto)
- **Estado** — Indicador "Disponible" con punto animado (pulse)

---

## Hero.astro

Sección principal de presentación:
- **Eyebrow** — "01 — Portfolio — 3D Art & Game Dev"
- **Título** — "Artist 3D / Game Dev"
- **Descripción** — Texto de presentación profesional
- **Botones CTA** — "Ver trabajos" (rosa) y "Contactar" (ghost violeta)
- **Tarjeta de trabajo destacado** — Card con overlay de geometría sagrada, icono y metadata
- **Orbes decorativos** y **sigilo SVG** que rota siguiendo el mouse

**Scripts:** tilt-effect, magnetic-buttons

---

## CharacterGrid.astro

Grid horizontal de personajes 3D interactivos:
- **CharacterCard** para Homúncula (con auto-rotate)
- **CharacterCard** para Kaliza (con animación Mixamo)
- **CharacterCard placeholder** para futuros personajes

**Scripts:** tilt-effect, model-viewer-setup

---

## CharacterCard.astro

Componente reutilizable que envuelve un `<model-viewer>` o un placeholder.

**Props:**
- `src` — Ruta al archivo .glb
- `alt` / `title` / `meta` / `tag` — Metadata visual
- `animationName`, `autoRotate`, `cameraOrbit`, `exposure` — Configuración del visor 3D
- `placeholder` — Modo placeholder (sin modelo)

---

## GameSection.astro

Sección del videojuego en desarrollo:
- **Etiqueta** — "En desarrollo — UE5" con punto pulsante
- **Título** — Placeholder "Nombre del juego"
- **Descripción** — Placeholder textual
- **Stats** — Motor (UE5), Equipo (Solo), Inicio (2024)
- **Barra de progreso** — 35% con indicador romboidal
- **Panel visual** — Fondo hex grid, orbe, icono de gamepad y etiquetas "Unreal Engine 5", "UE5.4", "Alpha"

**Scripts:** tilt-effect

---

## SkillsGrid.astro

Grid 4×2 con las 8 herramientas de la artista.
Cada skill contiene:
- Icono de Tabler Icons
- Nombre de la herramienta
- Categoría
- Barra de progreso con gradiente rosa→violeta

**Scripts:** tilt-effect

---

## Starfield.astro

Fondo de estrellas fijo. Contenedor vacío que se puebla con 60 elementos `<div>` generados en `starfield.ts`.

---

## SacredGeometry.astro

Canvas fijo para partículas de geometría sagrada. Se inicializa en `sacred-geometry.ts` con un loop de animación.

---

## Divider.astro

Separador ornamental con hover que activa partículas. La interacción se maneja mediante eventos `dividerBurst` capturados por `sacred-geometry.ts`.

---

## Footer.astro

Pie de página con:
- **Logo** y copyright
- **Redes sociales** — ArtStation, Instagram, LinkedIn (iconos Tabler Icons)
