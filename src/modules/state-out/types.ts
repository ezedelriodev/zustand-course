// Counter State
export interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

// Notification State
export interface NotificationState {
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  isVisible: boolean
  show: (message: string, type: 'info' | 'success' | 'warning' | 'error') => void
  hide: () => void
}

// Timer State
export interface TimerState {
  seconds: number
  isRunning: boolean
  start: () => void
  stop: () => void
  resetTimer: () => void
}

// Combined Store Type
export type StateOutStore = CounterState & NotificationState & TimerState
