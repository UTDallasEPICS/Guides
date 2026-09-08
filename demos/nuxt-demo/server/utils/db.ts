import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../database/schema";
import path from "node:path";

const dbPath = path.resolve(process.cwd(), "todos.db");

const client = createClient({
  url: `file:${dbPath}`,
});

// Automatically ensure the todos table exists
client.execute(`
  CREATE TABLE IF NOT EXISTS todos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    completed INTEGER NOT NULL DEFAULT 0,
    category TEXT DEFAULT 'General',
    created_at INTEGER NOT NULL
  );
`).catch((err) => {
  console.error("Database initialization error:", err);
});

export const db = drizzle(client, { schema });
export { schema };
