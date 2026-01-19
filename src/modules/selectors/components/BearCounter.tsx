import { useSelectorsStore } from '../store/selectors.store'
import './BearCounter.css'

export const BearCounter = () => {
  const bearCounter = useSelectorsStore((state) => state.bearCounter)
  const incBear = useSelectorsStore((state) => state.incBear)
  const randomNumber = Math.floor(Math.random() * 1000)

  return (
    <div className="bear-counter">
      <div className="bear-counter__header">
        <span className="bear-counter__icon">🐻</span>
        <h3 className="bear-counter__title">Bear Counter</h3>
      </div>
      <div className="bear-counter__display">
        <span className="bear-counter__value">{bearCounter}</span>
      </div>
      <button className="bear-counter__button" onClick={() => incBear(1)}>
        Incrementar
      </button>
      <div className="bear-counter__random" key={randomNumber}>
        <div>Random: {randomNumber}</div>
      </div>
    </div>
  )
}
