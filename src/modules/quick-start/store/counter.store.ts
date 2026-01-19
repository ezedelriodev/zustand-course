import { create } from 'zustand'
import { CounterState } from '../types'
import { INITIAL_COUNT, INCREMENT_VALUE, DECREMENT_VALUE } from '../constants'

export const useCounterStore = create<CounterState>((set) => ({
  count: INITIAL_COUNT,
  increment: () => set((state) => ({ count: state.count + INCREMENT_VALUE })),
  decrement: () => set((state) => ({ count: state.count - DECREMENT_VALUE })),
  reset: () => set({ count: INITIAL_COUNT }),
}))
