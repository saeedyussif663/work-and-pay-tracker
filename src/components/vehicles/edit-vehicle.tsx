import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { successStyle } from "@/lib/http";
import { updateVehicle } from "@/lib/vehicles";
import { queryClient } from "@/main";
import type { Vehicle } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  vehicleFormSchema,
  type VehicleFormInput,
} from "./vehicle-form-schema";

interface EditVehicleDialogProps {
  vehicle: Vehicle;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
}

function getDefaultValues(vehicle: Vehicle): VehicleFormInput {
  return {
    name: vehicle.name,
    rider: vehicle.rider,
    startDate: new Date(vehicle.startDate).toISOString().slice(0, 10),
    cost: vehicle.cost,
    expectedReturn: vehicle.expectedReturn,
    weeklyAmount: vehicle.weeklyAmount,
  };
}

export function EditVehicleDialog({
  vehicle,
  open,
  onOpenChange,
  trigger,
}: EditVehicleDialogProps) {
  const form = useForm<VehicleFormInput>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: getDefaultValues(vehicle),
  });

  useEffect(() => {
    if (open) form.reset(getDefaultValues(vehicle));
  }, [form, open, vehicle]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: VehicleFormInput) => updateVehicle(vehicle.id, data),
    onSuccess: (data) => {
      if (!data) return;

      toast.success(data.message, { style: successStyle });
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="rounded-md sm:max-w-105">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg font-bold tracking-tightest text-foreground">
            Edit vehicle
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Update the vehicle, rider, and repayment terms.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit((data) => mutate(data))}>
          <FieldGroup className="gap-3">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor={`edit-vehicle-name-${vehicle.id}`}
                    className="font-mono text-xs font-medium uppercase tracking-wide text-foreground"
                  >
                    Vehicle
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`edit-vehicle-name-${vehicle.id}`}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="rider"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor={`edit-vehicle-rider-${vehicle.id}`}
                    className="font-mono text-xs font-medium uppercase tracking-wide text-foreground"
                  >
                    Rider
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`edit-vehicle-rider-${vehicle.id}`}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="startDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor={`edit-vehicle-start-date-${vehicle.id}`}
                    className="font-mono text-xs font-medium uppercase tracking-wide text-foreground"
                  >
                    Start Date
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`edit-vehicle-start-date-${vehicle.id}`}
                    type="date"
                    aria-invalid={fieldState.invalid}
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <Controller
                name="cost"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel
                      htmlFor={`edit-vehicle-cost-${vehicle.id}`}
                      className="font-mono text-xs font-medium uppercase tracking-wide text-foreground"
                    >
                      Cost (GHS)
                    </FieldLabel>
                    <Input
                      {...field}
                      id={`edit-vehicle-cost-${vehicle.id}`}
                      type="number"
                      min={0}
                      aria-invalid={fieldState.invalid}
                      disabled={isPending}
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="expectedReturn"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel
                      htmlFor={`edit-vehicle-return-${vehicle.id}`}
                      className="font-mono text-xs font-medium uppercase tracking-wide text-foreground"
                    >
                      Expected Return
                    </FieldLabel>
                    <Input
                      {...field}
                      id={`edit-vehicle-return-${vehicle.id}`}
                      type="number"
                      min={0}
                      aria-invalid={fieldState.invalid}
                      disabled={isPending}
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="weeklyAmount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor={`edit-vehicle-weekly-${vehicle.id}`}
                    className="font-mono text-xs font-medium uppercase tracking-wide text-foreground"
                  >
                    Weekly Installment (GHS)
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`edit-vehicle-weekly-${vehicle.id}`}
                    type="number"
                    min={0}
                    aria-invalid={fieldState.invalid}
                    disabled={isPending}
                    onChange={(event) =>
                      field.onChange(event.target.valueAsNumber)
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter className="mt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-md"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isPending}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
