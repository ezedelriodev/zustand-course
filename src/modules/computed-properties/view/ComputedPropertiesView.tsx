import { BearCounter } from '../components/BearCounter'
import { ElephantCounter } from '../components/ElephantCounter'
import { MonkeyCounter } from '../components/MonkeyCounter'
import { TotalCounter } from '../components/TotalCounter'
import './ComputedPropertiesView.css'

export const ComputedPropertiesView = () => {
  return (
    <div className="computed-properties">
      <h1 className="computed-properties__title">🧮 Propiedades calculadas</h1>
      <div className="computed-properties__layout">
        <div className="computed-properties__main-wrapper">
          <section className="computed-properties__section">
            <p>
              En Zustand, puedes crear propiedades calculadas utilizando la función{' '}
              <code>get()</code> que se proporciona como segundo parámetro al crear el store. Esto
              te permite acceder al estado actual dentro de tus funciones y realizar cálculos
              dinámicos.
            </p>
          </section>

          <section className="computed-properties__section">
            <h2>La función get()</h2>
            <p>
              Cuando creas un store en Zustand, además de la función <code>set()</code> para
              actualizar el estado, también recibes una función <code>get()</code> que te permite
              leer el estado actual en cualquier momento:
            </p>

            <div className="computed-properties__code-block">
              <pre>
                <code>{`export const useStore = create<State>()((set, get) => ({
  // Estado
  value1: 0,
  value2: 0,
  
  // Propiedad calculada usando get()
  getTotal() {
    return get().value1 + get().value2
  }
}))`}</code>
              </pre>
            </div>
          </section>

          <section className="computed-properties__section">
            <h2>¿Por qué usar get()?</h2>
            <p>La función get() es útil cuando necesitas:</p>
            <ul>
              <li>Leer múltiples valores del estado para realizar un cálculo</li>
              <li>Implementar lógica que depende del estado actual</li>
              <li>Crear getters que no necesitan almacenarse en el estado</li>
              <li>Evitar duplicar datos calculados en el estado</li>
            </ul>
          </section>

          <section className="computed-properties__section">
            <h2>👇Ejemplo práctico</h2>
            <p>En nuestro store de contadores de animales, usamos get() para calcular el total:</p>

            <div className="computed-properties__code-block">
              <pre>
                <code>{`interface ComputedProperties {
  bearCounter: number
  elephantCounter: number
  monkeyCounter: number
  incBear: (by: number) => void
  incElephant: (by: number) => void
  incMonkey: (by: number) => void
  getTotal: () => number
}

export const useComputedPropertiesStore = 
  create<ComputedProperties>()((set, get) => ({
    bearCounter: 0,
    elephantCounter: 0,
    monkeyCounter: 0,
    
    incBear: (by: number) => 
      set((state) => ({ bearCounter: state.bearCounter + by })),
    
    incElephant: (by: number) => 
      set((state) => ({ elephantCounter: state.elephantCounter + by })),
    
    incMonkey: (by: number) => 
      set((state) => ({ monkeyCounter: state.monkeyCounter + by })),
    
    // ✅ Propiedad calculada con get()
    getTotal() {
      return get().bearCounter + 
             get().elephantCounter + 
             get().monkeyCounter
    },
}))`}</code>
              </pre>
            </div>
          </section>

          <section className="computed-properties__section">
            <h2>Usando la propiedad calculada</h2>
            <p>Para usar una propiedad calculada en tu componente, simplemente accede a ella:</p>

            <div className="computed-properties__code-block">
              <pre>
                <code>{`const TotalCounter = () => {
  // ✅ Obtenemos la función getTotal del store Y LA EJECUTAMOS.
  const total = useComputedPropertiesStore((state) => state.getTotal())
  
  

  // ❌ ESTO NO FUNCIONA: Obtenemos la función getTotal del store
  const getTotal = useComputedPropertiesStore((state) => state.getTotal)
  // Llamamos a la función para obtener el valor calculado
  const total = getTotal()
}
return <div>Total: {total}</div>

// Dentro del selector, get() es rastreado
useStore((state) => state.getTotal())  // ✅ Se suscribe a bear/elephant/monkey

// Fuera del selector, get() NO es rastreado  
const fn = useStore((state) => state.getTotal)
fn()  // ❌ No hay suscripción`}</code>
              </pre>
            </div>
          </section>

          <section className="computed-properties__section">
            <h2>Diferencia con set()</h2>
            <p>Es importante entender la diferencia entre set() y get():</p>

            <div className="computed-properties__code-block">
              <pre>
                <code>{`// set() - Para MODIFICAR el estado
incBear: (by: number) => set((state) => ({ 
  bearCounter: state.bearCounter + by 
}))

// get() - Para LEER el estado
getTotal() {
  return get().bearCounter + 
         get().elephantCounter + 
         get().monkeyCounter
}

// También puedes combinarlos
resetAll: () => {
  const currentTotal = get().bearCounter + 
                       get().elephantCounter + 
                       get().monkeyCounter
  console.log('Resetting total:', currentTotal)
  set({ bearCounter: 0, elephantCounter: 0, monkeyCounter: 0 })
}`}</code>
              </pre>
            </div>
          </section>

          <section className="computed-properties__section">
            <h2>Ventajas de las propiedades calculadas</h2>
            <ul>
              <li>
                ✔️ <strong>No duplican datos</strong>: El valor se calcula en tiempo real
              </li>
              <li>
                ✔️ <strong>Siempre actualizados</strong>: Reflejan el estado actual sin
                sincronización manual
              </li>
              <li>
                ✔️ <strong>Lógica encapsulada</strong>: La lógica de cálculo vive en el store
              </li>
              <li>
                ✔️ <strong>Reutilizables</strong>: Puedes usar la misma función en múltiples
                componentes
              </li>
            </ul>
          </section>

          <section className="computed-properties__section">
            <h2>Demo interactiva</h2>
            <p>
              En la demostración de la derecha, incrementa los contadores de cada animal y observa
              cómo el <strong>Total de Animales</strong> se actualiza automáticamente usando la
              función <code>getTotal()</code> que implementamos con <code>get()</code>.
            </p>
            <p>
              El componente TotalCounter no almacena ningún estado propio, simplemente llama a{' '}
              <code>getTotal()</code> para obtener la suma calculada en tiempo real de todos los
              contadores.
            </p>
          </section>
        </div>

        <aside className="computed-properties__sidebar">
          <div className="computed-properties__counters-grid">
            <BearCounter />
            <ElephantCounter />
            <MonkeyCounter />
          </div>
          <TotalCounter />
        </aside>
      </div>
    </div>
  )
}
