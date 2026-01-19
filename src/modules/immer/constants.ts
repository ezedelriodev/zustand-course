import { User, Task } from './types'

export const INITIAL_USER: User = {
  id: 1,
  name: 'Juan Pérez',
  email: 'juan@ejemplo.com',
  profile: {
    bio: 'Desarrollador frontend apasionado por React',
    avatar: '👨‍💻',
    settings: {
      theme: 'dark',
      notifications: true,
      language: 'es',
    },
  },
}

export const INITIAL_TASKS: Task[] = [
  { id: 1, title: 'Aprender Zustand', completed: true },
  { id: 2, title: 'Probar middleware Immer', completed: false },
]
