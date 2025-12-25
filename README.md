# Grupo ABC Propiedad Horizontal - Sitio Web Corporativo

Este es el repositorio del sitio web oficial de **Grupo ABC Propiedad Horizontal SAS BIC**, una solución moderna y profesional para la administración de copropiedades en Colombia.

## 🚀 Tecnologías Utilizadas

- **Framework:** [Next.js 14/15](https://nextjs.org/) (App Router)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Base de Datos/Auth:** [Supabase](https://supabase.com/)
- **Lenguaje:** TypeScript

## 🛠️ Configuración y Desarrollo

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn

### Instalación

1. Clonar el repositorio:
   ```bash
   git clone [url-del-repositorio]
   cd abc-project
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   Crea un archivo `.env.local` en la raíz del proyecto con tus credenciales de Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
   ```

4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000).

## 📁 Estructura del Proyecto

- `src/app/`: Rutas y páginas de la aplicación.
- `src/components/`: Componentes reutilizables (UI, Layout, etc.).
- `src/lib/`: Utilidades y configuración de clientes (Supabase, Fetchers).
- `public/`: Assets estáticos (Logo, Favicons, Imágenes).
- `docs/`: Documentación técnica y recursos comerciales originales.

## ✨ Características Principales

- **Diseño Responsive:** Optimizado para móviles, tablets y escritorio.
- **Animaciones Suaves:** Transiciones y efectos de revelado con Framer Motion.
- **Panel Administrativo:** Interfaz para la gestión futura de servicios y circulares.
- **SEO Ready:** Títulos, descripciones y metadatos optimizados.
- **Identidad Corporativa:** Paleta de colores `#1a508f` y tipografía profesional.

## 📄 Licencia

Este proyecto es propiedad privada de Grupo ABC Propiedad Horizontal SAS BIC.
