import React from "react";

const CheckIcon = ({ checked }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {checked ? <path d="M5 13l4 4L19 7" /> : <circle cx="12" cy="12" r="9" />}
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
  </svg>
);

const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </svg>
);

function TodoItem({ todo, index, onToggle, onEdit, onDelete }) {
  return (
    <div className="group flex w-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex items-start gap-4">
         <button
          onClick={onToggle}
          aria-label={todo.completed ? "Mark todo incomplete" : "Mark todo complete"}
          type="button"
          className={`flex h-8 w-8 items-center justify-center rounded-2xl border text-slate-700 transition ${todo.completed ? "border-sky-500 bg-sky-50 text-sky-700" : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50"}`}
        >
          <CheckIcon checked={todo.completed} />
        </button>
        <div className={`mt-1 text-base font-medium ${todo.completed ? "text-slate-400 line-through" : "text-slate-900"}`}>
          {todo.title}
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 transition duration-200 group-hover:opacity-100">
        <button
          onClick={onEdit}
          aria-label="Edit todo"
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-300 bg-white text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          <EditIcon />
        </button>

        <button
          onClick={onDelete}
          aria-label="Delete todo"
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-300 bg-white text-slate-700 transition hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
