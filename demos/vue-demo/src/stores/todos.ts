import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTodosStore = defineStore('todos', () => {
  const todos = ref([])
  // TODO: thoughts on doing a full list reload vs client side update only
  const getTodos = async () => {
    const response = await fetch('/api/todos');
    todos.value = await response.json();
  }
  const createTodo = async (newTodo) => {
    await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });
    await getTodos();
  }

  const updateTodo = async (updatedTodo) => {
    await fetch(`/api/todos/${updatedTodo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTodo)
    });
    await getTodos();
  }

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE'
    });
    await getTodos();
  }
  // TODO: thoughts on loading direct from the list vs loading from api
  // list may not have all values needed for editing due to performance considerations
  const getTodo = async id => {
    const res = await fetch(`/api/todo/${id}`, {
      method: 'GET'
    });
    return await res.json()
  }

  return { todos, updateTodo, createTodo, deleteTodo, getTodos, getTodo }
})
