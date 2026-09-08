import { eq } from "drizzle-orm";
import { db, schema } from "../../utils/db";

export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID is required" });
  }

  const body = await readBody(event);

  await db
    .update(schema.todos)
    .set({
      ...(body.title !== undefined && { title: body.title.trim() }),
      ...(body.content !== undefined && { content: body.content.trim() }),
    })
    .where(eq(schema.todos.id, id));

  const [updated] = await db
    .select()
    .from(schema.todos)
    .where(eq(schema.todos.id, id));

  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: "Todo not found" });
  }

  return updated;
});
