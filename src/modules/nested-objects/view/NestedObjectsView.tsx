import { ProfileCardWithoutShallow } from '../components/ProfileCardWithoutShallow'
import { ProfileCardWithShallow } from '../components/ProfileCardWithShallow'
import { ProfileEditor } from '../components/ProfileEditor'
import { SettingsControl } from '../components/SettingsControl'
import './NestedObjectsView.css'

export const NestedObjectsView = () => {
  return (
    <div className="nested-objects">
      <h1 className="nested-objects__title">🔗 Objetos anidados y useShallow</h1>
      <div className="nested-objects__layout">
        <div className="nested-objects__main-wrapper">
          <section className="nested-objects__section">
            <p>
              Cuando trabajamos con objetos anidados en Zustand, podemos encontrarnos con
              re-renderizados innecesarios. El hook <code>useShallow</code> de Zustand nos ayuda a
              evitar este problema comparando las propiedades de forma superficial (shallow
              comparison).
            </p>
          </section>

          <section className="nested-objects__section">
            <h2>👇Este es nuestro store</h2>

            <div className="nested-objects__code-block">
              <pre>
                <code>{`export const useNestedObjectsStore = create<NestedObjectsState>((set) => ({
    user: {
      profile: {
        name: 'Roberto Iniesta',
        email: 'roberto@example.com',
      },
      settings: {
        theme: 'dark',
        notifications: true,
      },
    },
    updateName: (name: string) =>
      set((state) => ({
        user: {
          ...state.user,
          profile: { ...state.user.profile, name },
        },
    })),
    ... `}</code>
              </pre>
            </div>
          </section>

          <section className="nested-objects__section">
            <h2>El problema sin useShallow</h2>
            <p>
              Sin <code>useShallow</code>, cuando seleccionas un objeto del store, el componente se
              re-renderiza cada vez que <strong>cualquier</strong> propiedad del objeto cambia,
              incluso si tu componente no usa esa propiedad.
            </p>

            <div className="nested-objects__code-block">
              <pre>
                <code>{`// ❌ Sin useShallow: Se re-renderiza con CUALQUIER cambio
const user = useNestedObjectsStore((state) => state.user)

// El componente se re-renderiza cuando cambia:
// - user.profile.name
// - user.profile.email
// - user.settings.theme ← ¡Incluso si no usamos settings!
// - user.settings.notifications ← ¡Incluso si no usamos settings!`}</code>
              </pre>
            </div>
          </section>

          <section className="nested-objects__section">
            <h2>La solución con useShallow</h2>
            <p>
              Con <code>useShallow</code>, Zustand compara las propiedades del objeto de forma
              superficial. El componente solo se re-renderiza si las propiedades que realmente usas
              han cambiado.
            </p>

            <div className="nested-objects__code-block">
              <pre>
                <code>{`import { useShallow } from 'zustand/react/shallow'

// ✅ Con useShallow: Solo se re-renderiza cuando cambia profile
const profile = useNestedObjectsStore(
  useShallow((state) => state.user.profile)
)

// El componente SOLO se re-renderiza cuando cambia:
// - profile.name
// - profile.email
// NO se re-renderiza cuando cambia settings ✓`}</code>
              </pre>
            </div>
          </section>

          <section className="nested-objects__section">
            <h2>¿Cómo funciona useShallow?</h2>
            <p>
              <code>useShallow</code> realiza una comparación superficial de las propiedades del
              objeto. Zustand utiliza el comparador tripe igual === para comparar el valor de dos
              propiedades y re-rendeizarse si este ha cambiado o a cambiado por referencia.
            </p>

            <div className="nested-objects__code-block">
              <pre>
                <code>{`// Comparación normal (===)
oldUser === newUser // false si cambia cualquier cosa

const obj1 = {name: "John"};
const obj2 = {name: "John"};

obj1 === obj2 //false --> SI re-renderiza

// Comparación con useShallow
useShallow compara: {
  profile.name === profile.name,
  profile.email === profile.email,
}
// Solo re-renderiza si alguna de estas propiedades cambió`}</code>
              </pre>
            </div>
          </section>

          <section className="nested-objects__section">
            <h2>Cuándo usar useShallow</h2>
            <p>
              Usa <code>useShallow</code> cuando:
            </p>
            <ul>
              <li>Seleccionas un objeto o array del store</li>
              <li>Solo usas algunas propiedades del objeto</li>
              <li>Quieres evitar re-renderizados innecesarios</li>
              <li>Trabajas con objetos anidados grandes</li>
            </ul>

            <p>
              NO necesitas <code>useShallow</code> cuando:
            </p>
            <ul>
              <li>Seleccionas valores primitivos (string, number, boolean)</li>
              <li>Seleccionas funciones (actions)</li>
              <li>Ya usas un selector específico que retorna un valor primitivo</li>
            </ul>
          </section>

          <section className="nested-objects__section">
            <h2>Ejemplo práctico</h2>
            <p>
              En la demostración de la derecha, intenta modificar tanto el perfil del usuario como
              su configuración. Observa cómo:
            </p>
            <ul>
              <li>
                El componente <strong>sin useShallow</strong> se re-renderiza con cualquier cambio
              </li>
              <li>
                El componente <strong>con useShallow</strong> solo se re-renderiza cuando cambia el
                perfil
              </li>
            </ul>
            <p>
              Los contadores de re-renders te mostrarán exactamente cuántas veces se ha
              re-renderizado cada componente.
            </p>
          </section>
        </div>

        <div className="nested-objects__sidebar">
          <ProfileEditor />
          <ProfileCardWithoutShallow />
          <ProfileCardWithShallow />
          <SettingsControl />
        </div>
      </div>
    </div>
  )
}
