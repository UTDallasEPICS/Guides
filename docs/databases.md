# Databases and SQLite

In web applications, databases are used to store, organize, and query persistent data such as users, products, orders, and application settings.

At EPICS, our standard database is **[SQLite](https://www.sqlite.org/)**, paired with **[Prisma ORM](https://www.prisma.io/)** for schema management and type-safe data access.

---

## What is SQLite?

SQLite is a lightweight, self-contained, serverless, and zero-configuration SQL database engine.

Unlike traditional database systems that run as separate background server processes listening on a network port, SQLite reads and writes directly to a single file on disk (for example, `dev.db`).

### Key Advantages of SQLite

1. **Zero Configuration**: No database server daemon to install, configure, authenticate, or manage.
2. **Single-File Storage**: The complete database (all tables, indices, and data) resides in one portable disk file.
3. **Full ACID Compliance**: Supports atomic transactions, ensuring data integrity and reliability even during power loss or application crashes.
4. **Blazing Fast Performance**: Because SQLite runs in-process with your application, queries execute with zero network latency.
5. **Seamless Development & Testing**: Setting up or resetting a database is as simple as creating or deleting a local file.

---

## Relational Data and SQL Fundamentals

SQLite uses **SQL (Structured Query Language)** to define schemas and manipulate data.

In relational databases:
- **Tables** represent distinct entities (e.g., `Users`, `Orders`, `Products`).
- **Columns** (fields) define the attributes of an entity with specific data types (e.g., `INTEGER`, `TEXT`, `REAL`, `BOOLEAN`).
- **Rows** (records) represent individual data items.
- **Primary Keys** uniquely identify each row in a table.
- **Foreign Keys** establish relationships between tables.

### Basic SQL Operations in SQLite

#### 1. Creating a Table
```sql
CREATE TABLE employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  age INTEGER,
  department TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. Inserting Records
```sql
INSERT INTO employees (name, email, age, department)
VALUES ('Jane Doe', 'jane@example.com', 28, 'Engineering');
```

#### 3. Retrieving Records
```sql
-- Retrieve all employees in Engineering ordered by age
SELECT id, name, email, age, department
FROM employees
WHERE department = 'Engineering'
ORDER BY age ASC;
```

#### 4. Updating Records
```sql
UPDATE employees
SET department = 'Product Management'
WHERE email = 'jane@example.com';
```

#### 5. Deleting Records
```sql
DELETE FROM employees
WHERE id = 1;
```

#### 6. Joins and Aggregations
Relational databases allow connecting tables using Foreign Keys and calculating aggregate metrics:

```sql
-- Calculate total revenue per customer
SELECT
  customers.id AS customer_id,
  customers.name AS customer_name,
  SUM(orders.total_amount) AS total_spent,
  COUNT(orders.id) AS order_count
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id
WHERE orders.status = 'completed'
GROUP BY customers.id, customers.name
ORDER BY total_spent DESC
LIMIT 10;
```

---

## Working with SQLite Using Prisma ORM

In modern JavaScript and TypeScript applications (such as Nuxt or Node.js), we use **Prisma ORM** to interact with SQLite. Prisma provides automatic database migrations, schema definitions, and fully type-safe queries.

### 1. Defining Your Schema (`prisma/schema.prisma`)

Configure SQLite as the database provider in your Prisma schema:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model Customer {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())

  orders    Order[]

  @@map("customers")
}

model Order {
  id          Int      @id @default(autoincrement())
  totalAmount Float
  status      String   @default("pending")
  createdAt   DateTime @default(now())

  customerId  Int
  customer    Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)

  @@map("orders")
}
```

### 2. Initializing SQLite with Prisma

To create and apply the database tables to your SQLite file:

```bash
# Push schema changes directly to the SQLite dev.db file
npx prisma db push

# Or create a named migration history
npx prisma migrate dev --name init
```

Prisma will create the `dev.db` SQLite database file in your project automatically.

### 3. Querying SQLite with Prisma Client

Prisma translates TypeScript queries into optimized SQLite SQL queries:

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new Customer with related Orders
const newCustomer = await prisma.customer.create({
  data: {
    name: "Alex Smith",
    email: "alex@example.com",
    orders: {
      create: [
        { totalAmount: 49.99, status: "completed" },
        { totalAmount: 120.00, status: "completed" },
      ],
    },
  },
  include: {
    orders: true,
  },
});

// Query top customers with aggregated order metrics
const topCustomers = await prisma.customer.findMany({
  where: {
    orders: {
      some: {
        status: "completed",
      },
    },
  },
  include: {
    orders: true,
  },
  orderBy: {
    createdAt: "desc",
  },
  take: 10,
});
```

---

## Inspecting Your SQLite Database

Prisma includes **Prisma Studio**, a visual database browser for inspecting and editing records in your SQLite database:

```bash
npx prisma studio
```

This launches a local web interface at `http://localhost:5555` where you can view all tables, rows, and relationships stored inside your SQLite database file.
