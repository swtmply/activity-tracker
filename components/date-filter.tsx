"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function generateYears() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 2024; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
}

export default function DateFilter({
  month,
  year,
}: {
  month: string | undefined;
  year: string | undefined;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const onMonthSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("m", value);

    router.push(`${pathname}?${params.toString()}`);
  };

  const onYearSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("y", value);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-1 items-center">
      <Select
        defaultValue={month || currentMonth.toString()}
        onValueChange={onMonthSelect}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Select a month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value.toString()}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={year || currentYear.toString()}
        onValueChange={onYearSelect}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Select a month" />
        </SelectTrigger>
        <SelectContent>
          {generateYears().map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
