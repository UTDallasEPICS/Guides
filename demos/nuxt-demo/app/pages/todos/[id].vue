<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <!-- Breadcrumb & Back Button -->
    <div class="flex items-center justify-between">
      <UButton
        to="/"
        icon="i-heroicons-arrow-left"
        color="gray"
        variant="ghost"
        size="sm"
      >
        Back to Tasks
      </UButton>
      <UBadge v-if="!isNew" :color="form.completed ? 'emerald' : 'amber'" variant="subtle">
        {{ form.completed ? 'Completed' : 'Pending' }}
      </UBadge>
    </div>

    <!-- Main Card Form -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">
            {{ isNew ? 'Create New Task' : 'Edit Task' }}
          </h2>
          <span v-if="!isNew" class="text-xs text-gray-400 font-mono">
            ID: {{ route.params.id }}
          </span>
        </div>
      </template>

      <form @submit.prevent="saveTask" class="space-y-4">
        <!-- Title Input -->
        <UFormGroup label="Title" required :error="errorMessage && !form.title.trim() ? 'Title is required' : ''">
          <UInput
            v-model="form.title"
            placeholder="Enter task title..."
            icon="i-heroicons-pencil"
            autofocus
          />
        </UFormGroup>

        <!-- Category Dropdown -->
        <UFormGroup label="Category">
          <USelect
            v-model="form.category"
            :options="categoryOptions"
          />
        </UFormGroup>

        <!-- Description / Content -->
        <UFormGroup label="Description / Notes">
          <UTextarea
            v-model="form.content"
            placeholder="Add detailed task notes..."
            rows="4"
          />
        </UFormGroup>

        <!-- Completion Checkbox -->
        <UFormGroup v-if="!isNew" label="Status">
          <UCheckbox
            v-model="form.completed"
            label="Mark task as completed"
          />
        </UFormGroup>

        <!-- Error Message Banner -->
        <UAlert
          v-if="errorMessage"
          icon="i-heroicons-exclamation-triangle"
          color="red"
          variant="subtle"
          :title="errorMessage"
        />

        <!-- Form Actions -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div class="flex items-center gap-3">
            <UButton
              type="submit"
              color="primary"
              :loading="isSaving"
              icon="i-heroicons-check"
            >
              {{ isNew ? 'Create Task' : 'Save Changes' }}
            </UButton>
            <UButton
              to="/"
              color="gray"
              variant="ghost"
            >
              Cancel
            </UButton>
          </div>

          <UButton
            v-if="!isNew"
            color="red"
            variant="ghost"
            icon="i-heroicons-trash"
            :loading="isDeleting"
            @click="deleteTask"
          >
            Delete
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import type { Todo } from "~~/server/database/schema";

const route = useRoute();
const router = useRouter();

const isNew = computed(() => route.params.id === "new");

const form = reactive({
  title: "",
  content: "",
  category: "General",
  completed: false,
});

const isSaving = ref(false);
const isDeleting = ref(false);
const errorMessage = ref("");

const categoryOptions = [
  { label: "General", value: "General" },
  { label: "Development", value: "Development" },
  { label: "Design", value: "Design" },
  { label: "Testing", value: "Testing" },
  { label: "Docs", value: "Docs" },
];

onMounted(async () => {
  if (!isNew.value) {
    try {
      const data = await $fetch<Todo>(`/api/todos/${route.params.id}`);
      if (data) {
        form.title = data.title;
        form.content = data.content || "";
        form.category = data.category || "General";
        form.completed = Boolean(data.completed);
      }
    } catch (err: any) {
      errorMessage.value = err.data?.statusMessage || "Failed to load task";
    }
  }
});

const saveTask = async () => {
  if (!form.title.trim()) {
    errorMessage.value = "Please provide a task title.";
    return;
  }

  isSaving.value = true;
  errorMessage.value = "";

  try {
    if (isNew.value) {
      await $fetch("/api/todos", {
        method: "POST",
        body: form,
      });
    } else {
      await $fetch(`/api/todos/${route.params.id}`, {
        method: "PUT",
        body: form,
      });
    }
    await router.push("/");
  } catch (err: any) {
    errorMessage.value = err.data?.statusMessage || "An error occurred while saving.";
  } finally {
    isSaving.value = false;
  }
};

const deleteTask = async () => {
  if (confirm("Are you sure you want to delete this task?")) {
    isDeleting.value = true;
    try {
      await $fetch(`/api/todos/${route.params.id}`, {
        method: "DELETE",
      });
      await router.push("/");
    } catch (err: any) {
      errorMessage.value = err.data?.statusMessage || "Failed to delete task.";
    } finally {
      isDeleting.value = false;
    }
  }
};
</script>
