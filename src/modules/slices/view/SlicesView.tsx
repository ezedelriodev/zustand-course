import { UserSliceDemo } from '../components/UserSliceDemo'
import { CartSliceDemo } from '../components/CartSliceDemo'
import { SettingsSliceDemo } from '../components/SettingsSliceDemo'
import './SlicesView.css'

export const SlicesView = () => {
  return (
    <div className="slices">
      <h1 className="slices__title">🍕 Zustand Slices</h1>
      <div className="slices__layout">
        <div className="slices__main-wrapper">
          <section className="slices__section">
            <h2>¿Qué es el patrón Slices?</h2>
            <p>
              El patrón <strong>Slices</strong> es una técnica para organizar stores grandes
              dividiéndolos en partes más pequeñas y manejables. Cada "slice" (rebanada) representa
              una parte específica del estado global con sus propias acciones.
            </p>
            <p>
              Este patrón es especialmente útil en aplicaciones grandes donde un único store puede
              volverse difícil de mantener. Al dividirlo en slices, cada parte del estado tiene su
              propia lógica aislada.
            </p>
          </section>

          <section className="slices__section">
            <h2>Ventajas del patrón Slices</h2>
            <ul>
              <li>
                <strong>Organización:</strong> Cada slice maneja una parte específica del estado
              </li>
              <li>
                <strong>Escalabilidad:</strong> Fácil agregar nuevas funcionalidades sin afectar el
                código existente
              </li>
              <li>
                <strong>Mantenibilidad:</strong> El código es más fácil de entender y modificar
              </li>
              <li>
                <strong>Reutilización:</strong> Los slices pueden reutilizarse en diferentes stores
              </li>
              <li>
                <strong>Testing:</strong> Cada slice puede probarse de forma independiente
              </li>
            </ul>
          </section>

          <section className="slices__section">
            <h2>Ejemplo: Creando Slices</h2>
            <p>Primero definimos el tipo para cada slice:</p>
            <div className="slices__code-block">
              <pre>{`// types.ts
export interface UserSlice {
  user: {
    name: string
    email: string
    role: string
  }
  setName: (name: string) => void
  setEmail: (email: string) => void
  setRole: (role: string) => void
  resetUser: () => void
}

export interface CartSlice {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  clearCart: () => void
  getTotalPrice: () => number
}

export type SlicesStore = UserSlice & CartSlice`}</pre>
            </div>
          </section>

          <section className="slices__section">
            <h2>Creando los Slice Creators</h2>
            <p>Cada slice se crea con una función que retorna su parte del estado:</p>
            <div className="slices__code-block">
              <pre>{`import { StateCreator } from 'zustand'

// User Slice Creator
const createUserSlice: StateCreator<
  SlicesStore,
  [],
  [],
  UserSlice
> = (set) => ({
  user: { name: '', email: '', role: 'user' },
  setName: (name) =>
    set((state) => ({
      user: { ...state.user, name },
    })),
  setEmail: (email) =>
    set((state) => ({
      user: { ...state.user, email },
    })),
  setRole: (role) =>
    set((state) => ({
      user: { ...state.user, role },
    })),
  resetUser: () =>
    set({ user: { name: '', email: '', role: 'user' } }),
})`}</pre>
            </div>
          </section>

          <section className="slices__section">
            <h2>Combinando los Slices</h2>
            <p>
              Finalmente, combinamos todos los slices en un único store usando el spread operator:
            </p>
            <div className="slices__code-block">
              <pre>{`import { create } from 'zustand'

export const useSlicesStore = create<SlicesStore>()(
  (...a) => ({
    ...createUserSlice(...a),
    ...createCartSlice(...a),
    ...createSettingsSlice(...a),
  })
)`}</pre>
            </div>
            <p>
              El parámetro <code>...a</code> son los argumentos (set, get, api) que Zustand pasa
              automáticamente a cada slice creator.
            </p>
          </section>

          <section className="slices__section">
            <h2>Usando los Slices en componentes</h2>
            <p>Los componentes pueden acceder solo al slice que necesitan:</p>
            <div className="slices__code-block">
              <pre>{`import { useSlicesStore } from './store'

function UserProfile() {
  // Solo accede al slice de usuario
  const { user, setName, setEmail } = useSlicesStore()
  
  return (
    <div>
      <input 
        value={user.name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        value={user.email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
    </div>
  )
}`}</pre>
            </div>
          </section>

          <section className="slices__section">
            <h2>Acceso entre Slices</h2>
            <p>
              Los slices pueden acceder a otros slices usando el parámetro <code>get</code>:
            </p>
            <div className="slices__code-block">
              <pre>{`const createCartSlice: StateCreator<
  SlicesStore,
  [],
  [],
  CartSlice
> = (set, get) => ({
  items: [],
  getTotalPrice: () => {
    const state = get()
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  },
  // El slice de cart puede acceder al slice de user
  applyUserDiscount: () => {
    const { user } = get()
    if (user.role === 'premium') {
      // Aplicar descuento especial
    }
  },
})`}</pre>
            </div>
          </section>

          <section className="slices__section">
            <h2>Mejores prácticas</h2>
            <ul>
              <li>Mantén cada slice enfocado en una responsabilidad específica</li>
              <li>Define tipos TypeScript claros para cada slice</li>
              <li>Usa constantes para valores iniciales</li>
              <li>Evita dependencias circulares entre slices</li>
              <li>Documenta qué hace cada slice y sus acciones</li>
              <li>Considera crear archivos separados para cada slice en proyectos grandes</li>
            </ul>
          </section>
        </div>

        <div className="slices__sidebar">
          <UserSliceDemo />
          <CartSliceDemo />
          <SettingsSliceDemo />
        </div>
      </div>
    </div>
  )
}
