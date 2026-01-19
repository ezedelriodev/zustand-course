import { useSessionPersistStore } from '../store/persist.store'
import './SessionStorageDemo.css'

export const SessionStorageDemo = () => {
  const userName = useSessionPersistStore((state) => state.userName)
  const sessionCounter = useSessionPersistStore((state) => state.sessionCounter)
  const setUserName = useSessionPersistStore((state) => state.setUserName)
  const incrementSession = useSessionPersistStore((state) => state.incrementSession)
  const resetAll = useSessionPersistStore((state) => state.resetAll)

  return (
    <div className="session-storage-demo">
      <div className="session-storage-demo__header">
        <h3>⏱️ SessionStorage</h3>
        <p className="session-storage-demo__subtitle">
          Persiste solo durante la sesión actual del navegador
        </p>
      </div>

      <div className="session-storage-demo__section">
        <label className="session-storage-demo__label">
          Nombre temporal:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="session-storage-demo__input"
            placeholder="Tu nombre temporal"
          />
        </label>
      </div>

      <div className="session-storage-demo__section">
        <div className="session-storage-demo__counter">
          <span>Contador: {sessionCounter}</span>
          <button
            onClick={incrementSession}
            className="session-storage-demo__button session-storage-demo__button--small"
          >
            +1
          </button>
        </div>
      </div>

      <div className="session-storage-demo__actions">
        <button onClick={resetAll} className="session-storage-demo__button">
          Resetear
        </button>
      </div>

      <div className="session-storage-demo__info">
        💡 Abre esta página en una nueva pestaña: los valores NO se compartirán. Cierra y reabre el
        navegador: los valores se perderán.
      </div>
    </div>
  )
}
