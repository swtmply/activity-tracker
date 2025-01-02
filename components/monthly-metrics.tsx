import { ActivityWithEntries } from "@/lib/db/schema/activity.schema";
import { cn, generateData, getColor, months } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MonthlyMetricsProps {
  activity: ActivityWithEntries;
  year?: string;
}

export default function MonthlyMetrics({
  activity,
  year = new Date().getFullYear().toString(),
}: MonthlyMetricsProps) {
  const currentYear = parseInt(year);

  return (
    <div className="grid grid-cols-3 gap-4 pb-16 mx-auto w-full max-w-3xl">
      {months.map((month) => {
        const data = generateData(month.days);

        // Map activity entries to the data array for this month
        activity.entries.forEach((entry) => {
          if (entry.month === month.value && entry.year === currentYear) {
            data[entry.day] = entry.metric;
          }
        });

        return (
          <Card key={month.value} className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>{month.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {data.map((value, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-6 h-6 rounded-lg text-[10px] flex items-center justify-center",
                      getColor(activity.color, value)
                    )}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
