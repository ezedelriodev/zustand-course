import { create, StateCreator } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { BasicCounterStore, UserStore, SettingsStore } from '../types'
import {
  INITIAL_COUNT,
  INITIAL_USER_NAME,
  INITIAL_USER_EMAIL,
  INITIAL_USER_AGE,
  INITIAL_THEME,
  INITIAL_LANGUAGE,
  INITIAL_NOTIFICATIONS_ENABLED,
} from '../constants'

// ============================================
// 1. Store Básico SIN StateCreator (forma tradicional)
// ============================================
export const useBasicCounterStore = create<BasicCounterStore>((set) => ({
  count: INITIAL_COUNT,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: INITIAL_COUNT }),
}))

// ============================================
// 2. Store CON StateCreator + Persist
// ============================================
// Definimos el StateCreator con los tipos correctos para persist
const userStoreCreator: StateCreator<
  UserStore,
  [['zustand/persist', unknown]], // Middlewares que se van a usar
  [],
  UserStore
> = (set) => ({
  name: INITIAL_USER_NAME,
  email: INITIAL_USER_EMAIL,
  age: INITIAL_USER_AGE,
  setName: (name: string) => set({ name }),
  setEmail: (email: string) => set({ email }),
  setAge: (age: number) => set({ age }),
  clearUser: () =>
    set({
      name: INITIAL_USER_NAME,
      email: INITIAL_USER_EMAIL,
      age: INITIAL_USER_AGE,
    }),
})

export const useUserStore = create<UserStore>()(
  persist(userStoreCreator, {
    name: 'user-storage',
  })
)

// ============================================
// 3. Store CON StateCreator + múltiples middlewares (Persist + DevTools)
// ============================================
// Definimos el StateCreator con tipos para AMBOS middlewares
const settingsStoreCreator: StateCreator<
  SettingsStore,
  [['zustand/devtools', never], ['zustand/persist', unknown]], // Orden: devtools, persist
  [],
  SettingsStore
> = (set) => ({
  theme: INITIAL_THEME,
  language: INITIAL_LANGUAGE,
  notificationsEnabled: INITIAL_NOTIFICATIONS_ENABLED,
  toggleTheme: () =>
    set(
      (state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }),
      false,
      'settings/toggleTheme'
    ),
  setLanguage: (language: string) => set({ language }, false, 'settings/setLanguage'),
  toggleNotifications: () =>
    set(
      (state) => ({ notificationsEnabled: !state.notificationsEnabled }),
      false,
      'settings/toggleNotifications'
    ),
  resetSettings: () =>
    set(
      {
        theme: INITIAL_THEME,
        language: INITIAL_LANGUAGE,
        notificationsEnabled: INITIAL_NOTIFICATIONS_ENABLED,
      },
      false,
      'settings/reset'
    ),
})

// IMPORTANTE: El orden de los middlewares importa
// Se aplican de DENTRO hacia FUERA: persist() envuelve el store, luego devtools() envuelve persist()
export const useSettingsStore = create<SettingsStore>()(
  devtools(
    persist(settingsStoreCreator, {
      name: 'settings-storage',
    }),
    { name: 'Settings_Store' }
  )
)

// ============================================
// 4. Ejemplo con StateCreator pero SIN middlewares
//    (para demostrar que StateCreator se puede usar solo para mejor tipado)
// ============================================
const typedCounterCreator: StateCreator<BasicCounterStore, [], [], BasicCounterStore> = (set) => ({
  count: INITIAL_COUNT,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: INITIAL_COUNT }),
})

export const useTypedCounterStore = create<BasicCounterStore>()(typedCounterCreator)
