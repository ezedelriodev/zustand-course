import { useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useNestedObjectsStore } from '../store/nested-objects.store'
import './ProfileCardWithShallow.css'

export const ProfileCardWithShallow = () => {
  const renderCount = useRef(0)
  renderCount.current++

  // ✅ CON useShallow: Este componente SOLO se re-renderiza cuando
  // cambia profile, ignorando cambios en settings
  const profile = useNestedObjectsStore(useShallow((state) => state.user.profile))

  return (
    <div className="profile-card">
      <div className="profile-card__header">
        <h3>✅ Con useShallow</h3>
        <span
          className="profile-card__badge profile-card__badge--success"
          key={renderCount.current}
        >
          Re-renders: {renderCount.current}
        </span>
      </div>
      <div className="profile-card__content">
        <div className="profile-card__field">
          <strong>Nombre:</strong> {profile.name}
        </div>
        <div className="profile-card__field">
          <strong>Email:</strong> {profile.email}
        </div>
      </div>
      <p className="profile-card__success">
        ✓ Este componente NO se re-renderiza cuando cambias settings
      </p>
    </div>
  )
}
