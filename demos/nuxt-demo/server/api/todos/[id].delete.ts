import { eq } from "drizzle-orm";
import { db, schema } from "../../utils/db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID is required" });
  }

  const [toDelete] = await db
    .select()
    .from(schema.todos)
    .where(eq(schema.todos.id, id));

  if (!toDelete) {
    throw createError({ statusCode: 404, statusMessage: "Todo not found" });
  }

  await db.delete(schema.todos).where(eq(schema.todos.id, id));

  return { success: true, deleted: toDelete };
});
