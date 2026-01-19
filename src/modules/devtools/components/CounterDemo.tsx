import { useDevtoolsStore } from '../store/devtools.store'
import './CounterDemo.css'

export const CounterDemo = () => {
  const { count, increment, decrement } = useDevtoolsStore()

  return (
    <div className="devtools-counter">
      <h3 className="devtools-counter__title">Contador con DevTools</h3>
      <div className="devtools-counter__display">
        <span className="devtools-counter__label">Contador:</span>
        <span className="devtools-counter__value">{count}</span>
      </div>
      <div className="devtools-counter__actions">
        <button className="devtools-counter__button" onClick={increment}>
          Incrementar
        </button>
        <button className="devtools-counter__button" onClick={decrement}>
          Decrementar
        </button>
      </div>
      <p className="devtools-counter__hint">
        👉 Abre Redux DevTools y observa las acciones <code>counter/increment</code> y{' '}
        <code>counter/decrement</code>
      </p>
    </div>
  )
}
