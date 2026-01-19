// Basic Counter Store - Sin StateCreator
export interface BasicCounterStore {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

// User Store - Con StateCreator y Persist
export interface UserStore {
  name: string
  email: string
  age: number
  setName: (name: string) => void
  setEmail: (email: string) => void
  setAge: (age: number) => void
  clearUser: () => void
}

// Settings Store - Con StateCreator y múltiples middlewares
export interface SettingsStore {
  theme: 'light' | 'dark'
  language: string
  notificationsEnabled: boolean
  toggleTheme: () => void
  setLanguage: (language: string) => void
  toggleNotifications: () => void
  resetSettings: () => void
}
