"use client";
import React, { useMemo } from "react";

import { toast } from "@/hooks/use-toast";
import { createActivityEntry } from "@/lib/actions/activity-entry.action";
import { Activity } from "@/lib/db/schema/activity.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverClose } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { DatePickerDay } from "./date-picker";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const schema = z.object({
  activity: z.string().min(1, { message: "Activity is required" }),
  metric: z.coerce.number().min(1, { message: "Metric is required" }),
  date: z.date({ required_error: "Date is required" }),
});

type ActivityEntryFormProps = {
  activities: Activity[];
  closeDialog: () => void;
};

export default function ActivityEntryForm({
  activities,
  closeDialog,
}: ActivityEntryFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      activity: "",
      metric: 0,
      date: new Date(),
    },
  });

  const onSubmit = async (data: {
    activity: string;
    metric: number;
    date: Date;
  }) => {
    try {
      await createActivityEntry({
        activityId: data.activity,
        metric: data.metric,
        date: data.date,
      });

      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });

      closeDialog();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return toast({
          title: "Something went wrong",
          description: error.message,
        });
      }
    }
  };

  const selectedActivityId = form.watch("activity");

  const metrics = useMemo(() => {
    const selectedActivity = activities.find(
      (activity) => activity.id === selectedActivityId
    );

    return selectedActivity?.items || [];
  }, [selectedActivityId, activities]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="activity"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Activity</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Select an activity" />
                  </SelectTrigger>
                  <SelectContent>
                    {activities.map((activity) => (
                      <SelectItem
                        key={activity.id}
                        value={activity.id}
                        className="capitalize"
                      >
                        {activity.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <Controller
          name="metric"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Metrics</FormLabel>
              <FormControl>
                <Select
                  value={field.value.toString()}
                  onValueChange={(value) => field.onChange(value)}
                  disabled={!selectedActivityId}
                >
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Select a metric" />
                  </SelectTrigger>
                  <SelectContent>
                    {metrics.map((metric, index) => (
                      <SelectItem
                        key={metric}
                        value={`${index + 1}`}
                        className="capitalize"
                      >
                        {metric}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <Controller
          name="date"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      components={{
                        Day: (props) => (
                          <DatePickerDay asChild {...props}>
                            <PopoverClose>{props.date.getDate()}</PopoverClose>
                          </DatePickerDay>
                        ),
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={closeDialog} type="button" variant={"secondary"}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
