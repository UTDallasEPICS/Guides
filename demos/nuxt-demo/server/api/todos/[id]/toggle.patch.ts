import { eq } from "drizzle-orm";
import { db, schema } from "../../../utils/db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID is required" });
  }

  const [todo] = await db
    .select()
    .from(schema.todos)
    .where(eq(schema.todos.id, id));

  if (!todo) {
    throw createError({ statusCode: 404, statusMessage: "Todo not found" });
  }

  const newStatus = !todo.completed;

  await db
    .update(schema.todos)
    .set({ completed: newStatus })
    .where(eq(schema.todos.id, id));

  return { id, completed: newStatus };
});
