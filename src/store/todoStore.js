import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],

      // search query for filtering todos
      searchQuery: "",
      filter: "all",

      setSearchQuery: (q) => set(() => ({ searchQuery: q })),
      setFilter: (filter) => set(() => ({ filter })),

      setTodos: (todos) => set(() => ({ todos })),

      addTodo: (todo) =>
        set((state) => ({
          todos: [...state.todos, todo],
        })),

      updateTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updates } : todo
          ),
        })),

      toggleTodoCompletion: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    {
      name: "todo-storage",
    }
  )
);