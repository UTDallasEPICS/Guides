<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useTodosStore } from '@/stores/todos';
const todo = ref({ title: "", content: "" });
const route = useRoute();
const router = useRouter();
const todoStore = useTodosStore();
onMounted(async () => {
  if (route.params.todo != '0') {
    todo.value = await todoStore.getTodo(route.params.todo);
  }
});

const updateTodo = async () => {
  await todoStore.updateTodo(todo.value);
  router.go(-1);
};
</script>

<template>
  <div>
    <h2>Edit Todo</h2>
    <p v-if="todo.id">Todo id: {{ todo.id }}</p>
    <p v-else>Todo not saved!</p>
    <input v-model="todo.title" placeholder="Title" />
    <input v-model="todo.content" placeholder="Content" />
    <button @click="updateTodo">Save</button>
    <button @click="router.go(-1)">Cancel</button>
  </div>
</template>
