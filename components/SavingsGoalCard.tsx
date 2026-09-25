"use client";

import { useState } from "react";
import { SavingsGoal } from "@/lib/types";
import { formatMoney } from "@/lib/money";

export default function SavingsGoalCard({
  goal,
  onSave,
}: {
  goal: SavingsGoal | null;
  onSave: (data: {
    title: string;
    target_amount: number;
    current_amount: number;
  }) => void;
}) {
  const [editing, setEditing] = useState(!goal);
  const [title, setTitle] = useState(goal?.title ?? "Meta de ahorro");
  const [target, setTarget] = useState(String(goal?.target_amount ?? ""));
  const [current, setCurrent] = useState(String(goal?.current_amount ?? ""));

  const pct =
    goal && goal.target_amount > 0
      ? Math.min(100, Math.round((goal.current_amount / goal.target_amount) * 100))
      : 0;

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const targetNum = parseFloat(target) || 0;
    const currentNum = parseFloat(current) || 0;
    onSave({ title: title.trim() || "Meta de ahorro", target_amount: targetNum, current_amount: currentNum });
    setEditing(false);
  }

  if (editing) {
    return (
      <form onSubmit={handleSave} className="border border-border rounded-sm p-4">
        <p className="text-sm text-muted mb-3">
          {goal ? "Editar meta de ahorro" : "Crear meta de ahorro"}
        </p>
        <div className="flex flex-wrap gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nombre de la meta"
            className="flex-1 min-w-[160px] px-3 py-2 rounded-sm text-sm"
          />
          <input
            type="number"
            min="0"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Objetivo ($)"
            className="w-32 px-3 py-2 rounded-sm text-sm"
          />
          <input
            type="number"
            min="0"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="Ahorrado ($)"
            className="w-32 px-3 py-2 rounded-sm text-sm"
          />
          <button
            type="submit"
            className="bg-amber text-ink text-sm font-medium px-4 py-2 rounded-sm"
          >
            Guardar
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="border border-border rounded-sm p-4">
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-sm">{goal!.title}</p>
        <button
          onClick={() => setEditing(true)}
          className="text-xs text-muted hover:text-paper"
        >
          Editar
        </button>
      </div>

      <div className="w-full h-2 bg-inkline rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-sage transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-baseline justify-between font-mono text-xs">
        <span className="text-sage">{formatMoney(goal!.current_amount)}</span>
        <span className="text-amber">{pct}%</span>
        <span className="text-muted">{formatMoney(goal!.target_amount)}</span>
      </div>
    </div>
  );
}
