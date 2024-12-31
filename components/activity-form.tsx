"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  color: z.string(),
  items: z
    .array(z.string())
    .min(1, { message: "At least one item is required" })
    .max(5, { message: "Maximum of 5 items" }),
});

const tailwindColors = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "teal",
  "orange",
];

const defaultValues = {
  name: "",
  color: tailwindColors[0],
  items: [] as string[],
};

export default function ActivityForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [newItem, setNewItem] = React.useState("");

  const selectedColor = form.getValues("color");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newItem && form.getValues("items").length < 5) {
        form.setValue("items", [...form.getValues("items"), newItem]);
        setNewItem("");
      }
    }
  };

  const removeItem = (index: number) => {
    const items = form.getValues("items");
    items.splice(index, 1);
    form.setValue("items", items);
  };

  const onSubmit = (data: { name: string; color: string; items: string[] }) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Plus />
          Add Activity
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an Activity</DialogTitle>
          <DialogDescription>
            Fill out the necessary information to create an activity.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4">
              <FormLabel>Metrics</FormLabel>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Enter metric (max 5 items)"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <Controller
                  name="color"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger className="capitalize">
                            <SelectValue placeholder="Select a color" />
                          </SelectTrigger>
                          <SelectContent>
                            {tailwindColors.map((color) => (
                              <SelectItem
                                key={color}
                                value={color}
                                className="capitalize"
                                withColor
                              >
                                {color}
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
              </div>

              {form.formState.errors && (
                <FormMessage>
                  {form.formState.errors.items?.message}
                </FormMessage>
              )}
            </div>

            <Controller
              name="items"
              control={form.control}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-4">
                  {field.value.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center max-w-[10vw] justify-between"
                    >
                      <div className="flex gap-2 items-center">
                        <div
                          className={`w-4 h-4 bg-${selectedColor}-${
                            (index + 1) * 100
                          } mr-2 rounded-lg`}
                        ></div>
                        <span className="line-clamp-1 text-sm">{item}</span>
                      </div>
                      <Button
                        onClick={() => removeItem(index)}
                        variant={"secondary"}
                        size={"icon"}
                        className="hover:text-red-500 hover:bg-red-100 rounded-full"
                      >
                        <Trash />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <DialogClose asChild>
                <Button type="button" variant={"secondary"}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}