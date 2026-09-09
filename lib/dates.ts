export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function tomorrowISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

// Fin de la semana actual (domingo), en formato YYYY-MM-DD
export function endOfWeekISO(): string {
  const d = new Date();
  const day = d.getDay(); // 0 = domingo
  const diff = day === 0 ? 0 : 7 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

export function formatDateLabel(iso: string | null): string {
  if (!iso) return "Sin fecha";
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
