import { useStateOutStore } from '../store/state-out.store'
import { showNotification } from '../store/state-out.store'
import './NotificationDemo.css'

export const NotificationDemo = () => {
  const { message, type, isVisible, hide } = useStateOutStore()

  const handleShowInfo = () => {
    showNotification('Esta es una notificación informativa', 'info')
  }

  const handleShowSuccess = () => {
    showNotification('¡Operación completada con éxito!', 'success')
  }

  const handleShowWarning = () => {
    showNotification('Advertencia: Revisa los datos ingresados', 'warning')
  }

  const handleShowError = () => {
    showNotification('Error: No se pudo completar la operación', 'error')
  }

  return (
    <div className="notification-demo">
      <h3 className="notification-demo__title">🔔 Notificaciones fuera de React</h3>

      {isVisible && (
        <div className={`notification-demo__toast notification-demo__toast--${type}`}>
          <span>{message}</span>
          <button onClick={hide} className="notification-demo__close">
            ✕
          </button>
        </div>
      )}

      <div className="notification-demo__controls">
        <button onClick={handleShowInfo} className="notification-demo__button--info">
          ℹ️ Info
        </button>
        <button onClick={handleShowSuccess} className="notification-demo__button--success">
          ✓ Success
        </button>
        <button onClick={handleShowWarning} className="notification-demo__button--warning">
          ⚠️ Warning
        </button>
        <button onClick={handleShowError} className="notification-demo__button--error">
          ✕ Error
        </button>
      </div>

      <p className="notification-demo__note">
        Las notificaciones se muestran usando setState() desde fuera de React
      </p>
    </div>
  )
}
