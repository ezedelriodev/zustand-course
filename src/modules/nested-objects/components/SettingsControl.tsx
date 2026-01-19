import { useNestedObjectsStore } from '../store/nested-objects.store'
import './SettingsControl.css'

export const SettingsControl = () => {
  const settings = useNestedObjectsStore((state) => state.user.settings)
  const updateTheme = useNestedObjectsStore((state) => state.updateTheme)
  const toggleNotifications = useNestedObjectsStore((state) => state.toggleNotifications)

  return (
    <div className="settings-control">
      <h3>⚙️ Configuración del Usuario</h3>
      <div className="settings-control__section">
        <label className="settings-control__label">
          Tema:{' '}
          <select
            value={settings.theme}
            onChange={(e) => updateTheme(e.target.value as 'light' | 'dark')}
            className="settings-control__select"
          >
            <option value="dark">Oscuro</option>
            <option value="light">Claro</option>
          </select>
        </label>

        <label className="settings-control__label settings-control__label--checkbox">
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={toggleNotifications}
            className="settings-control__checkbox"
          />{' '}
          Notificaciones activadas
        </label>
      </div>
      <p className="settings-control__info">
        💡 Observa cómo cambian los contadores al modificar estos valores
      </p>
    </div>
  )
}
