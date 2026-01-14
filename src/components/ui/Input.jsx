export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-primary">{label}</label>
      )}
      <input
        {...props}
        className={`border border-b-color bg-form text-primary rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-foreground transition-all duration-300 placeholder:text-text-tertiary ${className}`}
      />
      {error && <p className="text-sm font-medium text-error">{error}</p>}
    </div>
  );
}

export function SelectStatus({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor="status" className="text-sm font-medium text-primary">
          {label}
        </label>
      )}
      <select
        {...props}
        className="border border-b-color bg-form text-primary rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-foreground transition-all duration-300 cursor-pointer"
      >
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="cancelled">Cancelled</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}
