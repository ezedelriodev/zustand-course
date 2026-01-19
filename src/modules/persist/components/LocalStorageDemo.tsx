import { usePersistStore } from '../store/persist.store'
import './LocalStorageDemo.css'

export const LocalStorageDemo = () => {
  const userName = usePersistStore((state) => state.userName)
  const theme = usePersistStore((state) => state.theme)
  const preferences = usePersistStore((state) => state.preferences)
  const sessionCounter = usePersistStore((state) => state.sessionCounter)
  const setUserName = usePersistStore((state) => state.setUserName)
  const setTheme = usePersistStore((state) => state.setTheme)
  const toggleNotifications = usePersistStore((state) => state.toggleNotifications)
  const setLanguage = usePersistStore((state) => state.setLanguage)
  const incrementSession = usePersistStore((state) => state.incrementSession)
  const resetAll = usePersistStore((state) => state.resetAll)

  return (
    <div className="local-storage-demo">
      <div className="local-storage-demo__header">
        <h3>💾 LocalStorage (con partialize)</h3>
        <p className="local-storage-demo__subtitle">
          Los cambios persisten entre recargas de página
        </p>
      </div>

      <div className="local-storage-demo__section">
        <label className="local-storage-demo__label">
          Nombre de usuario:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="local-storage-demo__input"
            placeholder="Tu nombre"
          />
        </label>
        <span className="local-storage-demo__badge local-storage-demo__badge--persisted">
          ✓ Persistido
        </span>
      </div>

      <div className="local-storage-demo__section">
        <label className="local-storage-demo__label">
          Tema:
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            className="local-storage-demo__select"
          >
            <option value="dark">Oscuro</option>
            <option value="light">Claro</option>
          </select>
        </label>
        <span className="local-storage-demo__badge local-storage-demo__badge--persisted">
          ✓ Persistido
        </span>
      </div>

      <div className="local-storage-demo__section">
        <label className="local-storage-demo__label local-storage-demo__label--checkbox">
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={toggleNotifications}
            className="local-storage-demo__checkbox"
          />
          Notificaciones
        </label>
        <span className="local-storage-demo__badge local-storage-demo__badge--persisted">
          ✓ Persistido
        </span>
      </div>

      <div className="local-storage-demo__section">
        <label className="local-storage-demo__label">
          Idioma:
          <select
            value={preferences.language}
            onChange={(e) => setLanguage(e.target.value)}
            className="local-storage-demo__select"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </label>
        <span className="local-storage-demo__badge local-storage-demo__badge--persisted">
          ✓ Persistido
        </span>
      </div>

      <div className="local-storage-demo__section local-storage-demo__section--highlight">
        <div className="local-storage-demo__counter">
          <span>Contador de sesión: {sessionCounter}</span>
          <button
            onClick={incrementSession}
            className="local-storage-demo__button local-storage-demo__button--small"
          >
            +1
          </button>
        </div>
        <span className="local-storage-demo__badge local-storage-demo__badge--not-persisted">
          ✗ NO Persistido
        </span>
      </div>

      <div className="local-storage-demo__actions">
        <button onClick={resetAll} className="local-storage-demo__button">
          Resetear Todo
        </button>
      </div>

      <div className="local-storage-demo__info">
        💡 Recarga la página para ver que los valores persistidos se mantienen, pero el contador de
        sesión se resetea.
      </div>
    </div>
  )
}
