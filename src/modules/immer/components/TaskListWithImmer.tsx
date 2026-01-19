import { useState } from 'react'
import { useImmerStore } from '../store/immer.store'
import './TaskListWithImmer.css'

export const TaskListWithImmer = () => {
  const { tasks, addTask, toggleTask, removeTask } = useImmerStore()
  const [inputValue, setInputValue] = useState('')

  const handleAddTask = () => {
    if (inputValue.trim()) {
      addTask(inputValue)
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask()
    }
  }

  return (
    <div className="immer-task-list">
      <h3 className="immer-task-list__title">
        Lista de Tareas <span className="immer-task-list__badge">Arrays con Immer</span>
      </h3>

      <div className="immer-task-list__input-group">
        <input
          type="text"
          className="immer-task-list__input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nueva tarea..."
        />
        <button className="immer-task-list__add-button" onClick={handleAddTask}>
          Agregar
        </button>
      </div>

      <ul className="immer-task-list__items">
        {tasks.length === 0 ? (
          <li className="immer-task-list__empty">No hay tareas</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="immer-task-list__item">
              <label className="immer-task-list__checkbox-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className={task.completed ? 'immer-task-list__item-text--completed' : ''}>
                  {task.title}
                </span>
              </label>
              <button
                className="immer-task-list__remove-button"
                onClick={() => removeTask(task.id)}
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="immer-task-list__info">
        <p className="immer-task-list__info-text">
          👉 Con Immer: <code>state.tasks.push()</code> y <code>state.tasks.splice()</code>{' '}
          funcionan directamente
        </p>
      </div>
    </div>
  )
}
