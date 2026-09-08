import { eq } from "drizzle-orm";
import { db, schema } from "../../utils/db";

export default eventHandler(async (event) => {
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

  return todo;
});
