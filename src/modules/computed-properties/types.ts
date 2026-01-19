export interface ComputedPropertiesState {
  bearCounter: number
  elephantCounter: number
  monkeyCounter: number
  incBear: (by: number) => void
  incElephant: (by: number) => void
  incMonkey: (by: number) => void
  getTotal: () => number
}
