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
    <main className="mx-auto w-full max-w-3xl flex flex-col gap-4">
      <div className="mx-auto w-full max-w-3xl flex justify-between items-center py-1">
        <div className="flex gap-4 items-center">
          <h1 className="font-bold text-2xl">{activity.name}</h1>
          <DateFilter month={m} year={y} showMonthButton={false} />
        </div>
        <EntryFormDialog activity={activity} />
      </div>

      <MonthlyMetrics activity={activity} year={y} />
    </main>
  );
}
