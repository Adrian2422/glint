# Glint

Glint is a modern SaaS survey platform designed with scalability and data security in mind. The project utilizes a monorepo architecture, ensuring tight integration between the backend, frontend, and shared resources.

## 🛠 Technology Stack

### Frontend
- **Angular 21** – The latest version of the framework for SPA applications.
- **Tailwind CSS 4** - A modern CSS framework for quickly building interfaces.
- **Vitest** – A fast testing framework.

### Backend
- **NestJS 11** - A solid foundation for scalable server-side applications.
- **ZenStack** - Prisma based ORM, providing advanced access control (Access Control Policies) directly within the database schema.
- **PostgreSQL** - A relational database.
- **Passport.js & JWT** - Authentication and authorization system.

### Shared & Tooling
- **TypeScript** - Static typing throughout the project.
- **pnpm** - Efficient package manager with workspace support.
- **Husky & Lint-staged** - Automation of code quality before commits.
- **Concurrently** - A tool for running processes in parallel.

---

## 🚀 Development

### Requirements
- Node.js (latest LTS version)
- pnpm (recommended version 10.x)
- Docker (for the PostgreSQL database)

### Installation
```bash
# Dependency Installation
pnpm install

# Husky Preparation
pnpm prepare
```

### Commands
All key operations can be run from the root directory:

- `pnpm dev` - Runs the frontend, backend, and watcher for the shared package simultaneously.
- `pnpm test` - Runs tests in all applications.
- `pnpm lint` - Checks code correctness and formatting.

### Monorepo Workflow
The project is divided into:
- `apps/web` - Angular client application.
- `apps/api` - NestJS server.
- `packages/shared` - Shared enums, interfaces, and constants.

For changes to `packages/shared`, make sure the package has been built (`pnpm dev` does this automatically in watch mode) so that the changes are visible in `apps/*`.