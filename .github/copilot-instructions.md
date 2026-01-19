# Copilot Instructions - Curso Zustand

This is a React + TypeScript educational project for learning Zustand state management, using Vite as the build tool.

## Architecture Overview

The project follows a **module-based architecture** where each learning topic is a self-contained module:

- **Modules** (`src/modules/`): Each module represents a Zustand concept (e.g., `quick-start`, `selectors`)
- **Layout** (`src/layout/`): Shell with Header and Sidebar, using React Router's `<Outlet />`
- **Global stores** (`src/store/`): Shared state like sidebar toggle

## Module Structure (Critical Pattern)

Every module MUST follow this exact structure:

```
modules/my-module/
├── store/
│   └── my-module.store.ts    # Zustand store with state + actions
├── view/
│   └── MyModuleView.tsx       # Main view component (route target)
├── components/
│   └── DemoComponent.tsx      # Module-specific components
├── types.ts                   # TypeScript interfaces for store state
├── constants.ts               # Module constants (initial values, etc.)
└── index.ts                   # Barrel export: view, store, types, constants
```

**Real example** from [quick-start/store/counter.store.ts](src/modules/quick-start/store/counter.store.ts):

```ts
export const useCounterStore = create<CounterState>((set) => ({
  count: INITIAL_COUNT,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: INITIAL_COUNT }),
}))
```

**Key conventions:**

- Store names: `use{Module}Store` (e.g., `useCounterStore`, `useSelectorsStore`)
- All state values and actions live in constants, not magic numbers
- State interface defined in `types.ts`, constants in `constants.ts`
- Barrel export via `index.ts` for clean imports

## Adding New Modules

1. Create module folder following structure above
2. Add route in [App.tsx](src/App.tsx): `<Route path="module-name" element={<ModuleView />} />`
3. Add navigation link in [Sidebar.tsx](src/layout/components/Sidebar.tsx)
4. Import view from module's barrel export: `import { ModuleView } from './modules/module-name'`

## Code Style & Formatting

**Automated formatting enforced** via Prettier + ESLint (see [FORMATTING.md](FORMATTING.md)):

- No semicolons (`semi: false`)
- Single quotes for strings
- 2-space indentation
- 100 char line width
- Auto-format on save in VS Code

**Run before commit:**

```bash
npm run lint:fix  # Fix linting issues
npm run format    # Format all code
```

## Development Workflow

```bash
npm run dev       # Start dev server (Vite)
npm run build     # TypeScript check + production build
npm run preview   # Preview production build
```

## Routing Pattern

- Uses React Router v6 with nested routes
- Root route (`/`) redirects to `/quick-start` via `<Navigate to="/quick-start" replace />`
- All module routes are children of `<Layout />` route
- See [App.tsx](src/App.tsx) for route definitions

## State Management Principles

This project demonstrates Zustand patterns:

- **Module stores**: Scoped to specific features (e.g., counter, animal selectors)
- **Global stores**: Shared UI state (e.g., sidebar toggle in [sidebar.store.ts](src/store/sidebar.store.ts))
- **No providers needed**: Just import and use hooks directly
- **Inline actions**: Actions defined inside `create()` call, not separate

## Component Naming

- Views: `{Module}View.tsx` (e.g., `QuickStartView.tsx`, `SelectorsView.tsx`)
- Components: PascalCase, co-located with matching CSS file (e.g., `BearCounter.tsx`, `BearCounter.css`)
- Exports: Always named exports, never default (except `App.tsx`)

## TypeScript Patterns

- All Zustand stores have explicit type parameter: `create<StateInterface>()`
- State interfaces separate from implementation (in `types.ts`)
- Constants typed via inference from values
- ESLint warns on `any` usage but doesn't fail builds

## Adding Routes

When adding a new module route:

1. Import the view: `import { NewModuleView } from './modules/new-module'`
2. Add to Routes: `<Route path="new-module" element={<NewModuleView />} />`
3. Update Sidebar with `<NavLink>` using emoji icon + label pattern

Reference [Sidebar.tsx](src/layout/components/Sidebar.tsx) lines 17-33 for navigation link structure.

## CSS Styles & Layout Pattern

**Critical layout structure** - All module views follow a two-column layout pattern (see [QuickStartView.css](src/modules/quick-start/view/QuickStartView.css)):

### Layout Structure

- **Wrapper container**: Main container with class `.module-name` (max-width: 1400px, centered)
- **Page title**: `<h1>` with class `.module-name__title` including emoji icon (font-size: 2.5rem, margin-bottom: 2rem)
- **Left side** (`__main-wrapper`): Explanations and code examples with vertical scroll
- **Right side** (`__sidebar`): Interactive demos, sticky positioned, no scroll required
- Content must fit viewport height without needing scroll on demo side

### View Title Pattern

Every module view MUST start with an `<h1>` title following this pattern:

```tsx
<div className="module-name">
  <h1 className="module-name__title">🔥 Title with Emoji</h1>
  <div className="module-name__layout">{/* ... rest of content */}</div>
</div>
```

```css
.module-name {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 100%;
  overflow: hidden;
}

.module-name__title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #fff;
  font-weight: 700;
}
```

**Important**: The emoji in the title should match the emoji used in the sidebar navigation link.

### Typography & Spacing

```css
/* Section Headings */
h2 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

/* Code blocks only for examples */
.module-name__code-block {
  background-color: #1e1e1e;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
}
```

### Color Palette (Consistent Across All Views)

- **Background**: `#1e1e1e` (code blocks)
- **Primary accent**: `#a78bfa` (purple - links, highlights)
- **Border**: `rgba(167, 139, 250, 0.3)` (purple translucent)
- **Text primary**: `#fff`
- **Text secondary**: `rgba(255, 255, 255, 0.8)`
- **Text muted**: `rgba(255, 255, 255, 0.6)`

### Key CSS Classes Pattern

```css
.module-name__layout {
  /* flex container */
}
.module-name__main-wrapper {
  /* left scrollable area */
  height: 75vh; /* REQUIRED: ensures proper vertical scrolling */
}
.module-name__sidebar {
  /* right sticky demos */
  height: 75vh; /* REQUIRED: ensures proper vertical scrolling */
}
.module-name__code-block {
  /* only for code examples */
}
.module-name__section {
  /* content sections */
}
```

**Important**: Use the same color palette and layout structure from QuickStartView for all new modules to maintain visual consistency.
