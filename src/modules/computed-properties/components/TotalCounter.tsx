import { useComputedPropertiesStore } from '../store/computed-properties.store'
import './TotalCounter.css'

export const TotalCounter = () => {
  const total = useComputedPropertiesStore((state) => state.getTotal())

  return (
    <div className="total-counter">
      <div className="total-counter__header">
        <span className="total-counter__icon">🎯</span>
        <h3 className="total-counter__title">Total de Animales</h3>
      </div>
      <div className="total-counter__display">
        <span className="total-counter__value">{total}</span>
      </div>
      <div className="total-counter__info">
        Este valor se calcula usando <code>get()</code> dentro del store
      </div>
    </div>
  )
}
