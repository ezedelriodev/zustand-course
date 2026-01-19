export interface DevtoolsState {
  count: number
  user: {
    name: string
    email: string
  }
  todos: string[]
  increment: () => void
  decrement: () => void
  setUserName: (name: string) => void
  setUserEmail: (email: string) => void
  addTodo: (todo: string) => void
  removeTodo: (index: number) => void
  reset: () => void
}
