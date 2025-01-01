"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActivityWithEntries } from "@/lib/db/schema/activity.schema";
import { cn, generateData, getColor, months } from "@/lib/utils";
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
    <div className="grid grid-cols-3 gap-1">
      {activities.map((activity, index) => {
        const fills = generateData(days);
        const data = fills.map((_, index) => {
          const entry = activity.entries.find((entry) => entry.day === index);

          return entry ? entry.metric : 0;
        });

        return (
          <ActivityCard
            key={index}
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
}: {
  name: string;
  data: number[];
  color: string;
}) {
  const searchParams = useSearchParams();
  const m = searchParams.get("m");
  const currentMonth = months.find(
    (month) => month.value === parseInt(m || new Date().getMonth().toString())
  )?.label;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          <span className="capitalize">{currentMonth} Summary</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {data.map((_, index) => (
            <div
              key={index}
              className={cn(
                "flex justify-center items-center h-6 w-6 rounded-lg bg-primary/10",
                getColor(color, data[index] || 0)
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
