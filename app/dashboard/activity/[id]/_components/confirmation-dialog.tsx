import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationDialog({ onConfirm, onCancel }: Props) {
  return (
    <React.Fragment>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogTrigger asChild>
          <Button onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        </DialogTrigger>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogFooter>
    </React.Fragment>
  );
}
