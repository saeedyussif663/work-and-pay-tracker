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
import http, { successStyle } from "@/lib/http";
import { queryClient } from "@/main";
import type { Vehicle } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const formSchema = z
  .object({
    name: z.string().min(3, "Name should be at least 3 characters."),
    rider: z.string().min(3, "Rider name should be at least 3 characters."),
    startDate: z.iso.date("Enter a valid start date."),
    cost: z.number().positive("Cost must be greater than 0."),
    expectedReturn: z
      .number()
      .positive("Expected return must be greater than 0."),
    weeklyAmount: z.number().positive("Weekly amount must be greater than 0."),
  })
  .refine((data) => data.expectedReturn >= data.cost, {
    message: "Expected return should be at least the cost.",
    path: ["expectedReturn"],
  });

type AddVehicleFormInput = z.input<typeof formSchema>;

interface AddVehicleDialogProps {
  trigger?: ReactNode;
}

export function AddVehicleDialog({ trigger }: AddVehicleDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<AddVehicleFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rider: "",
      startDate: new Date().toISOString().slice(0, 10),
      cost: 0,
      expectedReturn: 0,
      weeklyAmount: 0,
    },
  });

  async function addVehicle(data: AddVehicleFormInput) {
    const res = await http.post<
      { message: string; data: Vehicle },
      AddVehicleFormInput
    >("vehicles", data);

    return res;
  }

  const { mutate, isPending } = useMutation({
    mutationFn: addVehicle,
    onSuccess: (data) => {
      if (!data) return;

      toast.success(data.message, {
        style: successStyle,
      });

      setOpen(false);

      queryClient.invalidateQueries({
        queryKey: ["vehicles"],
      });
    },
  });

  function onSubmit(data: AddVehicleFormInput) {
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
            Add vehicle
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-105 rounded-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg font-bold tracking-tightest text-foreground">
            Add a vehicle
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Set the cost, expected return, and weekly installment. Payments get
            logged against this once it's created.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-3">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor="add-vehicle-name"
                    className="font-mono text-xs uppercase tracking-wide text-foreground font-medium"
                  >
                    Vehicle
                  </FieldLabel>
                  <Input
                    {...field}
                    id="add-vehicle-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="TVS Bike — GT-4471-23"
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
                    htmlFor="add-vehicle-rider"
                    className="font-mono text-xs uppercase tracking-wide text-foreground font-medium"
                  >
                    Rider
                  </FieldLabel>
                  <Input
                    {...field}
                    id="add-vehicle-rider"
                    aria-invalid={fieldState.invalid}
                    placeholder="Kwame Mensah"
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
                    htmlFor="add-vehicle-start-date"
                    className="font-mono text-xs uppercase tracking-wide text-foreground font-medium"
                  >
                    Start Date
                  </FieldLabel>
                  <Input
                    {...field}
                    id="add-vehicle-start-date"
                    type="date"
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

            <div className="grid grid-cols-2 gap-3">
              <Controller
                name="cost"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel
                      htmlFor="add-vehicle-cost"
                      className="font-mono text-xs uppercase tracking-wide text-foreground font-medium"
                    >
                      Cost (GHS)
                    </FieldLabel>
                    <Input
                      {...field}
                      id="add-vehicle-cost"
                      type="number"
                      min={0}
                      aria-invalid={fieldState.invalid}
                      placeholder="9800"
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

              <Controller
                name="expectedReturn"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel
                      htmlFor="add-vehicle-return"
                      className="font-mono text-xs uppercase tracking-wide text-foreground font-medium"
                    >
                      Expected Return
                    </FieldLabel>
                    <Input
                      {...field}
                      id="add-vehicle-return"
                      type="number"
                      aria-invalid={fieldState.invalid}
                      placeholder="13200"
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
            </div>

            <Controller
              name="weeklyAmount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor="add-vehicle-weekly"
                    className="font-mono text-xs uppercase tracking-wide text-foreground font-medium"
                  >
                    Weekly Installment (GHS)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="add-vehicle-weekly"
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
              Create vehicle
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
