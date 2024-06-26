import { pgTable, varchar } from "drizzle-orm/pg-core";

export const links = pgTable('links', {
	id: varchar("id").primaryKey().notNull(),
	to: varchar("to"), // redactable
});
