import ActivityMetrics from "@/components/activity-metrics";

import YearSelect from "@/components/year-select";
import FormDialog from "@/components/form-dialog";
import { getActivities } from "@/lib/actions/activity.actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { m, y } = await searchParams;

  const currentYear = new Date().getFullYear();

  const activities = await getActivities(session.user.id, {
    year: parseInt(y || currentYear.toString()),
  });

  return (
    <main className="w-full flex flex-col items-center gap-4">
      <div className="w-full max-w-sm md:max-w-5xl flex md:flex-row flex-col md:justify-between md:items-center py-1 gap-2">
        <div className="flex gap-4 items-center">
          <h1 className="font-bold text-2xl">Activities in</h1>
          <YearSelect month={m} year={y} />
        </div>

        <FormDialog activities={activities} />
      </div>

      {activities.map((activity) => (
        <Link
          href={`/dashboard/activity/${activity.id}?y=${y || currentYear}`}
          passHref
          className="flex flex-col gap-2 last:pb-16 max-w-5xl w-full items-center"
          key={activity.id}
        >
          <h1 className="text-2xl font-bold max-w-sm w-full lg:max-w-5xl">
            {activity.name}
          </h1>
          <ActivityMetrics activity={activity} year={y} />
        </Link>
      ))}
    </main>
  );
}
