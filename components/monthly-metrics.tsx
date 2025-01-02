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
    <div
      className={cn(
        "grid grid-cols-1 gap-4 w-full px-6 pb-16",
        "md:grid-cols-3 md:gap-2 md:px-0 md:max-w-3xl md:w-full"
      )}
    >
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
              <div className="grid grid-cols-7 gap-1">
                {data.map((value, index) => (
                  <div
                    key={index}
                    className={cn(
                      "size-10 md:size-6 rounded-lg text-[10px] flex items-center justify-center",
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
