import { useImmerStore } from '../store/immer.store'
import './UserProfileWithImmer.css'

export const UserProfileWithImmer = () => {
  const { user, updateUserName, updateUserEmail, updateUserBio } = useImmerStore()

  return (
    <div className="immer-user-profile">
      <h3 className="immer-user-profile__title">
        Con Immer <span className="immer-user-profile__badge">✓ Simple</span>
      </h3>

      <div className="immer-user-profile__field">
        <label className="immer-user-profile__label">Nombre:</label>
        <input
          type="text"
          className="immer-user-profile__input"
          value={user.name}
          onChange={(e) => updateUserName(e.target.value)}
          placeholder="Nombre completo"
        />
      </div>

      <div className="immer-user-profile__field">
        <label className="immer-user-profile__label">Email:</label>
        <input
          type="email"
          className="immer-user-profile__input"
          value={user.email}
          onChange={(e) => updateUserEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div className="immer-user-profile__field">
        <label className="immer-user-profile__label">Bio:</label>
        <textarea
          className="immer-user-profile__textarea"
          value={user.profile.bio}
          onChange={(e) => updateUserBio(e.target.value)}
          placeholder="Cuéntanos sobre ti..."
          rows={3}
        />
      </div>

      <div className="immer-user-profile__preview">
        <p className="immer-user-profile__preview-label">Vista previa:</p>
        <div className="immer-user-profile__preview-card">
          <div className="immer-user-profile__avatar">{user.profile.avatar}</div>
          <div>
            <p className="immer-user-profile__preview-name">{user.name}</p>
            <p className="immer-user-profile__preview-email">{user.email}</p>
            <p className="immer-user-profile__preview-bio">{user.profile.bio}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
