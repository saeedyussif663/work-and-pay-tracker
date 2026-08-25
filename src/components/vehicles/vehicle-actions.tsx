import {
  DotsThreeVerticalIcon,
  EyeIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { successStyle } from "@/lib/http";
import { deleteVehicle } from "@/lib/vehicles";
import { cn } from "@/lib/utils";
import { queryClient } from "@/main";
import type { Vehicle } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { EditVehicleDialog } from "./edit-vehicle";
import { ViewVehicleDialog } from "./view-vehicle";

interface VehicleActionsProps {
  vehicle: Vehicle;
}

const actionClassName =
  "flex w-full items-center gap-2 px-3 py-2 text-left font-mono text-xs uppercase tracking-wide outline-none transition-colors hover:bg-muted focus-visible:bg-muted disabled:pointer-events-none disabled:opacity-50";

export function VehicleActions({ vehicle }: VehicleActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteVehicle(vehicle.id),
    onSuccess: (data) => {
      if (!data) return;

      toast.success(data.message, { style: successStyle });
      setDeleteOpen(false);
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });

  function openAction(setOpen: (open: boolean) => void) {
    setMenuOpen(false);
    setOpen(true);
  }

  return (
    <>
      <PopoverPrimitive.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <PopoverPrimitive.Trigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Actions for ${vehicle.name}`}
          >
            <DotsThreeVerticalIcon weight="bold" />
          </Button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="end"
            sideOffset={4}
            className="z-50 min-w-36 overflow-hidden rounded-md bg-popover py-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
          >
            <button
              type="button"
              className={actionClassName}
              onClick={() => openAction(setViewOpen)}
            >
              <EyeIcon className="size-4" />
              View
            </button>
            <button
              type="button"
              className={actionClassName}
              onClick={() => openAction(setEditOpen)}
            >
              <PencilSimpleIcon className="size-4" />
              Edit
            </button>
            <button
              type="button"
              className={cn(
                actionClassName,
                "text-destructive hover:bg-destructive/10 focus-visible:bg-destructive/10",
              )}
              onClick={() => openAction(setDeleteOpen)}
            >
              <TrashIcon className="size-4" />
              Delete
            </button>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      <ViewVehicleDialog
        vehicle={vehicle}
        trigger={null}
        open={viewOpen}
        onOpenChange={setViewOpen}
      />

      <EditVehicleDialog
        vehicle={vehicle}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <Dialog
        open={deleteOpen}
        onOpenChange={(nextOpen) => {
          if (!isDeleting) setDeleteOpen(nextOpen);
        }}
      >
        <DialogContent className="rounded-md sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg font-bold tracking-tightest text-foreground">
              Delete vehicle?
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              This will permanently delete {vehicle.rider}'s {vehicle.name}.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              isLoading={isDeleting}
              onClick={() => remove()}
            >
              Delete vehicle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
