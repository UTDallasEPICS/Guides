import { db, schema } from "../../utils/db";

export default eventHandler(async () => {
  return await db.select().from(schema.todos);
});
