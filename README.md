# centro-personal

Panel de control personal. Etapa 1 del desarrollo: Dashboard + módulo de Tareas.

## 1. Crear tu usuario en Supabase

1. Andá al panel de tu proyecto en supabase.com.
2. En el menú lateral, entrá a **Authentication → Users**.
3. Hacé clic en **Add user → Create new user**.
4. Cargá tu email y una contraseña. Marcá la opción de "Auto Confirm User" si aparece (así no hace falta que confirmes por mail).
5. Guardá. Con ese email y contraseña vas a entrar a la app.

## 2. Crear la tabla de tareas

1. En el panel de Supabase, andá a **SQL Editor**.
2. Abrí el archivo `supabase/schema.sql` de este proyecto, copiá todo el contenido y pegalo ahí.
3. Hacé clic en **Run**.

Esto crea la tabla `tasks` y las reglas de seguridad para que solo vos puedas ver y modificar tus propios datos.

## 3. Subir el proyecto a GitHub

Desde una terminal, parado dentro de esta carpeta:

```bash
git init
git add .
git commit -m "Etapa 1: dashboard y tareas"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/centro-personal.git
git push -u origin main
```

(Creá antes el repositorio vacío en github.com, sin README, y reemplazá TU-USUARIO por tu usuario real).

## 4. Desplegar en Vercel

1. Entrá a vercel.com → **Add New → Project**.
2. Elegí el repositorio `centro-personal` que acabás de subir.
3. En **Environment Variables**, agregá estas dos (los mismos valores que ya están en `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Hacé clic en **Deploy**.

En un par de minutos vas a tener una URL pública (algo como `centro-personal.vercel.app`) que podés abrir desde la compu y agregar a la pantalla de inicio del celular como si fuera una app.

## 5. Probarlo en tu compu antes de subir (opcional)

Si tenés Node.js instalado:

```bash
npm install
npm run dev
```

Y abrís `http://localhost:3000`.

---

## Qué incluye esta etapa

- Login con email y contraseña (Supabase Auth).
- Dashboard con la fecha, tus tareas de hoy y el % de cumplimiento del día.
- Módulo de Tareas completo: crear, marcar como hecha, borrar, agrupadas en Hoy / Mañana / Esta semana / Futuras / Hechas.

## Qué sigue

Próximo módulo a construir: **Hábitos**. Después Objetivos, y después Finanzas básicas — cada uno se agrega sin modificar lo que ya funciona.
