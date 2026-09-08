import { desc } from "drizzle-orm";
import { db, schema } from "../../utils/db";

export default defineEventHandler(async () => {
  return await db
    .select()
    .from(schema.todos)
    .orderBy(desc(schema.todos.createdAt));
});
