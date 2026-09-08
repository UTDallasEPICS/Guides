# Users, Roles, and Permissions

This guide covers how to model user accounts, profiles, roles, and authorization in web applications using **[Better Auth](https://www.better-auth.com/)** and **Prisma ORM**.

---

## 1. Organizing User Information

In modern web applications, authentication and authorization are kept distinct:
- **Authentication**: Proving *who* the user is (handled natively by Better Auth).
- **Authorization**: Determining *what* the user is allowed to do (roles, permissions, and domain profiles).

We maintain a central `User` model for all logins and relate specific profiles (such as `EmployeeProfile` or `CustomerProfile`) to it.

### Prisma Schema with Better Auth Core Models

Better Auth uses standard core models (`User`, `Session`, `Account`, `Verification`). Application-specific profile models link directly to Better Auth's `User` model via `userId`.

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

// ---------------------------------------------
// Better Auth Core Models
// ---------------------------------------------

model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  emailVerified Boolean   @default(false)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  sessions      Session[]
  accounts      Account[]

  // Optional: Global role field (used with Better Auth Admin plugin)
  role          String?   @default("user")

  // Application profile relationships
  employeeProfile EmployeeProfile?
  customerProfile CustomerProfile?

  // Multi-store / multi-tenant relationship
  storeMemberships UserToStore[]

  @@map("user")
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  token     String   @unique
  expiresAt DateTime
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("session")
}

model Account {
  id                    String    @id @default(cuid())
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accountId             String
  providerId            String
  accessToken           String?
  refreshToken          String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  idToken               String?
  password              String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  @@map("account")
}

model Verification {
  id         String   @id @default(cuid())
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("verification")
}

// ---------------------------------------------
// Application Profiles and Roles
// ---------------------------------------------

model EmployeeProfile {
  id         Int       @id @default(autoincrement())
  startDate  DateTime  @default(now())
  endDate    DateTime?
  department String

  // Role assigned to this employee profile
  roleId     Int
  role       Role      @relation(fields: [roleId], references: [id])

  // One-to-one link to Better Auth User
  userId     String    @unique
  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model CustomerProfile {
  id        Int       @id @default(autoincrement())
  birthDate DateTime?

  // One-to-one link to Better Auth User
  userId    String    @unique
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Role {
  id               Int               @id @default(autoincrement())
  name             String            @unique // e.g. "admin", "manager", "staff"
  title            String            @unique // e.g. "Administrator", "Store Manager", "Staff Member"

  employeeProfiles EmployeeProfile[]
  storeAssignments UserToStore[]
}
```

---

## 2. Checking User Types & Profiles

Because all users authenticate through the same Better Auth `User` table, we can identify what type of user someone is by checking for the presence of their related profile:

```ts
// server/api/me.get.ts
export default defineEventHandler(async (event) => {
  // 1. Get authenticated session from Better Auth
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  // 2. Fetch User with profile relations from Prisma
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      employeeProfile: {
        include: { role: true },
      },
      customerProfile: true,
    },
  });

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" });
  }

  if (user.employeeProfile) {
    // User is an employee
    const roleName = user.employeeProfile.role.name;
    return { type: "employee", role: roleName, profile: user.employeeProfile };
  }

  if (user.customerProfile) {
    // User is a customer
    return { type: "customer", profile: user.customerProfile };
  }

  return { type: "unassigned", user: session.user };
});
```

---

## 3. Role-Based Access Control (RBAC)

There are two primary approaches to managing roles with Better Auth:

### Approach A: Better Auth Built-in Admin Plugin

Better Auth provides an `admin` plugin that manages global roles directly on the `User` table and session payload:

```ts
// server/utils/auth.ts
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  plugins: [
    admin({
      defaultRole: "user",
      adminRole: "admin",
    }),
  ],
});
```

With the admin plugin enabled, `session.user.role` is automatically included in session responses:

```ts
// server/api/admin/metrics.get.ts
export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session || session.user.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden: Admin privileges required",
    });
  }

  return { status: "success", data: { totalRevenue: 50000 } };
});
```

### Approach B: Domain Profile Roles via Prisma Relations

When roles belong to specific business profiles (e.g. employees have job roles, while customers have membership tiers), connect the `Role` table to the specific profile model:

```ts
// server/api/employee/manage.post.ts
export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      employeeProfile: {
        include: { role: true },
      },
    },
  });

  if (!user?.employeeProfile || user.employeeProfile.role.name !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden: User is not an authorized Admin Employee",
    });
  }

  // Perform administrative action
  return { message: "Employee profile updated" };
});
```

---

## 4. Multi-Tenant / Contextual Roles (e.g., Multiple Stores)

In many systems, a user’s role depends on the specific location, store, or organization they are operating within. For example, a user might be a **Manager** at Store A, but only a regular **Staff** member at Store B.

We model this relationship using a join table:

```prisma
model Store {
  id          Int           @id @default(autoincrement())
  name        String
  location    String
  userToStore UserToStore[]
}

model UserToStore {
  id        Int       @id @default(autoincrement())
  startDate DateTime  @default(now())
  endDate   DateTime?

  userId    String
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  storeId   Int
  store     Store     @relation(fields: [storeId], references: [id], onDelete: Cascade)

  roleId    Int
  role      Role      @relation(fields: [roleId], references: [id])

  @@unique([userId, storeId, roleId])
}
```

To verify a user's role at a specific store:

```ts
// server/api/stores/[storeId]/inventory.post.ts
export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const storeId = parseInt(getRouterParam(event, "storeId") || "0");

  // Query relationship for this specific user and store
  const membership = await prisma.userToStore.findFirst({
    where: {
      userId: session.user.id,
      storeId: storeId,
      role: {
        name: { in: ["manager", "admin"] },
      },
    },
    include: { role: true },
  });

  if (!membership) {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden: You do not have manager rights for this store",
    });
  }

  // Authorized to update inventory
  return { success: true };
});
```

> **Tip**: Better Auth also provides an official **`organization` plugin** out-of-the-box for multi-tenant applications, supporting Organizations, Teams, Members, Invitations, and built-in role assignment (`auth.api.hasPermission`).

---

## 5. Granular / Fine-Grained Permissions

Role-based authorization works well for broad tiers of access, but complex systems often need granular operation-level permissions (e.g., specific capabilities like `can_open_registers` or `can_process_refunds`).

### Modeling Granular Permissions in Prisma

```prisma
model UserToStore {
  id                    Int       @id @default(autoincrement())
  startDate             DateTime  @default(now())
  endDate               DateTime?

  // Granular capability flags
  canOpenRegisters      Boolean   @default(false)
  canReceiveShipments   Boolean   @default(false)
  canProcessRefunds     Boolean   @default(false)

  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  storeId               Int
  store                 Store     @relation(fields: [storeId], references: [id], onDelete: Cascade)

  @@unique([userId, storeId])
}
```

Enforcing granular permission flags in backend routes:

```ts
// server/api/stores/[storeId]/refund.post.ts
export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const storeId = parseInt(getRouterParam(event, "storeId") || "0");

  const permission = await prisma.userToStore.findUnique({
    where: {
      userId_storeId: {
        userId: session.user.id,
        storeId: storeId,
      },
    },
  });

  if (!permission || !permission.canProcessRefunds) {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden: You do not have permission to process refunds",
    });
  }

  // Execute refund logic...
  return { success: true, message: "Refund processed successfully" };
});
```

---

## 6. Frontend Navigation & UI Guards

While backend API routes **must always** be protected with session and role checks, the frontend should conditionally render UI elements and restrict navigation for a smooth user experience.

### Client-Side Route Middleware (`middleware/admin-only.ts`)

```ts
// middleware/admin-only.ts
import { authClient } from "~/utils/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session } = await authClient.useSession();

  if (!session.value) {
    return navigateTo("/login");
  }

  if (session.value.user.role !== "admin") {
    return navigateTo("/unauthorized");
  }
});
```

### Conditional Rendering in Vue Components

```vue
<!-- components/StoreDashboard.vue -->
<template>
  <div>
    <h1>Store Management</h1>

    <!-- Visible to all logged-in users -->
    <section>
      <h2>General Information</h2>
      <p>Store hours: 9 AM - 9 PM</p>
    </section>

    <!-- Visible only to users with Admin role -->
    <section v-if="session.data?.user.role === 'admin'">
      <h2>Admin Panel</h2>
      <button @click="openStoreSettings">Configure Store</button>
    </section>
  </div>
</template>

<script setup>
import { authClient } from "~/utils/auth-client";

const session = authClient.useSession();
</script>
```
