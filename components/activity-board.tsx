import {
  cn,
  generateRandomColor,
  generateRandomData,
  getColor,
} from "@/lib/utils";
import React from "react";

export const months = [
  { name: "January", days: 31, data: generateRandomData(31) },
  {
    name: "February",
    days: new Date(new Date().getFullYear(), 2, 0).getDate(),
    data: generateRandomData(
      new Date(new Date().getFullYear(), 2, 0).getDate()
    ),
  },
  { name: "March", days: 31, data: generateRandomData(31) },
  { name: "April", days: 30, data: generateRandomData(30) },
  { name: "May", days: 31, data: generateRandomData(31) },
  { name: "June", days: 30, data: generateRandomData(30) },
  { name: "July", days: 31, data: generateRandomData(31) },
  { name: "August", days: 31, data: generateRandomData(31) },
  { name: "September", days: 30, data: generateRandomData(30) },
  { name: "October", days: 31, data: generateRandomData(31) },
  { name: "November", days: 30, data: generateRandomData(30) },
  { name: "December", days: 31, data: generateRandomData(31) },
];

export default function ActivityBoard({}: { data: number[] }) {
  const color = generateRandomColor();

  return (
    <div className="flex flex-col gap-2">
      {months.map((month, index) => (
        <div className="flex flex-col gap-2" key={index}>
          <h2>{month.name}</h2>
          <div className="flex flex-wrap gap-1">
            {month.data.map((value, index) => (
              <div
                key={index}
                className={cn(
                  "flex justify-center items-center h-8 w-8 rounded-lg",
                  getColor(color, value || 0)
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
