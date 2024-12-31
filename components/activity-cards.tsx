import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  cn,
  generateRandomColor,
  generateRandomData,
  getColor,
} from "@/lib/utils";

const data = {
  activities: [
    {
      name: "Jogging",
      data: generateRandomData(31),
    },
    {
      name: "Reading",
      data: generateRandomData(31),
    },
    {
      name: "Coding",
      data: generateRandomData(31),
    },
    {
      name: "Drawing",
      data: generateRandomData(31),
    },
  ],
};

export default function ActivityCards() {
  return (
    <div className="grid grid-cols-3 gap-1">
      {data.activities.map((activity, index) => (
        <ActivityCard key={index} name={activity.name} data={activity.data} />
      ))}
    </div>
  );
}

export function ActivityCard({ name, data }: { name: string; data: number[] }) {
  const color = generateRandomColor();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Month of December</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {data.map((_, index) => (
            <div
              key={index}
              className={cn(
                "flex justify-center items-center h-6 w-6 rounded-lg bg-primary/10",
                getColor(color, data[index] || 0)
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
