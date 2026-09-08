import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import path from "node:path";
import * as schema from "../db/schema";

const dbPath = path.resolve(process.cwd(), "todos.db");

const client = createClient({
  url: `file:${dbPath}`,
});

// Auto-initialize the SQLite todos table if it does not exist
client.execute(`
  CREATE TABLE IF NOT EXISTS todos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT
  );
`).catch((err) => {
  console.error("Database initialization error:", err);
});

export const db = drizzle(client, { schema });
export { schema };
