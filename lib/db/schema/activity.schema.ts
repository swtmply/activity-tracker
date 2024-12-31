import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./auth.schema";
import { relations } from "drizzle-orm";

export const activity = sqliteTable("activity", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  name: text("name").notNull(),
  items: text("items", { mode: "json" }).notNull(),
  color: text("color").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const activityRelations = relations(activity, ({ one, many }) => ({
  user: one(user, {
    fields: [activity.userId],
    references: [user.id],
  }),
  entries: many(activityEntry),
}));

export const activityEntry = sqliteTable("activity_entry", {
  id: text("id").primaryKey(),
  activityId: text("activity_id")
    .notNull()
    .references(() => activity.id),
  metric: integer("metric").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const activityEntryRelations = relations(activityEntry, ({ one }) => ({
  activity: one(activity, {
    fields: [activityEntry.activityId],
    references: [activity.id],
  }),
}));
