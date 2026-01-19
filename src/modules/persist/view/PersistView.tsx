import { LocalStorageDemo } from '../components/LocalStorageDemo'
import { SessionStorageDemo } from '../components/SessionStorageDemo'
import './PersistView.css'

export const PersistView = () => {
  return (
    <div className="persist">
      <h1 className="persist__title">💾 Persistencia</h1>
      <div className="persist__layout">
        <div className="persist__main-wrapper">
          <section className="persist__section">
            <p>
              El middleware <code>persist</code> de Zustand permite guardar automáticamente el
              estado en localStorage, sessionStorage o cualquier otro storage personalizado. Los
              datos persisten entre recargas de página y sesiones del navegador.
            </p>
          </section>

          <section className="persist__section">
            <h2>Uso básico del middleware persist</h2>
            <p>Para usar persist, simplemente envuelve tu store con el middleware:</p>

            <div className="persist__code-block">
              <pre>
                <code>{`import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MyState {
  userName: string
  count: number
  setUserName: (name: string) => void
  increment: () => void
}

export const useStore = create<MyState>()(
  persist(
    (set) => ({
      userName: 'Usuario',
      count: 0,
      setUserName: (name) => set({ userName: name }),
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: 'user-preferences-storage', // nombre de la clave en storage
    }
  )
)`}</code>
              </pre>
            </div>

            <p>
              Por defecto, persist guarda <strong>todo el estado</strong> en localStorage con la
              clave especificada en <code>name</code>.
            </p>
          </section>

          <section className="persist__section">
            <h2>La propiedad partialize</h2>
            <p>
              A veces no quieres persistir todo el estado, solo algunas partes. Para esto usas la
              opción <code>partialize</code>:
            </p>

            <div className="persist__code-block">
              <pre>
                <code>{`export const useStore = create<MyState>()(
  persist(
    (set) => ({
      userName: 'Usuario',
      theme: 'dark',
      sessionCounter: 0,  // NO queremos persistir esto
      
      setUserName: (name) => set({ userName: name }),
      setTheme: (theme) => set({ theme }),
      incrementSession: () => 
        set((state) => ({ sessionCounter: state.sessionCounter + 1 })),
    }),
    {
      name: 'user-preferences-storage',
      // Solo persiste userName y theme
      partialize: (state) => ({
        userName: state.userName,
        theme: state.theme,
        // sessionCounter NO está aquí, así que NO se persiste
      }),
    }
  )
)`}</code>
              </pre>
            </div>

            <p>
              Con <code>partialize</code>, especificas exactamente qué propiedades del estado deben
              guardarse. Las demás se reinician con sus valores iniciales en cada recarga.
            </p>
          </section>

          <section className="persist__section">
            <h2>Usando sessionStorage</h2>
            <p>
              Por defecto, persist usa localStorage, que persiste indefinidamente. Si quieres que
              los datos solo persistan durante la sesión del navegador, usa sessionStorage:
            </p>

            <div className="persist__code-block">
              <pre>
                <code>{`import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useStore = create<MyState>()(
  persist(
    (set) => ({
      // ... tu estado
    }),
    {
      name: 'session-preferences-storage', // nombre de la clave en storage
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)`}</code>
              </pre>
            </div>

            <p>Diferencias entre localStorage y sessionStorage:</p>
            <ul>
              <li>
                <strong>localStorage</strong>: Los datos persisten indefinidamente, incluso después
                de cerrar el navegador. Se comparten entre todas las pestañas del mismo origen.
              </li>
              <li>
                <strong>sessionStorage</strong>: Los datos solo duran mientras la pestaña está
                abierta. Cada pestaña tiene su propio sessionStorage independiente. Se pierde al
                cerrar la pestaña.
              </li>
            </ul>
          </section>

          <section className="persist__section">
            <h2>Storage personalizado</h2>
            <p>
              Puedes usar cualquier storage que implemente la interfaz <code>StateStorage</code>:
            </p>

            <div className="persist__code-block">
              <pre>
                <code>{`import { StateStorage } from 'zustand/middleware'

// Storage personalizado (ejemplo: IndexedDB, AsyncStorage, etc.)
const customStorage: StateStorage = {
  getItem: (name: string) => {
    // Tu lógica para leer del storage
    return null
  },
  setItem: (name: string, value: string) => {
    // Tu lógica para escribir en el storage
  },
  removeItem: (name: string) => {
    // Tu lógica para eliminar del storage
  },
}

export const useStore = create<MyState>()(
  persist(
    (set) => ({ /* ... */ }),
    {
      name: 'custom-storage',
      storage: createJSONStorage(() => customStorage),
    }
  )
)`}</code>
              </pre>
            </div>
          </section>

          <section className="persist__section">
            <h2>Ventajas de usar persist</h2>
            <ul>
              <li>
                ✔️ <strong>Automático</strong>: Guarda y carga el estado sin código extra
              </li>
              <li>
                ✔️ <strong>Flexible</strong>: Controla qué se persiste con partialize
              </li>
              <li>
                ✔️ <strong>Múltiples storages</strong>: localStorage, sessionStorage o personalizado
              </li>
              <li>
                ✔️ <strong>TypeScript</strong>: Soporte completo de tipos
              </li>
              <li>
                ✔️ <strong>Serialización</strong>: Maneja automáticamente JSON
              </li>
            </ul>
          </section>

          <section className="persist__section">
            <h2>Demo interactiva</h2>
            <p>
              En las demos de la derecha puedes experimentar con ambos tipos de storage. Observa
              cómo:
            </p>
            <ul>
              <li>
                En <strong>LocalStorage con partialize</strong>, algunos valores persisten al
                recargar pero el contador de sesión NO
              </li>
              <li>
                En <strong>SessionStorage</strong>, los valores persisten solo durante la sesión
                actual
              </li>
            </ul>
            <p>
              Prueba recargar la página, abrir en nuevas pestañas, o cerrar y reabrir el navegador
              para ver las diferencias.
            </p>
          </section>
        </div>

        <aside className="persist__sidebar">
          <LocalStorageDemo />
          <SessionStorageDemo />
        </aside>
      </div>
    </div>
  )
}
