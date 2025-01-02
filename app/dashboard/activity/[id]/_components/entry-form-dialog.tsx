"use client";

import {
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import ActivityEntryForm from "@/components/activity-entry-form";
import { Activity } from "@/lib/db/schema/activity.schema";
import { Button } from "@/components/ui/button";
import React from "react";

type EntryFormDialogProps = {
  activity: Activity;
};

export default function EntryFormDialog({ activity }: EntryFormDialogProps) {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Activity Entry</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Activity Entry for {activity.name}</DialogTitle>
          <DialogDescription>
            Fill in the form below to create an entry for this activity.
          </DialogDescription>
        </DialogHeader>

        <ActivityEntryForm
          activities={[activity]}
          closeDialog={() => setOpenDialog(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
