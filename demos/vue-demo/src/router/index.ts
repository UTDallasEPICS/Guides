import { createRouter, createWebHistory } from 'vue-router'
import Todo from '../views/Todo.vue'
import Todos from '../views/Todos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/todos',
      name: 'home',
      component: Todos
    },
    {
      path: '/todo/:todo',
      name: 'todo',
      component: Todo
    }
  ]
})

export default router
