import { useSlicesStore } from '../store/slices.store'
import './UserSliceDemo.css'

export const UserSliceDemo = () => {
  const { user, setName, setEmail, setRole, resetUser } = useSlicesStore()

  return (
    <div className="user-slice-demo">
      <h3 className="user-slice-demo__title">👤 User Slice</h3>
      <div className="user-slice-demo__info">
        <p>
          <strong>Nombre:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Rol:</strong> {user.role}
        </p>
      </div>
      <div className="user-slice-demo__controls">
        <input
          type="text"
          value={user.name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          className="user-slice-demo__input"
        />
        <input
          type="email"
          value={user.email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="user-slice-demo__input"
        />
        <select
          value={user.role}
          onChange={(e) => setRole(e.target.value)}
          className="user-slice-demo__select"
        >
          <option value="Usuario">Usuario</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
        </select>
        <button onClick={resetUser} className="user-slice-demo__button">
          Restablecer
        </button>
      </div>
    </div>
  )
}
