import { CounterOutsideDemo } from '../components/CounterOutsideDemo'
import { NotificationDemo } from '../components/NotificationDemo'
import { TimerDemo } from '../components/TimerDemo'
import './StateOutView.css'

export const StateOutView = () => {
  return (
    <div className="state-out">
      <h1 className="state-out__title">🌐 Estado fuera de React</h1>
      <div className="state-out__layout">
        <div className="state-out__main-wrapper">
          <section className="state-out__section">
            <h2>Accediendo al estado fuera de componentes React</h2>
            <p>
              Una de las ventajas de Zustand es que puedes acceder y modificar el estado desde
              cualquier lugar de tu aplicación JavaScript, no solo desde componentes de React. Esto
              es útil para:
            </p>
            <ul>
              <li>Servicios y funciones utility</li>
              <li>Event listeners del navegador</li>
              <li>WebSocket handlers</li>
              <li>Timers e intervalos</li>
              <li>Middleware y plugins</li>
            </ul>
          </section>

          <section className="state-out__section">
            <h2>getState() - Leer el estado actual</h2>
            <p>
              El método <code>getState()</code> te permite obtener el estado actual del store en
              cualquier momento:
            </p>
            <div className="state-out__code-block">
              <pre>{`import { useCounterStore } from './store'

// Crear una función que obtiene el valor actual
export const getCounterValue = () => {
  return useCounterStore.getState().count
}

// Usar en cualquier lugar
const currentValue = getCounterValue()
console.log('Contador:', currentValue)`}</pre>
            </div>
            <p>
              <code>getState()</code> retorna una instantánea del estado actual. No se suscribe a
              cambios, simplemente lee el valor en ese momento.
            </p>
          </section>

          <section className="state-out__section">
            <h2>setState() - Modificar el estado</h2>
            <p>
              El método <code>setState()</code> permite actualizar el estado desde fuera de React:
            </p>
            <div className="state-out__code-block">
              <pre>{`// Función que modifica el estado
export const incrementCounterOutside = () => {
  const currentCount = useCounterStore.getState().count
  useCounterStore.setState({ count: currentCount + 1 })
}

// Uso con función callback
export const doubleCounter = () => {
  useCounterStore.setState((state) => ({ 
    count: state.count * 2 
  }))
}

// Llamar desde cualquier lugar
incrementCounterOutside()
doubleCounter()`}</pre>
            </div>
            <p>
              <code>setState()</code> acepta un objeto parcial o una función que recibe el estado
              actual. Los cambios se propagan automáticamente a todos los componentes suscritos.
            </p>
          </section>

          <section className="state-out__section">
            <h2>Ejemplo: Sistema de notificaciones</h2>
            <p>Un caso común es crear un sistema de notificaciones accesible globalmente:</p>
            <div className="state-out__code-block">
              <pre>{`// store/notification.store.ts
export const useNotificationStore = create((set) => ({
  message: '',
  type: 'info',
  isVisible: false,
  show: (message, type) => 
    set({ message, type, isVisible: true }),
  hide: () => 
    set({ isVisible: false }),
}))

// Función helper para usar desde fuera
export const showNotification = (message, type = 'info') => {
  useNotificationStore.setState({
    message,
    type,
    isVisible: true,
  })
  
  // Auto-ocultar después de 3 segundos
  setTimeout(() => {
    useNotificationStore.setState({ isVisible: false })
  }, 3000)
}

// Usar desde cualquier lugar
showNotification('¡Datos guardados!', 'success')`}</pre>
            </div>
          </section>

          <section className="state-out__section">
            <h2>Timers e Intervalos</h2>
            <p>Puedes controlar el estado desde timers fuera de React:</p>
            <div className="state-out__code-block">
              <pre>{`let timerInterval = null

export const startTimerOutside = () => {
  useTimerStore.setState({ isRunning: true })
  
  timerInterval = setInterval(() => {
    const { seconds, isRunning } = useTimerStore.getState()
    if (isRunning) {
      useTimerStore.setState({ seconds: seconds + 1 })
    }
  }, 1000)
}

export const stopTimerOutside = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  useTimerStore.setState({ isRunning: false })
}`}</pre>
            </div>
          </section>

          <section className="state-out__section">
            <h2>subscribe() - Suscribirse a cambios</h2>
            <p>Puedes suscribirte manualmente a cambios del estado desde JavaScript vanilla:</p>
            <div className="state-out__code-block">
              <pre>{`// Suscribirse a todo el store
const unsubscribe = useCounterStore.subscribe((state) => {
  console.log('Estado cambió:', state)
})

// Suscribirse a una parte específica del estado
const unsubscribeCounter = useCounterStore.subscribe(
  (state) => state.count,  // Selector
  (count) => {             // Callback
    console.log('Contador cambió:', count)
  }
)

// Cancelar suscripción cuando sea necesario
unsubscribe()
unsubscribeCounter()`}</pre>
            </div>
          </section>

          <section className="state-out__section">
            <h2>Event Listeners</h2>
            <p>Ejemplo de uso con event listeners del navegador:</p>
            <div className="state-out__code-block">
              <pre>{`// Actualizar estado con teclado
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    const current = useCounterStore.getState().count
    useCounterStore.setState({ count: current + 1 })
  }
  if (e.key === 'ArrowDown') {
    const current = useCounterStore.getState().count
    useCounterStore.setState({ count: current - 1 })
  }
})

// Guardar estado antes de cerrar ventana
window.addEventListener('beforeunload', () => {
  const state = useCounterStore.getState()
  localStorage.setItem('appState', JSON.stringify(state))
})`}</pre>
            </div>
          </section>

          <section className="state-out__section">
            <h2>Casos de uso comunes</h2>
            <ul>
              <li>
                <strong>API Services:</strong> Actualizar el estado después de llamadas HTTP
              </li>
              <li>
                <strong>WebSocket handlers:</strong> Sincronizar datos en tiempo real
              </li>
              <li>
                <strong>Analytics:</strong> Registrar eventos basados en cambios de estado
              </li>
              <li>
                <strong>Middleware:</strong> Interceptar y modificar acciones
              </li>
              <li>
                <strong>Background tasks:</strong> Actualizar el estado desde workers
              </li>
              <li>
                <strong>Testing:</strong> Manipular el estado en tests sin renderizar componentes
              </li>
            </ul>
          </section>

          <section className="state-out__section">
            <h2>Mejores prácticas</h2>
            <ul>
              <li>
                Usa <code>getState()</code> para lecturas puntuales, no para reactivity
              </li>
              <li>
                Prefiere funciones callback en <code>setState()</code> cuando dependas del estado
                anterior
              </li>
              <li>
                Cancela suscripciones con <code>unsubscribe()</code> cuando ya no las necesites
              </li>
              <li>Crea funciones helper para encapsular lógica de acceso al estado</li>
              <li>
                Evita llamar <code>setState()</code> en loops rápidos para prevenir renders
                excesivos
              </li>
              <li>Documenta las funciones que modifican el estado desde fuera de React</li>
            </ul>
          </section>

          <section className="state-out__section">
            <h2>Diferencias con React hooks</h2>
            <div className="state-out__code-block">
              <pre>{`// ❌ En componentes React usa hooks
function Component() {
  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)
  // Se re-renderiza automáticamente cuando cambia
}

// ✅ Fuera de React usa getState/setState
function utilityFunction() {
  const count = useCounterStore.getState().count
  useCounterStore.setState({ count: count + 1 })
  // No causa re-renders, solo actualiza el estado
}`}</pre>
            </div>
          </section>
        </div>

        <div className="state-out__sidebar">
          <CounterOutsideDemo />
          <NotificationDemo />
          <TimerDemo />
        </div>
      </div>
    </div>
  )
}
