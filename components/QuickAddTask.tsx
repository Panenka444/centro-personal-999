"use client";

import { useState } from "react";
import { Priority } from "@/lib/types";
import { todayISO, tomorrowISO } from "@/lib/dates";

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
  const [dueOption, setDueOption] = useState<"today" | "tomorrow" | "none">(
    "today"
  );
  const [priority, setPriority] = useState<Priority>("media");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const due_date =
      dueOption === "today"
        ? todayISO()
        : dueOption === "tomorrow"
        ? tomorrowISO()
        : null;

    onAdd({ title: title.trim(), due_date, priority });
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea..."
        className="flex-1 min-w-[180px] px-3 py-2 rounded-sm text-sm"
      />
      <select
        value={dueOption}
        onChange={(e) => setDueOption(e.target.value as typeof dueOption)}
        className="px-2 py-2 rounded-sm text-sm"
      >
        <option value="today">Hoy</option>
        <option value="tomorrow">Mañana</option>
        <option value="none">Sin fecha</option>
      </select>
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
