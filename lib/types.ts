export type Priority = "alta" | "media" | "baja";
export type TaskStatus = "pendiente" | "hecha";

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  due_date: string | null; // YYYY-MM-DD
  priority: Priority;
  category: string | null;
  status: TaskStatus;
  created_at: string;
}

export type TransactionType = "ingreso" | "gasto";

export interface Transaction {
  id: string;
  user_id: string;
  type: TransactionType;
  amount: number;
  category: string | null;
  description: string | null;
  date: string; // YYYY-MM-DD
  created_at: string;
}

export interface SavingsGoal {
  id: string;
  user_id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  updated_at: string;
}
