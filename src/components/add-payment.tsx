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
import http, { successStyle } from "@/lib/http";
import { queryClient } from "@/main";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

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

  const { data } = useQuery({
    queryKey: ["vehicles", "list"],
    queryFn: () =>
      http.get<{ message: string; data: VehicleOption[] }>("vehicles/list"),
  });
  const vehicles = data?.data ?? [];

  async function addPayment(data: AddPaymentFormInput) {
    const res = await http.post<{ message: string }, { amount: number }>(
      `payments/${data.vehicleId}`,
      { amount: data.amount },
    );

    return res;
  }

  const { mutate, isPending } = useMutation({
    mutationFn: addPayment,
    onSuccess: (data) => {
      if (!data) return;

      toast.success(data.message, {
        style: successStyle,
      });

      setOpen(false);

      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });

  function onSubmit(data: AddPaymentFormInput) {
    mutate(data);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);

        if (!next) {
          form.reset();
        }
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

                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                  >
                    <SelectTrigger
                      id="add-payment-vehicle"
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Select a vehicle" />
                    </SelectTrigger>

                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={String(vehicle.id)}>
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
                    disabled={isPending}
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
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button type="submit" isLoading={isPending}>
              Log payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
