import { useUserStore } from '../store/state-creator.store'
import './UserForm.css'

export const UserForm = () => {
  const { name, email, age, setName, setEmail, setAge, clearUser } = useUserStore()

  return (
    <div className="user-form">
      <h3 className="user-form__title">
        👤 User Store con Persist
        <span className="user-form__badge">StateCreator + Persist</span>
      </h3>

      <div className="user-form__group">
        <label className="user-form__label">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="user-form__input"
          placeholder="Ingresa tu nombre"
        />
      </div>

      <div className="user-form__group">
        <label className="user-form__label">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="user-form__input"
          placeholder="tu@email.com"
        />
      </div>

      <div className="user-form__group">
        <label className="user-form__label">Edad:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="user-form__input"
          placeholder="0"
        />
      </div>

      <div className="user-form__display">
        <div className="user-form__display-title">✅ Datos guardados en localStorage:</div>
        <div className="user-form__display-value">
          {name} ({email}) - {age} años
        </div>
      </div>

      <button onClick={clearUser} className="user-form__button">
        🗑️ Limpiar datos
      </button>
    </div>
  )
}
