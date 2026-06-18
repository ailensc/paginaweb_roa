# Arquitectura del Sitio Web

El sitio es una **aplicación mono-página** construida con **Astro 5**, **Tailwind CSS 3** y **TypeScript**. Todo el contenido vive en una sola página (`index.astro`) organizada en secciones mediante componentes.

## Estructura de directorios

```
PaginaWeb/
├── astro.config.mjs        # Configuración de Astro + integración Tailwind
├── tailwind.config.mjs     # Paleta de colores personalizada y fuentes
├── tsconfig.json           # TypeScript strict mode
├── package.json            # Dependencias y scripts
├── index.html              # Versión standalone (sin build) — backup/fallback
├── public/
│   ├── idle_homuncula.glb  # Modelo 3D — Homúncula
│   ├── kaliza_idle.glb     # Modelo 3D — Kaliza (animado)
│   ├── kaliza_idle.fbx     # FBX fuente de Kaliza
│   └── Kaliza.fbx          # FBX fuente alternativo
├── src/
│   ├── env.d.ts            # Referencias de tipos Astro
│   ├── layouts/
│   │   └── BaseLayout.astro  # Layout principal (head, fuentes, body)
│   ├── pages/
│   │   └── index.astro     # Página única del portafolio
│   ├── components/
│   │   ├── Navbar.astro    # Barra de navegación superior
│   │   ├── Hero.astro      # Sección hero + trabajo destacado
│   │   ├── CharacterGrid.astro  # Grid de personajes 3D interactivos
│   │   ├── CharacterCard.astro  # Tarjeta individual con model-viewer
│   │   ├── GameSection.astro    # Sección del videojuego UE5
│   │   ├── SkillsGrid.astro     # Grid de habilidades/herramientas
│   │   ├── Starfield.astro      # Fondo de estrellas
│   │   ├── SacredGeometry.astro # Canvas de geometría sagrada
│   │   ├── Divider.astro        # Separador ornamental con partículas
│   │   └── Footer.astro         # Pie de página
│   ├── scripts/
│   │   ├── starfield.ts         # Generación de estrellas
│   │   ├── sacred-geometry.ts   # Partículas de geometría sagrada
│   │   ├── tilt-effect.ts       # Efecto 3D tilt en tarjetas
│   │   ├── magnetic-buttons.ts  # Botones magnéticos
│   │   ├── model-viewer-setup.ts # Configuración automática de model-viewer
│   │   └── divider-particles.ts # Partículas en divisor hover
│   └── styles/
│       └── global.css           # Estilos globales + animaciones
└── dist/                   # Build de producción
```

## Flujo de datos

1. `astro dev` — Inicia servidor de desarrollo.
2. `BaseLayout.astro` — Renderiza `<html>`, carga Google Fonts, Tabler Icons, model-viewer CDN y global.css.
3. `index.astro` — Compone las secciones en orden: Navbar → Hero → CharacterGrid → GameSection → SkillsGrid → Divider → Footer.
4. Cada componente `.astro` puede incluir un `<script>` que importa y ejecuta su lógica TypeScript del lado cliente.
