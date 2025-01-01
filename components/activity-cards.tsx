import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity } from "@/lib/db/schema/activity.schema";
import { cn, generateRandomData, getColor } from "@/lib/utils";

export default async function ActivityCards({
  activities,
}: {
  activities: Activity[];
}) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {activities.map((activity, index) => (
        <ActivityCard
          key={index}
          name={activity.name}
          data={generateRandomData(31)}
          color={activity.color}
        />
      ))}
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Month of December</CardDescription>
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
