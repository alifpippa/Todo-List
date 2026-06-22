import React, { useState } from "react";
import { useTodoStore } from "../store/todoStore";

const TodoFilters = () => {
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);
  const todos = useTodoStore((state) => state.todos);
  const [isOpen, setIsOpen] = useState(false);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.filter((todo) => !todo.completed).length;

  const filterOptions = [
    { value: "all", label: "All todos" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  const currentFilterLabel = filterOptions.find((opt) => opt.value === filter)?.label || "All todos";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
        title={`${activeCount} active · ${completedCount} completed`}
      >
        <span>⚙️</span>
        <span>{currentFilterLabel}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-slate-200 bg-white shadow-lg">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setFilter(option.value);
                setIsOpen(false);
              }}
              className={`block w-full px-4 py-3 text-left text-sm font-medium transition ${
                filter === option.value
                  ? "bg-sky-50 text-sky-700"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-2">
                {filter === option.value && <span>✓</span>}
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoFilters;
