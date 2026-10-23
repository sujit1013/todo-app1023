'use client'
import { useEffect, useState } from 'react'
import { addTodo, countRemaining, deleteTodo, toggleTodo } from '@/lib/todos'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

const STORAGE_KEY = 'todos'

function loadTodos() {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : []
}

export default function TodoApp() {
  const [todos, setTodos] = useState(loadTodos)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  function handleAdd(text) {
    setTodos(addTodo(todos, text))
  }

  function handleToggle(id) {
    setTodos(toggleTodo(todos, id))
  }

  function handleDelete(id) {
    setTodos(deleteTodo(todos, id))
  }

  function clearAll() {
    if (!window.confirm('すべての TODO を削除しますか？')) return
    setTodos([])
  }

  const remaining = countRemaining(todos)

  return (
    <div>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
      <p>残り {remaining} 件</p>
      <button onClick={clearAll} disabled={todos.length === 0}>
        すべて削除
      </button>
    </div>
  )
}
