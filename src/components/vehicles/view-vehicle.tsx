import { EyeIcon } from "@phosphor-icons/react";
import { type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Tally from "@/components/ui/tally";
import { cn } from "@/lib/utils";
import type { Vehicle } from "@/types";

const currency = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
  maximumFractionDigits: 0,
});

const dateFormat = new Intl.DateTimeFormat("en-GH", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const statusStyles: Record<Vehicle["status"], string> = {
  "On track": "bg-success/10 text-success",
  Behind: "bg-warning/10 text-warning",
  Completed: "bg-muted text-muted-foreground",
};

interface ViewVehicleDialogProps {
  vehicle: Vehicle;
  trigger?: ReactNode;
}

export function ViewVehicleDialog({
  vehicle,
  trigger,
}: ViewVehicleDialogProps) {
  const remaining = vehicle.expectedReturn - vehicle.totalPaid;
  const completion = Math.min(
    100,
    Math.round((vehicle.totalPaid / vehicle.expectedReturn) * 100),
  );
  // Tally in dashboard-preview shows filled={6} for 62% — assume a 10-segment tally.
  const filled = Math.round(completion / 10);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" size="icon" aria-label="View details">
            <EyeIcon />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-115 rounded-md p-6">
        {/* Visually hidden — the card content below already communicates the title */}
        <DialogHeader className="sr-only">
          <DialogTitle>{vehicle.name}</DialogTitle>
          <DialogDescription>
            Cost, payments, and completion details for {vehicle.name}
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4.5 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[19px] font-bold">{vehicle.name}</h3>
            <div className="mt-1 font-mono text-xs text-muted-foreground">
              Rider: {vehicle.rider}
            </div>
          </div>
          <span
            className={cn(
              "whitespace-nowrap rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wide",
              statusStyles[vehicle.status],
            )}
          >
            {vehicle.status}
          </span>
        </div>

        <div className="mb-4.5 grid grid-cols-2 gap-x-5 gap-y-3.5">
          {(
            [
              ["Cost", currency.format(vehicle.cost), false],
              [
                "Expected return",
                currency.format(vehicle.expectedReturn),
                false,
              ],
              ["Paid to date", currency.format(vehicle.totalPaid), true],
              ["Remaining", currency.format(remaining), false],
            ] as const
          ).map(([label, value, green]) => (
            <div key={label}>
              <div className="mb-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                {label}
              </div>
              <div
                className={cn(
                  "font-mono text-[17px] font-semibold",
                  green && "text-success",
                )}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            Completion
          </span>
          <span className="font-mono text-[15px] font-bold">{completion}%</span>
        </div>
        <Tally filled={filled} />

        <div className="mt-3.5 border-t border-dashed border-border pt-3 font-mono text-xs text-muted-foreground">
          Projected finish, at current pace:{" "}
          <b className="text-foreground">
            {dateFormat.format(new Date(vehicle.projectedCompletionDate))}
          </b>
        </div>
      </DialogContent>
    </Dialog>
  );
}
