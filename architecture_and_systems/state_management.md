## State Management

State management is a crucial concept in web development, especially in frameworks like React and Vue. It helps in breaking data storage and functions out of components, making them accessible across multiple components as reusable functions. In React, this is commonly achieved using hooks and Redux, while in Vue, it can be done using composables and Pinia with composition syntax.

### React

React provides a built-in state management solution called hooks, which allow you to manage state within functional components. The most commonly used hook for state management is the `useState` hook. It allows you to declare and update state variables within functional components.

Here's an example of using `useState` in React:

```jsx
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
```

In this example, we use the `useState` hook to declare a state variable `count` and a function `setCount` to update its value. The `increment` function increases the count when the button is clicked.

You can also create your own hooks, as shown below:

```jsx
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

function App() {
  const { data, isLoading, error } = useFetch("https://api.example.com/data");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data && (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
```

Now, let's talk about Redux, a popular state management library for React. Redux allows you to manage the state of your entire application in a central store. It follows a unidirectional data flow and provides a predictable way to handle state changes.

To use Redux, you need to define actions, reducers, and a store. Actions represent the events that can occur in your application, reducers handle those actions and update the state, and the store holds the state of your application.

Here's a simplified example of using Redux in React:

1. Define an action:

```jsx
const increment = () => {
  return {
    type: "INCREMENT",
  };
};
```

2. Define a reducer:

```jsx
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    default:
      return state;
  }
};
```

3. Create a store:

```jsx
import { createStore } from "redux";
import counterReducer from "./reducers/counterReducer";

const store = createStore(counterReducer);
```

4. Connect your components to the store:

```jsx
import React from "react";
import { connect } from "react-redux";
import { increment } from "./actions/counterActions";

const Counter = ({ count, increment }) => {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    count: state,
  };
};

const mapDispatchToProps = {
  increment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

In this example, we define an action `increment`, a reducer `counterReducer`, and create a store using `createStore` from Redux. Then, we connect our component to the store using the `connect` function from `react-redux`. The `mapStateToProps` function maps the state from the store to props, and `mapDispatchToProps` maps the actions to props.

### Vue

To break out functionality in Vue, we can use composables.

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

To manage state in Vue, we can create our own simple composables for sharing functionality, and Pinia for managing shared data.

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
