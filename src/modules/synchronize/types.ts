// Temperature Store (Celsius)
export interface TemperatureStoreState {
  celsius: number
  setCelsius: (celsius: number) => void
}

// Temperature Store (Fahrenheit)
export interface FahrenheitStoreState {
  fahrenheit: number
  setFahrenheit: (fahrenheit: number) => void
}

// Cart Store
export interface CartStoreState {
  items: number
  price: number
  addItem: (price: number) => void
  removeItem: (price: number) => void
  clearCart: () => void
}

// Total Store (sincronizado con Cart)
export interface TotalStoreState {
  itemCount: number
  totalPrice: number
  updateFromCart: (items: number, price: number) => void
}

// Theme Store
export interface ThemeStoreState {
  isDark: boolean
  toggleTheme: () => void
}

// Preferences Store (sincronizado con Theme)
export interface PreferencesStoreState {
  theme: 'light' | 'dark'
  fontSize: number
  syncTheme: (isDark: boolean) => void
  setFontSize: (size: number) => void
}
