function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Todo App
        </h1>

        {children}
      </div>
    </div>
  );
}

export default MainLayout;