import { create } from 'zustand'
import { ComputedPropertiesState } from '../types'
import { INITIAL_BEAR_COUNT, INITIAL_ELEPHANT_COUNT, INITIAL_MONKEY_COUNT } from '../constants'

export const useComputedPropertiesStore = create<ComputedPropertiesState>()((set, get) => ({
  bearCounter: INITIAL_BEAR_COUNT,
  elephantCounter: INITIAL_ELEPHANT_COUNT,
  monkeyCounter: INITIAL_MONKEY_COUNT,
  incBear: (by: number) => set((state) => ({ bearCounter: state.bearCounter + by })),
  incElephant: (by: number) => set((state) => ({ elephantCounter: state.elephantCounter + by })),
  incMonkey: (by: number) => set((state) => ({ monkeyCounter: state.monkeyCounter + by })),
  getTotal() {
    return get().bearCounter + get().elephantCounter + get().monkeyCounter
  },
}))
