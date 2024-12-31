import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColor(
  color: "red" | "orange" | "yellow" | "green" | "teal",
  value: number
): string {
  return `bg-${color}-${value * 100}`;
}

export const generateRandomData = (days: number) => {
  return Array.from({ length: days }, () => Math.floor(Math.random() * 5) + 1);
};

export const generateRandomColor = () => {
  const colors = ["red", "orange", "yellow", "green", "teal"] as const;
  return colors[Math.floor(Math.random() * colors.length)];
};
