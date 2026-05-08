# Faraday – Plataforma de Simulación Física

Faraday es una **aplicación web** ligera que visualiza el campo eléctrico dentro de una jaula de Faraday. Está construida con **TypeScript** y Vite, y renderiza la simulación usando la **API de Canvas**. El proyecto está pensado tanto para entrenar conceptos de física como para servir como demostración de simulaciones interactivas en el navegador.

## Características principales

- **Simulación en tiempo real** del campo eléctrico con líneas de campo dinámicas.
- **Diseño responsive**: funcional en escritorios, tabletas y móviles.
- **Animación de carga** mientras se inicializa la simulación.
- **Bajo consumo de recursos**: el bundle final mide solo unos kilobytes.
- **Componentes reutilizables**: 
  - `ElectricityCanvas.tsx` – lógica de renderizado.
  - `Loader.tsx` – transición visual.
  - Secciones estructuradas en `src/sections`.
- **Gestión de dependencias** con npm y lockfile incluido.

## Cómo ejecutar localmente

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación se sirve en `http://localhost:5173`.

## Construir para producción

```bash
npm run build
```

Los archivos generados se colocan en la carpeta `dist/`.

## Demo en línea

El despliegue está disponible en:

[https://riverosmejia.github.io/simulation-faraday/](https://riverosmejia.github.io/simulation-faraday/)

## Tecnologías usadas
- **Node.js** (v20.x), **npm** 10.x
- **Vite** como empaquetador y servidor de desarrollo
- **React** con JSX + TypeScript
- **Canvas API** para la visualización
- **CSS** puro (sin frameworks) con variables CSS
- **Jest** y **React Testing Library** (si se añaden tests)

## Contribuir

- Crea una rama a partir de `main`.
- Aplica las convenciones de commit con `conventional‑commits`.
- Añade tests si estás cambiando lógica.
- Envía un pull‑request y espera la revisión.

## Licencia

MIT License – libre de uso con atribución obligatoria.
