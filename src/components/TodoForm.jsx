import React, { useState } from 'react'
import { useTodoStore } from "../store/todoStore"
import Modal from "./ui/Modal"
import Input from "./ui/Input"
import Button from "./ui/Button"

const TodoForm = () => {
  const [title, setTitle] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!title.trim()) return

    addTodo({
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
    })

    setTitle("")
    setIsModalOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        <span>➕</span>
        <span>Add Todo</span>
      </button>

      <Modal
        open={isModalOpen}
        title="Add a new todo"
        description="Create a new todo and add it to your list."
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="todo-title"
            label="Todo title"
            placeholder="Enter todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} type="button">
              Cancel
            </Button>
            <Button type="submit">
              Add Todo
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default TodoForm
