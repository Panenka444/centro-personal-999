"use client";

import { useMemo, useState } from "react";
import { Task, Priority } from "@/lib/types";
import { monthMatrix, monthLabel, todayISO, addMonths } from "@/lib/dates";

const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export default function CalendarView({
  tasks,
  onAdd,
  onToggle,
  onDelete,
}: {
  tasks: Task[];
  onAdd: (data: {
    title: string;
    due_date: string | null;
    priority: Priority;
  }) => void;
  onToggle: (id: string, status: Task["status"]) => void;
  onDelete: (id: string) => void;
}) {
  const now = new Date();
  const [cursor, setCursor] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  });
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const today = todayISO();

  const maxMonth = useMemo(() => {
    const d = addMonths(new Date(), 12);
    return { year: d.getFullYear(), month: d.getMonth() };
  }, []);

  const weeks = useMemo(() => monthMatrix(cursor.year, cursor.month), [cursor]);

  const tasksByDay = useMemo(() => {
    const map: Record<string, Task[]> = {};
    tasks.forEach((t) => {
      if (!t.due_date) return;
      (map[t.due_date] ??= []).push(t);
    });
    return map;
  }, [tasks]);

  const canGoBack = !(cursor.year === now.getFullYear() && cursor.month === now.getMonth());
  const canGoForward = !(cursor.year === maxMonth.year && cursor.month === maxMonth.month);

  function changeMonth(delta: number) {
    const d = new Date(cursor.year, cursor.month + delta, 1);
    setCursor({ year: d.getFullYear(), month: d.getMonth() });
    setSelectedDay(null);
  }

  function handleAddForSelected(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !selectedDay) return;
    onAdd({ title: newTitle.trim(), due_date: selectedDay, priority: "media" });
    setNewTitle("");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => changeMonth(-1)}
          disabled={!canGoBack}
          className="text-lg text-muted disabled:opacity-20 px-2"
          aria-label="Mes anterior"
        >
          ‹
        </button>
        <h2 className="text-sm capitalize">{monthLabel(cursor.year, cursor.month)}</h2>
        <button
          onClick={() => changeMonth(1)}
          disabled={!canGoForward}
          className="text-lg text-muted disabled:opacity-20 px-2"
          aria-label="Mes siguiente"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-xs text-muted text-center">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((iso, i) => {
          if (!iso) return <div key={`empty-${i}`} />;

          const dayTasks = tasksByDay[iso] ?? [];
          const pending = dayTasks.filter((t) => t.status === "pendiente").length;
          const isToday = iso === today;
          const isSelected = iso === selectedDay;

          return (
            <button
              key={iso}
              onClick={() => setSelectedDay(iso)}
              className={`aspect-square rounded-sm border text-xs flex flex-col items-center justify-center gap-1 transition-colors ${
                isSelected ? "border-amber" : "border-border"
              } ${isToday ? "bg-inkline" : ""}`}
            >
              <span className={isToday ? "text-amber" : ""}>{Number(iso.slice(-2))}</span>
              {pending > 0 && <span className="w-1 h-1 rounded-full bg-amber" />}
            </button>
          );
        })}
      </div>

      {selectedDay && (
        <div className="mt-6 border-t border-border pt-4">
          <h3 className="text-sm text-muted mb-3 capitalize">
            {new Date(`${selectedDay}T00:00:00`).toLocaleDateString("es-AR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h3>

          {(tasksByDay[selectedDay] ?? []).length === 0 ? (
            <p className="text-sm text-muted mb-3">No hay tareas este día.</p>
          ) : (
            <div className="mb-3">
              {tasksByDay[selectedDay].map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-2 py-1.5 border-b border-border last:border-0"
                >
                  <button
                    onClick={() =>
                      onToggle(t.id, t.status === "hecha" ? "pendiente" : "hecha")
                    }
                    className={`w-3.5 h-3.5 rounded-sm border shrink-0 ${
                      t.status === "hecha" ? "bg-sage border-sage" : "border-muted"
                    }`}
                    aria-label="Marcar tarea"
                  />
                  <span
                    className={`text-sm flex-1 ${
                      t.status === "hecha" ? "line-through text-muted" : ""
                    }`}
                  >
                    {t.title}
                  </span>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="text-muted hover:text-clay text-sm"
                    aria-label="Eliminar tarea"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleAddForSelected} className="flex gap-2">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Nueva tarea para este día..."
              className="flex-1 px-3 py-2 rounded-sm text-sm"
            />
            <button
              type="submit"
              className="bg-amber text-ink text-sm font-medium px-4 py-2 rounded-sm"
            >
              Agregar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
