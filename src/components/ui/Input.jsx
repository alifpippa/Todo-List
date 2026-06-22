import React from "react";

function Input({ label, id, type = "text", value, onChange, placeholder, className = "", ...props }) {
  return (
    <div className="space-y-2 w-full">
      {label ? (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm transition duration-200 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 ${className}`}
        {...props}
      />
    </div>
  );
}

export default Input;
