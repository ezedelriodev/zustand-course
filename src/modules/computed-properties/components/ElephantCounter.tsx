import { useComputedPropertiesStore } from '../store/computed-properties.store'
import './ElephantCounter.css'

export const ElephantCounter = () => {
  const elephantCounter = useComputedPropertiesStore((state) => state.elephantCounter)
  const incElephant = useComputedPropertiesStore((state) => state.incElephant)

  return (
    <div className="elephant-counter">
      <div className="elephant-counter__header">
        <span className="elephant-counter__icon">🐘</span>
        <h3 className="elephant-counter__title">Elephant Counter</h3>
      </div>
      <div className="elephant-counter__display">
        <span className="elephant-counter__value">{elephantCounter}</span>
      </div>
      <button className="elephant-counter__button" onClick={() => incElephant(1)}>
        Incrementar
      </button>
    </div>
  )
}
