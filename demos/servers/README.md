# Server & Database Demo (Nitro + SQLite + Drizzle ORM)

This demo demonstrates building a lightweight, high-performance REST API server using **[Nitro](https://nitro.build/)**, an embedded **SQLite** database, and **[Drizzle ORM](https://orm.drizzle.team/)** for type-safe database queries.

---

## Setup & Running

1. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Start development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

3. **Build for production:**
   ```bash
   pnpm build
   ```

4. **Preview production build:**
   ```bash
   pnpm preview
   ```

5. Open `http://localhost:3000` in your browser.

---

## Architecture & File Structure

- **Server Engine**: [Nitro](https://nitro.build/) (`nitropack`), the lightweight universal server engine powered by UnJS / H3.
- **Database**: In-process [SQLite](https://www.sqlite.org/) (`todos.db`) via `@libsql/client`.
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) (`db/schema.ts` and `utils/db.ts`).
- **File-Based Routing**:
  - `routes/todos/index.get.ts` -> `GET /todos` (Fetch all todos)
  - `routes/todos/index.post.ts` -> `POST /todos` (Create a todo)
  - `routes/todos/[id].get.ts` -> `GET /todos/:id` (Fetch single todo)
  - `routes/todos/[id].put.ts` -> `PUT /todos/:id` (Update a todo)
  - `routes/todos/[id].delete.ts` -> `DELETE /todos/:id` (Delete a todo)
- **Static Assets**: `public/index.html` is automatically served by Nitro at the root route `/`.

---

## Key Concepts Emphasized

- **File-Based Server Routing**: Route definition directly from file paths with event handlers (`eventHandler`, `readBody`, `getRouterParam`).
- **ORM Schema & Data Access**: Defining tables with Drizzle (`sqliteTable`) and executing queries (`db.select()`, `db.insert()`, `db.update()`, `db.delete()`).
- **HTTP Status Codes & Errors**: Standard error utilities (`createError`, `setResponseStatus`).
- **Static Asset Serving**: Nitro serves static assets located in `public/`.

---

## 🛠️ Suggested Student Exercises

1. **Add `completed` Column & Toggle Endpoint**
   - In `db/schema.ts`, add an `integer('completed', { mode: 'boolean' }).default(false)` column to the `todos` table.
   - Create a `routes/todos/[id]/toggle.patch.ts` route handler that flips the completion state in SQLite using Drizzle (`db.update(schema.todos)...`).

2. **Search, Filtering, and Pagination Queries**
   - In `routes/todos/index.get.ts`, parse query parameters using `getQuery(event)`:
     - `GET /todos?search=project` (using Drizzle's `like()` or `ilike()` operator).
     - `GET /todos?completed=true` (filtering by boolean status with `eq()`).
     - `GET /todos?limit=10&offset=0` (using Drizzle's `limit()` and `offset()`).

3. **Server-Side Input Validation & Error Handling**
   - In `routes/todos/index.post.ts`, add validation logic: return `createError({ statusCode: 400, statusMessage: "Title is required" })` when title is omitted.
   - In `routes/todos/[id].put.ts` and `delete.ts`, throw `createError({ statusCode: 404, statusMessage: "Todo not found" })` when targeting an invalid ID.

4. **Timestamps & Priority Sorting**
   - Add `createdAt` (`integer('created_at', { mode: 'timestamp' })`) and `priority` (`low`, `medium`, `high`) columns to the schema.
   - Add sorting capabilities (e.g. `GET /todos?sortBy=createdAt&order=desc`).

5. **Connect `html_css_js` Demo to the API (Workshop 2 Milestone)**
   - Copy or serve the `html_css_js` frontend demo assets from `public/`.
   - In `html_css_js/index.html`, write `fetchTodos()`, `createTodo()`, `updateTodo()`, and `deleteTodo()` functions using `async/await` to populate and persist live data to the Nitro + Drizzle backend.

---

## 🔗 Workshop 2 Note: Full-Stack API Integration

In the second workshop, students will connect the **`html_css_js`** demo (`guides/demos/html_css_js/`) as the frontend for this Nitro server and database. Students will replace in-memory arrays in `html_css_js` with `fetch()` calls to this Nitro backend API, experiencing the full client-server data flow.
