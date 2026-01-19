import { useSelectorsStore } from '../store/selectors.store'
import './MonkeyCounter.css'

export const MonkeyCounter = () => {
  const { monkeyCounter, incMonkey } = useSelectorsStore()
  const randomNumber = Math.floor(Math.random() * 1000)

  return (
    <div className="monkey-counter">
      <div className="monkey-counter__header">
        <span className="monkey-counter__icon">🐵</span>
        <h3 className="monkey-counter__title">Monkey Counter</h3>
      </div>
      <div className="monkey-counter__display">
        <span className="monkey-counter__value">{monkeyCounter}</span>
      </div>
      <button className="monkey-counter__button" onClick={() => incMonkey(1)}>
        Incrementar
      </button>
      <div className="monkey-counter__random" key={randomNumber}>
        <div> Random: {randomNumber}</div>
      </div>
    </div>
  )
}
