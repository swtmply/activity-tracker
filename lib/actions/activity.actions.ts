"use server";

import { and, eq, gte, lte } from "drizzle-orm";
import { db } from "../db";
import {
  Activity,
  activity,
  activityEntry,
  ActivityInsert,
  ActivityWithEntries,
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

type GetActivitiesOptions = {
  month: number;
  year: number;
};

export function getActivities(
  userId: string,
  options: GetActivitiesOptions
): Promise<ActivityWithEntries[]>;

export function getActivities(
  userId: string,
  options?: undefined
): Promise<Activity[]>;

export async function getActivities(
  userId: string,
  options?: GetActivitiesOptions
): Promise<Activity[] | ActivityWithEntries[]> {
  try {
    if (options) {
      const startDate = new Date(options.year, options.month, 1);
      const endDate = new Date(options.year, options.month + 1, 0);

      const response = (await db.query.activity.findMany({
        where: and(eq(activity.userId, userId)),
        with: {
          entries: {
            where: and(
              gte(activityEntry.date, startDate),
              lte(activityEntry.date, endDate)
            ),
          },
        },
      })) as ActivityWithEntries[];

      const data = response.map((activity) => {
        const entries = activity.entries.map((entry) => {
          return {
            ...entry,
            year: entry.date.getFullYear(),
            month: entry.date.getMonth(),
            day: entry.date.getDate() - 1,
            metric: entry.metric,
          };
        });

        return {
          ...activity,
          entries: entries,
        };
      });

      return data;
    }

    return (await db
      .select()
      .from(activity)
      .where(eq(activity.userId, userId))) as Activity[];
  } catch (error) {
    throw Error(`Error getting activities: ${error}`);
  }
}
