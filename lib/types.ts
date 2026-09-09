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
