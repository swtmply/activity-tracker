"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { BetweenHorizonalStart, Plus } from "lucide-react";
import React from "react";
import ActivityEntryForm from "./activity-entry-form";
import ActivityForm from "./activity-form";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Activity } from "@/lib/db/schema/activity.schema";

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
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to proceed with this action?
          </DialogDescription>
        </DialogHeader>

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
