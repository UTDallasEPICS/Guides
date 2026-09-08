# Full-Stack Nuxt 4 Task Manager Demo

This demo represents the full-stack equivalent of combining the **`servers`** and **`vue-demo`** applications into a single cohesive **Nuxt 4** application.

It demonstrates a modern full-stack web application utilizing **Nuxt 4**, **Tailwind CSS**, **Nuxt UI**, and **Drizzle ORM** on an embedded **SQLite** database.

---

## Tech Stack

- **Meta-Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3, Server-Side Rendering, universal routing, automatic imports)
- **UI & Styling**: [Nuxt UI](https://ui.nuxt.com/) and [Tailwind CSS](https://tailwindcss.com/)
- **Database & ORM**: [SQLite](https://www.sqlite.org/) managed with [Drizzle ORM](https://orm.drizzle.team/)
- **Language**: TypeScript

---

## Key Architecture & Features

1. **Shared Page Layout with Navigation Bar (`app/layouts/default.vue`)**:
   - Universal responsive header with navigation links (`Tasks`, `New Task`), brand icon, and dark/light color mode switcher.
   - Main content `<slot />` container with footer.

2. **Dedicated Page Navigation for Editing (`app/pages/todos/[id].vue`)**:
   - Demonstrates Nuxt client-side routing with dynamic route parameters (`route.params.id`).
   - Handles both task creation (`/todos/new`) and task editing (`/todos/:id`) on a dedicated page with form validation, category selection, completion toggle, and back-navigation (`navigateTo('/')`).

3. **Integrated Server API Routes (`server/api/todos/`)**:
   - Built-in Nitro server engine handling RESTful endpoints:
     - `GET /api/todos`: Fetch all tasks ordered by creation date
     - `POST /api/todos`: Create a new task with validation
     - `GET /api/todos/:id`: Fetch a single task by ID
     - `PUT /api/todos/:id`: Update task attributes
     - `DELETE /api/todos/:id`: Delete a task
     - `PATCH /api/todos/:id/toggle`: Toggle completion status

4. **Type-Safe Database Modeling (`server/database/schema.ts`)**:
   - SQLite schema defined with Drizzle ORM's `sqliteTable` (`id`, `title`, `content`, `completed`, `category`, `createdAt`).

---

## Setup & Running

1. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Start the development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser.

4. **Build for production:**
   ```bash
   pnpm build
   ```

---

## 🛠️ Suggested Student Exercises

1. **Add Priority Badges and Due Dates**
   - In `server/database/schema.ts`, add a `priority` field (`text('priority').default('medium')`) and `dueDate` field (`integer('due_date', { mode: 'timestamp' })`).
   - In `app/pages/todos/[id].vue`, add UI controls for selecting priority (`Low`, `Medium`, `High`) and picking a due date.
   - In `app/pages/index.vue`, render colored priority badges on each task card and display overdue indicators.

2. **Bulk Actions (Delete Selected / Mark All Complete)**
   - In `app/pages/index.vue`, add a multi-select mode with checkboxes on each card.
   - Create a batch API endpoint `POST /api/todos/bulk` in `server/api/todos/bulk.post.ts` to delete or complete multiple tasks in a single Drizzle transaction.

3. **Client-Side Toast Notifications with Nuxt UI**
   - Use Nuxt UI's built-in `useToast()` composable to show notification banners when tasks are created, updated, or deleted (`toast.add({ title: 'Task saved', color: 'green' })`).

4. **Custom Categories with Filter Pills**
   - Allow users to define custom category tags.
   - Add category filter pills on the dashboard that filter visible tasks dynamically.

5. **Server-Side Pagination & Sorting**
   - Update `server/api/todos/index.get.ts` to parse query parameters (`?limit=10&page=1&sort=title`) using `getQuery(event)` and Drizzle's `limit()`, `offset()`, and `orderBy()`.
   - Add pagination controls (`UPagination`) on the dashboard.
