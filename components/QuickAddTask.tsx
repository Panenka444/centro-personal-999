"use client";

import { useState } from "react";
import { Priority } from "@/lib/types";
import { todayISO, addDaysISO } from "@/lib/dates";

export default function QuickAddTask({
  onAdd,
}: {
  onAdd: (data: {
    title: string;
    due_date: string | null;
    priority: Priority;
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(todayISO());
  const [noDate, setNoDate] = useState(false);
  const [priority, setPriority] = useState<Priority>("media");

  const minDate = todayISO();
  const maxDate = addDaysISO(365);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      due_date: noDate ? null : dueDate,
      priority,
    });
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2 mb-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea..."
        className="flex-1 min-w-[180px] px-3 py-2 rounded-sm text-sm"
      />

      {!noDate && (
        <input
          type="date"
          value={dueDate}
          min={minDate}
          max={maxDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-2 py-2 rounded-sm text-sm"
        />
      )}

      <label className="flex items-center gap-1.5 text-xs text-muted px-1 select-none">
        <input
          type="checkbox"
          checked={noDate}
          onChange={(e) => setNoDate(e.target.checked)}
        />
        Sin fecha
      </label>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="px-2 py-2 rounded-sm text-sm"
      >
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>

      <button
        type="submit"
        className="bg-amber text-ink text-sm font-medium px-4 py-2 rounded-sm"
      >
        Agregar
      </button>
    </form>
  );
}
