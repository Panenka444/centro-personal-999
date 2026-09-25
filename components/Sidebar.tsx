"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const modules = [
  { href: "/", label: "Inicio" },
  { href: "/tasks", label: "Tareas" },
  { href: "/finances", label: "Finanzas" },
  // Próximos módulos: Hábitos, Objetivos...
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname.startsWith("/login")) return null;

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="hidden md:flex md:w-56 flex-col justify-between border-r border-border px-6 py-8">
      <div>
        <p className="font-mono text-sm text-muted tracking-tight mb-8">
          centro-personal
        </p>
        <nav className="flex flex-col gap-1">
          {modules.map((m) => {
            const active = pathname === m.href;
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`text-sm px-3 py-2 rounded-sm transition-colors ${
                  active
                    ? "bg-inkline text-paper"
                    : "text-muted hover:text-paper"
                }`}
              >
                {m.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="text-sm text-muted hover:text-clay text-left px-3"
      >
        Cerrar sesión
      </button>
    </aside>
  );
}
