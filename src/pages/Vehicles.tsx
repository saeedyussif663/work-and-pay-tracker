import { PlusIcon } from "@phosphor-icons/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

import { AddVehicleDialog } from "@/components/add-vehicle";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ViewVehicleDialog } from "@/components/view-vehicle";

export type Vehicle = {
  id: string;
  vehicle: string;
  rider: string;
  cost: number;
  expectedReturn: number;
  paid: number;
  projectedFinish: string;
  status: "On track" | "Behind" | "Completed";
};

const baseVehicles: Omit<Vehicle, "id">[] = [
  {
    vehicle: "TVS Bike — GT-4471-23",
    rider: "Kwame Mensah",
    cost: 9800,
    expectedReturn: 13200,
    paid: 8140,
    projectedFinish: "2026-11-14",
    status: "On track",
  },
  {
    vehicle: "Bajaj Tricycle — GT-5678-23",
    rider: "Abena Owusu",
    cost: 14500,
    expectedReturn: 19000,
    paid: 19000,
    projectedFinish: "2025-11-03",
    status: "Completed",
  },
  {
    vehicle: "Honda Motorbike — GW-9012-24",
    rider: "Yaw Boateng",
    cost: 7200,
    expectedReturn: 9500,
    paid: 2100,
    projectedFinish: "2027-01-09",
    status: "Behind",
  },
];

// Repeated to exercise pagination with mock data — ids are unique per row.
const vehicles: Vehicle[] = Array.from({ length: 5 }, (_, page) =>
  baseVehicles.map((v, i) => ({
    ...v,
    id: `${page * baseVehicles.length + i + 1}`,
  })),
).flat();

const currency = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
  maximumFractionDigits: 0,
});

const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "vehicle",
    header: "Vehicle",
  },
  {
    accessorKey: "rider",
    header: "Rider",
  },
  {
    accessorKey: "cost",
    header: () => <div className="text-right">Cost</div>,
    cell: ({ row }) => (
      <div className="text-right">{currency.format(row.original.cost)}</div>
    ),
  },
  {
    accessorKey: "expectedReturn",
    header: () => <div className="text-right">Expected Return</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {currency.format(row.original.expectedReturn)}
      </div>
    ),
  },
  {
    accessorKey: "paid",
    header: () => <div className="text-right">Paid</div>,
    cell: ({ row }) => (
      <div className="text-right">{currency.format(row.original.paid)}</div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">View</div>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <ViewVehicleDialog vehicle={row.original} />
      </div>
    ),
  },
];

export default function Vehicles() {
  return (
    <section className="pb-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-lg font-bold tracking-tightest text-foreground md:text-xl">
            Vehicles
          </h1>
          <p className="text-sm text-muted-foreground">
            Cost, payments, and completion for every vehicle you've financed
          </p>
        </div>
      </div>

      <div className="mt-4">
        <DataTable
          columns={columns}
          data={vehicles}
          toolbarAction={<AddVehicleDialog />}
          emptyState={{
            title: "No vehicles yet",
            description:
              "Add your first vehicle to start tracking cost, payments, and completion.",
            action: (
              <Button size="lg" asChild className="mt-1">
                <Link to="/vehicles/new">
                  <PlusIcon />
                  Add vehicle
                </Link>
              </Button>
            ),
          }}
        />
      </div>
    </section>
  );
}
