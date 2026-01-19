import { useTemperatureStore, useFahrenheitStore } from '../store/synchronize.store'
import './TemperatureSyncDemo.css'

export const TemperatureSyncDemo = () => {
  const { celsius, setCelsius } = useTemperatureStore()
  const { fahrenheit, setFahrenheit } = useFahrenheitStore()

  return (
    <div className="temperature-sync-demo">
      <h3 className="temperature-sync-demo__title">🌡️ Sincronización Bidireccional</h3>
      <p className="temperature-sync-demo__description">
        Los dos stores se sincronizan automáticamente. Cambia cualquiera y el otro se actualiza.
      </p>

      <div className="temperature-sync-demo__controls">
        <div className="temperature-sync-demo__control">
          <label>Celsius</label>
          <div className="temperature-sync-demo__input-group">
            <input
              type="number"
              value={celsius.toFixed(1)}
              onChange={(e) => setCelsius(parseFloat(e.target.value) || 0)}
              className="temperature-sync-demo__input"
            />
            <span className="temperature-sync-demo__unit">°C</span>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            step="0.1"
            value={celsius}
            onChange={(e) => setCelsius(parseFloat(e.target.value))}
            className="temperature-sync-demo__slider"
          />
        </div>

        <div className="temperature-sync-demo__arrow">⇄</div>

        <div className="temperature-sync-demo__control">
          <label>Fahrenheit</label>
          <div className="temperature-sync-demo__input-group">
            <input
              type="number"
              value={fahrenheit.toFixed(1)}
              onChange={(e) => setFahrenheit(parseFloat(e.target.value) || 0)}
              className="temperature-sync-demo__input"
            />
            <span className="temperature-sync-demo__unit">°F</span>
          </div>
          <input
            type="range"
            min="-58"
            max="122"
            step="0.1"
            value={fahrenheit}
            onChange={(e) => setFahrenheit(parseFloat(e.target.value))}
            className="temperature-sync-demo__slider"
          />
        </div>
      </div>
    </div>
  )
}
