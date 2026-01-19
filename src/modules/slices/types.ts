// User Slice Types
export interface UserSlice {
  user: {
    name: string
    email: string
    role: string
  }
  setName: (name: string) => void
  setEmail: (email: string) => void
  setRole: (role: string) => void
  resetUser: () => void
}

// Cart Slice Types
export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export interface CartSlice {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

// Settings Slice Types
export interface SettingsSlice {
  theme: 'light' | 'dark'
  language: 'es' | 'en'
  notifications: boolean
  toggleTheme: () => void
  setLanguage: (language: 'es' | 'en') => void
  toggleNotifications: () => void
  resetSettings: () => void
}

// Combined Store Type
export type SlicesStore = UserSlice & CartSlice & SettingsSlice
