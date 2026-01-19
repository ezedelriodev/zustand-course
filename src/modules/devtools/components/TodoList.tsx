import { useState } from 'react'
import { useDevtoolsStore } from '../store/devtools.store'
import './TodoList.css'

export const TodoList = () => {
  const { todos, addTodo, removeTodo, reset } = useDevtoolsStore()
  const [inputValue, setInputValue] = useState('')

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      addTodo(inputValue)
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <div className="devtools-todo-list">
      <h3 className="devtools-todo-list__title">Lista de Tareas</h3>
      <div className="devtools-todo-list__input-group">
        <input
          type="text"
          className="devtools-todo-list__input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe una tarea..."
        />
        <button className="devtools-todo-list__add-button" onClick={handleAddTodo}>
          Agregar
        </button>
      </div>
      <ul className="devtools-todo-list__items">
        {todos.length === 0 ? (
          <li className="devtools-todo-list__empty">No hay tareas</li>
        ) : (
          todos.map((todo, index) => (
            <li key={index} className="devtools-todo-list__item">
              <span className="devtools-todo-list__item-text">{todo}</span>
              <button
                className="devtools-todo-list__remove-button"
                onClick={() => removeTodo(index)}
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>
      <button className="devtools-todo-list__reset-button" onClick={reset}>
        Reiniciar Todo
      </button>
      <p className="devtools-todo-list__hint">
        👉 Las acciones <code>todos/add</code> y <code>todos/remove</code> incluyen el payload
        completo
      </p>
    </div>
  )
}
