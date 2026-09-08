<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Task Dashboard</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Manage, filter, and track full-stack tasks stored in SQLite via Drizzle ORM.
        </p>
      </div>
      <UButton
        to="/todos/new"
        icon="i-heroicons-plus"
        size="md"
        color="primary"
      >
        Create Task
      </UButton>
    </div>

    <!-- Metrics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-gray-500 uppercase font-semibold">Total Tasks</p>
            <p class="text-2xl font-bold mt-1">{{ totalCount }}</p>
          </div>
          <UIcon name="i-heroicons-document-text" class="w-8 h-8 text-gray-400" />
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-gray-500 uppercase font-semibold">Completed</p>
            <p class="text-2xl font-bold mt-1 text-emerald-600 dark:text-emerald-400">{{ completedCount }}</p>
          </div>
          <UIcon name="i-heroicons-check-circle" class="w-8 h-8 text-emerald-500" />
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-gray-500 uppercase font-semibold">Pending</p>
            <p class="text-2xl font-bold mt-1 text-amber-600 dark:text-amber-400">{{ pendingCount }}</p>
          </div>
          <UIcon name="i-heroicons-clock" class="w-8 h-8 text-amber-500" />
        </div>
      </UCard>
    </div>

    <!-- Filter & Search Toolbar -->
    <UCard>
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Search Input -->
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search tasks..."
          class="w-full md:w-80"
          clearable
        />

        <!-- Status Filter Tabs -->
        <div class="flex items-center gap-2 w-full md:w-auto justify-end">
          <UButtonGroup size="sm">
            <UButton
              :variant="statusFilter === 'all' ? 'solid' : 'outline'"
              color="gray"
              @click="statusFilter = 'all'"
            >
              All ({{ totalCount }})
            </UButton>
            <UButton
              :variant="statusFilter === 'active' ? 'solid' : 'outline'"
              color="gray"
              @click="statusFilter = 'active'"
            >
              Active ({{ pendingCount }})
            </UButton>
            <UButton
              :variant="statusFilter === 'completed' ? 'solid' : 'outline'"
              color="gray"
              @click="statusFilter = 'completed'"
            >
              Completed ({{ completedCount }})
            </UButton>
          </UButtonGroup>
        </div>
      </div>
    </UCard>

    <!-- Task List -->
    <div v-if="pending" class="py-12 text-center text-gray-500">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin mx-auto mb-2 text-primary-500" />
      <p>Loading tasks from database...</p>
    </div>

    <div v-else-if="filteredTodos.length === 0" class="text-center py-16 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <UIcon name="i-heroicons-clipboard-document-list" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
      <h3 class="text-lg font-medium">No tasks found</h3>
      <p class="text-sm text-gray-500 mt-1">
        {{ searchQuery || statusFilter !== 'all' ? 'Try adjusting your search or filters' : 'Get started by creating your first task!' }}
      </p>
      <UButton
        to="/todos/new"
        icon="i-heroicons-plus"
        color="primary"
        class="mt-4"
      >
        Create New Task
      </UButton>
    </div>

    <div v-else class="space-y-3">
      <UCard
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="hover:border-primary-500/50 transition-colors cursor-pointer"
        @click="navigateTo(`/todos/${todo.id}`)"
      >
        <div class="flex items-start justify-between gap-4">
          <!-- Checkbox & Content -->
          <div class="flex items-start gap-3 flex-1 min-w-0" @click.stop>
            <UCheckbox
              :model-value="todo.completed"
              class="mt-1"
              @update:model-value="toggleComplete(todo.id)"
            />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span
                  class="font-semibold text-base"
                  :class="{ 'line-through text-gray-400 dark:text-gray-500': todo.completed }"
                >
                  {{ todo.title }}
                </span>
                <UBadge
                  :color="getCategoryColor(todo.category)"
                  variant="subtle"
                  size="xs"
                >
                  {{ todo.category || 'General' }}
                </UBadge>
              </div>
              <p v-if="todo.content" class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {{ todo.content }}
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-1" @click.stop>
            <UButton
              :to="`/todos/${todo.id}`"
              icon="i-heroicons-pencil-square"
              color="gray"
              variant="ghost"
              size="xs"
              aria-label="Edit task"
            />
            <UButton
              icon="i-heroicons-trash"
              color="red"
              variant="ghost"
              size="xs"
              aria-label="Delete task"
              @click="deleteTask(todo.id)"
            />
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Todo } from "~~/server/database/schema";

const { data: todos, pending, refresh } = await useFetch<Todo[]>("/api/todos", {
  default: () => [],
});

const searchQuery = ref("");
const statusFilter = ref<"all" | "active" | "completed">("all");

const totalCount = computed(() => todos.value.length);
const completedCount = computed(() => todos.value.filter((t) => t.completed).length);
const pendingCount = computed(() => todos.value.filter((t) => !t.completed).length);

const filteredTodos = computed(() => {
  return todos.value.filter((todo) => {
    // Status match
    if (statusFilter.value === "active" && todo.completed) return false;
    if (statusFilter.value === "completed" && !todo.completed) return false;

    // Search query match
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase();
      const titleMatch = todo.title.toLowerCase().includes(q);
      const contentMatch = todo.content?.toLowerCase().includes(q);
      const categoryMatch = todo.category?.toLowerCase().includes(q);
      return titleMatch || contentMatch || categoryMatch;
    }

    return true;
  });
});

const toggleComplete = async (id: string) => {
  await $fetch(`/api/todos/${id}/toggle`, {
    method: "PATCH",
  });
  await refresh();
};

const deleteTask = async (id: string) => {
  if (confirm("Are you sure you want to delete this task?")) {
    await $fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    await refresh();
  }
};

const getCategoryColor = (category?: string | null) => {
  switch (category?.toLowerCase()) {
    case "development":
      return "blue";
    case "design":
      return "purple";
    case "testing":
      return "amber";
    case "docs":
      return "cyan";
    default:
      return "gray";
  }
};
</script>
