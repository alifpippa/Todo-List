import React from "react";

function EmptyState({ title = "Nothing to do yet", description = "Add a new task to get started with your todo list.", hint = "Use the input above to add tasks quickly." }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 px-8 py-12 text-center shadow-sm">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-700 shadow-sm">
        <span className="text-2xl">📝</span>
      </div>
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 text-sm text-slate-600">{description}</p>
      <p className="mt-4 text-sm text-slate-500">{hint}</p>
    </div>
  );
}

export default EmptyState;
