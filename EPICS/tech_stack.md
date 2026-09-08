# Tech Stack Options

## Web Projects

### Full-Stack Applications

Full-Stack applications consist of a frontend, backend, and database. This is what most EPICS projects end up being. We use JavaScript metaframeworks, which integrate backend and frontend functionality into one codebase.

[Nuxt](https://nuxt.com) (based on Vue.js) is required for new full-stack projects. **Do not** create a standalone server (e.g. H3 or Express.js) without talking to your mentor first.


### Back-End Only Projects

In some cases, we may need only a backend server. These are generally projects where you are creating an API or performing data processing. [Node](https://nodejs.org) with [H3](https://github.com/unjs/h3) is highly recommended.

### Single-Page Applications (SPA)

If we only need a single-page application (SPA) [Vue.js](https://vuejs.org) is recommended. There are many front-end frameworks, but Vue is our primary standard.

### Databases

For web project databases, [SQLite](https://www.sqlite.org/index.html) is our required standard. SQLite is a lightweight, zero-configuration, self-contained SQL database engine that stores data directly in a local file, making local setup, testing, and deployment straightforward. [Prisma](https://www.prisma.io) is required for database schema management and type-safe database queries.

### Environment

We use [docker](https://www.docker.com) containers for running infrastructure locally when needed. Students using Windows as their personal machine will need to setup [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/install).

### Deployment

We use [Amazon Web Services (AWS)](https://aws.amazon.com) for our cloud infrastructure, unless there are partner specific requirements.

## Non-Web Projects

For non-web projects, tech stack is likely to be defined by the partner needs - we don't have many of these in the first place, so we don't have a good standard system yet. In the past, Python has been used for local GUIs that can also connect to hardware.
