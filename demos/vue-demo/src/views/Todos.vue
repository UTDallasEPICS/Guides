<template>
  <div class="todo-list">
    <h1>Todo List</h1>
    <button @click="router.push('/todo/0')">Add</button>
    <div>
      <TodoItem @select="selectTodo" v-for="todo in todos" :key="todo.id" :title="todo.title" :id="todo.id">
        <!-- default slot content -->
        <span> {{ todo.content }}</span>
      </TodoItem>
    </div>
  </div>
</template>

<style>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>

<script setup lang="ts">
import { useTodosStore } from '@/stores/todos';
import { storeToRefs } from 'pinia';
import TodoItem from "@/components/TodoItem.vue";
import { useRouter } from 'vue-router';
const todoStore = useTodosStore();
const { todos } = storeToRefs(todoStore);
const router = useRouter();
const selectTodo = (id: string) => {
  router.push(`/todo/${id}`);
};
</script>