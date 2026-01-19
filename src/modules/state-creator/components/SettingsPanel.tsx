import { useSettingsStore } from '../store/state-creator.store'
import './SettingsPanel.css'

export const SettingsPanel = () => {
  const { theme, language, notificationsEnabled, toggleTheme, setLanguage, toggleNotifications, resetSettings } =
    useSettingsStore()

  return (
    <div className="settings-panel">
      <h3 className="settings-panel__title">⚙️ Settings Store</h3>
      <div className="settings-panel__badges">
        <span className="settings-panel__badge">StateCreator</span>
        <span className="settings-panel__badge">Persist</span>
        <span className="settings-panel__badge">DevTools</span>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <div className="settings-panel__setting">
          <div className="settings-panel__setting-header">
            <span className="settings-panel__setting-label">🎨 Tema:</span>
            <span className="settings-panel__setting-value">{theme === 'light' ? '☀️ Claro' : '🌙 Oscuro'}</span>
          </div>
          <button onClick={toggleTheme} className="settings-panel__button">
            Cambiar tema
          </button>
        </div>

        <div className="settings-panel__setting">
          <div className="settings-panel__setting-header">
            <span className="settings-panel__setting-label">🌍 Idioma:</span>
            <span className="settings-panel__setting-value">{language}</span>
          </div>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="settings-panel__select">
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <div className="settings-panel__setting">
          <div className="settings-panel__setting-header">
            <span className="settings-panel__setting-label">🔔 Notificaciones:</span>
            <span className="settings-panel__setting-value">
              {notificationsEnabled ? '✅ Activadas' : '❌ Desactivadas'}
            </span>
          </div>
          <button onClick={toggleNotifications} className="settings-panel__button">
            {notificationsEnabled ? 'Desactivar' : 'Activar'} notificaciones
          </button>
        </div>

        <button onClick={resetSettings} className="settings-panel__button settings-panel__button--secondary">
          🔄 Restablecer configuración
        </button>

        <div className="settings-panel__note">
          💡 Abre Redux DevTools para ver las acciones. Los cambios persisten en localStorage.
        </div>
      </div>
    </div>
  )
}
