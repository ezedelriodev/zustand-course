import { useCounterStore } from '../store/counter.store'
import './CounterDemo.css'

export const CounterDemo = () => {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="counter-demo">
      <div className="counter-display">
        <span className="counter-value">{count}</span>
      </div>
      <div className="counter-controls">
        <button className="counter-btn decrement" onClick={decrement}>
          -
        </button>
        <button className="counter-btn reset" onClick={reset}>
          Reset
        </button>
        <button className="counter-btn increment" onClick={increment}>
          +
        </button>
      </div>
    </div>
  )
}
