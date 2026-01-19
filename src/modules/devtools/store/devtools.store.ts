import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { DevtoolsState } from '../types'
import { INITIAL_COUNT, INITIAL_USER_NAME, INITIAL_USER_EMAIL, INITIAL_TODOS } from '../constants'

export const useDevtoolsStore = create<DevtoolsState>()(
  devtools(
    (set) => ({
      count: INITIAL_COUNT,
      user: {
        name: INITIAL_USER_NAME,
        email: INITIAL_USER_EMAIL,
      },
      todos: INITIAL_TODOS,

      increment: () => set((state) => ({ count: state.count + 1 }), false, 'counter/increment'),
      decrement: () => set((state) => ({ count: state.count - 1 }), false, 'counter/decrement'),
      setUserName: (name: string) =>
        set((state) => ({ user: { ...state.user, name } }), false, { type: 'user/setName', name }),
      setUserEmail: (email: string) =>
        set((state) => ({ user: { ...state.user, email } }), false, {
          type: 'user/setEmail',
          email,
        }),
      addTodo: (todo: string) =>
        set((state) => ({ todos: [...state.todos, todo] }), false, { type: 'todos/add', todo }),
      removeTodo: (index: number) =>
        set((state) => ({ todos: state.todos.filter((_, i) => i !== index) }), false, {
          type: 'todos/remove',
          index,
        }),
      reset: () =>
        set(
          {
            count: INITIAL_COUNT,
            user: { name: INITIAL_USER_NAME, email: INITIAL_USER_EMAIL },
            todos: INITIAL_TODOS,
          },
          false,
          'RESET_ALL'
        ),
    }),
    { name: 'DevTools_Demo_Store' }
  )
)
