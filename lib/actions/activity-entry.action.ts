"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import {
  ActivityEntry,
  activityEntry,
  ActivityEntryInsert,
} from "../db/schema/activity.schema";
import { eq } from "drizzle-orm";

export const createActivityEntry = async (data: ActivityEntryInsert) => {
  try {
    await db.insert(activityEntry).values(data);

    revalidatePath("/dashboard");
  } catch (error) {
    throw Error(`Error creating data entry: ${error}`);
  }
};

export const getDataEntries = async (activityId: string) => {
  try {
    return (await db
      .select()
      .from(activityEntry)
      .where(eq(activityEntry.activityId, activityId))) as ActivityEntry[];
  } catch (error) {
    throw Error(`Error getting data entries: ${error}`);
  }
};
