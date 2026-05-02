
# Invitaciones

Este proyecto es una aplicación Vue 3 + Vite para la gestión y visualización de invitaciones digitales personalizadas.

## Características
- Plantillas de invitaciones (actualmente solo XvPremium activa)
- Integración con Firebase para gestión de eventos
- Ruteo dinámico con Vue Router
- Estilos con Tailwind CSS

## Instalación
1. Clona el repositorio o descarga el código.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Asegúrate de tener Node.js 20+ y npm 10+.

## Uso
1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
2. Abre tu navegador en la URL que aparece en la terminal (por defecto http://localhost:5173 o http://localhost:5174).

## Estructura principal
- `src/` Código fuente principal
  - `components/` Componentes reutilizables
  - `views/` Vistas principales y plantillas
  - `router/` Configuración de rutas
  - `firebase.js` Configuración de Firebase
- `public/` Archivos estáticos
- `tailwind.config.js` Configuración de Tailwind CSS
- `vite.config.js` Configuración de Vite

## Notas
- Actualmente solo la plantilla XvPremium está activa para todas las invitaciones.
- Si necesitas agregar nuevas plantillas, colócalas en `src/views/templates/` y actualiza la lógica en `src/views/Invitacion.vue`.

## Autor
- Proyecto gestionado por Emmanuel Gómez Toledo
