# State Management

State management is a crucial concept in web development, especially in frameworks like Vue. It helps in breaking data storage and functions out of components, making them accessible across multiple components as reusable functions. In Vue, this is achieved using composables for stateful logic and Pinia for global state management with composition syntax.

## Composables

To break out reusable stateful functionality in Vue, we can use composables:

```js
export function useFetch(url) {
  const data = ref(null);
  const isLoading = ref(true);
  const error = ref(null);

  onMounted(async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      data.value = json;
      isLoading.value = false;
    } catch (error) {
      error.value = error;
      isLoading.value = false;
    }
  });

  return {
    data,
    isLoading,
    error,
  };
}
```

```html
<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <ul v-else>
      <li v-for="item in data" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted } from "vue";
  import { useFetch } from "./useFetch";
  const { data, isLoading, error } = useFetch("https://api.example.com/data");
</script>
```

## Global State with Pinia

To manage global shared state in Vue, we can use Pinia:

1. Define a store:

```javascript
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);

  const increment = () => {
    count.value++;
  };

  return {
    count,
    increment,
  };
});
```

In this example, we define a store called `counter` using `defineStore` from Pinia. Inside the store, we use the Composition API to define a reactive state variable `count` initialized to 0. We also define an `increment` function that increments the `count` value.

2. Use the store in a component:

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { useCounterStore } from "./store";
import { ref } from "vue";

const counterStore = useCounterStore();
const count = counterStore.count;
const increment = counterStore.increment;
</script>
```
