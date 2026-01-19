import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { PersistState } from '../types'
import {
  INITIAL_USER_NAME,
  INITIAL_THEME,
  INITIAL_NOTIFICATIONS,
  INITIAL_LANGUAGE,
  INITIAL_SESSION_COUNTER,
} from '../constants'

export const usePersistStore = create<PersistState>()(
  persist(
    (set) => ({
      userName: INITIAL_USER_NAME,
      theme: INITIAL_THEME,
      preferences: {
        notifications: INITIAL_NOTIFICATIONS,
        language: INITIAL_LANGUAGE,
      },
      sessionCounter: INITIAL_SESSION_COUNTER,

      setUserName: (name: string) => set({ userName: name }),
      setTheme: (theme: 'light' | 'dark') => set({ theme }),
      toggleNotifications: () =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            notifications: !state.preferences.notifications,
          },
        })),
      setLanguage: (language: string) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            language,
          },
        })),
      incrementSession: () => set((state) => ({ sessionCounter: state.sessionCounter + 1 })),
      resetAll: () =>
        set({
          userName: INITIAL_USER_NAME,
          theme: INITIAL_THEME,
          preferences: {
            notifications: INITIAL_NOTIFICATIONS,
            language: INITIAL_LANGUAGE,
          },
          sessionCounter: INITIAL_SESSION_COUNTER,
        }),
    }),
    {
      name: 'user-preferences-storage',
      // Solo persiste userName, theme y preferences (NO sessionCounter)
      partialize: (state) => ({
        userName: state.userName,
        theme: state.theme,
        preferences: state.preferences,
      }),
    }
  )
)

// Store con sessionStorage
export const useSessionPersistStore = create<PersistState>()(
  persist(
    (set) => ({
      userName: INITIAL_USER_NAME,
      theme: INITIAL_THEME,
      preferences: {
        notifications: INITIAL_NOTIFICATIONS,
        language: INITIAL_LANGUAGE,
      },
      sessionCounter: INITIAL_SESSION_COUNTER,

      setUserName: (name: string) => set({ userName: name }),
      setTheme: (theme: 'light' | 'dark') => set({ theme }),
      toggleNotifications: () =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            notifications: !state.preferences.notifications,
          },
        })),
      setLanguage: (language: string) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            language,
          },
        })),
      incrementSession: () => set((state) => ({ sessionCounter: state.sessionCounter + 1 })),
      resetAll: () =>
        set({
          userName: INITIAL_USER_NAME,
          theme: INITIAL_THEME,
          preferences: {
            notifications: INITIAL_NOTIFICATIONS,
            language: INITIAL_LANGUAGE,
          },
          sessionCounter: INITIAL_SESSION_COUNTER,
        }),
    }),
    {
      name: 'session-preferences-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
