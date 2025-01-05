import { ActivityWithEntries } from "@/lib/db/schema/activity.schema";
import { cn, generateData, getColor, months } from "@/lib/utils";
import React from "react";

interface ActivityMetricsProps {
  activity: ActivityWithEntries;
  year?: string;
}

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ActivityMetrics({
  activity,
  year = new Date().getFullYear().toString(),
}: ActivityMetricsProps) {
  const currentYear = parseInt(year);
  const firstDayOfMonth = new Date(currentYear, 0, 1).getDay();

  return (
    <div className="grid gap-2 w-full max-w-5xl">
      <div className="grid grid-flow-col">
        <div />
        {months.map((month) => (
          <div
            key={month.label}
            className={cn("text-xs text-gray-500 max-h-min")}
          >
            {month.label}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-0.5">
        {week.map((day, index) => (
          <div key={`empty-${index}`} className="text-xs text-gray-500 mr-2">
            {day}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="size-4" />
        ))}

        {months.map((month) => {
          const data = generateData(month.days);

          // Map activity entries to the data array for this month
          activity.entries.forEach((entry) => {
            if (entry.month === month.value && entry.year === currentYear) {
              data[entry.day] = entry.metric;
            }
          });

          return (
            <React.Fragment key={month.label}>
              {data.map((value, index) => (
                <div
                  key={index}
                  className={cn(
                    "size-4 rounded-sm flex items-center justify-center transition-colors",
                    getColor(activity.color, value),
                    "hover:ring-2 hover:ring-offset-2 hover:ring-ring",
                    "group relative"
                  )}
                >
                  <div className="absolute hidden group-hover:block bottom-full mb-2 whitespace-nowrap z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                    {value} on {month.label} {index + 1}
                  </div>
                </div>
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
