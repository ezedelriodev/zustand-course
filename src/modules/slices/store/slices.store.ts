import { create, StateCreator } from 'zustand'
import { UserSlice, CartSlice, SettingsSlice, SlicesStore } from '../types'
import {
  INITIAL_USER_STATE,
  INITIAL_CART_STATE,
  INITIAL_THEME,
  INITIAL_LANGUAGE,
  INITIAL_NOTIFICATIONS,
} from '../constants'

// User Slice Creator
const createUserSlice: StateCreator<SlicesStore, [], [], UserSlice> = (set) => ({
  user: INITIAL_USER_STATE,
  setName: (name) =>
    set((state) => ({
      user: { ...state.user, name },
    })),
  setEmail: (email) =>
    set((state) => ({
      user: { ...state.user, email },
    })),
  setRole: (role) =>
    set((state) => ({
      user: { ...state.user, role },
    })),
  resetUser: () =>
    set({
      user: INITIAL_USER_STATE,
    }),
})

// Cart Slice Creator
const createCartSlice: StateCreator<SlicesStore, [], [], CartSlice> = (set, get) => ({
  items: INITIAL_CART_STATE,
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id)
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
      }
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    })),
  clearCart: () =>
    set({
      items: INITIAL_CART_STATE,
    }),
  getTotalPrice: () => {
    const state = get()
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  },
  getTotalItems: () => {
    const state = get()
    return state.items.reduce((total, item) => total + item.quantity, 0)
  },
})

// Settings Slice Creator
const createSettingsSlice: StateCreator<SlicesStore, [], [], SettingsSlice> = (set) => ({
  theme: INITIAL_THEME,
  language: INITIAL_LANGUAGE,
  notifications: INITIAL_NOTIFICATIONS,
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
  setLanguage: (language) =>
    set({
      language,
    }),
  toggleNotifications: () =>
    set((state) => ({
      notifications: !state.notifications,
    })),
  resetSettings: () =>
    set({
      theme: INITIAL_THEME,
      language: INITIAL_LANGUAGE,
      notifications: INITIAL_NOTIFICATIONS,
    }),
})

// Combined Store using Slices Pattern
export const useSlicesStore = create<SlicesStore>()((...a) => ({
  ...createUserSlice(...a),
  ...createCartSlice(...a),
  ...createSettingsSlice(...a),
}))
