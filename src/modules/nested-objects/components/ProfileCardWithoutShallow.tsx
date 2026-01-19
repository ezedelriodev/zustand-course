import { useRef } from 'react'
import { useNestedObjectsStore } from '../store/nested-objects.store'
import './ProfileCardWithoutShallow.css'

export const ProfileCardWithoutShallow = () => {
  const renderCount = useRef(0)
  renderCount.current++

  // ❌ SIN useShallow: Este componente se re-renderiza cada vez que
  // CUALQUIER parte del estado cambia, incluso si solo necesitamos profile
  const user = useNestedObjectsStore((state) => state.user)

  return (
    <div className="profile-card">
      <div className="profile-card__header">
        <h3>❌ Sin useShallow</h3>
        <span className="profile-card__badge profile-card__badge--danger" key={renderCount.current}>
          Re-renders: {renderCount.current}
        </span>
      </div>
      <div className="profile-card__content">
        <div className="profile-card__field">
          <strong>Nombre:</strong> {user.profile.name}
        </div>
        <div className="profile-card__field">
          <strong>Email:</strong> {user.profile.email}
        </div>
      </div>
      <p className="profile-card__warning">⚠️ Se re-renderiza incluso cuando cambias settings</p>
    </div>
  )
}
