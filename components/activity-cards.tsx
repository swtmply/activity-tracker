"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityWithEntries } from "@/lib/db/schema/activity.schema";
import { cn, generateData, getColor } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ActivityCards({
  activities,
}: {
  activities: ActivityWithEntries[];
}) {
  const searchParams = useSearchParams();
  const month = searchParams.get("m");
  const year = searchParams.get("y");
  const days = new Date(
    parseInt(year || new Date().getFullYear().toString()),
    parseInt(month || new Date().getMonth().toString()) + 1,
    0
  ).getDate();

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 w-full px-6 pb-16",
        "md:grid-cols-3 md:gap-2 md:px-0 md:max-w-3xl md:w-full"
      )}
    >
      {activities.map((activity, index) => {
        const fills = generateData(days);
        const data = fills.map((_, index) => {
          const entry = activity.entries.find((entry) => entry.day === index);

          return entry ? entry.metric : 0;
        });

        return (
          <ActivityCard
            key={index}
            id={activity.id}
            name={activity.name}
            data={data}
            color={activity.color}
          />
        );
      })}
    </div>
  );
}

export function ActivityCard({
  name,
  data,
  color,
  id,
}: {
  name: string;
  data: number[];
  color: string;
  id: string;
}) {
  const searchParams = useSearchParams();
  const y = searchParams.get("y");

  const params = new URLSearchParams(searchParams.toString());
  params.set("y", y || new Date().getFullYear().toString());

  return (
    <Link href={`/dashboard/activity/${id}?${params.toString()}`} prefetch>
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {data.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "flex justify-center items-center size-10 md:size-6 rounded-lg bg-primary/10",
                  getColor(color, data[index] || 0)
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
