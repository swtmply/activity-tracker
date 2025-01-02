import DateFilter from "@/components/date-filter";
import { getActivity } from "@/lib/actions/activity.actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import EntryFormDialog from "./_components/entry-form-dialog";
import MonthlyMetrics from "@/components/monthly-metrics";

export default async function ActivityPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { m, y } = await searchParams;
  const { id } = await params;

  const activity = await getActivity(id);

  return (
    <main className="w-full flex flex-col items-center gap-4">
      <div className="w-full max-w-3xl flex flex-col md:flex-row md:justify-between md:items-center gap-2 px-6 md:px-0 py-1">
        <div className="flex  gap-4 items-center">
          <h1 className="font-bold text-2xl">{activity.name}</h1>
          <DateFilter month={m} year={y} showMonthButton={false} />
        </div>
        <EntryFormDialog activity={activity} />
      </div>

      <MonthlyMetrics activity={activity} year={y} />
    </main>
  );
}
