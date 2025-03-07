# Tech Stack Options

## Web Projects

### Full-Stack Applications

Full-Stack applications consist of a frontend, backend, and database. This is what most EPICS projects end up being. We use JavaScript metaframeworks, which integrate backend and frontend functionality into one codebase.

[Nuxt](https://nuxt.com) (based on Vue.js) or [Next.js](https://nextjs.org) (based on React) are required for new full-stack projects. **Do not** create a standalone server (e.g. H3 or Express.js) without talking to your mentor first.


### Back-End Only Projects

In some cases, we may need only a backend server. These are generally projects where you are creating an API or performing data processing. [Node](https://nodejs.org) with [H3](https://github.com/unjs/h3) is highly recommended.

### Single-Page Applications (SPA)

If we only need a single-page application (SPA) [Vue.js](https://vuejs.org) or [React](https://react.dev) are recommended. There are many front-end frameworks, but these are by far the most popular (for good reason).

### Databases

For web project databases, you may should choose an SQL database ([MySQL](https://www.mysql.com), [PostgreSQL](https://www.postgresql.org), or [SQLite](https://www.sqlite.org/index.html)). Though [MongoDB](https://www.mongodb.com) is popular, it is not optimal for most EPICS projects due to unstructured nature of the database. If you believe MongoDB is a good fit for your project, speak with your mentor. Either way, [Prisma](https://www.prisma.io) is highly recommended for database schema management. Prisma makes it much easier to define and understand how your database is set up and is compatible with all major databases.

### Environment

We use [docker](https://www.docker.com) containers for running infrastructure locally (databases at a minimum, excluding SQLite). Students using Windows as their personal machine will need to setup [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/install).

### Deployment

We use [Amazon Web Services (AWS)](https://aws.amazon.com) for our cloud infrastructure, unless there are partner specific requirements.

## Non-Web Projects

For non-web projects, tech stack is likely to be defined by the partner needs - we don't have many of these in the first place, so we don't have a good standard system yet. In the past, Python has been used for local GUIs that can also connect to hardware.
