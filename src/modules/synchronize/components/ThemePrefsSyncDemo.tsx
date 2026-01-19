import { useEffect } from 'react'
import { useThemeStore, usePreferencesStore, setupThemeSync } from '../store/synchronize.store'
import './ThemePrefsSyncDemo.css'

export const ThemePrefsSyncDemo = () => {
  const { isDark, toggleTheme } = useThemeStore()
  const { theme, fontSize, setFontSize } = usePreferencesStore()

  useEffect(() => {
    // Configurar sincronización cuando el componente se monta
    const unsubscribe = setupThemeSync()
    return () => {
      // Limpiar suscripciones cuando el componente se desmonta
      unsubscribe()
    }
  }, [])

  return (
    <div className="theme-prefs-sync-demo">
      <h3 className="theme-prefs-sync-demo__title">🎨 Sincronización con Subscribe</h3>
      <p className="theme-prefs-sync-demo__description">
        Ambos stores se sincronizan usando subscribe(). Los cambios se propagan automáticamente.
      </p>

      <div className="theme-prefs-sync-demo__section">
        <h4>💡 Theme Store</h4>
        <div className="theme-prefs-sync-demo__control">
          <span className="theme-prefs-sync-demo__label">Estado:</span>
          <span className={`theme-prefs-sync-demo__badge ${isDark ? 'dark' : 'light'}`}>
            {isDark ? '🌙 Dark' : '☀️ Light'}
          </span>
        </div>
        <button onClick={toggleTheme} className="theme-prefs-sync-demo__button">
          Cambiar tema
        </button>
      </div>

      <div className="theme-prefs-sync-demo__arrow">⇄</div>

      <div className="theme-prefs-sync-demo__section">
        <h4>⚙️ Preferences Store</h4>
        <div className="theme-prefs-sync-demo__control">
          <span className="theme-prefs-sync-demo__label">Theme:</span>
          <span className={`theme-prefs-sync-demo__badge ${theme}`}>{theme}</span>
        </div>
        <div className="theme-prefs-sync-demo__control">
          <span className="theme-prefs-sync-demo__label">Font Size:</span>
          <span className="theme-prefs-sync-demo__value">{fontSize}px</span>
        </div>
        <input
          type="range"
          min="12"
          max="24"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="theme-prefs-sync-demo__slider"
        />
      </div>
    </div>
  )
}
