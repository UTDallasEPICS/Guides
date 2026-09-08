# Vue 3 SPA Demo (Vite + Pinia + Vue Router)

This demo demonstrates a modern Single Page Application (SPA) built with **Vue 3**, **Vite**, **Pinia** for global state management, and **Vue Router** for client-side navigation.

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

4. **Run unit tests:**
   ```bash
   pnpm test:unit
   ```

5. **Lint and format:**
   ```bash
   pnpm lint
   ```

---

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension (ensure Vetur is disabled).

---

## Key Concepts Emphasized

- **Single File Components (SFCs)**: Component modularity using `<template>`, `<script setup lang="ts">`, and `<style scoped>`.
- **Reactivity Primitives**: Reactive variables with `ref()`, two-way data binding with `v-model`, and derived data with `computed()`.
- **Component Communication**:
  - Typed props via `defineProps<{ title: string; id: string }>()`.
  - Custom event emissions via `defineEmits<{ (e: 'select', id: string): void }>()`.
  - Content projection with default and named `<slot>` elements.
- **Global State Management with Pinia**:
  - Defining stores with `defineStore()`.
  - Encapsulating asynchronous actions (`getTodos`, `createTodo`, `updateTodo`, `deleteTodo`).
  - Accessing reactive store state with `storeToRefs()`.
- **Client-Side Navigation with Vue Router**:
  - Dynamic route parameters (`/todo/:todo`).
  - Programmatic navigation with `useRouter()` (`router.push()`, `router.go(-1)`).
  - Accessing route parameters with `useRoute()`.

---

## 🛠️ Suggested Student Exercises

1. **Computed Progress Metrics & Completion Badges**
   - Add a `completed: boolean` field to items in `src/stores/todos.ts`.
   - In `src/views/Todos.vue`, implement `computed()` properties to display:
     - Total tasks count, completed tasks count, remaining tasks count, and a visual progress bar (`(completed / total) * 100%`).
   - Add a checkbox to `src/components/TodoItem.vue` that emits a `@toggle` event to update the Pinia store.

2. **Category / Priority Tags with Dynamic Class Bindings**
   - Add a `category` (`Work`, `Personal`, `School`) or `priority` (`low`, `medium`, `high`) property to the todo model.
   - In `TodoItem.vue`, render a badge with dynamic class bindings (`:class="['badge', `badge-${todo.priority}`]"`).

3. **Pinia Store Filter Getters & Search**
   - In `src/stores/todos.ts`, add a `filterStatus` state (`'all' | 'active' | 'completed'`) and `searchQuery` string.
   - Add a computed getter `filteredTodos` in the store that filters items based on the active tab and search query.
   - Add filter toggle buttons (`All`, `Active`, `Completed`) and a search input in `src/views/Todos.vue`.

4. **Form Validation & Toast Notifications**
   - In `src/views/Todo.vue` (the create/edit view), add form validation: disable the "Save" button or show error text if `todo.title` is blank.
   - Create a reusable `Toast.vue` notification component that shows a brief feedback banner ("Todo saved successfully!") when saving or deleting.

5. **Empty State & Loading Spinners**
   - In `src/views/Todos.vue`, render an illustrated empty state when `filteredTodos.length === 0` ("No todos found. Click Add to create one!").
   - In `src/stores/todos.ts`, add an `isLoading` boolean state; display a loading spinner while API operations are in flight.
