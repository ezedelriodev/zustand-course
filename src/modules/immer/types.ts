export interface User {
  id: number
  name: string
  email: string
  profile: {
    bio: string
    avatar: string
    settings: {
      theme: 'light' | 'dark'
      notifications: boolean
      language: string
    }
  }
}

export interface Task {
  id: number
  title: string
  completed: boolean
}

export interface ImmerState {
  user: User
  tasks: Task[]
  updateUserName: (name: string) => void
  updateUserEmail: (email: string) => void
  updateUserBio: (bio: string) => void
  updateTheme: (theme: 'light' | 'dark') => void
  toggleNotifications: () => void
  updateLanguage: (language: string) => void
  addTask: (title: string) => void
  toggleTask: (id: number) => void
  removeTask: (id: number) => void
  resetAll: () => void
}

export interface WithoutImmerState {
  user: User
  tasks: Task[]
  updateUserName: (name: string) => void
  updateUserEmail: (email: string) => void
  updateUserBio: (bio: string) => void
  updateTheme: (theme: 'light' | 'dark') => void
  toggleNotifications: () => void
  updateLanguage: (language: string) => void
  addTask: (title: string) => void
  toggleTask: (id: number) => void
  removeTask: (id: number) => void
  resetAll: () => void
}
