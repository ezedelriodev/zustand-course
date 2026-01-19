import { useDevtoolsStore } from '../store/devtools.store'
import './UserForm.css'

export const UserForm = () => {
  const { user, setUserName, setUserEmail } = useDevtoolsStore()

  return (
    <div className="devtools-user-form">
      <h3 className="devtools-user-form__title">Formulario de Usuario</h3>
      <div className="devtools-user-form__field">
        <label className="devtools-user-form__label">Nombre:</label>
        <input
          type="text"
          className="devtools-user-form__input"
          value={user.name}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Nombre de usuario"
        />
      </div>
      <div className="devtools-user-form__field">
        <label className="devtools-user-form__label">Email:</label>
        <input
          type="email"
          className="devtools-user-form__input"
          value={user.email}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
        />
      </div>
      <p className="devtools-user-form__hint">
        👉 Cada cambio genera una acción <code>user/setName</code> o <code>user/setEmail</code> con
        los datos del payload
      </p>
    </div>
  )
}
