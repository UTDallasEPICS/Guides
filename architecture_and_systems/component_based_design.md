# Component Based Design

In web development, components are reusable, self-contained building blocks that make up the user interface of a web application. They encapsulate both the structure and behavior of a specific part of a webpage, allowing developers to create complex interfaces by combining and nesting these components.

## Reusability

Components can be easily reused, reducing the overall amount of code that has to be written and - especially - read. For example, instead of defining a card each time it is used, you can create a `Card` component that can be reused with properties.

React Example:

Without Componentization:

```jsx
const App = () => {
  return (
    <div>
      <div className="grid">
        <div className="card">
          <div className="card-header">
            <h2>Title 1</h2>
          </div>
          <div className="card-body">
            <p>Body 1</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2>Title 2</h2>
          </div>
          <div className="card-body">
            <p>Body 2</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2>Title 3</h2>
          </div>
          <div className="card-body">
            <p>Body 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
```

With Componentization:

```jsx
const Card = ({ title, body }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        <p>{body}</p>
      </div>
    </div>
  );
};

export default Card;
```

```jsx
import Card from "./Card";

const App = () => {
  return (
    <div>
      <div className="grid">
        <Card title="Title 1" body="Body 1" />
        <Card title="Title 2" body="Body 2" />
        <Card title="Title 3" body="Body 3" />
      </div>
    </div>
  );
};

export default App;
```

Vue Example:

Without Componentization:

```html
<template>
  <div>
    <div class="grid">
      <div class="card">
        <div class="card-header">
          <h2>Title 1</h2>
        </div>
        <div class="card-body">
          <p>Body 1</p>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h2>Title 2</h2>
        </div>
        <div class="card-body">
          <p>Body 2</p>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h2>Title 3</h2>
        </div>
        <div class="card-body">
          <p>Body 3</p>
        </div>
      </div>
    </div>
  </div>
</template>
```

With Componentization:

```html
<template>
  <div>
    <div class="grid">
      <Card title="Title 1" body="Body 1" />
      <Card title="Title 2" body="Body 2" />
      <Card title="Title 3" body="Body 3" />
    </div>
  </div>
</template>

<script setup>
  import Card from "./components/Card.vue";
</script>
```

In both examples, the first section shows the code without componentization, where the card structure is defined directly inside the grid. In the second section, a Card component is created that accepts props for the title and body of the card. This component is then used inside the parent component to create three instances of the card.

This concept can be applied to any UI element: cards, modals, inputs, dropdowns, layouts, etc.

> Note from Taz: it's easy to go overboard with componentization. Sometimes it's easier to have one component that can be customized by passing in some props rather than creating a component for every possible variation. You can also break a component up into sub components, allowing the component to be built as needed out of its individual parts instead of only usable as an aggregate. See [Headless UI](https://headlessui.com/) for inspiration.

## Ease of Updating & Testing

Component based design makes it easy to update everything. Instead of having to make same change for every instance, you can make the change in one spot and have it automatically affect all usages. For example, if we wanted to add a class to the `h2` tag. Without componentization, we have to modify every instance. With componentization, we simply modify the `Card` component.

It is also easier to create tests for individual components and they can be tested in parallel, massively improving the speed with which tests can be run.

## Component Props & Events

Props and events are two important mechanisms used in component-based web development frameworks, such as React or Vue, to facilitate communication between components.

Props, short for properties, are used to pass data from a parent component to its child component. They allow the parent component to customize and configure the child component by passing values, objects, or functions as props. The child component can then access and use these props in its template or logic to render dynamic content or perform specific actions. Props are typically immutable, meaning they cannot be modified by the child component.

Events, on the other hand, are used to allow child components to communicate with their parent components. Child components can emit events, such as a button click or a form submission, to notify their parent components about certain actions or state changes. The parent component can listen to these events and respond accordingly by executing specific methods or updating its own state.

The combination of props and events enables a flexible and modular approach to building web applications. By passing data down through props, components can be easily reused and composed in different contexts, promoting code reusability and maintainability. On the other hand, events enable components to be interactive and communicate with each other, creating a dynamic and responsive user interface.

### React Example

```jsx
// Parent Component
import React, { useState } from "react";
import ChildComponent from "./ChildComponent";

const ParentComponent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [counter, setCounter] = useState(0);

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleAgeChange = e => {
    setAge(parseInt(e.target.value));
  };

  const incrementCounter = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  return (
    <div>
      <h2>Parent Component</h2>
      <input type="text" value={name} onChange={handleNameChange} />
      <input type="number" value={age} onChange={handleAgeChange} />
      <p>Counter: {counter}</p>
      <ChildComponent
      {/* passing in data and event handlers as props */}
        onIncrementCounter={incrementCounter}
        name={name}
        age={age}
      />
    </div>
  );
};

export default ParentComponent;
```

```jsx
// Child Component

const ChildComponent = ({ name, age, onIncrementCounter }) => {
  return (
    <div>
      <h3>Child Component</h3>
      <p>Name: {name}</p>
      <p>Age: {age}</p>

      <button onClick={onIncrementCounter}>Increment Counter</button>
    </div>
  );
};

export default ChildComponent;
```

### Vue Example

```html
<template>
  <div>
    <h2>Parent Component</h2>
    <!-- v-model is equivalent to :name="name" @update:name="n => name = n" -->
    <!-- it automatically handles updating the value when the child emits an event to update it -->
    <input type="text" v-model="name" />
    <input type="number" v-model="age" />
    <p>Counter: {{ counter }}</p>
    <ChildComponent :name="name" :age="age" @counter="incrementCounter" />
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import ChildComponent from "./ChildComponent.vue";

  const name = ref("");
  const age = ref(0);
  const counter = ref(0);

  const incrementCounter = () => {
    counter.value++;
  };
</script>
```

```html
// ChildComponent.vue
<template>
  <div>
    <h3>Child Component</h3>
    <p>Name: {{ name }}</p>
    <p>Age: {{ age }}</p>
    <!-- event handlers are bound to event emissions instead of passed as props -->
    <button @click="emit('counter')">Increment Counter</button>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits } from "vue";
  // distinction between props and event handlers - defineEmits lists the events that can be listened for
  const props = defineProps(["name", "age"]);
  const emit = defineEmits(["counter"]);
</script>
```
