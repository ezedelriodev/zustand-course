export interface PersistState {
  // Valores que se persisten
  userName: string
  theme: 'light' | 'dark'
  preferences: {
    notifications: boolean
    language: string
  }
  // Valor temporal que NO se persiste
  sessionCounter: number

  // Actions
  setUserName: (name: string) => void
  setTheme: (theme: 'light' | 'dark') => void
  toggleNotifications: () => void
  setLanguage: (language: string) => void
  incrementSession: () => void
  resetAll: () => void
}
