import { useStateOutStore } from '../store/state-out.store'
import {
  incrementCounterOutside,
  decrementCounterOutside,
  getCounterValue,
} from '../store/state-out.store'
import './CounterOutsideDemo.css'

export const CounterOutsideDemo = () => {
  const count = useStateOutStore((state) => state.count)

  const handleIncrementOutside = () => {
    incrementCounterOutside()
    console.log('Valor después de incrementar:', getCounterValue())
  }

  const handleDecrementOutside = () => {
    decrementCounterOutside()
    console.log('Valor después de decrementar:', getCounterValue())
  }

  const handleGetState = () => {
    const currentValue = getCounterValue()
    alert(`El valor actual del contador es: ${currentValue}`)
  }

  return (
    <div className="counter-outside-demo">
      <h3 className="counter-outside-demo__title">🔢 Counter con getState/setState</h3>
      <div className="counter-outside-demo__display">
        <span className="counter-outside-demo__value">{count}</span>
      </div>
      <div className="counter-outside-demo__controls">
        <button onClick={handleDecrementOutside} className="counter-outside-demo__button">
          - Decrementar (fuera)
        </button>
        <button onClick={handleIncrementOutside} className="counter-outside-demo__button">
          + Incrementar (fuera)
        </button>
        <button onClick={handleGetState} className="counter-outside-demo__button--secondary">
          🔍 Ver valor con getState()
        </button>
      </div>
      <p className="counter-outside-demo__note">
        💡 Abre la consola para ver los valores obtenidos con getState()
      </p>
    </div>
  )
}
