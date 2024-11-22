import { cn } from "../utils";

export default function Button({ className, children }) {
  return (
    <button
      className={cn(
        `bg-slate-900 py-2 px-4 text-white rounded-lg hover:bg-slate-800`,
        className
      )}
    >
      {children}
    </button>
  );
}
