import { create } from 'zustand'
import {
  TemperatureStoreState,
  FahrenheitStoreState,
  CartStoreState,
  TotalStoreState,
  ThemeStoreState,
  PreferencesStoreState,
} from '../types'
import {
  INITIAL_CELSIUS,
  INITIAL_FAHRENHEIT,
  INITIAL_CART_ITEMS,
  INITIAL_CART_PRICE,
  INITIAL_TOTAL_ITEMS,
  INITIAL_TOTAL_PRICE,
  INITIAL_IS_DARK,
  INITIAL_THEME,
  INITIAL_FONT_SIZE,
} from '../constants'

// ============================================
// Ejemplo 1: Sincronización Bidireccional
// Temperature Celsius ↔ Fahrenheit
// ============================================

export const useTemperatureStore = create<TemperatureStoreState>((set) => ({
  celsius: INITIAL_CELSIUS,
  setCelsius: (celsius) => {
    set({ celsius })
    // Sincronizar con Fahrenheit
    const fahrenheit = (celsius * 9) / 5 + 32
    useFahrenheitStore.setState({ fahrenheit })
  },
}))

export const useFahrenheitStore = create<FahrenheitStoreState>((set) => ({
  fahrenheit: INITIAL_FAHRENHEIT,
  setFahrenheit: (fahrenheit) => {
    set({ fahrenheit })
    // Sincronizar con Celsius
    const celsius = ((fahrenheit - 32) * 5) / 9
    useTemperatureStore.setState({ celsius })
  },
}))

// ============================================
// Ejemplo 2: Sincronización Unidireccional
// Cart → Total (el total se actualiza automáticamente)
// ============================================

export const useCartStore = create<CartStoreState>((set, get) => ({
  items: INITIAL_CART_ITEMS,
  price: INITIAL_CART_PRICE,
  addItem: (price) => {
    const newItems = get().items + 1
    const newPrice = get().price + price
    set({ items: newItems, price: newPrice })
    // Sincronizar con Total Store
    useTotalStore.getState().updateFromCart(newItems, newPrice)
  },
  removeItem: (price) => {
    const newItems = Math.max(0, get().items - 1)
    const newPrice = Math.max(0, get().price - price)
    set({ items: newItems, price: newPrice })
    // Sincronizar con Total Store
    useTotalStore.getState().updateFromCart(newItems, newPrice)
  },
  clearCart: () => {
    set({ items: INITIAL_CART_ITEMS, price: INITIAL_CART_PRICE })
    // Sincronizar con Total Store
    useTotalStore.getState().updateFromCart(INITIAL_CART_ITEMS, INITIAL_CART_PRICE)
  },
}))

export const useTotalStore = create<TotalStoreState>((set) => ({
  itemCount: INITIAL_TOTAL_ITEMS,
  totalPrice: INITIAL_TOTAL_PRICE,
  updateFromCart: (items, price) => {
    set({ itemCount: items, totalPrice: price })
  },
}))

// ============================================
// Ejemplo 3: Sincronización con Subscribe
// Theme ↔ Preferences (usando subscripciones)
// ============================================

export const useThemeStore = create<ThemeStoreState>((set, get) => ({
  isDark: INITIAL_IS_DARK,
  toggleTheme: () => {
    set((state) => ({ isDark: !state.isDark }))
  },
}))

export const usePreferencesStore = create<PreferencesStoreState>((set) => ({
  theme: INITIAL_THEME,
  fontSize: INITIAL_FONT_SIZE,
  syncTheme: (isDark) => {
    set({ theme: isDark ? 'dark' : 'light' })
  },
  setFontSize: (size) => {
    set({ fontSize: size })
  },
}))

// Configurar sincronización bidireccional con subscribe
export const setupThemeSync = () => {
  // Theme → Preferences
  const unsubTheme = useThemeStore.subscribe((state) => {
    usePreferencesStore.getState().syncTheme(state.isDark)
  })

  // Preferences → Theme
  const unsubPrefs = usePreferencesStore.subscribe((state) => {
    const currentTheme = useThemeStore.getState().isDark
    const newTheme = state.theme === 'dark'
    if (currentTheme !== newTheme) {
      useThemeStore.setState({ isDark: newTheme })
    }
  })

  // Retornar función para cancelar suscripciones
  return () => {
    unsubTheme()
    unsubPrefs()
  }
}

// ============================================
// Funciones Helper para Sincronización
// ============================================

// Función para sincronizar estado inicial
export const syncInitialState = () => {
  // Sincronizar temperaturas
  const celsius = useTemperatureStore.getState().celsius
  const fahrenheit = (celsius * 9) / 5 + 32
  useFahrenheitStore.setState({ fahrenheit })

  // Sincronizar carrito y total
  const { items, price } = useCartStore.getState()
  useTotalStore.setState({ itemCount: items, totalPrice: price })

  // Sincronizar tema
  const { isDark } = useThemeStore.getState()
  usePreferencesStore.setState({ theme: isDark ? 'dark' : 'light' })
}

// Función para resetear todos los stores
export const resetAllStores = () => {
  useTemperatureStore.setState({ celsius: INITIAL_CELSIUS })
  useFahrenheitStore.setState({ fahrenheit: INITIAL_FAHRENHEIT })
  useCartStore.setState({ items: INITIAL_CART_ITEMS, price: INITIAL_CART_PRICE })
  useTotalStore.setState({ itemCount: INITIAL_TOTAL_ITEMS, totalPrice: INITIAL_TOTAL_PRICE })
  useThemeStore.setState({ isDark: INITIAL_IS_DARK })
  usePreferencesStore.setState({ theme: INITIAL_THEME, fontSize: INITIAL_FONT_SIZE })
}
