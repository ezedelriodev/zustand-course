import { useSlicesStore } from '../store/slices.store'
import './SettingsSliceDemo.css'

export const SettingsSliceDemo = () => {
  const {
    theme,
    language,
    notifications,
    toggleTheme,
    setLanguage,
    toggleNotifications,
    resetSettings,
  } = useSlicesStore()

  return (
    <div className="settings-slice-demo">
      <h3 className="settings-slice-demo__title">⚙️ Settings Slice</h3>

      <div className="settings-slice-demo__controls">
        <div className="settings-slice-demo__setting">
          <label>Tema:</label>
          <button onClick={toggleTheme} className="settings-slice-demo__toggle-btn">
            {theme === 'dark' ? '🌙 Oscuro' : '☀️ Claro'}
          </button>
        </div>

        <div className="settings-slice-demo__setting">
          <label>Idioma:</label>
          <div className="settings-slice-demo__language-btns">
            <button
              onClick={() => setLanguage('es')}
              className={`settings-slice-demo__lang-btn ${language === 'es' ? 'active' : ''}`}
            >
              🇪🇸 Español
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`settings-slice-demo__lang-btn ${language === 'en' ? 'active' : ''}`}
            >
              🇺🇸 English
            </button>
          </div>
        </div>

        <div className="settings-slice-demo__setting">
          <label>Notificaciones:</label>
          <button onClick={toggleNotifications} className="settings-slice-demo__toggle-btn">
            {notifications ? '🔔 Activadas' : '🔕 Desactivadas'}
          </button>
        </div>

        <button onClick={resetSettings} className="settings-slice-demo__reset-btn">
          Restablecer ajustes
        </button>
      </div>
    </div>
  )
}
