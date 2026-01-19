import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { ImmerState, WithoutImmerState } from '../types'
import { INITIAL_USER, INITIAL_TASKS } from '../constants'

// Store CON middleware Immer
export const useImmerStore = create<ImmerState>()(
  immer((set) => ({
    user: INITIAL_USER,
    tasks: INITIAL_TASKS,

    // Con Immer: mutación directa del draft
    updateUserName: (name: string) =>
      set((state) => {
        state.user.name = name
      }),

    updateUserEmail: (email: string) =>
      set((state) => {
        state.user.email = email
      }),

    updateUserBio: (bio: string) =>
      set((state) => {
        state.user.profile.bio = bio
      }),

    updateTheme: (theme: 'light' | 'dark') =>
      set((state) => {
        state.user.profile.settings.theme = theme
      }),

    toggleNotifications: () =>
      set((state) => {
        state.user.profile.settings.notifications = !state.user.profile.settings.notifications
      }),

    updateLanguage: (language: string) =>
      set((state) => {
        state.user.profile.settings.language = language
      }),

    addTask: (title: string) =>
      set((state) => {
        const newId = state.tasks.length > 0 ? Math.max(...state.tasks.map((t) => t.id)) + 1 : 1
        state.tasks.push({ id: newId, title, completed: false })
      }),

    toggleTask: (id: number) =>
      set((state) => {
        const task = state.tasks.find((t) => t.id === id)
        if (task) {
          task.completed = !task.completed
        }
      }),

    removeTask: (id: number) =>
      set((state) => {
        const index = state.tasks.findIndex((t) => t.id === id)
        if (index !== -1) {
          state.tasks.splice(index, 1)
        }
      }),

    resetAll: () =>
      set((state) => {
        state.user = INITIAL_USER
        state.tasks = INITIAL_TASKS
      }),
  }))
)

// Store SIN middleware Immer (para comparación)
export const useWithoutImmerStore = create<WithoutImmerState>((set) => ({
  user: INITIAL_USER,
  tasks: INITIAL_TASKS,

  // Sin Immer: spread operators complicados
  updateUserName: (name: string) =>
    set((state) => ({
      user: {
        ...state.user,
        name,
      },
    })),

  updateUserEmail: (email: string) =>
    set((state) => ({
      user: {
        ...state.user,
        email,
      },
    })),

  updateUserBio: (bio: string) =>
    set((state) => ({
      user: {
        ...state.user,
        profile: {
          ...state.user.profile,
          bio,
        },
      },
    })),

  updateTheme: (theme: 'light' | 'dark') =>
    set((state) => ({
      user: {
        ...state.user,
        profile: {
          ...state.user.profile,
          settings: {
            ...state.user.profile.settings,
            theme,
          },
        },
      },
    })),

  toggleNotifications: () =>
    set((state) => ({
      user: {
        ...state.user,
        profile: {
          ...state.user.profile,
          settings: {
            ...state.user.profile.settings,
            notifications: !state.user.profile.settings.notifications,
          },
        },
      },
    })),

  updateLanguage: (language: string) =>
    set((state) => ({
      user: {
        ...state.user,
        profile: {
          ...state.user.profile,
          settings: {
            ...state.user.profile.settings,
            language,
          },
        },
      },
    })),

  addTask: (title: string) =>
    set((state) => {
      const newId = state.tasks.length > 0 ? Math.max(...state.tasks.map((t) => t.id)) + 1 : 1
      return {
        tasks: [...state.tasks, { id: newId, title, completed: false }],
      }
    }),

  toggleTask: (id: number) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),

  removeTask: (id: number) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  resetAll: () =>
    set({
      user: INITIAL_USER,
      tasks: INITIAL_TASKS,
    }),
}))
