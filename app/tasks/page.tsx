"use client";

import { useMemo, useState } from "react";
import { useTasks } from "@/lib/useTasks";
import { todayISO, tomorrowISO, endOfWeekISO } from "@/lib/dates";
import QuickAddTask from "@/components/QuickAddTask";
import TaskRow from "@/components/TaskRow";
import CalendarView from "@/components/CalendarView";
import { Task } from "@/lib/types";

function TaskGroup({
  title,
  tasks,
  onToggle,
  onDelete,
}: {
  title: string;
  tasks: Task[];
  onToggle: (id: string, status: Task["status"]) => void;
  onDelete: (id: string) => void;
}) {
  if (tasks.length === 0) return null;
  return (
    <div className="mb-8">
      <h2 className="text-sm text-muted mb-1">{title}</h2>
      <div>
        {tasks.map((t) => (
          <TaskRow key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

export default function TasksPage() {
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks();
  const [view, setView] = useState<"lista" | "calendario">("lista");

  const groups = useMemo(() => {
    const today = todayISO();
    const tomorrow = tomorrowISO();
    const weekEnd = endOfWeekISO();

    const pending = tasks.filter((t) => t.status === "pendiente");
    const done = tasks.filter((t) => t.status === "hecha");

    return {
      hoy: pending.filter((t) => t.due_date === today),
      manana: pending.filter((t) => t.due_date === tomorrow),
      semana: pending.filter(
        (t) =>
          t.due_date &&
          t.due_date > tomorrow &&
          t.due_date <= weekEnd
      ),
      futuras: pending.filter(
        (t) => !t.due_date || t.due_date > weekEnd
      ),
      hechas: done,
    };
  }, [tasks]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl">Tareas</h1>
        <div className="flex gap-1 text-sm">
          <button
            onClick={() => setView("lista")}
            className={`px-3 py-1.5 rounded-sm ${
              view === "lista" ? "bg-inkline" : "text-muted"
            }`}
          >
            Lista
          </button>
          <button
            onClick={() => setView("calendario")}
            className={`px-3 py-1.5 rounded-sm ${
              view === "calendario" ? "bg-inkline" : "text-muted"
            }`}
          >
            Calendario
          </button>
        </div>
      </div>

      {view === "calendario" ? (
        <CalendarView
          tasks={tasks}
          onAdd={addTask}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      ) : (
        <>
          <QuickAddTask onAdd={addTask} />

          {loading ? (
            <p className="text-sm text-muted">Cargando...</p>
          ) : tasks.length === 0 ? (
            <p className="text-sm text-muted">
              No tenés tareas todavía. Agregá la primera arriba.
            </p>
          ) : (
            <>
              <TaskGroup title="Hoy" tasks={groups.hoy} onToggle={toggleTask} onDelete={deleteTask} />
              <TaskGroup title="Mañana" tasks={groups.manana} onToggle={toggleTask} onDelete={deleteTask} />
              <TaskGroup title="Esta semana" tasks={groups.semana} onToggle={toggleTask} onDelete={deleteTask} />
              <TaskGroup title="Futuras / sin fecha" tasks={groups.futuras} onToggle={toggleTask} onDelete={deleteTask} />
              <TaskGroup title="Hechas" tasks={groups.hechas} onToggle={toggleTask} onDelete={deleteTask} />
            </>
          )}
        </>
      )}
    </div>
  );
}
