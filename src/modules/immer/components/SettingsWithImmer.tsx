import { useImmerStore } from '../store/immer.store'
import './SettingsWithImmer.css'

export const SettingsWithImmer = () => {
  const { user, updateTheme, toggleNotifications, updateLanguage } = useImmerStore()
  const settings = user.profile.settings

  return (
    <div className="immer-settings">
      <h3 className="immer-settings__title">
        Configuración Anidada <span className="immer-settings__badge">Con Immer</span>
      </h3>

      <div className="immer-settings__field">
        <label className="immer-settings__label">Tema:</label>
        <div className="immer-settings__radio-group">
          <label className="immer-settings__radio-label">
            <input
              type="radio"
              name="theme"
              value="light"
              checked={settings.theme === 'light'}
              onChange={() => updateTheme('light')}
            />
            <span>☀️ Claro</span>
          </label>
          <label className="immer-settings__radio-label">
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={settings.theme === 'dark'}
              onChange={() => updateTheme('dark')}
            />
            <span>🌙 Oscuro</span>
          </label>
        </div>
      </div>

      <div className="immer-settings__field">
        <label className="immer-settings__label">Idioma:</label>
        <select
          className="immer-settings__select"
          value={settings.language}
          onChange={(e) => updateLanguage(e.target.value)}
        >
          <option value="es">🇪🇸 Español</option>
          <option value="en">🇬🇧 English</option>
          <option value="fr">🇫🇷 Français</option>
        </select>
      </div>

      <div className="immer-settings__field">
        <label className="immer-settings__checkbox-label">
          <input type="checkbox" checked={settings.notifications} onChange={toggleNotifications} />
          <span>🔔 Notificaciones activadas</span>
        </label>
      </div>

      <div className="immer-settings__info">
        <p className="immer-settings__info-text">
          👉 Cada cambio modifica <code>user.profile.settings.*</code> directamente con Immer
        </p>
      </div>
    </div>
  )
}
