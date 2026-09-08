import { db, schema } from "../../utils/db";

export default eventHandler(async (event) => {
  const body = await readBody(event);

  if (!body?.title || typeof body.title !== "string" || !body.title.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "Title is required",
    });
  }

  const newTodo = {
    id: Math.random().toString(36).substring(2, 9),
    title: body.title.trim(),
    content: body.content?.trim() || "",
  };

  await db.insert(schema.todos).values(newTodo);

  setResponseStatus(event, 201);
  return newTodo;
});
