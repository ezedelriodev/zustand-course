export interface UserProfile {
  name: string
  email: string
}

export interface UserSettings {
  theme: 'light' | 'dark'
  notifications: boolean
}

export interface NestedObjectsState {
  user: {
    profile: UserProfile
    settings: UserSettings
  }
  updateName: (name: string) => void
  updateEmail: (email: string) => void
  updateTheme: (theme: 'light' | 'dark') => void
  toggleNotifications: () => void
}
