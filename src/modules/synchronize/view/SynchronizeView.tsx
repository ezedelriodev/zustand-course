import { TemperatureSyncDemo } from '../components/TemperatureSyncDemo'
import { CartTotalSyncDemo } from '../components/CartTotalSyncDemo'
import { ThemePrefsSyncDemo } from '../components/ThemePrefsSyncDemo'
import './SynchronizeView.css'

export const SynchronizeView = () => {
  return (
    <div className="synchronize">
      <h1 className="synchronize__title">🔄 Sincronizar Stores</h1>
      <div className="synchronize__layout">
        <div className="synchronize__main-wrapper">
          <section className="synchronize__section">
            <h2>¿Por qué sincronizar stores?</h2>
            <p>
              En aplicaciones complejas, a menudo necesitas que múltiples stores trabajen juntos y
              mantengan sus datos sincronizados. Zustand facilita esto gracias a su acceso directo
              al estado sin necesidad de Context.
            </p>
            <p>Casos comunes donde necesitas sincronización:</p>
            <ul>
              <li>Convertir unidades de medida (temperatura, moneda, distancia)</li>
              <li>Mantener un store de resumen actualizado con datos de otros stores</li>
              <li>Sincronizar preferencias de usuario con el estado de la aplicación</li>
              <li>Reflejar cambios de autenticación en múltiples stores</li>
              <li>Coordinar estado entre diferentes módulos de la app</li>
            </ul>
          </section>

          <section className="synchronize__section">
            <h2>Método 1: Sincronización Bidireccional Directa</h2>
            <p>
              La forma más simple es actualizar un store directamente desde otro usando{' '}
              <code>setState()</code>:
            </p>
            <div className="synchronize__code-block">
              <pre>{`// Store de Celsius
export const useTemperatureStore = create((set) => ({
  celsius: 20,
  setCelsius: (celsius) => {
    set({ celsius })
    // Sincronizar con Fahrenheit
    const fahrenheit = (celsius * 9) / 5 + 32
    useFahrenheitStore.setState({ fahrenheit })
  },
}))

// Store de Fahrenheit
export const useFahrenheitStore = create((set) => ({
  fahrenheit: 68,
  setFahrenheit: (fahrenheit) => {
    set({ fahrenheit })
    // Sincronizar con Celsius
    const celsius = ((fahrenheit - 32) * 5) / 9
    useTemperatureStore.setState({ celsius })
  },
}))`}</pre>
            </div>
            <p>
              <strong>Ventajas:</strong> Simple, directo, fácil de entender
              <br />
              <strong>Desventajas:</strong> Acoplamiento entre stores
            </p>
          </section>

          <section className="synchronize__section">
            <h2>Método 2: Sincronización Unidireccional</h2>
            <p>
              Cuando un store depende de otro pero no al revés, actualiza el store dependiente
              cuando cambia el principal:
            </p>
            <div className="synchronize__code-block">
              <pre>{`// Store principal (Carrito)
export const useCartStore = create((set, get) => ({
  items: 0,
  price: 0,
  addItem: (price) => {
    const newItems = get().items + 1
    const newPrice = get().price + price
    set({ items: newItems, price: newPrice })
    
    // Actualizar store dependiente
    useTotalStore.getState().updateFromCart(newItems, newPrice)
  },
}))

// Store dependiente (Total)
export const useTotalStore = create((set) => ({
  itemCount: 0,
  totalPrice: 0,
  updateFromCart: (items, price) => {
    set({ itemCount: items, totalPrice: price })
  },
}))`}</pre>
            </div>
            <p>
              <strong>Ventajas:</strong> Clara dirección del flujo de datos
              <br />
              <strong>Desventajas:</strong> El store principal necesita conocer al dependiente
            </p>
          </section>

          <section className="synchronize__section">
            <h2>Método 3: Sincronización con subscribe()</h2>
            <p>
              La forma más desacoplada es usar <code>subscribe()</code> para escuchar cambios en un
              store y actualizar otro:
            </p>
            <div className="synchronize__code-block">
              <pre>{`// Store de tema
export const useThemeStore = create((set) => ({
  isDark: true,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}))

// Store de preferencias
export const usePreferencesStore = create((set) => ({
  theme: 'dark',
  fontSize: 16,
  syncTheme: (isDark) => set({ theme: isDark ? 'dark' : 'light' }),
}))

// Configurar sincronización bidireccional
export const setupThemeSync = () => {
  // Theme → Preferences
  const unsubTheme = useThemeStore.subscribe((state) => {
    usePreferencesStore.getState().syncTheme(state.isDark)
  })

  // Preferences → Theme (si fuera necesario)
  const unsubPrefs = usePreferencesStore.subscribe((state) => {
    const isDark = state.theme === 'dark'
    useThemeStore.setState({ isDark })
  })

  // Retornar función para cancelar suscripciones
  return () => {
    unsubTheme()
    unsubPrefs()
  }
}`}</pre>
            </div>
            <p>
              <strong>Ventajas:</strong> Stores totalmente desacoplados, fácil de mantener
              <br />
              <strong>Desventajas:</strong> Requiere gestionar suscripciones
            </p>
          </section>

          <section className="synchronize__section">
            <h2>Usando subscribe() en componentes</h2>
            <p>
              Cuando uses suscripciones, configúralas en useEffect para limpiarlas correctamente:
            </p>
            <div className="synchronize__code-block">
              <pre>{`import { useEffect } from 'react'

function Component() {
  useEffect(() => {
    // Configurar sincronización
    const unsubscribe = setupThemeSync()
    
    // Limpiar al desmontar
    return () => {
      unsubscribe()
    }
  }, [])
  
  // ... resto del componente
}`}</pre>
            </div>
          </section>

          <section className="synchronize__section">
            <h2>Método 4: Store intermedio (Mediator)</h2>
            <p>Para sincronizaciones complejas, considera un store coordinador:</p>
            <div className="synchronize__code-block">
              <pre>{`// Stores independientes
export const useAuthStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
}))

export const useProfileStore = create((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}))

// Store coordinador
export const useAppCoordinator = create((set, get) => ({
  syncAuth: () => {
    const { user } = useAuthStore.getState()
    if (user) {
      // Cargar perfil basado en usuario
      fetchProfile(user.id).then((profile) => {
        useProfileStore.getState().setProfile(profile)
      })
    } else {
      useProfileStore.setState({ profile: null })
    }
  },
}))

// Configurar sincronización
useAuthStore.subscribe((state) => {
  useAppCoordinator.getState().syncAuth()
})`}</pre>
            </div>
          </section>

          <section className="synchronize__section">
            <h2>Evitar loops infinitos</h2>
            <p>Ten cuidado con la sincronización bidireccional para evitar loops infinitos:</p>
            <div className="synchronize__code-block">
              <pre>{`// ❌ MAL: Puede causar loop infinito
useStoreA.subscribe(() => {
  useStoreB.setState({ value: useStoreA.getState().value })
})
useStoreB.subscribe(() => {
  useStoreA.setState({ value: useStoreB.getState().value })
})

// ✅ BIEN: Verificar cambios antes de actualizar
useStoreA.subscribe((state) => {
  const currentB = useStoreB.getState().value
  if (currentB !== state.value) {
    useStoreB.setState({ value: state.value })
  }
})`}</pre>
            </div>
          </section>

          <section className="synchronize__section">
            <h2>Mejores prácticas</h2>
            <ul>
              <li>
                <strong>Elige el método apropiado:</strong> Usa sincronización directa para casos
                simples, subscribe() para casos complejos
              </li>
              <li>
                <strong>Documenta las dependencias:</strong> Indica qué stores dependen de otros
              </li>
              <li>
                <strong>Evita acoplamiento excesivo:</strong> No hagas que todos los stores se
                conozcan entre sí
              </li>
              <li>
                <strong>Limpia las suscripciones:</strong> Siempre cancela con unsubscribe() cuando
                ya no las necesites
              </li>
              <li>
                <strong>Considera la dirección:</strong> Decide si necesitas sincronización
                unidireccional o bidireccional
              </li>
              <li>
                <strong>Valida antes de actualizar:</strong> Verifica que realmente haya cambios
                para evitar renders innecesarios
              </li>
            </ul>
          </section>

          <section className="synchronize__section">
            <h2>Cuándo NO sincronizar</h2>
            <p>
              A veces es mejor combinar stores en uno solo en lugar de mantenerlos sincronizados:
            </p>
            <div className="synchronize__code-block">
              <pre>{`// En lugar de dos stores sincronizados...
const useStoreA = create((set) => ({ a: 1 }))
const useStoreB = create((set) => ({ b: 2 }))

// Considera un solo store con slices
const useCombinedStore = create((set) => ({
  a: 1,
  b: 2,
  setA: (a) => set({ a }),
  setB: (b) => set({ b }),
}))`}</pre>
            </div>
          </section>
        </div>

        <div className="synchronize__sidebar">
          <TemperatureSyncDemo />
          <CartTotalSyncDemo />
          <ThemePrefsSyncDemo />
        </div>
      </div>
    </div>
  )
}
