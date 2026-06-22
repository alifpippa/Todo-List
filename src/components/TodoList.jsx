import React, { useMemo, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTodoStore } from "../store/todoStore";
import EmptyState from "./EmptyState";
import TodoItem from "./TodoItem";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import Button from "./ui/Button";

function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const searchQuery = useTodoStore((state) => state.searchQuery);
  const filter = useTodoStore((state) => state.filter);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const setTodos = useTodoStore((state) => state.setTodos);
  const toggleTodoCompletion = useTodoStore((state) => state.toggleTodoCompletion);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [pendingDeleteTodo, setPendingDeleteTodo] = useState(null);

  const filteredTodos = useMemo(() => {
    const q = searchQuery?.toLowerCase() || "";
    return todos.filter((todo) => {
      const matchesSearch = todo.title.toLowerCase().includes(q);
      if (!matchesSearch) return false;
      if (filter === "completed") return todo.completed;
      if (filter === "active") return !todo.completed;
      return true;
    });
  }, [todos, searchQuery, filter]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    const sourceId = filteredTodos[source.index]?.id;
    const destinationId = filteredTodos[destination.index]?.id;
    if (!sourceId || !destinationId) return;

    const sourceFullIndex = todos.findIndex((todo) => todo.id === sourceId);
    const destinationFullIndex = todos.findIndex((todo) => todo.id === destinationId);
    if (sourceFullIndex === -1 || destinationFullIndex === -1) return;

    const nextTodos = Array.from(todos);
    const [movedTodo] = nextTodos.splice(sourceFullIndex, 1);
    nextTodos.splice(destinationFullIndex, 0, movedTodo);
    setTodos(nextTodos);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setEditTitle(todo.title);
  };

  const closeEditModal = () => {
    setEditingTodo(null);
    setEditTitle("");
  };

  const handleSave = () => {
    if (!editingTodo || !editTitle.trim()) return;
    updateTodo(editingTodo.id, { title: editTitle.trim() });
    closeEditModal();
  };

  const openDeleteModal = (todo) => {
    setPendingDeleteTodo(todo);
  };

  const closeDeleteModal = () => {
    setPendingDeleteTodo(null);
  };

  const confirmDelete = () => {
    if (!pendingDeleteTodo) return;
    deleteTodo(pendingDeleteTodo.id);
    closeDeleteModal();
  };

  return (
    <>
      {filteredTodos.length === 0 ? (
        <EmptyState
          title={searchQuery ? "No results found" : "No todos yet"}
          description={
            searchQuery
              ? `We couldn't find any todos matching "${searchQuery}".`
              : "Your todo list is empty right now. Add a task to begin."
          }
          hint={
            searchQuery
              ? "Try a different keyword or clear your search." 
              : "Use the form above to add your first todo and stay organized."
          }
        />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todo-list">
            {(provided) => (
              <div
                className="space-y-3"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {filteredTodos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(dragProvided, snapshot) => (
                      <div
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        className={`rounded-3xl transition ${
                          snapshot.isDragging ? "ring-2 ring-sky-400 bg-slate-50" : ""
                        }`}
                      >
                        <TodoItem
                          todo={todo}
                          index={index}
                          onToggle={() => toggleTodoCompletion(todo.id)}
                          onEdit={() => openEditModal(todo)}
                          onDelete={() => openDeleteModal(todo)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      <Modal
        open={Boolean(editingTodo)}
        title="Edit Todo"
        description="Update the todo text and save your changes."
        onClose={closeEditModal}
      >
        <div className="space-y-4">
          <Input
            id="edit-todo-title"
            label="Todo title"
            value={editTitle}
            placeholder="Update todo title"
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={closeEditModal} type="button">
              Cancel
            </Button>
            <Button onClick={handleSave} type="button">
              Save changes
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={Boolean(pendingDeleteTodo)}
        title="Delete Todo"
        description="Are you sure you want to delete this todo? This action cannot be undone."
        onClose={closeDeleteModal}
      >
        <div className="space-y-4">
          <div className="text-sm text-slate-600">
            {pendingDeleteTodo?.title}
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={closeDeleteModal} type="button">
              Cancel
            </Button>
            <Button variant="ghost" onClick={confirmDelete} type="button">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TodoList;