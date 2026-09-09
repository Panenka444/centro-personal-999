"use client";

import { Task } from "@/lib/types";
import { formatDateLabel } from "@/lib/dates";

const priorityColor: Record<Task["priority"], string> = {
  alta: "text-clay",
  media: "text-amber",
  baja: "text-muted",
};

export default function TaskRow({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (id: string, status: Task["status"]) => void;
  onDelete: (id: string) => void;
}) {
  const done = task.status === "hecha";

  return (
    <div className="group flex items-center gap-3 py-2.5 border-b border-border last:border-0">
      <button
        onClick={() => onToggle(task.id, done ? "pendiente" : "hecha")}
        aria-label={done ? "Marcar como pendiente" : "Marcar como hecha"}
        className={`w-4 h-4 shrink-0 rounded-sm border ${
          done ? "bg-sage border-sage" : "border-muted"
        }`}
      />
      <div className="flex-1 min-w-0">
        <p className={`text-sm truncate ${done ? "line-through text-muted" : ""}`}>
          {task.title}
        </p>
        {task.category && (
          <p className="text-xs text-muted">{task.category}</p>
        )}
      </div>
      <span className="font-mono text-xs text-muted shrink-0">
        {formatDateLabel(task.due_date)}
      </span>
      <span className={`font-mono text-xs shrink-0 ${priorityColor[task.priority]}`}>
        {task.priority}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="text-muted hover:text-clay text-sm opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
        aria-label="Eliminar tarea"
      >
        ×
      </button>
    </div>
  );
}
