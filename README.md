# 🏃 Runtina - Plan de Entrenamiento Running

Una aplicación web ligera y accesible para visualizar y seguir planes de entrenamiento de carrera a pie, construida completamente con **JavaScript vanilla moderno** y **Web Components nativos**.

## ✨ Características

- **Calendario visual de entrenamientos** con cards interactivas por día
- **Detalle de cada sesión**: distancia, ritmo por kilómetro, objetivos y notas
- **Tipos de entrenamiento**: Descanso, Progresión, Rodaje controlado, Rodaje suave, Long run y Carrera
- **Diseño responsivo** adaptado a móviles y escritorio
- **View Transitions API** para animaciones suaves entre páginas
- **Sin dependencias de runtime** — cero frameworks, solo estándares web

## 🛠️ Tecnologías

| Categoría         | Herramienta                                                         |
| ----------------- | ------------------------------------------------------------------- |
| **Lenguaje**      | JavaScript (ESM)                                                    |
| **Componentes**   | Web Components nativos (`HTMLElement`, Shadow DOM)                  |
| **Estilos**       | CSS moderno con nesting, custom properties, `adoptedStyleSheets`    |
| **Importaciones** | Import attributes (`with { type: "css" }`, `with { type: "json" }`) |
| **Servidor dev**  | [servor](https://github.com/lukejacksonn/servor)                    |
| **Linter**        | [oxlint](https://oxc.rs)                                            |
| **Formatter**     | [oxfmt](https://oxc.rs)                                             |
| **Deploy**        | [gh-pages](https://github.com/tschaub/gh-pages)                     |

## 📁 Estructura del proyecto

```
Test-camp/
├── src/
│   ├── components/          # Web Components
│   │   ├── HeroSection/     # Banner principal
│   │   └── tab-system/      # Sistema de pestañas reutilizable
│   ├── css/
│   │   └── index.css        # Estilos globales y variables CSS
│   ├── data/
│   │   └── entrenos.json    # Plan de entrenamientos (31 días)
│   ├── entrenamiento/
│   │   └── index.html       # Página de detalle de entrenamiento
│   ├── js/
│   │   ├── index.js         # Entry point — renderiza calendario
│   │   └── infodetail.js    # Lógica de la página de detalle
│   └── index.html            # Página principal
├── public/                   # Assets estáticos (fuentes, imágenes)
├── .oxlintrc.json            # Configuración de oxlint
├── package.json
└── pnpm-lock.yaml
```

## 🚀 Inicio rápido

### Requisitos

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) (recomendado, ver `packageManager` en package.json)

### Instalación

```bash
pnpm install
```

### Desarrollo

```bash
pnpm dev
```

La app estará disponible en `http://localhost:1234`. El servidor recarga automáticamente al guardar cambios.

### Lint y formato

```bash
pnpm lint      # Ejecutar oxlint
pnpm format    # Ejecutar oxfmt
```

### Deploy

```bash
pnpm deploy    # Publicar en GitHub Pages
```

## 🧩 Componentes

### `hero-section`

Banner principal que muestra el título del plan y la fase actual (ej: "Mantenimiento"). Usa Shadow DOM con estilos aislados vía `adoptedStyleSheets`.

### `tab-container`

Sistema de pestañas reutilizable que acepta `<button>` y `<section>` como hijos. Integra **View Transitions API** para cambios de pestaña animados.

```html
<tab-container>
  <button active>Semana 1</button>
  <button>Semana 2</button>
  <section>Contenido semana 1...</section>
  <section>Contenido semana 2...</section>
</tab-container>
```

## 📊 Datos de entrenamiento

El archivo `src/data/entrenos.json` contiene un plan mensual con los siguientes campos por día:

| Campo       | Descripción                                                   |
| ----------- | ------------------------------------------------------------- |
| `id`        | Identificador numérico del día                                |
| `fecha`     | Fecha legible (ej: "4 de mayo")                               |
| `tipo`      | Tipo de sesión (Descanso, Progresión, Rodaje, Long run, etc.) |
| `distancia` | Distancia en kilómetros                                       |
| `ritmo`     | Rango de ritmo (ej: "7:35 - 7:50")                            |
| `ritmo_km`  | Array de ritmos por kilómetro (para progresiones)             |
| `objetivo`  | Lista de objetivos de la sesión                               |
| `notas`     | Notas adicionales                                             |

## 🎨 Diseño

- **Tema oscuro** con paleta basada en `oklch()` para colores perceptualmente uniformes
- **CSS custom properties** para consistencia temática
- **CSS nesting** nativo para estilos organizados
- **Responsive**: grid de 4 columnas en desktop, 1 columna en móvil
- **View Transitions** para transiciones de página suaves

## 📝 Licencia

ISC
