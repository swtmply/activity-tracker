"use client";

import ActivityEntryForm from "@/components/activity-entry-form";
import ActivityForm from "@/components/activity-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { deleteActivity } from "@/lib/actions/activity.actions";
import { Activity } from "@/lib/db/schema/activity.schema";
import { BetweenHorizonalStart, Edit, Plus, Trash } from "lucide-react";
import React from "react";
import ConfirmationDialog from "./confirmation-dialog";

type ActivityEntryActionsDialogProps = {
  activity: Activity;
};

export default function ActivityEntryActionsDialog({
  activity,
}: ActivityEntryActionsDialogProps) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [form, setForm] = React.useState("");

  const Form =
    form === "activity-entry" ? (
      <ActivityEntryForm
        activities={[activity]}
        closeDialog={() => setOpenDialog(false)}
      />
    ) : form === "edit-activity" ? (
      <ActivityForm
        closeDialog={() => setOpenDialog(false)}
        edit
        activity={activity}
      />
    ) : (
      <ConfirmationDialog
        onConfirm={() => {
          try {
            deleteActivity(activity.id);

            toast({
              title: "Successfully deleted activity",
              description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">
                    {JSON.stringify(activity, null, 2)}
                  </code>
                </pre>
              ),
            });
          } catch (error) {
            if (error instanceof Error) {
              return toast({
                title: "Something went wrong",
                description: error.message,
              });
            }
          }
        }}
        onCancel={() => setOpenDialog(false)}
      />
    );

  const response = fetch("/api/activities");

  console.log(response);

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
              setForm("activity-entry");
            }}
          >
            <Plus />
            Activity Entry
          </DropdownMenuItem>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              setOpenDialog(true);
              setForm("edit-activity");
            }}
          >
            <Edit /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setOpenDialog(true);
              setForm("delete-activity");
            }}
            className="text-red-500 focus:bg-red-50 focus:text-red-500"
          >
            <Trash /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>{Form}</DialogContent>
    </Dialog>
  );
}
