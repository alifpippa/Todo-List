import MainLayout from "../layouts/MainLayout";
import TodoForm from "../components/TodoForm";
import TodoSearch from "../components/TodoSearch";
import TodoFilters from "../components/TodoFilters";
import TodoList from "../components/TodoList";

function Home() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <TodoSearch />
          <TodoForm />
          <TodoFilters />
        </div>
        <TodoList />
      </div>
    </MainLayout>
  );
}

export default Home;