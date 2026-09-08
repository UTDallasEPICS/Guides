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

- **[Databases](./architecture_and_systems/databases.md)**: Relational vs. non-relational databases, SQL schema design, normalization, and Prisma ORM.
- **[Data Flow in Applications](./architecture_and_systems/data_flow.md)**: Request/response lifecycle, HTTP methods, Fetch API in Vue/Nuxt, and Server-Side Rendering (SSR).
- **[Frontend vs Backend Routing](./architecture_and_systems/frontend_vs_backend_routing.md)**: Differences between client-side SPA routing and server API routes, redirects, and navigation.
- **[Component-Based Design](./architecture_and_systems/component_based_design.md)**: Building modular user interfaces with Vue Single File Components (SFCs), props, and custom events.
- **[State Management](./architecture_and_systems/state_management.md)**: Managing component-level state and reusable stateful logic with Vue Composables and global application state with Pinia.
- **[Authentication and Better Auth](./architecture_and_systems/authentication.md)**: Password hashing (Argon2/scrypt), session cookies, JWTs, and end-to-end authentication setup using Better Auth, Nuxt, and Prisma.
- **[Users, Roles, and Permissions](./architecture_and_systems/users_roles_and_permissions.md)**: Modeling user accounts, role-based access control (RBAC), multi-tenant/store relationships, and granular permissions with Better Auth and Prisma.

---

## EPICS Standards & Project Guidelines

- **[Tech Stack Recommendations](./EPICS/tech_stack.md)**: Approved frameworks, databases, and deployment options for EPICS projects (Nuxt/Vue, PostgreSQL/MySQL, Prisma, Docker).
- **[End of Semester Checklist](./end_of_sem.md)**: Deliverable requirements, project repository handoff checklist, and documentation criteria.
- **[Code Review & Quality Guide](./EPICS/review.md)**: Expectations for code quality, project structure, framework conventions, Prisma usage, and dependency management.
- **[General Policies & Recommendations](./EPICS/policies.md)**: Codebase rules, environment variable management, and team best practices.
- **[Student Onboarding Timeline](./EPICS/student_onboard.md)**: Week-by-week onboarding milestones for new team members.
- **[Recommended VS Code Extensions](./EPICS/vscode_extensions.md)**: Recommended editor tooling and extensions for Vue, Prisma, Tailwind, and TypeScript.
- **[Example Project README](./EPICS/example_readme.md)**: Reference template for project README files.

---

## Languages & Frameworks

- **[Web Development Pathway](./languages_and_frameworks/webdev_pathway.md)**: Structured learning path from HTML/CSS/JS fundamentals through modern frameworks.
- **[Express.js Guide](./languages_and_frameworks/express.md)**: Reference notes for Node.js Express server architectures.

---

## Tooling & Environment Setup

- **[Node.js, NVM, and Package Managers](./tooling/node_nvm_npm_pnpm.md)**: Installing Node.js via NVM, comparing npm vs. pnpm.
- **[Docker & Windows Subsystem for Linux (WSL)](./tooling/docker_wsl_setup.md)**: Setting up containerized local development environments on Linux and Windows WSL.
- **[Node.js Files Explained](./tooling/files.md)**: Explanation of `package.json`, lockfiles, `.env`, `.gitignore`, and configuration dotfiles.
- **[Git Repository CLI Setup](./tooling/repo_cli_setup.md)**: SSH keys, GitHub CLI setup, and repository cloning.
- **[Git Tutorials](./tooling/git_tutorials.md)**: Interactive tutorials for learning Git branching and official Git guides.
- **[Prisma with Edge Functions](./tooling/prisma_edge_functions_setup.md)**: Configuring Prisma driver adapters for serverless edge runtimes.
- **[Documentation Tools](./tooling/documentation_tools.md)**: Markdown syntax, Mermaid diagram syntax, and UML class diagram tutorials.
- **[Web Development Video Playlist](./webdev_playlist.md)**: Curated video playlist covering essential web development concepts.

---

## Demos

Interactive example projects included in this repository:

- **[Vue 3 Demo](./demos/vue-demo/)**: Single Page Application built with Vue 3, Vite, Pinia, Vue Router, and TypeScript.
- **[Servers & Prisma Demo](./demos/servers/)**: Node.js backend demonstration with Express, Prisma ORM, and SQLite.
- **[HTML / CSS / JavaScript Demo](./demos/html_css_js/)**: Foundational client-side demonstration without frameworks.
