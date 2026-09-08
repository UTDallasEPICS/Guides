# EPICS Web Development Guides

This repository contains engineering guides, architecture patterns, tooling references, and starter demos prepared by UTDesign EPICS students, mentors, and staff members.

---

## Getting Started

For all students working on CS/web projects, start with **Taz's Getting Started Videos**. Watching these videos counts as one of your required workshops for the semester.

### [Taz's Getting Started Videos](https://utdallas.box.com/v/epics-cs-introduction-videos)
Core topics covered:
1. **Git**: Command-line version control and workflows
2. **GitHub**: Pull requests, branching, and collaboration
3. **Bash / CLI**: Navigating and executing tasks in the terminal
4. **Clients, Servers, and Databases**: Full-stack architecture fundamentals
5. **Browser Developer Tools**: Inspecting DOM, network requests, and debugging

---

## Architecture & System Design

These guides cover fundamental system design and architectural concepts for building scalable, maintainable full-stack applications:

- **[Databases](./docs/databases.md)**: Relational vs. non-relational databases, SQL schema design, normalization, and Prisma ORM.
- **[Data Flow in Applications](./docs/data_flow.md)**: Request/response lifecycle, HTTP methods, Fetch API in Vue/Nuxt, and Server-Side Rendering (SSR).
- **[Frontend vs Backend Routing](./docs/frontend_vs_backend_routing.md)**: Differences between client-side SPA routing and server API routes, redirects, and navigation.
- **[Component-Based Design](./docs/component_based_design.md)**: Building modular user interfaces with Vue Single File Components (SFCs), props, and custom events.
- **[State Management](./docs/state_management.md)**: Managing component-level state and reusable stateful logic with Vue Composables and global application state with Pinia.
- **[Authentication and Better Auth](./docs/authentication.md)**: Password hashing (Argon2/scrypt), session cookies, JWTs, and end-to-end authentication setup using Better Auth, Nuxt, and Prisma.
- **[Users, Roles, and Permissions](./docs/users_roles_and_permissions.md)**: Modeling user accounts, role-based access control (RBAC), multi-tenant/store relationships, and granular permissions with Better Auth and Prisma.

---

## EPICS Standards & Project Guidelines

- **[Tech Stack Recommendations](./EPICS/tech_stack.md)**: Approved frameworks, databases, and deployment options for EPICS projects (Nuxt/Vue, SQLite, Prisma, Docker).
- **[End of Semester Checklist](./end_of_sem.md)**: Deliverable requirements, project repository handoff checklist, and documentation criteria.
- **[Code Review & Quality Guide](./EPICS/review.md)**: Expectations for code quality, project structure, framework conventions, Prisma usage, and dependency management.
- **[General Policies & Recommendations](./EPICS/policies.md)**: Codebase rules, environment variable management, and team best practices.
- **[Student Onboarding Timeline](./EPICS/student_onboard.md)**: Week-by-week onboarding milestones for new team members.
- **[Recommended VS Code Extensions](./EPICS/vscode_extensions.md)**: Recommended editor tooling and extensions for Vue, Prisma, Tailwind, and TypeScript.
- **[Example Project README](./EPICS/example_readme.md)**: Reference template for project README files.

---

## Tooling & Documentation References

- **[Documentation Tools](./docs/documentation_tools.md)**: Markdown syntax, Mermaid diagram syntax, and UML class diagram tutorials.
- **[Git Tutorials](./docs/git_tutorials.md)**: Interactive tutorials for learning Git branching and official Git guides.
- **[Web Development Video Playlist](./docs/webdev_playlist.md)**: Curated video playlist covering essential web development concepts.

---

## Demos

Interactive example projects included in this repository:

- **[Nuxt 4 Full-Stack Demo](./demos/nuxt-demo/)**: Full-stack application combining frontend and backend into Nuxt 4 with Nuxt UI, Tailwind CSS, SQLite, Drizzle ORM, page layouts, and dedicated editing routes.
- **[Vue 3 SPA Demo](./demos/vue-demo/)**: Single Page Application built with Vue 3, Vite, Pinia, Vue Router, and TypeScript.
- **[Nitro & Drizzle ORM Server Demo](./demos/servers/)**: Standalone backend server demonstration built with Nitro, Drizzle ORM, and SQLite.
- **[HTML / CSS / JavaScript Demo](./demos/html_css_js/)**: Foundational client-side demonstration without frameworks.
