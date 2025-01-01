import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColor(color: string, value: number): string {
  if (value === 0) {
    return `bg-gray-200`;
  }

  return `bg-${color}-${value * 100}`;
}

export const generateData = (days: number) => {
  return Array.from({ length: days }, () => 0);
};

export const months = [
  { value: 0, label: "January", days: 31 },
  { value: 1, label: "February", days: 28 },
  { value: 2, label: "March", days: 31 },
  { value: 3, label: "April", days: 30 },
  { value: 4, label: "May", days: 31 },
  { value: 5, label: "June", days: 30 },
  { value: 6, label: "July", days: 31 },
  { value: 7, label: "August", days: 31 },
  { value: 8, label: "September", days: 30 },
  { value: 9, label: "October", days: 31 },
  { value: 10, label: "November", days: 30 },
  { value: 11, label: "December", days: 31 },
];
