import { useSidebarStore } from '../../store/sidebar.store'
import './Header.css'

export const Header = () => {
  const toggle = useSidebarStore((state) => state.toggle)

  return (
    <header className="header">
      <button className="menu-button" onClick={toggle} aria-label="Toggle menu">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <div className="header-title">
        <h1>Curso Zustand</h1>
        <img src="/zustand.ico" alt="Zustand" className="header-logo" />
      </div>
    </header>
  )
}
