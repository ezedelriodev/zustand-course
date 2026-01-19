import { UserProfileWithImmer } from '../components/UserProfileWithImmer'
import { SettingsWithImmer } from '../components/SettingsWithImmer'
import { TaskListWithImmer } from '../components/TaskListWithImmer'
import './ImmerView.css'

export const ImmerView = () => {
  return (
    <div className="immer">
      <h1 className="immer__title">🪆 Immer y Estados Anidados</h1>
      <div className="immer__layout">
        <div className="immer__main-wrapper">
          <section className="immer__section">
            <p>
              El middleware <code>immer</code> de Zustand simplifica drásticamente el trabajo con
              estados anidados complejos. En lugar de usar múltiples spread operators, puedes
              modificar el estado directamente como si fuera mutable, y Immer se encarga de crear
              las copias inmutables automáticamente.
            </p>
          </section>

          <section className="immer__section">
            <h2>¿Por qué necesitamos Immer?</h2>
            <p>
              ⚠️ En JavaScript/React, el estado debe ser inmutable. Cuando tienes objetos anidados,
              actualizar una propiedad profunda requiere copiar todos los niveles. <code>set</code>{' '}
              solo está capacitado para hacer un merge superficial de las propiedades de primer
              nivel, remplazando solo las claves que cambian en el primer nivel:
            </p>

            <div className="immer__code-block">
              <pre>
                <code>{`// ❌ Sin Immer: Complicado y propenso a errores
updateTheme: (theme) =>
  set((state) => ({
    user: {
      ...state.user,
      profile: {
        ...state.user.profile,
        settings: {
          ...state.user.profile.settings,
          theme, // Solo queremos cambiar esto
        },
      },
    },
  }))`}</code>
              </pre>
            </div>

            <p>
              ⭐ Con Immer, el mismo código se vuelve mucho más simple. Immer nos permite modificar
              el estado de propiedades anidadas. Permite escribir código como si mutaras el estado
              directamente, pero sin romper la inmutabilidad que React necesita para detectar
              cambios.
            </p>

            <div className="immer__code-block">
              <pre>
                <code>{`// ✅ Con Immer: Simple y directo
updateTheme: (theme) =>
  set((state) => {
    state.user.profile.settings.theme = theme
  })`}</code>
              </pre>
            </div>
          </section>

          <section className="immer__section">
            <h2>Instalación</h2>
            <p>Es necesario instar la librería: npm install immer yarn add immer:</p>
            <div className="immer__code-block">
              <pre>
                <code>{`npm install immer
O
yarn add immer`}</code>
              </pre>
            </div>
            <p>Impotar las librerías:</p>

            <div className="immer__code-block">
              <pre>
                <code>{`import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'`}</code>
              </pre>
            </div>
          </section>

          <section className="immer__section">
            <h2>Uso básico</h2>
            <p>Envuelve tu store con el middleware immer:</p>

            <div className="immer__code-block">
              <pre>
                <code>{`interface User {
  name: string
  profile: {
    bio: string
    settings: {
      theme: 'light' | 'dark'
      notifications: boolean
    }
  }
}

interface MyState {
  user: User
  updateTheme: (theme: 'light' | 'dark') => void
  toggleNotifications: () => void
}

export const useStore = create<MyState>()(
  immer((set) => ({
    user: {
      name: 'Usuario',
      profile: {
        bio: 'Mi biografía',
        settings: {
          theme: 'dark',
          notifications: true,
        },
      },
    },
    
    // Con Immer: mutación directa
    updateTheme: (theme) =>
      set((state) => {
        state.user.profile.settings.theme = theme
      }),
    
    toggleNotifications: () =>
      set((state) => {
        state.user.profile.settings.notifications = 
          !state.user.profile.settings.notifications
      }),
  }))
)`}</code>
              </pre>
            </div>

            <p>
              Dentro de <code>set()</code>, el parámetro <code>state</code> es un "draft" (borrador)
              que puedes modificar directamente. Immer detecta los cambios y crea un nuevo estado
              inmutable automáticamente.
            </p>
          </section>

          <section className="immer__section">
            <h2>Trabajando con arrays</h2>
            <p>
              Immer también simplifica las operaciones con arrays. Puedes usar métodos mutantes como{' '}
              <code>push()</code>, <code>splice()</code>, etc:
            </p>

            <div className="immer__code-block">
              <pre>
                <code>{`// Sin Immer
addTask: (title) =>
  set((state) => ({
    tasks: [...state.tasks, { id: nextId, title, completed: false }],
  })),

toggleTask: (id) =>
  set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ),
  })),

removeTask: (id) =>
  set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id),
  })),

// Con Immer
addTask: (title) =>
  set((state) => {
    state.tasks.push({ id: nextId, title, completed: false })
  }),

toggleTask: (id) =>
  set((state) => {
    const task = state.tasks.find((t) => t.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }),

removeTask: (id) =>
  set((state) => {
    const index = state.tasks.findIndex((t) => t.id === id)
    if (index !== -1) {
      state.tasks.splice(index, 1)
    }
  })`}</code>
              </pre>
            </div>
          </section>

          <section className="immer__section">
            <h2>Ventajas de usar Immer</h2>
            <ul>
              <li>
                ✔️ <strong>Código más legible</strong>: Escribe código imperativo natural en lugar
                de spread operators complejos
              </li>
              <li>
                ✔️ <strong>Menos errores</strong>: Evita olvidar copiar algún nivel de la jerarquía
              </li>
              <li>
                ✔️ <strong>Mejor autocompletado</strong>: TypeScript funciona mejor con mutación
                directa
              </li>
              <li>
                ✔️ <strong>Simplicidad en arrays</strong>: Usa <code>push</code>,{' '}
                <code>splice</code>, <code>sort</code>, etc. directamente
              </li>
              <li>
                ✔️ <strong>Performance</strong>: Immer está altamente optimizado y solo crea copias
                de las partes que cambiaron
              </li>
            </ul>
          </section>

          <section className="immer__section">
            <h2>Combinando con otros middlewares</h2>
            <p>Puedes combinar Immer con otros middlewares como persist o devtools:</p>

            <div className="immer__code-block">
              <pre>
                <code>{`import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

export const useStore = create<MyState>()(
  devtools(
    persist(
      immer((set) => ({
        // Tu estado y acciones aquí
      })),
      { name: 'my-storage' }
    ),
    { name: 'My Store' }
  )
)`}</code>
              </pre>
            </div>

            <p>
              <strong>Orden recomendado</strong>: devtools → persist → immer
            </p>
          </section>

          <section className="immer__section">
            <h2>Notas importantes</h2>
            <ul>
              <li>
                Solo funciona con actualizaciones en la función <code>set()</code>, no con{' '}
                <code>get()</code>
              </li>
              <li>
                No puedes retornar un valor dentro de <code>set()</code> cuando usas Immer (la
                mutación es implícita)
              </li>
              <li>Immer detecta automáticamente si modificaste el estado o no</li>
              <li>
                Si necesitas hacer actualizaciones masivas, considera usar <code>return</code>{' '}
                explícito sin Immer para ese caso específico
              </li>
            </ul>
          </section>

          <section className="immer__section">
            <h2>Demo interactiva</h2>
            <p>
              En las demos de la derecha, todos los componentes usan el middleware Immer. Observa
              cómo podemos modificar objetos profundamente anidados y arrays con código simple y
              directo.
            </p>
            <p>
              Compara mentalmente cuánto código spread necesitarías sin Immer para lograr lo mismo.
            </p>
          </section>
        </div>

        <aside className="immer__sidebar">
          <UserProfileWithImmer />
          <SettingsWithImmer />
          <TaskListWithImmer />
        </aside>
      </div>
    </div>
  )
}
