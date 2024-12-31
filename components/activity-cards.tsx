import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getActivities } from "@/lib/actions/activity.actions";
import { auth } from "@/lib/auth";
import { cn, generateRandomData, getColor } from "@/lib/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ActivityCards() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const activities = await getActivities(session.user.id);

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
