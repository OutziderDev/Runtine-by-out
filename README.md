# 🏃 Runtina

Plan de entrenamiento de running visual e interactivo, construido con **JavaScript vanilla** y **Web Components nativos**.

**[🌐 Ver demo](https://outziderdev.github.io/Runtine-by-out/)**

## ✨ Características

- Calendario visual con cards interactivas por día
- Detalle de cada sesión: distancia, ritmo, objetivos y notas
- Soporta: Descanso, Progresión, Rodaje controlado, Rodaje suave, Long run y Carrera
- Diseño responsivo con tema oscuro
- View Transitions API para animaciones suaves
- Cero dependencias de runtime

## 🛠️ Stack

| Categoría     | Herramienta                                                    |
| ------------- | -------------------------------------------------------------- |
| Lenguaje      | JavaScript (ESM)                                               |
| Componentes   | Web Components nativos (Shadow DOM)                            |
| Estilos       | CSS moderno (nesting, custom properties, oklch)                |
| Dev server    | [servor](https://github.com/lukejacksonn/servor)               |
| Linter        | [oxlint](https://oxc.rs)                                       |
| Formatter     | [oxfmt](https://oxc.rs)                                        |
| Deploy        | GitHub Pages via [gh-pages](https://github.com/tschaub/gh-pages) |

## 🚀 Inicio rápido

```bash
pnpm install
pnpm dev       # http://localhost:1234
pnpm lint      # oxlint
pnpm format    # oxfmt
pnpm deploy    # GitHub Pages
```

## 📁 Estructura

```
src/
├── components/       # Web Components
├── css/index.css     # Estilos globales
├── data/entrenos.json # Plan de 31 días
├── entrenamiento/     # Página de detalle
├── js/               # Lógica de la app
└── index.html        # Página principal
public/               # Assets estáticos
```

## 📄 Licencia

MIT
