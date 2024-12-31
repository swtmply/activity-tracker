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

export const generateRandomData = (days: number) => {
  return Array.from({ length: days }, () => 0);
};
