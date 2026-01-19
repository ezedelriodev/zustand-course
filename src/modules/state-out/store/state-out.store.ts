import { create } from 'zustand'
import { StateOutStore } from '../types'
import {
  INITIAL_COUNT,
  INITIAL_NOTIFICATION_MESSAGE,
  INITIAL_NOTIFICATION_TYPE,
  INITIAL_NOTIFICATION_VISIBLE,
  INITIAL_TIMER_SECONDS,
  INITIAL_TIMER_RUNNING,
} from '../constants'

export const useStateOutStore = create<StateOutStore>((set) => ({
  // Counter State
  count: INITIAL_COUNT,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: INITIAL_COUNT }),

  // Notification State
  message: INITIAL_NOTIFICATION_MESSAGE,
  type: INITIAL_NOTIFICATION_TYPE,
  isVisible: INITIAL_NOTIFICATION_VISIBLE,
  show: (message, type) => set({ message, type, isVisible: true }),
  hide: () => set({ isVisible: INITIAL_NOTIFICATION_VISIBLE }),

  // Timer State
  seconds: INITIAL_TIMER_SECONDS,
  isRunning: INITIAL_TIMER_RUNNING,
  start: () => set({ isRunning: true }),
  stop: () => set({ isRunning: false }),
  resetTimer: () => set({ seconds: INITIAL_TIMER_SECONDS, isRunning: false }),
}))

// ============================================
// Funciones para acceder al estado fuera de React
// ============================================

// Obtener el estado actual
export const getCounterValue = () => {
  return useStateOutStore.getState().count
}

// Modificar el estado directamente
export const incrementCounterOutside = () => {
  const currentCount = useStateOutStore.getState().count
  useStateOutStore.setState({ count: currentCount + 1 })
}

export const decrementCounterOutside = () => {
  const currentCount = useStateOutStore.getState().count
  useStateOutStore.setState({ count: currentCount - 1 })
}

// Función para mostrar notificaciones desde fuera de React
export const showNotification = (
  message: string,
  type: 'info' | 'success' | 'warning' | 'error' = 'info'
) => {
  useStateOutStore.setState({
    message,
    type,
    isVisible: true,
  })

  // Auto-ocultar después de 3 segundos
  setTimeout(() => {
    useStateOutStore.setState({ isVisible: false })
  }, 3000)
}

// Timer interval que se ejecuta fuera de React
let timerInterval: number | null = null

export const startTimerOutside = () => {
  if (timerInterval) return

  useStateOutStore.setState({ isRunning: true })

  timerInterval = window.setInterval(() => {
    const { seconds, isRunning } = useStateOutStore.getState()
    if (isRunning) {
      useStateOutStore.setState({ seconds: seconds + 1 })
    }
  }, 1000)
}

export const stopTimerOutside = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  useStateOutStore.setState({ isRunning: false })
}

export const resetTimerOutside = () => {
  stopTimerOutside()
  useStateOutStore.setState({ seconds: INITIAL_TIMER_SECONDS })
}

// Suscribirse a cambios específicos del estado
export const subscribeToCounter = (callback: (count: number) => void) => {
  return useStateOutStore.subscribe(
    (state) => {callback(state.count)},
    
  )
}

// Ejemplo de función utility que usa el estado
export const logCurrentState = () => {
  const state = useStateOutStore.getState()
  console.log('Estado actual:', {
    count: state.count,
    notification: {
      message: state.message,
      type: state.type,
      isVisible: state.isVisible,
    },
    timer: {
      seconds: state.seconds,
      isRunning: state.isRunning,
    },
  })
}
