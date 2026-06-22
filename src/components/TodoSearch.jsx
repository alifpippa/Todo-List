import React from 'react'
import { useTodoStore } from "../store/todoStore"

const TodoSearch = () => {
  const searchQuery = useTodoStore((state) => state.searchQuery)
  const setSearchQuery = useTodoStore((state) => state.setSearchQuery)

  return (
    <input
      type="search"
      placeholder="Search todos..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm transition duration-200 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
    />
  )
}

export default TodoSearch
