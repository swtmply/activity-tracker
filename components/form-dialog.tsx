"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Activity } from "@/lib/db/schema/activity.schema";
import { BetweenHorizonalStart, Plus } from "lucide-react";
import React from "react";
import ActivityEntryForm from "./activity-entry-form";
import ActivityForm from "./activity-form";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function FormDialog({ activities }: { activities: Activity[] }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [form, setForm] = React.useState("");

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <BetweenHorizonalStart />
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Create</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              setOpenDialog(true);
              setForm("activity");
            }}
          >
            <Plus /> Activity
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              setOpenDialog(true);
              setForm("activity-entry");
            }}
          >
            <Plus />
            Activity Entry
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        {form === "activity" ? (
          <ActivityForm closeDialog={() => setOpenDialog(false)} />
        ) : (
          <ActivityEntryForm
            activities={activities}
            closeDialog={() => setOpenDialog(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
