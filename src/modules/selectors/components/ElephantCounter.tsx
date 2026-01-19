import { useSelectorsStore } from '../store/selectors.store'
import './ElephantCounter.css'

export const ElephantCounter = () => {
  const elephantCounter = useSelectorsStore((state) => state.elephantCounter)
  const incElephant = useSelectorsStore((state) => state.incElephant)
  const randomNumber = Math.floor(Math.random() * 1000)

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
      <div className="elephant-counter__random" key={randomNumber}>
        <div> Random: {randomNumber}</div>
      </div>
    </div>
  )
}
