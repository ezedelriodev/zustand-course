import { useBasicCounterStore } from '../store/state-creator.store'
import './BasicCounter.css'

export const BasicCounter = () => {
  const { count, increment, decrement, reset } = useBasicCounterStore()

  return (
    <div className="basic-counter">
      <h3 className="basic-counter__title">📦 Store Básico (sin StateCreator)</h3>
      <div className="basic-counter__display">{count}</div>
      <div className="basic-counter__controls">
        <button onClick={decrement} className="basic-counter__button">
          -
        </button>
        <button onClick={increment} className="basic-counter__button">
          +
        </button>
        <button onClick={reset} className="basic-counter__button basic-counter__button--reset">
          🔄 Reset
        </button>
      </div>
    </div>
  )
}
