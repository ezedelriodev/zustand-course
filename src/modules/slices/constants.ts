import { UserSlice, SettingsSlice, CartSlice } from './types'

// Initial User State
export const INITIAL_USER_STATE: UserSlice['user'] = {
  name: 'Juan Pérez',
  email: 'juan@example.com',
  role: 'Usuario',
}

// Initial Cart State
export const INITIAL_CART_STATE: CartSlice['items'] = []

// Initial Settings State
export const INITIAL_THEME: SettingsSlice['theme'] = 'dark'
export const INITIAL_LANGUAGE: SettingsSlice['language'] = 'es'
export const INITIAL_NOTIFICATIONS: SettingsSlice['notifications'] = true
