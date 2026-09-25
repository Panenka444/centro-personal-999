"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SavingsGoal, Transaction, TransactionType } from "@/lib/types";

export function useFinance() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goal, setGoal] = useState<SavingsGoal | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchAll = useCallback(async () => {
    setLoading(true);

    const [{ data: txData }, { data: goalData }] = await Promise.all([
      supabase
        .from("transactions")
        .select("*")
        .order("date", { ascending: false })
        .order("created_at", { ascending: false }),
      supabase.from("savings_goals").select("*").maybeSingle(),
    ]);

    setTransactions(txData ?? []);
    setGoal(goalData ?? null);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function addTransaction(input: {
    type: TransactionType;
    amount: number;
    category: string | null;
    description: string | null;
    date: string;
  }) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("transactions")
      .insert({ ...input, user_id: user.id })
      .select()
      .single();

    if (data) setTransactions((prev) => [data, ...prev]);
  }

  async function deleteTransaction(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    await supabase.from("transactions").delete().eq("id", id);
  }

  async function saveGoal(input: {
    title: string;
    target_amount: number;
    current_amount: number;
  }) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("savings_goals")
      .upsert(
        { ...input, user_id: user.id, updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      )
      .select()
      .single();

    if (data) setGoal(data);
  }

  return {
    transactions,
    goal,
    loading,
    addTransaction,
    deleteTransaction,
    saveGoal,
    refetch: fetchAll,
  };
}
