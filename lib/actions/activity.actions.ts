"use server";

import { and, eq, gte, lte } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import {
  Activity,
  activity,
  activityEntry,
  ActivityInsert,
  ActivityWithEntries,
} from "../db/schema/activity.schema";
import { redirect } from "next/navigation";

export const createActivity = async (data: ActivityInsert) => {
  try {
    await db.insert(activity).values(data);

    revalidatePath("/dashboard");
  } catch (error) {
    throw Error(`Error creating activity: ${error}`);
  }
};

type GetActivitiesOptions = {
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
      const startDate = new Date(options.year, 0, 1);
      const endDate = new Date(options.year, 11, 31);

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

export async function getActivity(id: string): Promise<ActivityWithEntries> {
  try {
    const response = (await db.query.activity.findFirst({
      where: eq(activity.id, id),
      with: {
        entries: true,
      },
    })) as ActivityWithEntries;

    if (!response) {
      throw Error("Activity not found");
    }

    const entries = response.entries.map((entry) => {
      return {
        ...entry,
        year: entry.date.getFullYear(),
        month: entry.date.getMonth(),
        day: entry.date.getDate() - 1,
        metric: entry.metric,
      };
    });

    return {
      ...response,
      entries,
    };
  } catch (error) {
    throw Error(`Error getting activity: ${error}`);
  }
}

export const editActivity = async (data: Activity) => {
  try {
    await db.update(activity).set(data).where(eq(activity.id, data.id));

    revalidatePath("/dashboard");
  } catch (error) {
    throw Error(`Error editing activity: ${error}`);
  }
};

export const deleteActivity = async (id: string) => {
  try {
    await db.delete(activity).where(eq(activity.id, id));

    revalidatePath("/dashboard");
  } catch (error) {
    throw Error(`Error deleting activity: ${error}`);
  }

  redirect("/dashboard");
};
