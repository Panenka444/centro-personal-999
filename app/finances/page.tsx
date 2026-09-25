"use client";

import { useMemo } from "react";
import { useFinance } from "@/lib/useFinance";
import { currentMonthRange, currentMonthLabel, formatMoney } from "@/lib/money";
import QuickAddTransaction from "@/components/QuickAddTransaction";
import TransactionRow from "@/components/TransactionRow";
import SavingsGoalCard from "@/components/SavingsGoalCard";

export default function FinancesPage() {
  const { transactions, goal, loading, addTransaction, deleteTransaction, saveGoal } =
    useFinance();

  const { monthIncome, monthExpense, monthTx } = useMemo(() => {
    const { start, end } = currentMonthRange();
    const monthTx = transactions.filter((t) => t.date >= start && t.date <= end);
    const monthIncome = monthTx
      .filter((t) => t.type === "ingreso")
      .reduce((sum, t) => sum + t.amount, 0);
    const monthExpense = monthTx
      .filter((t) => t.type === "gasto")
      .reduce((sum, t) => sum + t.amount, 0);
    return { monthIncome, monthExpense, monthTx };
  }, [transactions]);

  const balance = monthIncome - monthExpense;

  return (
    <div>
      <h1 className="text-2xl mb-1">Finanzas</h1>
      <p className="text-sm text-muted capitalize mb-6">{currentMonthLabel()}</p>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="border border-border rounded-sm p-3">
          <p className="text-xs text-muted mb-1">Ingresos</p>
          <p className="font-mono text-sm text-sage">{formatMoney(monthIncome)}</p>
        </div>
        <div className="border border-border rounded-sm p-3">
          <p className="text-xs text-muted mb-1">Gastos</p>
          <p className="font-mono text-sm text-clay">{formatMoney(monthExpense)}</p>
        </div>
        <div className="border border-border rounded-sm p-3">
          <p className="text-xs text-muted mb-1">Disponible</p>
          <p className={`font-mono text-sm ${balance >= 0 ? "text-paper" : "text-clay"}`}>
            {formatMoney(balance)}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-sm text-muted mb-3">Meta de ahorro</h2>
        <SavingsGoalCard goal={goal} onSave={saveGoal} />
      </div>

      <h2 className="text-sm text-muted mb-3">Movimientos de este mes</h2>
      <QuickAddTransaction onAdd={addTransaction} />

      {loading ? (
        <p className="text-sm text-muted">Cargando...</p>
      ) : monthTx.length === 0 ? (
        <p className="text-sm text-muted">Todavía no cargaste movimientos este mes.</p>
      ) : (
        <div>
          {monthTx.map((t) => (
            <TransactionRow key={t.id} transaction={t} onDelete={deleteTransaction} />
          ))}
        </div>
      )}
    </div>
  );
}
