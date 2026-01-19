import { CounterDemo } from '../components/CounterDemo'
import './QuickStartView.css'

export const QuickStartView = () => {
  return (
    <div className="quick-start">
      <h1 className="quick-start__title">🚀 Quick Start - Zustand Básico</h1>
      <div className="quick-start__layout">
        <div className="quick-start__main-wrapper">
          <section className="quick-start__section">
            <h2>¿Qué es Zustand?</h2>
            <p>
              Zustand es una librería de gestión de estado minimalista y rápida para React. A
              diferencia de Redux o Context API, Zustand es extremadamente simple y no requiere
              providers, reducers complejos ni boilerplate.
            </p>
          </section>

          <section className="quick-start__section">
            <h2>Instalación</h2>
            <pre className="quick-start__code-block">
              {`npm install zustand
# o
yarn add zustand
# o
pnpm add zustand`}
            </pre>
          </section>

          <section className="quick-start__section">
            <h2>Crear un Store</h2>
            <p>
              Un store en Zustand es creado con la función <code>create()</code>. El store contiene
              tanto el estado como las acciones para modificarlo:
            </p>
            <pre className="quick-start__code-block">
              {`import { create } from 'zustand'

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))`}
            </pre>
          </section>

          <section className="quick-start__section">
            <h2>Usar el Store en Componentes</h2>
            <p>Simplemente importa y usa el hook del store. No necesitas providers ni context:</p>
            <pre className="quick-start__code-block">
              {`import { useCounterStore } from './store/counter.store'

export const CounterDemo = () => {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}`}
            </pre>
          </section>

          <section className="quick-start__section">
            <h2>La Función set()</h2>
            <p>
              La función <code>set()</code> es la forma de actualizar el estado. Puede recibir un
              objeto con los valores a actualizar, o una función que recibe el estado actual:
            </p>
            <pre className="quick-start__code-block">
              {`// Forma 1: Objeto directo (merge con el estado actual)
set({ count: 10 })

// Forma 2: Función con acceso al estado anterior
set((state) => ({ count: state.count + 1 }))

// Forma 3: Actualización múltiple
set((state) => ({ 
  count: state.count + 1,
  lastUpdated: Date.now()
}))`}
            </pre>
          </section>

          <section className="quick-start__section">
            <h2>Características Principales</h2>
            <ul className="quick-start__feature-list">
              <li>
                ✔️ <strong>Sin Providers</strong>: No necesitas envolver tu app en providers
              </li>
              <li>
                ✔️ <strong>TypeScript</strong>: Soporte completo y tipado automático
              </li>
              <li>
                ✔️ <strong>Mínimo Boilerplate</strong>: Código simple y directo
              </li>
              <li>
                ✔️ <strong>Rendimiento</strong>: Solo re-renderiza componentes que usan el estado
              </li>
              <li>
                ✔️ <strong>DevTools</strong>: Compatible con Redux DevTools
              </li>
              <li>
                ✔️ <strong>Middleware</strong>: Persist, Immer, DevTools y más
              </li>
            </ul>
          </section>

          <section className="quick-start__section">
            <h2>Prueba el Demo</h2>
            <p>
              En el panel de la derecha puedes interactuar con un contador simple que usa Zustand.
              Los tres botones modifican el mismo estado compartido.
            </p>
          </section>
        </div>

        <div className="quick-start__sidebar">
          <div className="quick-start__section--sticky">
            <h2>Demo Interactivo</h2>
            <CounterDemo />
          </div>
        </div>
      </div>
    </div>
  )
}
