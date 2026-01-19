import { BearCounter } from '../components/BearCounter'
import { ElephantCounter } from '../components/ElephantCounter'
import { MonkeyCounter } from '../components/MonkeyCounter'
import './SelectorsView.css'

export const SelectorsView = () => {
  return (
    <div className="selectors">
      <h1 className="selectors__title">🎯 Selectores en Zustand</h1>
      <div className="selectors__layout">
        <div className="selectors__main-wrapper">
          <section className="selectors__section">
            <h2>¿Qué son los Selectores?</h2>

            <p>
              Un <code className="selectors__inline-code">selector</code> en Zustand es una función
              que se pasa al hook del store para extraer solo la parte del estado que necesita el
              componente. Esto es clave para optimizar el rendimiento y evitar re-renderizados
              innecesarios.
            </p>
            <pre className="selectors__code-block">
              {`const bearCounter = useSelectorsStore(`}
              <span className="selectors__highlight">{`state => state.bearCounter`}</span>
              {`)`}{' '}
            </pre>
          </section>

          <section className="selectors__section">
            <h2>👇Este es nuestro store compartido por tres componentes</h2>
            <pre className="selectors__code-block">
              {`export const useSelectorsStore = create<SelectorsState>((set) => ({
  bearCounter: INITIAL_BEAR_COUNT,
  elephantCounter: INITIAL_ELEPHANT_COUNT,
  monkeyCounter: INITIAL_MONKEY_COUNT,

  incBear: (by: number) => set((state) => ({ bearCounter: state.bearCounter + by })),
  incElephant: (by: number) => set((state) => ({ elephantCounter: state.elephantCounter + by })),
  incMonkey: (by: number) => set((state) => ({ monkeyCounter: state.monkeyCounter + by })),
}))`}
            </pre>
          </section>

          <section className="selectors__section">
            <h2>Selectores Optimizados</h2>
            <p>
              Cuando usas un selector específico, tu componente solo se re-renderiza cuando cambia
              la parte del estado que seleccionaste:
            </p>
            <pre className="selectors__code-block">
              {`// ✅ CORRECTO: Solo se re-renderiza cuando cambia bearCounter
const BearCounter = () => {
  const bearCounter = useSelectorsStore(state => state.bearCounter)
  const incBear = useSelectorsStore(state => state.incBear)
  
  return <div>{bearCounter}</div>
}

// ❌ INCORRECTO: Se re-renderiza en CUALQUIER cambio del store
const MonkeyCounter = () => {
  const { monkeyCounter, incMonkey } = useSelectorsStore()
  
  return <div>{monkeyCounter}</div>
}`}
            </pre>
          </section>

          <section className="selectors__section">
            <h2>Problema de Re-renderizado</h2>
            <p>
              Sin selectores apropiados, un componente se re-renderizará cada vez que{' '}
              <strong>cualquier parte</strong> del store cambie, incluso si no usa esos valores:
            </p>
            <pre className="selectors__code-block">
              {`//❌ Estos componentes se re-renderiza aunque solo use monkeyCounter

const MonkeyCounter  = () => {
  const store = useSelectorsStore() // ⚠️ Suscrito a TODO el store
  return <div>{store.monkeyCounter}</div>

  const MonkeyCounter  = () => {
  const {monkeyCounter} = useSelectorsStore() // ⚠️ 👉 Desestructurar NO cambia la suscripción
  return <div>{monkeyCounter}</div>
}`}
            </pre>
          </section>

          <section className="selectors__section">
            <h2>Múltiples Selectores</h2>
            <p>
              Puedes usar múltiples selectores en el mismo componente. Cada uno creará una
              suscripción independiente:
            </p>
            <pre className="selectors__code-block">
              {`const Component = () => {
  // Suscripción 1: solo bearCounter
  const bearCounter = useSelectorsStore(state => state.bearCounter)
  
  // Suscripción 2: solo incBear
  const incBear = useSelectorsStore(state => state.incBear)
  
  // Se re-renderiza SOLO cuando bearCounter cambia
  // (las funciones son estables y no causan re-renders)
  return (
    <div>
      <p>Bears: {bearCounter}</p>
      <button onClick={() => incBear(1)}>+1</button>
    </div>
  )
}`}
            </pre>
          </section>

          <section className="selectors__section">
            <h2>Ventajas de los Selectores</h2>
            <ul className="selectors__feature-list">
              <li>
                ✔️ <strong>Rendimiento</strong>: Evita re-renderizados innecesarios
              </li>
              <li>
                ✔️ <strong>Granularidad</strong>: Control fino sobre las suscripciones
              </li>
              <li>
                ✔️ <strong>Claridad</strong>: Código más explícito y mantenible
              </li>
              <li>
                ✔️ <strong>Escalabilidad</strong>: Mejor para stores grandes
              </li>
            </ul>
          </section>

          <section className="selectors__section">
            <h2>Demo: Observa los Re-renders</h2>
            <p>
              En la demo de la derecha, cada contador muestra un número aleatorio que cambia solo
              cuando ese componente específico se re-renderiza. Prueba:
            </p>
            <ol>
              <li>Incrementa el contador del mono 🐵</li>
              <li>Observa que SOLO el número aleatorio del mono 🐵 cambia</li>
              <li>El elefante 🐘 y el oso 🐻 mantienen sus números</li>
              <li>Ahora, incrementa el contador del oso 🐻 o el elefante 🐘</li>
              <li>Observa que el número aleatorio del mono 🐵 TAMBIÉN está cambiando</li>
            </ol>
            <p>
              ✔️ Esto demuestra que cada componente solo se re-renderiza cuando cambia su propio
              contador, gracias a los selectores optimizados.
            </p>
            <pre className="selectors__code-block">
              {`const bearCounter = useSelectorsStore(`}
              <span className="selectors__highlight">{`state => state.bearCounter`}</span>
              {`)`}
            </pre>
            <p>
              ❌ Y sin selectores apropiados, un componente se re-renderizará cada vez que cualquier
              parte del store cambie.
            </p>
            <pre className="selectors__code-block">
              {`const {monkeyCounter} = useSelectorsStore()`}
            </pre>
          </section>
        </div>

        <aside className="selectors__sidebar">
          <section className="selectors__section--sticky">
            <div className="selectors__counters-grid">
              <BearCounter />
              <ElephantCounter />
              <MonkeyCounter />
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
