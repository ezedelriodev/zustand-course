import { CounterDemo } from '../components/CounterDemo'
import { UserForm } from '../components/UserForm'
import { TodoList } from '../components/TodoList'
import './DevtoolsView.css'

export const DevtoolsView = () => {
  return (
    <div className="devtools">
      <h1 className="devtools__title">🛠️ Redux DevTools</h1>
      <div className="devtools__layout">
        <div className="devtools__main-wrapper">
          <section className="devtools__section">
            <p>
              El middleware <code>devtools</code> de Zustand permite conectar tu store con Redux
              DevTools, una extensión de navegador que te permite inspeccionar el estado, ver el
              historial de acciones, y hacer time-travel debugging.
            </p>
          </section>

          <section className="devtools__section">
            <h2>Instalación de Redux DevTools</h2>
            <p>
              Primero necesitas instalar la extensión de navegador Redux DevTools en Chrome, Firefox
              o Edge:
            </p>
            <ul>
              <li>
                <strong>Chrome</strong>:{' '}
                <a
                  href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Redux DevTools en Chrome Web Store
                </a>
              </li>
              <li>
                <strong>Firefox</strong>:{' '}
                <a
                  href="https://addons.mozilla.org/firefox/addon/reduxdevtools/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Redux DevTools en Firefox Add-ons
                </a>
              </li>
            </ul>
            <p>
              Una vez instalada, verás un nuevo icono en tu barra de herramientas del navegador.
            </p>
          </section>

          <section className="devtools__section">
            <h2>Uso básico del middleware devtools</h2>
            <p>Para usar devtools, simplemente envuelve tu store con el middleware:</p>

            <div className="devtools__code-block">
              <pre>
                <code>{`import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface MyState {
  count: number
  increment: () => void
  decrement: () => void
}

export const useStore = create<MyState>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
    }),
    { name: 'Counter Store' } // Nombre que aparece en DevTools
  )
)`}</code>
              </pre>
            </div>

            <p>
              Abre Redux DevTools (F12 → pestaña Redux) y verás las actualizaciones de estado en
              tiempo real.
            </p>
          </section>

          <section className="devtools__section">
            <h2>Nombrando acciones</h2>
            <p>
              Por defecto, Zustand registra las acciones como "anonymous". Para que sea más fácil
              identificarlas en DevTools, puedes nombrarlas:
            </p>

            <div className="devtools__code-block">
              <pre>
                <code>{`export const useStore = create<MyState>()(
  devtools(
    (set) => ({
      count: 0,
      // Pasar nombre de acción como tercer argumento de set()
      increment: () => 
        set(
          (state) => ({ count: state.count + 1 }),
          false,
          'counter/increment' // 👈 Nombre de la acción
        ),
      decrement: () => 
        set(
          (state) => ({ count: state.count - 1 }),
          false,
          'counter/decrement' // 👈 Nombre de la acción
        ),
    }),
    { name: 'Counter Store' }
  )
)`}</code>
              </pre>
            </div>

            <p>
              El tercer parámetro de <code>set()</code> es el nombre de la acción que aparecerá en
              DevTools.
            </p>
          </section>

          <section className="devtools__section">
            <h2>Acciones con payload</h2>
            <p>También puedes incluir datos adicionales (payload) en tus acciones:</p>

            <div className="devtools__code-block">
              <pre>
                <code>{`export const useStore = create<MyState>()(
  devtools(
    (set) => ({
      user: { name: '', email: '' },
      
      setUserName: (name: string) =>
        set(
          (state) => ({ user: { ...state.user, name } }),
          false,
          { 
            type: 'user/setName', 
            name // 👈 Payload incluido
          }
        ),
      
      setUserEmail: (email: string) =>
        set(
          (state) => ({ user: { ...state.user, email } }),
          false,
          { 
            type: 'user/setEmail', 
            email // 👈 Payload incluido
          }
        ),
    }),
    { name: 'User Store' }
  )
)`}</code>
              </pre>
            </div>

            <p>
              Cuando usas un objeto como nombre de acción, puedes incluir cualquier dato adicional
              que aparecerá en DevTools junto con la acción.
            </p>
          </section>

          <section className="devtools__section">
            <h2>Características de Redux DevTools</h2>
            <ul>
              <li>
                ✔️ <strong>State Inspector</strong>: Ve el estado completo de tu store en cualquier
                momento
              </li>
              <li>
                ✔️ <strong>Action History</strong>: Lista de todas las acciones ejecutadas con
                timestamps
              </li>
              <li>
                ✔️ <strong>Time Travel</strong>: Navega hacia atrás y adelante en el historial de
                estados
              </li>
              <li>
                ✔️ <strong>State Diff</strong>: Ve exactamente qué cambió en cada acción
              </li>
            </ul>
          </section>

          <section className="devtools__section">
            <h2>Opciones del middleware</h2>
            <p>
              El middleware devtools acepta opciones adicionales para personalizar su
              comportamiento:
            </p>

            <div className="devtools__code-block">
              <pre>
                <code>{`export const useStore = create<MyState>()(
  devtools(
    (set) => ({ /* ... */ }),
    {
      name: 'My App Store',           // Nombre del store
      enabled: true,                  // Activar/desactivar devtools
      anonymousActionType: 'unknown', // Nombre para acciones sin nombre
      serialize: true,                // Serializar el estado
    }
  )
)`}</code>
              </pre>
            </div>
          </section>

          <section className="devtools__section">
            <h2>Desactivar en producción</h2>
            <p>Para evitar overhead en producción, puedes desactivar devtools condicionalmente:</p>

            <div className="devtools__code-block">
              <pre>
                <code>{`export const useStore = create<MyState>()(
  devtools(
    (set) => ({ /* ... */ }),
    {
      name: 'My Store',
      enabled: import.meta.env.DEV, // Solo en desarrollo
    }
  )
)`}</code>
              </pre>
            </div>
          </section>

          <section className="devtools__section">
            <h2>Demo interactiva</h2>
            <p>
              En las demos de la derecha, interactúa con los controles y observa cómo cada acción
              aparece en Redux DevTools con su nombre y payload correspondientes.
            </p>
            <p>
              <strong>Cómo usar:</strong>
            </p>
            <ol>
              <li>Abre las DevTools del navegador (F12)</li>
              <li>Ve a la pestaña "Redux"</li>
              <li>Interactúa con los componentes de la derecha</li>
              <li>Observa las acciones en tiempo real en DevTools</li>
              <li>Prueba el time-travel haciendo clic en acciones anteriores</li>
            </ol>
          </section>
        </div>

        <aside className="devtools__sidebar">
          <CounterDemo />
          <UserForm />
          <TodoList />
        </aside>
      </div>
    </div>
  )
}
