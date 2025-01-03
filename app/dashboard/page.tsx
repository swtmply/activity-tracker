import ActivityCards from "@/components/activity-cards";

import DateFilter from "@/components/date-filter";
import FormDialog from "@/components/form-dialog";
import { getActivities } from "@/lib/actions/activity.actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
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

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const activities = await getActivities(session.user.id, {
    month: parseInt(m || currentMonth.toString()),
    year: parseInt(y || currentYear.toString()),
  });

  return (
    <main className="w-full flex flex-col items-center gap-4">
      <div className="w-full max-w-sm md:max-w-3xl flex md:flex-row flex-col md:justify-between md:items-center py-1 gap-2">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
          <h1 className="font-bold text-2xl">Activities</h1>
          <DateFilter month={m} year={y} />
        </div>

        <FormDialog activities={activities} />
      </div>
      <ActivityCards activities={activities} />
    </main>
  );
}
