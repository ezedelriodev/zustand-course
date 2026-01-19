# 🐻 Curso Zustand

Proyecto educativo interactivo para aprender **Zustand**, la librería de gestión de estado más simple y ligera para React.

## 📚 Descripción

Este curso es una aplicación React completa que cubre todos los conceptos fundamentales y avanzados de Zustand a través de módulos interactivos. Cada módulo incluye explicaciones detalladas, ejemplos de código y demostraciones en vivo para facilitar el aprendizaje.


## 🗂️ Módulos del Curso

### 1. 🚀 Quick Start
Introducción a Zustand con un contador básico. Aprende a crear tu primer store y a consumir estado en componentes React.

### 2. 🎯 Selectors
Optimización del rendimiento usando selectores. Evita re-renderizados innecesarios seleccionando solo el estado que necesitas.

### 3. 🧮 Computed Properties
Cálculo de valores derivados del estado. Aprende a crear propiedades computadas y entender cuándo usarlas.

### 4. 🪆 Nested Objects
Manejo de objetos anidados sin mutaciones. Técnicas para actualizar estado complejo de forma inmutable.

### 5. 🛠️ DevTools
Integración con Redux DevTools para debugging. Inspecciona el estado, revierte acciones y viaja en el tiempo.

### 6. 🪆 Immer
Simplificación de actualizaciones con Immer. Escribe código mutable que se convierte automáticamente en inmutable.

### 7. 💾 Persist
Persistencia del estado en localStorage/sessionStorage. Mantén el estado entre recargas de página.

### 8. 🍕 Zustand Slices
Organización de stores grandes en slices modulares. Arquitectura escalable para aplicaciones complejas.

### 9. 🏗️ StateCreator
Tipado avanzado con TypeScript y StateCreator. Uso correcto de middlewares con tipos seguros.

### 10. 🌐 Estado fuera de React
Acceso al estado fuera de componentes React. Usa `getState()`, `setState()` y subscripciones.

### 11. 🔄 Sincronizar Stores
Sincronización entre múltiples stores. Patrones para mantener coherencia entre stores relacionados.

## 🛠️ Tecnologías

- **React 18.3** - Librería UI
- **TypeScript 5.6** - Tipado estático
- **Zustand 5.0** - Gestión de estado
- **Vite 6.0** - Build tool y dev server
- **React Router 6** - Routing
- **ESLint + Prettier** - Linting y formateo

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/ezedelriodev/zustand-course.git

# Navegar al directorio
cd Curso-Zustand

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Compila el proyecto para producción
npm run preview      # Previsualiza el build de producción

# Linting y formateo
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Corrige errores de ESLint automáticamente
npm run format       # Formatea el código con Prettier
```

## 📁 Estructura del Proyecto

```
Curso-Zustand/
├── src/
│   ├── modules/              # Módulos educativos
│   │   ├── quick-start/      # 🚀 Introducción a Zustand
│   │   ├── selectors/        # 🎯 Selectores y optimización
│   │   ├── computed-properties/  # 🧮 Propiedades computadas
│   │   ├── nested-objects/   # 🪆 Objetos anidados
│   │   ├── devtools/         # 🛠️ Redux DevTools
│   │   ├── immer/            # 🪆 Middleware Immer
│   │   ├── persist/          # 💾 Persistencia
│   │   ├── slices/           # 🍕 Slices pattern
│   │   ├── state-creator/    # 🏗️ StateCreator
│   │   ├── state-out/        # 🌐 Estado fuera de React
│   │   └── synchronize/      # 🔄 Sincronización
│   ├── layout/               # Layout principal
│   │   ├── Layout.tsx
│   │   └── components/       # Header y Sidebar
│   ├── store/                # Stores globales
│   ├── App.tsx               # Componente raíz
│   └── main.tsx              # Entry point
├── public/                   # Assets estáticos
├── .github/                  # GitHub configuration
│   └── copilot-instructions.md
├── eslint.config.js          # Configuración ESLint
├── vite.config.ts            # Configuración Vite
├── tsconfig.json             # Configuración TypeScript
└── package.json              # Dependencias
```

## 🏗️ Arquitectura de Módulos

Cada módulo sigue una estructura consistente:

```
module-name/
├── store/
│   └── module.store.ts       # Store de Zustand
├── view/
│   ├── ModuleView.tsx        # Vista principal
│   └── ModuleView.css        # Estilos
├── components/               # Componentes del módulo
│   ├── Component.tsx
│   └── Component.css
├── types.ts                  # Interfaces TypeScript
├── constants.ts              # Constantes y valores iniciales
└── index.ts                  # Barrel export
```

## 📖 Recursos Adicionales

- 📚 [Documentación oficial de Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- 🎥 [Video tutoriales](https://www.youtube.com/results?search_query=zustand+tutorial)
- 💬 [Discord de Poimandres](https://discord.gg/poimandres)
- 🐙 [GitHub de Zustand](https://github.com/pmndrs/zustand)


## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Creado con ❤️ para aprender Zustand de forma práctica e interactiva.

---

⭐ Si este curso te resultó útil, considera darle una estrella en GitHub
