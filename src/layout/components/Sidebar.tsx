import { NavLink } from 'react-router-dom'
import { useSidebarStore } from '../../store/sidebar.store'
import './Sidebar.css'

export const Sidebar = () => {
  const { isOpen, close } = useSidebarStore()

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={close} />}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <nav className="sidebar-nav">
          <NavLink
            to="/quick-start"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={close}
          >
            <span className="sidebar-icon">🚀</span>
            <span>Primeros pasos</span>
          </NavLink>
          <NavLink
            to="/selectors"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={close}
          >
            <span className="sidebar-icon">🎯</span>
            <span>Selectores</span>
          </NavLink>
          <NavLink
            to="/nested-objects"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={close}
          >
            <span className="sidebar-icon">🔗</span>
            <span>Objetos anidados y useShallow</span>
          </NavLink>
          <NavLink
            to="/computed-properties"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={close}
          >
            <span className="sidebar-icon">🧠</span>
            <span>Propiedades calculadas</span>
          </NavLink>
          <NavLink
            to="/persist"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={close}
          >
            <span className="sidebar-icon">💾</span>
            <span>Persistencia</span>
          </NavLink>
          <NavLink
            to="/devtools"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={close}
          >
            <span className="sidebar-icon">🛠️</span>
            <span>DevTools</span>
          </NavLink>
          <NavLink
            to="/immer"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={close}
          >
            <span className="sidebar-icon">🪆</span>
            <span>Immer</span>
          </NavLink>
          <NavLink
            to="/slices"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={close}
          >
            <span className="sidebar-icon">🍕</span>
            <span>Zustand Slices</span>
          </NavLink>
          <NavLink
            to="/state-out"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={close}
          >
            <span className="sidebar-icon">🌐</span>
            <span>Estado fuera de React</span>
          </NavLink>
          <NavLink
            to="/synchronize"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={close}
          >
            <span className="sidebar-icon">🔄</span>
            <span>Sincronizar stores</span>
          </NavLink>
          <NavLink
            to="/state-creator"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={close}
          >
            <span className="sidebar-icon">🏭️</span>
            <span>StateCreator</span>
          </NavLink>
        </nav>
      </aside>
    </>
  )
}
