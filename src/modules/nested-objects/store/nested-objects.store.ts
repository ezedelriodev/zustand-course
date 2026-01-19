import { create } from 'zustand'
import { NestedObjectsState } from '../types'
import { INITIAL_PROFILE, INITIAL_SETTINGS } from '../constants'

export const useNestedObjectsStore = create<NestedObjectsState>((set) => ({
  user: {
    profile: INITIAL_PROFILE,
    settings: INITIAL_SETTINGS,
  },
  updateName: (name: string) =>
    set((state) => ({
      user: {
        ...state.user,
        profile: { ...state.user.profile, name },
      },
    })),
  updateEmail: (email: string) =>
    set((state) => ({
      user: {
        ...state.user,
        profile: { ...state.user.profile, email },
      },
    })),
  updateTheme: (theme: 'light' | 'dark') =>
    set((state) => ({
      user: {
        ...state.user,
        settings: { ...state.user.settings, theme },
      },
    })),
  toggleNotifications: () =>
    set((state) => ({
      user: {
        ...state.user,
        settings: {
          ...state.user.settings,
          notifications: !state.user.settings.notifications,
        },
      },
    })),
  updateLanguage: (language: string) =>
    set((state) => ({
      user: {
        ...state.user,
        settings: { ...state.user.settings, language },
      },
    })),
}))
