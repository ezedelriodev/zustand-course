import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { QuickStartView } from './modules/quick-start'
import { SelectorsView } from './modules/selectors'
import { ComputedPropertiesView } from './modules/computed-properties'
import { NestedObjectsView } from './modules/nested-objects'
import { DevtoolsView } from './modules/devtools'
import { ImmerView } from './modules/immer'
import { PersistView } from './modules/persist'
import { SlicesView } from './modules/slices'
import { StateOutView } from './modules/state-out'
import { SynchronizeView } from './modules/synchronize'
import { StateCreatorView } from './modules/state-creator'

export default function App() {
  return (
    <BrowserRouter basename="/zustand-course">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/quick-start" replace />} />
          <Route path="quick-start" element={<QuickStartView />} />
          <Route path="selectors" element={<SelectorsView />} />
          <Route path="computed-properties" element={<ComputedPropertiesView />} />
          <Route path="nested-objects" element={<NestedObjectsView />} />
          <Route path="devtools" element={<DevtoolsView />} />
          <Route path="immer" element={<ImmerView />} />
          <Route path="persist" element={<PersistView />} />
          <Route path="slices" element={<SlicesView />} />
          <Route path="state-out" element={<StateOutView />} />
          <Route path="synchronize" element={<SynchronizeView />} />
          <Route path="state-creator" element={<StateCreatorView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
