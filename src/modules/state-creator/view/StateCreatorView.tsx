import { BasicCounter } from '../components/BasicCounter'
import { UserForm } from '../components/UserForm'
import { SettingsPanel } from '../components/SettingsPanel'
import './StateCreatorView.css'

export const StateCreatorView = () => {
  return (
    <div className="state-creator">
      <h1 className="state-creator__title">🏗️ StateCreator en Zustand</h1>

      <div className="state-creator__layout">
        {/* Main Content - Explicaciones */}
        <div className="state-creator__main-wrapper">
          <section className="state-creator__section">
            <h2>¿Qué es StateCreator?</h2>
            <p>
              <code>StateCreator</code> es un tipo de TypeScript que proporciona Zustand para definir la función que
              crea el estado del store. Es especialmente útil cuando trabajas con middlewares, ya que permite un tipado
              correcto y evita problemas con los tipos inferidos.
            </p>

            <div className="state-creator__code-block">
              {`// Tipo base de StateCreator
type StateCreator<
  T,                    // Tipo del estado
  Mps extends [StoreMutatorIdentifier, unknown][] = [],  // Middlewares
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],  // Mutators
  U = T                 // Tipo de retorno
> = ((set, get, api) => U) | ...`}
            </div>
          </section>

          <section className="state-creator__section">
            <h2>¿Para qué sirve?</h2>
            <p>StateCreator sirve principalmente para:</p>
            <ul>
              <li>
                <strong>Tipado seguro con middlewares:</strong> Cuando usas middlewares como persist, devtools o immer,
                StateCreator asegura que los tipos sean correctos.
              </li>
              <li>
                <strong>Composición de stores:</strong> Facilita la creación de slices que luego se combinan en un
                store más grande.
              </li>
              <li>
                <strong>Inferencia de tipos mejorada:</strong> TypeScript puede inferir mejor los tipos de las acciones
                y el estado.
              </li>
              <li>
                <strong>Código más mantenible:</strong> Separa la definición del store de los middlewares, haciendo el
                código más legible.
              </li>
            </ul>
          </section>

          <section className="state-creator__section">
            <h2>Ejemplo 1: Store básico SIN StateCreator</h2>
            <p>Esta es la forma tradicional sin usar StateCreator explícitamente:</p>

            <div className="state-creator__code-block">
              {`// ❌ Sin StateCreator explícito
export const useBasicCounterStore = create<BasicCounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))`}
            </div>

            <div className="state-creator__highlight">
              <p>
                <strong>💡 Nota:</strong> Este enfoque funciona bien para stores simples sin middlewares, pero puede
                causar problemas de tipos al agregar middlewares.
              </p>
            </div>
          </section>

          <section className="state-creator__section">
            <h2>Ejemplo 2: Con StateCreator + Persist</h2>
            <p>Cuando agregamos el middleware persist, StateCreator nos ayuda con el tipado:</p>

            <div className="state-creator__code-block">
              {`// ✅ Con StateCreator para tipado correcto
const userStoreCreator: StateCreator<
  UserStore,                          // Tipo del estado
  [['zustand/persist', unknown]],    // Middlewares usados
  [],                                 // Mutators (vacío normalmente)
  UserStore                           // Tipo de retorno
> = (set) => ({
  name: 'John Doe',
  email: 'john@example.com',
  age: 25,
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setAge: (age) => set({ age }),
  clearUser: () => set({ name: '', email: '', age: 0 }),
})

export const useUserStore = create<UserStore>()(
  persist(userStoreCreator, {
    name: 'user-storage',
  })
)`}
            </div>

            <div className="state-creator__highlight">
              <p>
                <strong>🔑 Key Point:</strong> El segundo parámetro genérico{' '}
                <code>[['zustand/persist', unknown]]</code> indica que estamos usando el middleware persist.
              </p>
            </div>
          </section>

          <section className="state-creator__section">
            <h2>Ejemplo 3: Múltiples Middlewares</h2>
            <p>
              Cuando combinamos varios middlewares, el orden importa. Los middlewares se aplican de dentro hacia fuera:
            </p>

            <div className="state-creator__code-block">
              {`// ✅ Con múltiples middlewares
const settingsStoreCreator: StateCreator<
  SettingsStore,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  SettingsStore
> = (set) => ({
  theme: 'dark',
  language: 'es',
  notificationsEnabled: true,
  toggleTheme: () => 
    set((state) => ({ 
      theme: state.theme === 'light' ? 'dark' : 'light' 
    }), false, 'settings/toggleTheme'),
  setLanguage: (language) => 
    set({ language }, false, 'settings/setLanguage'),
  toggleNotifications: () => 
    set((state) => ({ 
      notificationsEnabled: !state.notificationsEnabled 
    }), false, 'settings/toggleNotifications'),
  resetSettings: () => 
    set({ theme: 'dark', language: 'es', notificationsEnabled: true }, 
    false, 'settings/reset'),
})

// El orden importa: devtools envuelve a persist
export const useSettingsStore = create<SettingsStore>()(
  devtools(
    persist(settingsStoreCreator, {
      name: 'settings-storage',
    }),
    { name: 'Settings_Store' }
  )
)`}
            </div>

            <div className="state-creator__comparison state-creator__comparison--good">
              <div className="state-creator__comparison-title">✅ Orden correcto de middlewares:</div>
              <p>
                <code>devtools(persist(stateCreator, config), config)</code> - persist guarda el estado, devtools lo
                inspecciona.
              </p>
            </div>

            <div className="state-creator__comparison">
              <div className="state-creator__comparison-title">❌ Orden incorrecto:</div>
              <p>
                <code>persist(devtools(stateCreator, config), config)</code> - devtools intenta persistir, causando
                errores.
              </p>
            </div>
          </section>

          <section className="state-creator__section">
            <h2>¿Cuándo usar StateCreator?</h2>

            <h3>✅ Usa StateCreator cuando:</h3>
            <ul>
              <li>Trabajas con cualquier middleware (persist, devtools, immer, etc.)</li>
              <li>Necesitas combinar múltiples middlewares</li>
              <li>Creas slices que se combinarán en un store más grande</li>
              <li>Quieres evitar errores de tipo en TypeScript</li>
              <li>Tu equipo valora el código explícito y documentado</li>
            </ul>

            <h3>⚠️ No es necesario cuando:</h3>
            <ul>
              <li>Tienes un store simple sin middlewares</li>
              <li>No usas TypeScript en tu proyecto</li>
              <li>El store es muy pequeño y no va a crecer</li>
            </ul>
          </section>

          <section className="state-creator__section">
            <h2>Tipado Correcto en TypeScript</h2>

            <h3>Anatomía del tipo StateCreator:</h3>
            <div className="state-creator__code-block">
              {`StateCreator<
  T,        // 1. Tipo del estado (interface del store)
  Mps,      // 2. Middlewares (array de tuplas)
  Mcs,      // 3. Mutators (normalmente [])
  U         // 4. Tipo de retorno (usualmente igual a T)
>`}
            </div>

            <h3>Middlewares comunes:</h3>
            <div className="state-creator__code-block">
              {`// Solo persist
[['zustand/persist', unknown]]

// Solo devtools
[['zustand/devtools', never]]

// Solo immer
[['zustand/immer', never]]

// Persist + DevTools (orden: devtools, persist)
[['zustand/devtools', never], ['zustand/persist', unknown]]

// Persist + DevTools + Immer
[['zustand/devtools', never], ['zustand/persist', unknown], ['zustand/immer', never]]`}
            </div>

            <div className="state-creator__highlight">
              <p>
                <strong>💡 Tip:</strong> El orden en el array de middlewares debe coincidir con el orden de aplicación
                en el create(). Lee de afuera hacia adentro: el primer middleware en el código es el primero en el
                array.
              </p>
            </div>
          </section>

          <section className="state-creator__section">
            <h2>Beneficios del uso de StateCreator</h2>
            <ul>
              <li>
                <strong>Type Safety:</strong> TypeScript puede validar que tus acciones y estados son correctos.
              </li>
              <li>
                <strong>Autocompletado:</strong> Mejor experiencia de desarrollo con IntelliSense.
              </li>
              <li>
                <strong>Refactoring seguro:</strong> Los cambios en el store son detectados por el compilador.
              </li>
              <li>
                <strong>Documentación implícita:</strong> Los tipos sirven como documentación del store.
              </li>
              <li>
                <strong>Prevención de errores:</strong> Errores de tipo se detectan en tiempo de compilación, no en
                runtime.
              </li>
            </ul>
          </section>
        </div>

        {/* Sidebar - Demos */}
        <div className="state-creator__sidebar">
          <div className="state-creator__demo-section">
            <BasicCounter />
            <UserForm />
            <SettingsPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
