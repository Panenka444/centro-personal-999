"use client";

import { useState } from "react";
import { TransactionType } from "@/lib/types";
import { todayISO } from "@/lib/dates";

export default function QuickAddTransaction({
  onAdd,
}: {
  onAdd: (data: {
    type: TransactionType;
    amount: number;
    category: string | null;
    description: string | null;
    date: string;
  }) => void;
}) {
  const [type, setType] = useState<TransactionType>("gasto");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(todayISO());

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) return;

    onAdd({
      type,
      amount: parsed,
      category: category.trim() || null,
      description: null,
      date,
    });
    setAmount("");
    setCategory("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2 mb-6">
      <div className="flex rounded-sm overflow-hidden border border-border">
        <button
          type="button"
          onClick={() => setType("gasto")}
          className={`px-3 py-2 text-sm ${
            type === "gasto" ? "bg-clay text-ink" : "text-muted"
          }`}
        >
          Gasto
        </button>
        <button
          type="button"
          onClick={() => setType("ingreso")}
          className={`px-3 py-2 text-sm ${
            type === "ingreso" ? "bg-sage text-ink" : "text-muted"
          }`}
        >
          Ingreso
        </button>
      </div>

      <input
        type="number"
        inputMode="decimal"
        step="0.01"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Monto"
        className="w-28 px-3 py-2 rounded-sm text-sm"
      />

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Categoría (opcional)"
        className="flex-1 min-w-[140px] px-3 py-2 rounded-sm text-sm"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="px-2 py-2 rounded-sm text-sm"
      />

      <button
        type="submit"
        className="bg-amber text-ink text-sm font-medium px-4 py-2 rounded-sm"
      >
        Agregar
      </button>
    </form>
  );
}
