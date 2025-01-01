"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import {
  Activity,
  activity,
  ActivityInsert,
} from "../db/schema/activity.schema";
import { revalidatePath } from "next/cache";

export const createActivity = async (data: ActivityInsert) => {
  try {
    await db.insert(activity).values(data);

    revalidatePath("/dashboard");
  } catch (error) {
    throw Error(`Error creating activity: ${error}`);
  }
};

export const getActivities = async (userId: string): Promise<Activity[]> => {
  try {
    return (await db
      .select()
      .from(activity)
      .where(eq(activity.userId, userId))) as Activity[];
  } catch (error) {
    throw Error(`Error getting activities: ${error}`);
  }
};
