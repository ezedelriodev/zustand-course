import { useEffect } from 'react'
import { useStateOutStore } from '../store/state-out.store'
import { startTimerOutside, stopTimerOutside, resetTimerOutside } from '../store/state-out.store'
import './TimerDemo.css'

export const TimerDemo = () => {
  const { seconds, isRunning } = useStateOutStore()

  useEffect(() => {
    return () => {
      // Limpiar al desmontar
      stopTimerOutside()
    }
  }, [])

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="timer-demo">
      <h3 className="timer-demo__title">⏱️ Timer controlado desde fuera</h3>

      <div className="timer-demo__display">
        <span className="timer-demo__time">{formatTime(seconds)}</span>
        <span className="timer-demo__status">{isRunning ? '▶️ Corriendo' : '⏸️ Pausado'}</span>
      </div>

      <div className="timer-demo__controls">
        <button
          onClick={startTimerOutside}
          disabled={isRunning}
          className="timer-demo__button timer-demo__button--start"
        >
          ▶️ Iniciar
        </button>
        <button
          onClick={stopTimerOutside}
          disabled={!isRunning}
          className="timer-demo__button timer-demo__button--stop"
        >
          ⏸️ Pausar
        </button>
        <button
          onClick={resetTimerOutside}
          className="timer-demo__button timer-demo__button--reset"
        >
          🔄 Reiniciar
        </button>
      </div>

      <p className="timer-demo__note">El timer usa setInterval() fuera de React con setState()</p>
    </div>
  )
}
