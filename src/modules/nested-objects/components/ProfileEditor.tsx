import { useNestedObjectsStore } from '../store/nested-objects.store'
import './ProfileEditor.css'

export const ProfileEditor = () => {
  const profile = useNestedObjectsStore((state) => state.user.profile)
  const updateName = useNestedObjectsStore((state) => state.updateName)
  const updateEmail = useNestedObjectsStore((state) => state.updateEmail)

  return (
    <div className="profile-editor">
      <div className="profile-editor__section">
        <label className="profile-editor__label">
          Nombre:{' '}
          <input
            type="text"
            value={profile.name}
            onChange={(e) => updateName(e.target.value)}
            className="profile-editor__input"
          />
        </label>

        <label className="profile-editor__label">
          Email:{' '}
          <input
            type="email"
            value={profile.email}
            onChange={(e) => updateEmail(e.target.value)}
            className="profile-editor__input"
          />
        </label>
      </div>
    </div>
  )
}
