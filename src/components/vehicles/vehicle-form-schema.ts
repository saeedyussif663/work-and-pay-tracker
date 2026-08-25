import z from "zod/v4";

export const vehicleFormSchema = z
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

export type VehicleFormInput = z.input<typeof vehicleFormSchema>;
