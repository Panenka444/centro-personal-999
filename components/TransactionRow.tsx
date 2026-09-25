"use client";

import { Transaction } from "@/lib/types";
import { formatMoney } from "@/lib/money";
import { formatDateLabel } from "@/lib/dates";

export default function TransactionRow({
  transaction,
  onDelete,
}: {
  transaction: Transaction;
  onDelete: (id: string) => void;
}) {
  const isIncome = transaction.type === "ingreso";

  return (
    <div className="group flex items-center gap-3 py-2.5 border-b border-border last:border-0">
      <span className="font-mono text-xs text-muted w-16 shrink-0">
        {formatDateLabel(transaction.date)}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">{transaction.category || "Sin categoría"}</p>
      </div>
      <span
        className={`font-mono text-sm shrink-0 ${
          isIncome ? "text-sage" : "text-clay"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatMoney(transaction.amount)}
      </span>
      <button
        onClick={() => onDelete(transaction.id)}
        className="text-muted hover:text-clay text-sm opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
        aria-label="Eliminar movimiento"
      >
        ×
      </button>
    </div>
  );
}
