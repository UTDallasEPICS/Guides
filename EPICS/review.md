# Proper use of relations when rendering data

https://github.com/UTDallasEPICS/UTDesign-Procurement/blob/567957d137cc3bbf672a16fa783c9af6dfa1f9ff/procurement-manager/pages/orders/admin.tsx#L1

In this example, we are loading a list of projects, and then for each project we are making another prisma query to load the requests. Then in the UI, we are relying on the index of a project in the projects array and the index of the corresponding list of requests being the same. This should be leveraging prisma relations to join the tables in one query so that each project has its requests as an array on itself.

We also have two functions, fetchProjects and fetchVendors that do not do anything – they are called in the custom search function, but they do not perform any state updates.

Because of how we need to fetch both initial data and data when searches are performed, the data requests should all be done using useEffect instead of getServerSideProps – this way there is less code to manage and we do not have to worry about juggling using data from props vs data that is fetched clientside. In general, getServerSideProps should _only_ be used for data that is _not_ expected to change in response to a user action. Supporting search for a table means that we will have to perform data fetching from the client side and cannot rely exclusively on server side rendering.

We also need to be enforcing clean up of commented out code – that code needs either an explanation as to why it is commented out, or it needs to be removed entirely.

# Long names and nested folder structures

https://github.com/UTDallasEPICS/Legacy-Housekeeping-QC/tree/AWSIMAGEUPLOAD/src/components/roomScreenDashboard/componentsForFloorSelection

Discourage overly nested structures and long file/folder names. The above example can replace 'componentsForFloorSelection' with simply "FloorSelection". There are also deeply nested folder structures that can be condensed, largely by creating generalized components. For example, there are several variations on doing a grid of cards - there should be one Card component, and one Grid component, and then they are composed to produce a page, instead of creating a different component file for every possible usage.

# Secrets and URLs

Need to be handled via .env. We should not be hard coding something like

```js
const res = await fetch("https://127.0.0.1:5000/api/endpoint");
```

as this is _not_ a portable way to define API endpoints. Instead,

```js
const res = await fetch(import.meta.env.API_URL + "/api/endpoint");
```

However, if we are making a request to our own API, we do not have specify a domain at all as our Nuxt/Next projects all run on the same domain. We can simply do

```js
const res = await fetch("/api/endpoint");
```

Secrets (even not-secret things like frontend API keys) must also be handled with .env so that we do not have to rewrite code to change which API keys are used.

# Requirements Review

- Create requirements document for project (Requirements.md)
  - Functional Requirements - what does it need to do? (What do users need to be able to do?)
  - Process Requirements - what does the user journey look like? (How does a user achieve the objective with the interface?)
  - Implementation Requirements - how do we implement that user journey? (API routes, buttons, forms, functions)
- Establish and document which requirements have been fulfilled
  - Create an issue with unfulfilled requirements listed

# Code Reviews

## Application Structure

  - Componentization of UI: using components to cut down on code duplication, with proper usage of props and events to send and receive information.
  - components with large component trees may need to use a pinia store to minimize prop drilling (where a prop is passed many times down through the component tree).

### common patterns

  - components with duplicate functionality should try to use composables (not expected to be very common)
  - Components are used to unify styling of semantic elements, such as labels and buttons.
  - Putting universal components everywhere instead of using the top level App component, e.g. navbars, notifications, etc are copied to every page instead of only existing once in the top level App or layout component.
  - API routes are named with proper semantics and formatting (e.g. user.get.ts (nuxt) or user.ts (next) instead of getUser.get.ts, users.get.ts for bulk operations)
  - database clients should either be implemented in middleware (`event.context.client` in Nuxt) or as an export from a `db.ts` file and NOT imported & instantiated in every route handler because otherwise we end up with a ton of database connections.
  - Do not use the native date input as it does not nicely handle timezones in its output. Use a datepicker library that outputs an ISO string in UTC. Complicated browser controls are also often difficult to style nicely, with pseudoelements that are not the same across all browsers.

## Code Flow & Quality

  - proper usage of framework primitives (e.g. refs, computeds, watchers for Vue, useEffect and useState for React)
  - in particular, students tend to under-utilize computeds and watchers, instead writing functions that directly set a value when called or have to be explicitly called instead of automatically reacting to changes

      ```jsx
      let f = 0
      const incomingData = {total:6}
      function setF(incomingData) {
        f = incomingData.total
      }
      setF(incomingData)
      // vs
      const incomingData = ref({total:6})
      const f = computed(() => incomingData.value.total)
      ```

  - Students sometimes take several loops to achieve something that can be done in one
  - Students under-utilize iterator functions such as `for of`, `filter`, `map`, `reduce`, `Object.entries`
  - Students tend to leave lots of commented out old code all over the place. students must get used to traversing the commit history to recover old code
  - Students tend to leave `console.log` all over the place. these must either be gated behind a debug flag or removed when no longer needed for testing
  - Students tend to have terrible formatting. all projects must have linting setup. students must have lint-on-save setup and we should have pre-commit hooks for every repo that run the linter.
  - Students under-utilize `async/await`, instead using the `.then` pattern.

## Database

  - all projects must use Prisma as their ORM
  - names of properties on Prisma models should *not* include the model name. I already know that `User.first_name` is on the User model, `User.user_first_name` is redundant.
  - Prisma model definitions must use the following syntax
  ```prisma
    model User {
      id Int @id
      snake_case String
      relationId Int @map("relation_id")
      Relation Relation @relation(fields: [relation_id], references: [id])
      @@map("users")
    }
    model Relation {
      id Int @id @default(autoincrement())
    }
  ```

## Dependencies

  - students sometimes add many extraneous dependencies. check for any that are unused.
  - All projects must use tailwind (we still need to teach CSS though)
  - all projects must use Auth0, or SSO for internal UTD projects
  - we strongly discourage UI libraries. Headless UI provides sufficient functionality for most use cases while allowing full customization of the UI, and an important part of the learning experience is understanding how to build UI components. It is not that difficult to create a Card or Table component, and the UX/UI designers will always end up asking for something custom anyways so it's important to know how to build them yourself. I am interested in any additional libraries like Headless that allow for the functionality of a UI element to be combined with an arbitrary UI, as while UX/UI designers often want creative and different UI, they rarely want truly novel functionality. This makes functionality oriented libraries like Headless more flexible and broadly applicable. Headless and Tailwind are also usable across multiple frameworks with first-class support, as opposed to libraries such as Shadcn which is React only.

## Test data

- seed.ts
- should take user email address via .env so that students can pass their email address in without having to commit it
- must create test data for all tables

## Authorization

- check that route access is properly gated based on user role in the backend. Frontend can rely on conditional rendering to simply hide relevant UI elements, but the backend must properly reject unauthorized actions
- loading the user profile into the frontend can be accomplished with either cookies or by creating an API route that the frontend hits on load.
- we do not store role information in Auth0, we only use them as a login provider

## Reference implementations

### Authentication with Auth0

TODO

### File Uploads

TODO

# Team workflows during the semester

- Students should _not_ be breaking up into frontend vs backend teams. Students should be responsible for features end to end.
- Mentors can provide task guidance for the first few weeks, but eventually the students should be determining their own tasks based on their understanding of the project
