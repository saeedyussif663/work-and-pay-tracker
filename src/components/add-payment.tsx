import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@phosphor-icons/react";
import { useState, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod/v4";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  vehicleId: z.string().min(1, "Select a vehicle."),
  amount: z.number().positive("Amount must be greater than 0."),
});

type AddPaymentFormInput = z.input<typeof formSchema>;

export interface VehicleOption {
  id: string;
  label: string;
}

interface AddPaymentDialogProps {
  trigger?: ReactNode;
}

export function AddPaymentDialog({ trigger }: AddPaymentDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<AddPaymentFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleId: "",
      amount: 0,
    },
  });

  // Stand-in until vehicles are fetched from the API — mirrors Vehicles.tsx ids/names.
  const vehicles = [
    { id: "1", label: "TVS Bike — GT-4471-23" },
    { id: "2", label: "Bajaj Tricycle — GT-5678-23" },
    { id: "3", label: "Honda Motorbike — GW-9012-24" },
  ];

  function onSubmit(data: AddPaymentFormInput) {
    console.log(data);
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) form.reset();
      }}
    >
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="lg">
            <PlusIcon />
            Add payment
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-105 rounded-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg font-bold tracking-tightest text-foreground">
            Add a payment
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Log a payment against a vehicle. It gets added to that vehicle's
            paid total right away.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-3">
            <Controller
              name="vehicleId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor="add-payment-vehicle"
                    className="font-mono text-xs uppercase tracking-wide text-foreground font-medium"
                  >
                    Vehicle
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="add-payment-vehicle"
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Select a vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor="add-payment-amount"
                    className="font-mono text-xs uppercase tracking-wide text-foreground font-medium"
                  >
                    Amount (GHS)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="add-payment-amount"
                    type="number"
                    min={0}
                    aria-invalid={fieldState.invalid}
                    placeholder="220"
                    autoComplete="off"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
              onClick={() => setOpen(false)}
              className="rounded-md"
            >
              Cancel
            </Button>
            <Button type="submit">Log payment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
