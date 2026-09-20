"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useTasks } from "@/lib/useTasks";
import { todayISO } from "@/lib/dates";
import TaskRow from "@/components/TaskRow";

export default function DashboardPage() {
  const { tasks, loading, toggleTask, deleteTask } = useTasks();

  const today = todayISO();
  const todayTasks = useMemo(
    () =>
      tasks.filter((t) => t.due_date === today && t.status === "pendiente"),
    [tasks, today]
  );
  const doneToday = useMemo(
    () => tasks.filter((t) => t.due_date === today && t.status === "hecha"),
    [tasks, today]
  );

  const dateLabel = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const totalToday = todayTasks.length + doneToday.length;
  const pct = totalToday === 0 ? 0 : Math.round((doneToday.length / totalToday) * 100);

  return (
    <div>
      <p className="text-sm text-muted capitalize mb-1">{dateLabel}</p>
      <h1 className="text-2xl mb-8">Inicio</h1>

      <section className="mb-10">
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="text-sm text-muted">Tareas de hoy</h2>
          {totalToday > 0 && (
            <span className="font-mono text-sm text-amber">{pct}%</span>
          )}
        </div>

        {loading ? (
          <p className="text-sm text-muted">Cargando...</p>
        ) : totalToday === 0 ? (
          <p className="text-sm text-muted">No tenés tareas para hoy.</p>
        ) : (
          <div>
            {todayTasks.map((t) => (
              <TaskRow key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} />
            ))}
            {doneToday.map((t) => (
              <TaskRow key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} />
            ))}
          </div>
        )}

        <Link
          href="/tasks"
          className="inline-block mt-3 text-sm text-amber hover:underline"
        >
          Ver todas las tareas
        </Link>
      </section>

      <section className="border-t border-border pt-6">
        <p className="text-sm text-muted">
          Próximos módulos: Hábitos, Objetivos y Finanzas se van a sumar acá
          mismo, cada uno con su propio resumen.
        </p>
      </section>
    </div>
  );
}
