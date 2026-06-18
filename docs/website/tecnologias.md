# Tecnologías del Sitio Web

## Stack principal

| Tecnología | Versión | Propósito |
|---|---|---|
| **Astro** | ^5.18.2 | Framework web — generación de HTML estático con componentes |
| **Tailwind CSS** | ^3.4.19 | Estilos utilitarios con paleta personalizada |
| **TypeScript** | — | Tipado estático para scripts del lado cliente |
| **@astrojs/tailwind** | ^6.0.2 | Integración oficial Astro + Tailwind |

## Dependencias externas (CDN)

| Recurso | Versión | Uso |
|---|---|---|
| **model-viewer** | 3.5.0 | Visualización 3D interactiva de modelos .glb en el navegador |
| **Tabler Icons** | 3.30.0 | Iconos vectoriales (brands, herramientas, navegación) |
| **Cinzel** (Google Fonts) | — | Tipografía decorativa para títulos, etiquetas y métricas |
| **Space Grotesk** (Google Fonts) | — | Tipografía sans-serif para cuerpo de texto |

## Fuentes

- **Cinzel** — Serif decorativa, usada en: logo, etiquetas de sección, títulos, tags, stats, progreso y navegación.
- **Space Grotesk** — Sans-serif moderna, usada en: cuerpo de texto, nombres de技能 y contenido general.

## Configuración de Tailwind

Paleta de colores personalizada en `tailwind.config.mjs`:

```js
colors: {
  rose:  { 950: "#1a0a14", 900: "#2d0f1e", 800: "#4c1a30", 700: "#7a2d50", 600: "#b8487a" },
  violet:{ 950: "#0f081a", 900: "#1c0f2d", 800: "#2f1a4c", 700: "#50307a", 600: "#7a48b8" },
}
fontFamily: {
  cinzel: ["Cinzel", "serif"],
  grotesk: ["Space Grotesk", "sans-serif"],
}
```

## Variables CSS globales

Definidas en `:root` de `global.css` para la paleta central:
- `--r`: `#ff2d8a` (rosa primario)
- `--v`: `#c44bff` (violeta primario)
- `--v2`: `#7b2fff` (violeta secundario)
- `--rm`: `#ff85c0` (rosa claro)
- `--vm`: `#d688ff` (violeta claro)
- `--bg0` a `--bg3`: Fondos oscuros progresivos
- `--txt` / `--txt2` / `--txt3`: Escala de texto (blanco a gris violeta)
