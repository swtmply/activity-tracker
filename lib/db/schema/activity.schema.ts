import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./auth.schema";
import { relations, sql } from "drizzle-orm";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

export const activity = sqliteTable("activity", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  items: text("items", { mode: "json" }).notNull(),
  color: text("color").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const activitySelectSchema = createSelectSchema(activity, {
  items: z.string().array(),
});
export const activityInsertSchema = createInsertSchema(activity, {
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type Activity = z.infer<typeof activitySelectSchema>;
export type ActivityInsert = z.infer<typeof activityInsertSchema>;

export const activityRelations = relations(activity, ({ one, many }) => ({
  user: one(user, {
    fields: [activity.userId],
    references: [user.id],
  }),
  entries: many(activityEntry),
}));

export const activityEntry = sqliteTable("activity_entry", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  activityId: text("activity_id")
    .notNull()
    .references(() => activity.id, { onDelete: "cascade" }),
  metric: integer("metric").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const activityEntrySelectSchema = createSelectSchema(
  activityEntry
).extend({
  year: z.number(),
  month: z.number(),
  day: z.number(),
});

export const activityEntryInsertSchema = createInsertSchema(activityEntry, {
  id: z.string().optional(),
  metric: z.coerce.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ActivityEntry = z.infer<typeof activityEntrySelectSchema>;
export type ActivityEntryInsert = z.infer<typeof activityEntryInsertSchema>;

export const activityEntryRelations = relations(activityEntry, ({ one }) => ({
  activity: one(activity, {
    fields: [activityEntry.activityId],
    references: [activity.id],
  }),
}));

export type ActivityWithEntries = Activity & { entries: ActivityEntry[] };
